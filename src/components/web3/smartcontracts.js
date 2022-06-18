import Web3 from "web3/dist/web3.min.js";

const TARGET_CONTRACT_ABI = require("./abi/mock-targetcontract.json").abi;
const ERC20_ABI = require("./abi/erc20.json").abi;
const ERC1155_ABI = require("./abi/erc1155.json").abi;
const MARKETPLACE_ABI = require("./abi/marketplace.json").abi;
const DAO_ABI = require("./abi/dao.json").abi;

const TARGET_CONTRACT_ADDRESS = "0x15d0D226DDB1Dff2106b0FA1519fe48C7C1cE0C7";
const ERC20_ADDRESS = "0x4A058B9111DDa22d89582C7BD32b7D4C5ee362d6";
const ERC1155_ADDRESS = "0xB3D903EdD3031449b2b9955b15A9f773AfDA53fc";
const MARKETPLACE_ADDRESS = "0x1ab14edcD75D7daE3A6fbaE8773e915A122CEB1a";
const DAO_ADDRESS = "0xf696256AccC7Ee8C0602aC45c8ec06F7aCF411fe";

export async function mockConfigInteract() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    try {
        const contactList = new web3.eth.Contract(TARGET_CONTRACT_ABI, TARGET_CONTRACT_ADDRESS);
        return contactList;
    } catch (error) {
        console.error(error);
    }
}

export async function erc20Interact() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    try {
        const contactList = new web3.eth.Contract(ERC20_ABI, ERC20_ADDRESS);
        return contactList
    } catch (error) {
        console.error(error);
    }
}

export async function erc1155Interact() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    try {
        const contactList = new web3.eth.Contract(ERC1155_ABI, ERC1155_ADDRESS);
        return contactList
    } catch (error) {
        console.error(error);
    }
}

export async function marketplaceInteract() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    try {
        const contactList = new web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE_ADDRESS);
        return contactList
    } catch (error) {
        console.error(error);
    }
}

export async function daoInteract() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    try {
        const contactList = new web3.eth.Contract(DAO_ABI, DAO_ADDRESS);
        return contactList
    } catch (error) {
        console.error(error);
    }
}
