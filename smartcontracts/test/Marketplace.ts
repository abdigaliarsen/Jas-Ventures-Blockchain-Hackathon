import { ethers } from "hardhat";
import { expect } from "chai";
import { Marketplace, MarketplaceERC1155, MarketplaceERC20 } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

describe("Marketplace", function () {
    const ERC20_NAME = "TEST";
    const ERC20_SYMBOL = "TST";
    const ERC1155_BASE_URI = "https://example.com";
    const FEE_PERCENTAGE = 1;
    const CREATION_COST = 100;

    let signers: Array<SignerWithAddress>;

    let Marketplace: Marketplace;
    let erc20: MarketplaceERC20;
    let erc1155: MarketplaceERC1155;

    beforeEach(async function () {
        signers = await ethers.getSigners();

        const ERC20 = await ethers.getContractFactory("MarketplaceERC20");
        erc20 = (await ERC20.deploy(ERC20_NAME, ERC20_SYMBOL)) as MarketplaceERC20;
        await erc20.deployed();

        const ERC1155 = await ethers.getContractFactory("MarketplaceERC1155");
        erc1155 = (await ERC1155.deploy(ERC1155_BASE_URI)) as MarketplaceERC1155;
        await erc1155.deployed();

        const MARKETPLACE = await ethers.getContractFactory("Marketplace");
        Marketplace = (await MARKETPLACE.deploy(erc1155.address, erc20.address)) as Marketplace;
        await Marketplace.deployed();
    });

    describe("Deployment", function () {
        it("Should set right tokens' addresses", async function () {
            expect(await Marketplace.erc20()).to.equal(erc20.address);
            expect(await Marketplace.erc1155()).to.equal(erc1155.address);
        });

        it("Should set right fee percentage", async function () {
            expect(await Marketplace.FEE_PERCENTAGE()).to.equal(FEE_PERCENTAGE);
        });

        it("Should set right creation cost", async function () {
            expect(await Marketplace.CREATION_COST()).to.equal(CREATION_COST);
        });
    });

    describe("CreateItem function", function () {
        const id = 1;
        const amount = 5;
        const erc20amount = 100;
        const category = "real estate";

        it("Should revert if erc1155 already exists", async function () {
            await erc20.mintTo(erc20amount, {
                value: ethers.utils.parseEther("100.0")
            });
            await erc20.approve(Marketplace.address, erc20amount);

            await Marketplace.createItem(id, amount, category);
            await expect(Marketplace.createItem(id, amount, category))
                .to.be.revertedWith("Marketplace: Token with such id already exists");
        });

        it("Should revert if not enough erc20 tokens", async function () {
            await expect(Marketplace.createItem(id, amount, category))
                .to.be.revertedWith("Marketplace: Not enough balance to buy erc1155");
        });

        it("Should revert if amount is zero", async function () {
            await erc20.mintTo(erc20amount, {
                value: ethers.utils.parseEther("100.0")
            });
            await erc20.approve(Marketplace.address, erc20amount);

            await expect(Marketplace.createItem(id, ethers.constants.Zero, category))
                .to.be.revertedWith("Marketplace: Cannot create zero tokens");
        });

        it("Should buy erc1155 tokens", async function () {
            await erc20.mintTo(erc20amount, {
                value: ethers.utils.parseEther("100.0")
            });
            await erc20.approve(Marketplace.address, erc20amount);

            expect(await Marketplace.createItem(id, amount, category))
                .to.emit("Marketplace", "ItemCreated")
                .withArgs(id, amount, signers[0].address);
            expect(await Marketplace.creators(id)).to.equal(signers[0].address);
        });
    });

    describe("ListItem function", function () {
        const id = 1;
        const amount = 5;
        const erc20amount = 100;
        const category = "real estate";
        const price = 10;

        beforeEach(async function () {
            await erc20.mintTo(erc20amount, {
                value: ethers.utils.parseEther("100.0")
            });
            await erc20.approve(Marketplace.address, erc20amount);
            await Marketplace.createItem(id, amount, category);
        });

        it("Should revert if not owner tries to list the token", async function () {
            await expect(Marketplace.connect(signers[1]).listItem(id, amount, price))
                .to.be.revertedWith("Marketplace: Only token owner may list the token");
        })

        it("Should revert if token is already listed", async function () {
            await erc1155.approve(Marketplace.address, id, amount);
            await Marketplace.listItem(id, amount, price);
            await expect(Marketplace.listItem(id, amount, price))
                .to.be.revertedWith("Marketplace: Token is already listed");
        });

        it("Should revert if price is zero", async function () {
            await expect(Marketplace.listItem(id, amount, ethers.constants.Zero))
                .to.be.revertedWith("Marketplace: Price cannot be zero");
        });

        it("Should list the token", async function () {
            await erc1155.approve(Marketplace.address, id, amount);
            expect(await Marketplace.listItem(id, amount, price))
                .to.emit("Marketplace", "ItemListed")
                .withArgs(id, amount, price, signers[0].address);
            expect(await Marketplace.prices(id)).to.equal(price);
            expect(await Marketplace.isListed(id)).to.equal(true);
        });
    });

    describe("CancelListing function", function () {
        const id = 1;
        const amount = 5;
        const erc20amount = 100;
        const category = "real estate";
        const price = 10;

        beforeEach(async function () {
            await erc20.mintTo(erc20amount, {
                value: ethers.utils.parseEther("100.0")
            });

            await erc20.approve(Marketplace.address, erc20amount);
            await Marketplace.createItem(id, amount, category);

            await erc1155.approve(Marketplace.address, id, amount);
            await Marketplace.listItem(id, amount, price);
        });

        it("Should revert if not owner cancels the listing", async function () {
            await expect(Marketplace.connect(signers[1]).cancelListing(id, amount))
                .to.be.revertedWith("Marketplace: Only owner may cancel listing");
        });

        it("Should revert if item listing is already canceled", async function () {
            await Marketplace.cancelListing(id, amount);
            await expect(Marketplace.cancelListing(id, amount))
                .to.be.revertedWith("Marketplace: Token is not listed");
        });

        it("Should revert if amount is too big", async function () {
            await expect(Marketplace.cancelListing(id, amount + 1))
                .to.be.revertedWith("Marketplace: Too huge amount to cancel");
        });

        it("Should cancel listing", async function () {
            expect(await Marketplace.cancelListing(id, amount))
                .to.emit("Marketplace", "ListingCanceled")
                .withArgs(id, signers[0].address);
        });
    });

    describe("BuyItem function", function () {
        const id = 1;
        const amount = 5;
        const erc20amount = 100;
        const category = "real estate";
        const price = 10;

        beforeEach(async function () {
            await erc20.mintTo(erc20amount, {
                value: ethers.utils.parseEther("100.0")
            });

            await erc20.approve(Marketplace.address, erc20amount);
            await Marketplace.createItem(id, amount, category);

            await erc1155.approve(Marketplace.address, id, amount);
            await Marketplace.listItem(id, amount, price);
        });

        it("Should revert if amount is too huge", async function () {
            await expect(Marketplace.buyItem(id, amount + 1))
                .to.be.revertedWith("Marketplace: Too huge amount to buy");
        });

        it("Should revert if token is not listed", async function () {
            await Marketplace.cancelListing(id, amount);
            await expect(Marketplace.buyItem(id, amount))
                .to.be.revertedWith("Marketplace: Token is not listed");
        });

        it("Should revert if not enough erc20 tokens", async function () {
            await expect(Marketplace.connect(signers[1]).buyItem(id, amount))
                .to.be.revertedWith("Marketplace: Not enough erc20 tokens to buy item");
        });

        it("Should buy token", async function () {
            await erc20.connect(signers[1]).mintTo(erc20amount, {
                value: ethers.utils.parseEther("100.0")
            });

            await erc20.connect(signers[1]).approve(Marketplace.address, erc20amount);

            expect(await Marketplace.connect(signers[1]).buyItem(id, amount))
                .to.emit("Marketplace", "ItemBought")
                .withArgs(id, amount, price, signers[0].address, signers[1].address);
            expect(await Marketplace.creators(id)).to.equal(signers[1].address);
            expect(await Marketplace.isListed(id)).to.equal(false);
        });
    });

    describe("Withdraw function", function () {
        const id = 1;
        const amount = 5;
        const erc20amount = 100;
        const category = "real estate";
        const price = 10;

        beforeEach(async function () {
            await erc20.mintTo(erc20amount, {
                value: ethers.utils.parseEther("100.0")
            });

            await erc20.approve(Marketplace.address, erc20amount);
            await Marketplace.createItem(id, amount, category);

            await erc1155.approve(Marketplace.address, id, amount);
            await Marketplace.listItem(id, amount, price);
            
            await erc20.connect(signers[1]).mintTo(200, {
                value: ethers.utils.parseEther("200.0")
            });
            await erc20.connect(signers[1]).approve(Marketplace.address, erc20amount);
            await Marketplace.connect(signers[1]).buyItem(id, amount);
        });

        it("Should send erc20 tokens to contract's owner", async function () {
            expect(await Marketplace.withdraw()).to.emit("Marketplace", "Withdrawn");
        });

        it("Should revert if not owner tries to withdraw", async function () {
            await expect(Marketplace.connect(signers[1]).withdraw())
                .to.be.reverted;
        })
    });
});