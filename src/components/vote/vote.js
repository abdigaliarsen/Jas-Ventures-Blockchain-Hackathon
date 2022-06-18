import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faExternalLinkSquare,
    faUpload,
} from "@fortawesome/free-solid-svg-icons";

import GreenButton from "../buttons/green-button";

import "./vote.sass";

const Vote = () => {
    return (
        <div className="vote">
            <h2 className="vote-header">Place voting</h2>
            <form className="vote-form">
                <div className="vote-form__container">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Name of voting"
                        className="vote-form__input"
                    />
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="vote-form__icon"
                    />
                </div>

                <div className="vote-form__container">
                    <textarea
                        placeholder="Short description"
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        className="vote-form__textarea"
                    ></textarea>
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="vote-form__icon"
                    />
                </div>

                <select className="vote-form__select">
                    <option value="" disabled selected>
                        Choose token supply source
                    </option>
                </select>

                <Link to="/vote/abi" style={{ textDecoration: "none" }}>
                    <div className="vote-form__container">
                        <div className="vote-form__link">
                            <div className="vote-form__link_text">
                                Enter ABI
                            </div>
                            <FontAwesomeIcon
                                icon={faExternalLinkSquare}
                                className="vote-form__icon external-link-icon"
                            />
                        </div>
                    </div>
                </Link>

                <div className="vote-form__container">
                    <input
                        placeholder="Contract ID"
                        type="text"
                        name=""
                        id=""
                        className="vote-form__input"
                    />
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="vote-form__icon"
                    />
                </div>

                <div className="vote-form__container">
                    <input
                        placeholder="Placement Hours"
                        type="text"
                        name=""
                        id=""
                        className="vote-form__input"
                    />
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="vote-form__icon"
                    />
                </div>

                <div className="vote-form__container_submit">
                    <GreenButton
                        text="place"
                        icon={faUpload}
                        submitButton={true}
                    />
                </div>
            </form>
        </div>
    );
};

export default Vote;
