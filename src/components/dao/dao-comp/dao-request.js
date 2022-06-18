import { useState } from "react";

import {
    faArrowUpRightFromSquare,
    faThumbsUp,
    faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

import DaoModal from "./dao-modal";

import LinedButton from "../../buttons/lined-button";
import VoteButton from "../../buttons/vote-button";

const DaoRequest = ({ isVoting }) => {
    const [isModal, setIsModal] = useState(false);
    const [sideModal, setSideModal] = useState(true);

    const changeModal = ({ side }) => {
        setIsModal(true);

        // true -> for, false -> against
        setSideModal(side);
    };

    return (
        <div className="dao-request">
            <h2 className="dao-request__header">Pending requests</h2>
            <div className="dao-request__container">
                <h3 className="dao-request__container_header">
                    Should otrar aquire Google?
                </h3>
                {isVoting ? (
                    <div className="dao-request__voting">
                        <div className="dao-request__timer">Finished</div>
                        <div className="dao-request__result">
                            <div className="dao-request__result_for"></div>
                            <div className="dao-request__result_against"></div>
                        </div>
                    </div>
                ) : (
                    <div className="dao-request__voting">
                        <div className="dao-request__timer">1day 00:00</div>
                        <div className="dao-request__result">
                            <div className="dao-request__result_for"></div>
                            <div className="dao-request__result_against"></div>
                        </div>
                        <div className="dao-request__voting_buttons">
                            <VoteButton
                                text="Vote for"
                                icon={faThumbsUp}
                                side="for"
                                action={() => changeModal({ side: true })}
                            />
                            <VoteButton
                                text="Vote against"
                                icon={faThumbsDown}
                                side="against"
                                action={() => changeModal({ side: false })}
                            />
                        </div>

                        <DaoModal
                            isModal={isModal}
                            sideModal={sideModal}
                            closeModal={() => setIsModal(false)}
                        />
                    </div>
                )}
                <LinedButton text="Result" icon={faArrowUpRightFromSquare} />
                <div className="dao-request__influence">
                    Local Influence Rate: 0.20
                </div>
            </div>
        </div>
    );
};

export default DaoRequest;
