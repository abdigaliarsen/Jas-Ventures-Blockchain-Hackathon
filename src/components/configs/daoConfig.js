export const CONTACT_ADDRESS_dao = "0x0618F347FE6A1E3E61b07bF5BbAf108fBEDE537e";

export const CONTACT_ABI_dao = [
    {
        inputs: [
            { internalType: "address", name: "_erc20", type: "address" },
            { internalType: "address", name: "_erc1155", type: "address" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "votedFor",
                type: "bool",
            },
            {
                indexed: false,
                internalType: "address",
                name: "voter",
                type: "address",
            },
        ],
        name: "Voted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "targetContract",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "address",
                name: "chairman",
                type: "address",
            },
        ],
        name: "VotingAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            { indexed: false, internalType: "bool", name: "won", type: "bool" },
        ],
        name: "VotingFinished",
        type: "event",
    },
    {
        inputs: [],
        name: "CREATION_COST",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "_tokenId", type: "uint256" },
            {
                internalType: "address",
                name: "_targetContract",
                type: "address",
            },
            { internalType: "bytes", name: "_signature", type: "bytes" },
            { internalType: "uint256", name: "_votingPeriod", type: "uint256" },
        ],
        name: "createVoting",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "erc1155",
        outputs: [
            {
                internalType: "contract MarketplaceERC1155",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "erc20",
        outputs: [
            {
                internalType: "contract MarketplaceERC20",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "_tokenId", type: "uint256" },
        ],
        name: "finishVoting",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "tokenUsed",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "_tokenId", type: "uint256" },
            { internalType: "bool", name: "_voteFor", type: "bool" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
        ],
        name: "vote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "", type: "uint256" },
            { internalType: "address", name: "", type: "address" },
        ],
        name: "voters",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "votings",
        outputs: [
            { internalType: "address", name: "chairman", type: "address" },
            {
                internalType: "address",
                name: "targetContract",
                type: "address",
            },
            { internalType: "bytes", name: "signature", type: "bytes" },
            { internalType: "uint256", name: "votesFor", type: "uint256" },
            { internalType: "uint256", name: "votesAgainst", type: "uint256" },
            { internalType: "uint256", name: "startedTime", type: "uint256" },
            { internalType: "uint256", name: "votingPeriod", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
];
