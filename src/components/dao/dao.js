import { useEffect, useState } from "react";

import "./dao-sass/dao.sass";

import DaoInfo from "./dao-comp/dao-info";
import DaoRequest from "./dao-comp/dao-request";
import { useParams } from "react-router-dom";
import { erc1155Interact } from "../web3/smartcontracts";

const Dao = () => {
    const [isVoting, setIsVoting] = useState(false);
    const [erc1155token, setErc1155token] = useState({});

    let { tokenid } = useParams();

    useEffect(() => {
        erc1155Interact().then(async (token) => {
            token.getPastEvents("TransferSingle", {
                filter: { id: tokenid },
                fromBlock: 0,
                toBlock: 'latest'
            }, async (error, events) => {
                const name = await ((await token.methods.categories(tokenid)).call());
                let tkn = {
                    name: name
                };
                setErc1155token(tkn);
                console.log(events);
                console.log(token);
            });
        });
    }, []);

    return (
        <div className="dao">
            <DaoInfo name={erc1155token.name} />
            <DaoRequest isVoting={isVoting} />
        </div>
    );
};

export default Dao;
