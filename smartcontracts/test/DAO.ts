import { ethers, network } from "hardhat";
import { expect } from "chai";
import { DAO, Marketplace, MarketplaceERC1155, MarketplaceERC20 } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { MockTargetContract } from "../typechain/MockTargetContract";

describe("DAO", function () {
    const ERC20_NAME = "TEST";
    const ERC20_SYMBOL = "TST";
    const ERC1155_BASE_URI = "https://example.com";
    const CREATION_COST = 20;
    const TARGET_CONTRACT_ABI = [{
        "inputs": [],
        "name": "foo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }];

    const id = 1;
    const amount = 5;
    const erc20amount = 100;
    const category = "real estate";
    const price = 10;
    const votingPeriod = 60;

    let signers: Array<SignerWithAddress>;

    let TargetContract: MockTargetContract;
    let Dao: DAO;
    let Marketplace: Marketplace;
    let erc20: MarketplaceERC20;
    let erc1155: MarketplaceERC1155;
    let calldata: string;

    beforeEach(async function () {
        signers = await ethers.getSigners();

        const TARGET_CONTRACT = await ethers.getContractFactory("MockTargetContract");
        TargetContract = (await TARGET_CONTRACT.deploy()) as MockTargetContract;
        await TargetContract.deployed();

        const ERC20 = await ethers.getContractFactory("MarketplaceERC20");
        erc20 = (await ERC20.deploy(ERC20_NAME, ERC20_SYMBOL)) as MarketplaceERC20;
        await erc20.deployed();

        const ERC1155 = await ethers.getContractFactory("MarketplaceERC1155");
        erc1155 = (await ERC1155.deploy(ERC1155_BASE_URI)) as MarketplaceERC1155;
        await erc1155.deployed();

        const MARKETPLACE = await ethers.getContractFactory("Marketplace");
        Marketplace = (await MARKETPLACE.deploy(erc1155.address, erc20.address)) as Marketplace;
        await Marketplace.deployed();

        const DAO = await ethers.getContractFactory("DAO");
        Dao = (await DAO.deploy(erc20.address, erc1155.address)) as DAO;
        await Dao.deployed();

        await erc20.mintTo(erc20amount, {
            value: ethers.utils.parseEther("100.0")
        });
        await erc20.approve(Marketplace.address, erc20amount);

        await erc20.mintTo(erc20amount, {
            value: ethers.utils.parseEther("100.0")
        });
        await erc20.approve(Dao.address, erc20amount);

        await Marketplace.createItem(id, amount, category);

        await erc1155.approve(Marketplace.address, id, amount);
        await Marketplace.listItem(id, amount, price);

        const iface = new ethers.utils.Interface(TARGET_CONTRACT_ABI);
        calldata = iface.encodeFunctionData("foo", []);
        console.log(calldata);

        await erc20.mintTo(erc20amount, {
            value: ethers.utils.parseEther("100.0")
        });
        await erc20.approve(Marketplace.address, erc20amount);
        await Marketplace.buyItem(id, amount);
    });

    describe("Deployment", async function () {
        it("Should set right tokens' addresses", async function () {
            expect(await Dao.erc20()).to.equal(erc20.address);
            expect(await Dao.erc1155()).to.equal(erc1155.address);
        });

        it("Should set right creation cost", async function () {
            expect(await Dao.CREATION_COST()).to.equal(CREATION_COST);
        });
    });

    describe("CreateVoting function", function () {
        it("Should revert if token does not exist", async function () {
            await expect(Dao.createVoting(id + 1, TargetContract.address, calldata, votingPeriod))
                .to.be.revertedWith("DAO: ERC1155 token doesn't exist");
        });

        it("Should revert if target contract is invalid", async function () {
            await expect(Dao.createVoting(id, ethers.constants.AddressZero, calldata, votingPeriod))
                .to.be.revertedWith("DAO: Invalid target contract");
        });

        it("Should revert if voting period is zero", async function () {
            await expect(Dao.createVoting(id, TargetContract.address, calldata, 0))
                .to.be.revertedWith("DAO: Cannot set zero time period");
        });

        it("Should create voting", async function () {
            expect(await Dao.createVoting(id, TargetContract.address, calldata, votingPeriod))
                .to.emit("DAO", "VotingAdded").withArgs(id, TargetContract.address, calldata, signers[0].address);
        });
    });

    describe("Vote function", async function () {
        beforeEach(async function () {
            await Dao.createVoting(id, TargetContract.address, calldata, votingPeriod);
        });

        it("Should revert if amount is zero", async function () {
            await expect(Dao.vote(id, true, 0))
                .to.be.revertedWith("DAO: Amount cannot be zero");
        });

        it("Should revert if user already voted", async function () {
            await Dao.vote(id, true, amount);
            await expect(Dao.vote(id, true, amount))
                .to.be.revertedWith("DAO: User already voted");
        });

        it("Should revert if voting period is over", async function () {
            await network.provider.send("evm_increaseTime", [votingPeriod + 1]);
            await expect(Dao.vote(id, true, amount))
                .to.be.revertedWith("DAO: Voting period is over");
        });

        it("Should update voting data", async function () {
            expect(await Dao.vote(id, true, amount))
                .to.emit("DAO", "Voted")
                .withArgs(id, true, signers[0].address);
            const voting = await Dao.votings(id);
            expect(voting.votesFor).to.equal(amount);
        });
    });

    describe("FinishVoting function", async function () {
        const initialMessage = "Nothing to Show";
        const finalMessage = "Otrar was successfully pitched";

        beforeEach(async function () {
            await Dao.createVoting(id, TargetContract.address, calldata, votingPeriod);
            await Dao.vote(id, true, amount);
        });

        it("Should revert if voting period is not over yet", async function () {
            await expect(Dao.finishVoting(id))
                .to.be.revertedWith("DAO: Voting period is not over yet");
        });

        it("Should call target contract", async function () {
            await network.provider.send("evm_increaseTime", [votingPeriod + 1]);
            expect(await TargetContract.message()).to.equal(initialMessage);
            expect(await Dao.finishVoting(id))
                .to.emit("DAO", "VotingFinished")
                .withArgs(id, true);
            expect(await TargetContract.message()).to.equal(finalMessage);
        });
    });
});