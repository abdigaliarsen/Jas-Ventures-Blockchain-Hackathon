import "./purchase.sass";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faUpload } from "@fortawesome/free-solid-svg-icons";

import GreenButton from "../buttons/green-button";

import "./purchase.sass";

const Purchase = () => {
    return (
        <div className="purchase">
            <div className="purchase-header">12.3 otc left</div>
            <form className="vote-form">
                <div className="vote-form__container">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Name of token"
                        className="vote-form__input"
                    />
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="vote-form__icon"
                    />
                </div>
                <div className="vote-form__container">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Supply amount"
                        className="vote-form__input"
                    />
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="vote-form__icon"
                    />
                </div>
                <div className="vote-form__container">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Amount of OTC"
                        className="vote-form__input"
                    />
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="vote-form__icon"
                    />
                </div>

                <Link to="/profile" style={{ textDecoration: "none" }}>
                    <div className="vote-form__container_submit">
                        <GreenButton
                            text="place"
                            icon={faUpload}
                            submitButton={true}
                        />
                    </div>
                </Link>
            </form>
        </div>
    );
};

export default Purchase;
