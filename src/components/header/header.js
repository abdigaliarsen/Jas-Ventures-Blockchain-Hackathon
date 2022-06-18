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

import { onConnect, onDisconnect } from "../web3";

const Header = ({ login, connected, inMarketplace, inProfile, setConnected, setDisconnected }) => {
    return (
        <header className="header">
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
                                <Link to="/">
                                <LinedButton
                                    text="disconnect"
                                    icon={faArrowRightFromBracket}
                                    action={async () => {
                                        onDisconnect();
                                        setConnected(false);
                                    }}
                                />
                                </Link>
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
                    <Link to="/marketplace">
                        <SolidButton action={async () => await login() } text="connect wallet" icon={faWallet} onClick={onConnect}/>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
