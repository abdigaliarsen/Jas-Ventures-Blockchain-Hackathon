import Web3 from "web3/dist/web3.min.js";

const TARGET_CONTRACT_ABI = require("./abi/mock-targetcontract.json").abi;
const ERC20_ABI = require("./abi/erc20.json").abi;
const ERC1155_ABI = require("./abi/erc1155.json").abi;
const MARKETPLACE_ABI = require("./abi/marketplace.json").abi;
const DAO_ABI = require("./abi/dao.json").abi;

const TARGET_CONTRACT_ADDRESS = "0xc88E6B6498A5BdAdd52Bed1Fc897A4ce02aabCc1";
const ERC20_ADDRESS = "0x86D4FE4926aa54B5D3C9E9Cf1E46210a0FaBe937";
const ERC1155_ADDRESS = "0xCc276a60d38165c997eB5650cF3b7F643BC935c8";
const MARKETPLACE_ADDRESS = "0xdb39EA16FD4ace62cddD2B233fA7B1a770F7a3c1";
const DAO_ADDRESS = "0xF9Ac33b7648879Cb7D98397713338b7FD85E16A4";

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
