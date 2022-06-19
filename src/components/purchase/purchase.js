import { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faUpload } from "@fortawesome/free-solid-svg-icons";

import GreenButton from "../buttons/green-button";
import ApproveModal from "../approve-modal";

import { erc20Interact, marketplaceInteract } from "../web3/smartcontracts";

import "./purchase.sass";

const Purchase = () => {
    const [erc20tokens, setErc20tokens] = useState(0);
    const [cost, setCost] = useState(0);

    const nameRef = useRef(null);
    const supplyRef = useRef(null);
    const otcRef = useRef(null);

    const user = JSON.parse(localStorage.getItem("userAccount"));

    const [isModal, setIsModal] = useState(false);

    useEffect(() => {
        marketplaceInteract().then(async (token) => {
            const cost = await (await token.methods.CREATION_COST()).call();
            setCost(cost);
        });

        erc20Interact().then(async (token) => {
            // console.log(token.methods);
            const balance = await (
                await token.methods.balanceOf(user.account)
            ).call();
            setErc20tokens(balance);
        });
    }, []);

    const changeModal = (e) => {
        e.preventDefault();

        setIsModal(true);
    };

    const approved = () => {
        setIsModal(false);

        erc20Interact().then(async (token) => {
            await token.methods
                .approve("0x74bf3634F4E28D196009EB25ACae96f9E65b4f0E", cost)
                .send({ from: user.account })
                .then(() => {
                    createToken();
                });
        });
    };

    const createToken = async () => {
        marketplaceInteract().then(async (token) => {
            await (
                await token.methods.createItem(
                    // change
                    Math.floor(Math.random() * 1000000 + 1),
                    supplyRef.current.value,
                    nameRef.current.value
                )
            ).send({ from: user.account });
        });
    };

    return (
        <div className="purchase">
            {isModal && (
                <ApproveModal isModal={isModal} closeModal={approved} />
            )}
            <div className="purchase-header">{erc20tokens} otc left</div>
            <form className="vote-form" onSubmit={changeModal}>
                <div className="vote-form__container">
                    <input
                        ref={nameRef}
                        type="text"
                        name="name"
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
                        ref={supplyRef}
                        type="text"
                        name="supply"
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
                        ref={otcRef}
                        type="text"
                        name="otc"
                        id=""
                        placeholder="Amount of OTC"
                        className="vote-form__input"
                    />
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="vote-form__icon"
                    />
                </div>

                {/* <Link to="/profile" style={{ textDecoration: "none" }}> */}
                <div className="vote-form__container_submit">
                    <GreenButton
                        text="place"
                        icon={faUpload}
                        submitButton={true}
                        action={changeModal}
                    />
                </div>
                {/* </Link> */}
            </form>
        </div>
    );
};

export default Purchase;
