import { useState } from "react";

import "./dao-sass/dao.sass";

import DaoInfo from "./dao-comp/dao-info";
import DaoRequest from "./dao-comp/dao-request";

const Dao = () => {
    const [isVoting, setIsVoting] = useState(false);

    return (
        <div className="dao">
            <DaoInfo />
            <DaoRequest isVoting={isVoting} />
        </div>
    );
};

export default Dao;
