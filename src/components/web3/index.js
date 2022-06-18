import Web3 from 'web3/dist/web3.min.js'

export function detectCurrentProvider() {
    let provider;
    if (window.ethereum)
        provider = window.ethereum;
    else if (window.web3)
        provider = window.web3.currentProvider;
    else
        console.log("Non-Ethereum based browser found. You should consider installing metamask cryptowallet.");
    return provider;
}

export async function onConnect() {
    try {
        const currentProvider = detectCurrentProvider();
        if (currentProvider) {
            if (currentProvider !== window.ethereum)
                console.log("Non-Ethereum based browser found. You should consider installing metamask cryptowallet.");
        }

        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);

        const accounts = await web3.eth.getAccounts();
        const chainId = await web3.eth.getChainId();
        const account = await accounts[0];

        let ethBalance = await web3.eth.getBalance(account);
        ethBalance = web3.utils.fromWei(ethBalance, 'ether');

        console.log({
            account: account,
            balance: ethBalance,
            chainId: chainId
        });
        if (accounts.length === 0)
            console.log("Please connect to metamask");
    } catch (error) {
        console.log(
            'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.'
        );
    }
}