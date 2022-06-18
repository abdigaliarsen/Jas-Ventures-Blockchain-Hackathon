import { Link } from "react-router-dom";

import SolidButton from "../buttons/solid-button";

import bg from "../header/header-img/bg.jpg";

import "./landing.sass";
import "./cube.css";

const Landing = () => {
    return (
        <div className="landing">
            <img src={bg} className="landing-img" />

            <div id="container" className="cube-1">
                <div id="cube" class="animate">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <div id="container" className="cube-2">
                <div id="cube" class="animate">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

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
