import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import GreenButton from "../buttons/green-button";

import "./abi.sass";

const Abi = ({ setAbiValue }) => {
    const navigate = useNavigate();

    const changeAbiValue = (e) => {
        localStorage.setItem("abi", JSON.stringify(e.target.value));
    };

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
                onChange={changeAbiValue}
            ></textarea>
            <div className="abi-container">
                <GreenButton text="Enter >" action={() => navigate(-1)} />
            </div>
        </div>
    );
};

export default Abi;
