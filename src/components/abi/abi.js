import GreenButton from "../buttons/green-button";

import "./abi.sass";

const Abi = () => {
    return (
        <div className="abi">
            <h2 className="abi-header">Enter ABI</h2>
            <textarea
                placeholder={`
                [
                    {
                      inputs: [{ internalType: "uint256", name: "data", type:"uint256" }],
                      name: "dumb",
                      outputs: [],
                      stateMutability: "nonpayable",
                      type: "function",
                    },
                ]
                `}
                name=""
                id=""
                cols="30"
                rows="10"
                className="abi-textarea"
            ></textarea>
            <div className="abi-container">
                <GreenButton text="Enter >" />
            </div>
        </div>
    );
};

export default Abi;
