import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MarketplaceCard from "../cards/marketplace-card";
import { erc1155Interact } from "../web3/smartcontracts";

import card1 from "./marketplace-img/1.png";
import card2 from "./marketplace-img/2.png";
import card3 from "./marketplace-img/3.png";

import "./marketplace.sass";

const Marketplace = ({ setInMarketplace, setInProfile }) => {
    const [erc1155tokens, setErc1155tokens] = useState([]);
    const [userInfluence, setUserInfluence] = useState(0);

    useEffect(() => {
        setInMarketplace(true);
        setInProfile(false);
        let ts = [];

        erc1155Interact().then(async (token) => {
            token
                .getPastEvents("TransferSingle", {
                    fromBlock: 0,
                    toBlock: "latest",
                }, async function (error, events) {
                    await events.forEach(async (ev) => {
                        const id = ev.returnValues.id;

                        const name = await ((await erc1155Interact()).methods.categories(id)).call();
                        let available = await ((await erc1155Interact()).methods.totalSupply(id)).call();
                        const totalSupply = available;

                        token.getPastEvents("TransferSingle", {
                            filter: { id: id, },
                            fromBlock: 0,
                            toBlock: "latest",
                        }, async function (error, events) {
                            await events.forEach(async (ev) => {
                                const to = ev.returnValues.to;
                                const balance = await ((await erc1155Interact()).methods.balanceOf(to, id));
                                available -= balance;
                            });
                        });

                        const card = {
                            name: name,
                            totalSupply: totalSupply,
                            available: available
                        };

                        ts.push(card);
                    });
                })
        });

        setErc1155tokens(ts);
    }, []);

    let cards = erc1155tokens.filter((_, i) => i % 2).map((token, index) => {
        return <Link to="/dao" style={{ textDecoration: "none" }}>
            <MarketplaceCard
                key={index}
                name={token.name}
                available={token.available}
                max={token.totalSupply}
                img={card1}
            />
        </Link>
    })

    return (
        <div className="marketplace">
            <div className="marketplace-header">[explore]</div>
            <div className="marketplace-container">
                {cards}
            </div>
        </div>
    );
};

export default Marketplace;
