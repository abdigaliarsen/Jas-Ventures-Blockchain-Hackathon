import { Link } from "react-router-dom";

import SolidButton from "../buttons/solid-button";

import "./landing.sass";

const Landing = () => {
    return (
        <div className="landing">
            <h1 className="landing-header">
                Erase bounderies with new gen <br /> cross-chain NFT marketplace
            </h1>
            <Link to="/marketplace">
                <SolidButton text="enter >" size="small-button" />
            </Link>

            <footer className="footer">by aday labs. 2022</footer>
        </div>
    );
};

export default Landing;
