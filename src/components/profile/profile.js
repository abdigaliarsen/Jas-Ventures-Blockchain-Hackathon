import { useEffect } from "react";

import { Link } from "react-router-dom";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

import "./profile.sass";

import SolidButton from "../buttons/solid-button";
import LinedButton from "../buttons/lined-button";
import ProfileCard from "../cards/profile-card";

const Profile = ({ setInProfile, setInMarketplace }) => {
    useEffect(() => {
        setInProfile(true);
        setInMarketplace(false);
    }, []);

    const userImage = "";
    const userAddress = "0xc7bfd2be302af0782";
    const userInfluence = 0.002;
    const userTokenNumber = 12.3;

    return (
        <div className="profile">
            <div className="profile-info">
                <div className="profile-img__container">
                    {/* <img src={img} alt="profile img" className="profile-img" /> */}
                </div>
                <div className="profile-address">{userAddress}</div>
                <div className="profile-influence">
                    <div className="profile-influence__text">
                        Global influence
                    </div>
                    <div className="profile-influence__number">
                        {userInfluence}
                    </div>
                </div>
                <SolidButton text="place voting +" />
                <div className="profile-tokens">
                    <Link to="/tokens">
                        <LinedButton text="my tokens" icon={faCoins} />
                    </Link>
                    <div className="profile-tokens__number">
                        {userTokenNumber} otc
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
