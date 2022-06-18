import {
    faWallet,
    faUser,
    faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import SolidButton from "../buttons/solid-button";
import LinedButton from "../buttons/lined-button";

import Logo from "./header-img/logo.png";

import "./header.sass";

const Header = ({ login, connected, inMarketplace, inProfile }) => {
    const pathname = window.location.pathname;
    return (
        <header
            className="header"
            style={
                pathname === "/"
                    ? { borderBottom: "none" }
                    : { borderBottom: "1px solid #121515" }
            }
        >
            <div className="header-container">
                <Link to="/">
                    <div className="header-logo">
                        <img
                            src={Logo}
                            alt="logo"
                            className="header-logo-img"
                        />
                    </div>
                </Link>
                {connected ? (
                    <div className="header-condition">
                        {inMarketplace && (
                            <div className="header-inmarket">
                                <Link to="/vote">
                                    <SolidButton
                                        text="place voting +"
                                        inMarketplace={inMarketplace}
                                    />
                                </Link>
                                <Link to="/profile">
                                    <LinedButton text="profile" icon={faUser} />
                                </Link>
                            </div>
                        )}
                        {inProfile && (
                            <div className="header-inmarket">
                                <LinedButton
                                    text="disconnect"
                                    icon={faArrowRightFromBracket}
                                />
                            </div>
                        )}

                        {!inMarketplace && !inProfile && (
                            <div className="header-inmarket">
                                <Link to="/profile">
                                    <LinedButton text="profile" icon={faUser} />
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <SolidButton
                        action={async () => await login()}
                        text="connect wallet"
                        icon={faWallet}
                    />
                )}
            </div>
        </header>
    );
};

export default Header;
