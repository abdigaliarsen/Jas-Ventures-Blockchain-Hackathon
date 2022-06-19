import Web3 from "web3/dist/web3.min.js";

const TARGET_CONTRACT_ABI = require("./abi/mock-targetcontract.json").abi;
const ERC20_ABI = require("./abi/erc20.json").abi;
const ERC1155_ABI = require("./abi/erc1155.json").abi;
const MARKETPLACE_ABI = require("./abi/marketplace.json").abi;
const DAO_ABI = require("./abi/dao.json").abi;

const TARGET_CONTRACT_ADDRESS = "0x033F3539bEEF6878B87db21Fe26920F75A6C910f";
const ERC20_ADDRESS = "0x7fd78017A12A00f2152bF60b67Ed59a96c18A5a8";
const ERC1155_ADDRESS = "0xbb589A1c30815F8bb156B4Cf2af882F880113ef4";
const MARKETPLACE_ADDRESS = "0x74bf3634F4E28D196009EB25ACae96f9E65b4f0E";
const DAO_ADDRESS = "0x08CCC1995880A951047251D39b79C2A660aFC3c7";

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
