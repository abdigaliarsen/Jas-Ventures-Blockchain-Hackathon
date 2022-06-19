import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SolidButton from "../buttons/solid-button";

import TokensCard from "../cards/token-card";
import { erc1155Interact, erc20Interact } from "../web3/smartcontracts";

import "./token.sass";

const Tokens = ({ setInProfile }) => {
    const [erc1155tokens, setErc1155tokens] = useState([]);
    const [erc20tokens, setErc20tokens] = useState(0);
    // const user = { account: "0xEEe0b9aDd54368E311634a03ace296fb13E64157" };

    const user = JSON.parse(localStorage.getItem("userAccount"));

    useEffect(() => {
        setInProfile(false);

        erc20Interact().then(async (token) => {
            // console.log(token.methods);
            const balance = await (
                await token.methods.balanceOf(user.account)
            ).call();
            setErc20tokens(balance);
        });

        erc1155Interact().then(async (token) => {
            let ts = [];
            token
                .getPastEvents("TransferSingle", {
                    filter: { to: user.account },
                    fromBlock: 0,
                    toBlock: "latest",
                })
                .then((events) => {
                    events.forEach((ev) => {
                        ts.push({
                            id: ev.returnValues.id,
                            value: ev.returnValues.value,
                        });
                    });

                    setErc1155tokens([...ts]);
                });
        });
    }, []);

    return (
        <div className="tokens">
            <h2 className="tokens-header">{erc20tokens} otc left</h2>
            <Link to="/tokens/purchase" style={{ textDecoration: "none" }}>
                <div className="tokens-button">
                    <SolidButton text="create +" />
                </div>
            </Link>
            <div className="tokens-container">
                {erc1155tokens.map((token) => {
                    return (
                        <TokensCard
                            name="token name"
                            id={token.id}
                            number={token.value}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Tokens;
