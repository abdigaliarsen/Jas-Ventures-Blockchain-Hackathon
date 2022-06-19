import { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faExternalLinkSquare,
    faUpload,
    faCoins,
} from "@fortawesome/free-solid-svg-icons";

import GreenButton from "../buttons/green-button";
import SolidButton from "../buttons/solid-button";

import {
    erc1155Interact,
    erc20Interact,
    marketplaceInteract,
    daoInteract,
} from "../web3/smartcontracts";

import { hashFromAbi } from "../web3";

import ApproveModal from "../approve-modal";

import "./vote.sass";

const Vote = ({ setInProfile, abiRef }) => {
    const [erc1155tokens, setErc1155tokens] = useState([]);
    const [numberOfTokens, setNumberOfTokens] = useState(0);
    const [isModal, setIsModal] = useState(false);
    const [cost, setCost] = useState(0);
    const [abiEncoded, setAbiEncoded] = useState();

    console.log(abiRef);

    // abiRef && Web3.eth.abi.encodeFunctionSignature(abiRef.current.value)

    // useEffect(() => {
    //     console.log(abiRef);
    // }, [abiRef]);

    // if (abiRef && abiRef.current) {
    // setAbiEncoded();
    // }

    const tokenIdRef = useRef(null);
    const contractIdRef = useRef(null);
    const timeRef = useRef(null);
    const otcRef = useRef(null);

    const user = JSON.parse(localStorage.getItem("userAccount"));

    useEffect(() => {
        setInProfile(false);

        erc1155Interact().then(async (token) => {
            let ts = [];
            token
                .getPastEvents("TransferSingle", {
                    filter: { to: user.account },
                    fromBlock: 0,
                    toBlock: "latest",
                })
                .then((events) => {
                    events.forEach((ev) => {
                        ts.push({
                            id: ev.returnValues.id,
                            value: ev.returnValues.value,
                        });
                    });

                    setErc1155tokens([...ts]);
                    setNumberOfTokens(ts.length);
                });
        });

        marketplaceInteract().then(async (token) => {
            const cost = await (await token.methods.CREATION_COST()).call();
            setCost(cost);
        });
    }, []);

    const changeModal = (e) => {
        e.preventDefault();

        setIsModal(true);
    };

    const approved = () => {
        setIsModal(false);

        console.log(abiEncoded);

        // console.log(hashFromAbi(abiRef.current.value));

        // erc20Interact().then(async (token) => {
        //     await token.methods
        //         .approve("0x74bf3634F4E28D196009EB25ACae96f9E65b4f0E", cost)
        //         .send({ from: user.account })
        //         .then(() => {
        //             createToken();
        //         });
        // });
    };

    const createToken = async () => {
        console.log("Hello");
        daoInteract().then(async (token) => {
            await (
                await token.methods.createVoting(
                    tokenIdRef.current.value,
                    contractIdRef.current.value,
                    hashFromAbi(abiRef.current.value)
                )
            ).send({ from: user.account });
        });
    };

    // if (!numberOfTokens) {
    //     return (
    //         <div className="no-tokens">
    //             <h2 className="no-tokens-header">
    //                 You haven't purchased tokens to supply from please create
    //                 the packet first
    //             </h2>
    //             <Link to="/tokens">
    //                 <SolidButton text="my tokens" icon={faCoins} />
    //             </Link>
    //         </div>
    //     );
    // }

    return (
        <div className="vote">
            {isModal && (
                <ApproveModal isModal={isModal} closeModal={approved} />
            )}
            <h2 className="vote-header">Place voting</h2>
            <form className="vote-form" onSubmit={changeModal}>
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

                <select className="vote-form__select" ref={tokenIdRef}>
                    <option value="" disabled selected>
                        Choose token supply source
                    </option>
                    {erc1155tokens.map((erc) => (
                        <option value={erc.id}>{erc.id}</option>
                    ))}
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
                        ref={contractIdRef}
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
                        ref={timeRef}
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
                        action={changeModal}
                    />
                </div>
            </form>
        </div>
    );
};

export default Vote;
