import Web3 from "web3/dist/web3.min.js";

export async function mockConfigInteract({ CONTACT_ABI, CONTACT_ADDRESS }) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
}

export async function erc20Interact({ CONTACT_ABI, CONTACT_ADDRESS }) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
}

export async function erc1155Interact({ CONTACT_ABI, CONTACT_ADDRESS }) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
}

export async function marketplaceInteract({ CONTACT_ABI, CONTACT_ADDRESS }) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
}

export async function daoInteract({ CONTACT_ABI, CONTACT_ADDRESS }) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
    console.log(contactList.methods.createVoting());
}
