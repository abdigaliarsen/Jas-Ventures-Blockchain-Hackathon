import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

import profileImg from "./image.jpg";
import "./profile.sass";

import SolidButton from "../buttons/solid-button";
import LinedButton from "../buttons/lined-button";
import ProfileCard from "../cards/profile-card";

import { erc1155Interact, erc20Interact } from "../web3/smartcontracts";

const Profile = ({ setInProfile, setInMarketplace }) => {
    const [erc20tokens, setErc20tokens] = useState(0);
    const [userInfluence, setUserInfluence] = useState(0);

    useEffect(() => {
        setInProfile(true);
        setInMarketplace(false);

        erc20Interact().then(async (token) => {
            // console.log(token.methods);
            console.log(await token.methods.balanceOf(user.account));
            const balance = await (
                await token.methods.balanceOf(user.account)
            ).call();
            setErc20tokens(balance);
        });

        erc1155Interact().then(async (token) => {
            token
                .getPastEvents("TransferSingle", {
                    filter: { to: user.account },
                    fromBlock: 0,
                    toBlock: "latest",
                })
                .then((events) => {
                    events.forEach((ev) => {});
                });
        });
    }, []);

    const user = JSON.parse(localStorage.getItem("userAccount"));

    return (
        <div className="profile">
            <div className="profile-info">
                <div className="profile-img__container">
                    <img
                        src={profileImg}
                        alt="profile img"
                        className="profile-img"
                    />
                </div>
                <div className="profile-address">{user.account}</div>
                <div className="profile-influence">
                    <div className="profile-influence__text">
                        Global influence
                    </div>
                    <div className="profile-influence__number">
                        {userInfluence}
                    </div>
                </div>
                <Link to="/vote">
                    <SolidButton text="place voting +" />
                </Link>
                <div className="profile-tokens">
                    <Link to="/tokens">
                        <LinedButton text="my tokens" icon={faCoins} />
                    </Link>
                    <div className="profile-tokens__number">
                        {erc20tokens} otc
                    </div>
                </div>
            </div>
            <div className="profile-cards">
                <div className="profile-cards__header">Obtained</div>
                <div className="profile-cards__categories">
                    <div className="profile-cards__el"></div>
                    <div className="profile-cards__el profile-cards__name">
                        name
                    </div>
                    <div className="profile-cards__el profile-cards__influence">
                        Influence
                    </div>
                </div>

                <ProfileCard name="token dinosaur" influence="24.78%" />
                <ProfileCard name="token dragon" influence="Expired" />
                <ProfileCard name="token luffy" influence="24.78%" />
                <ProfileCard name="token kurama" influence="24.78%" />
            </div>
        </div>
    );
};

export default Profile;
