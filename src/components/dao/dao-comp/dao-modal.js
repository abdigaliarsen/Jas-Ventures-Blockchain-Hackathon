import ReactDOM from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import SolidButton from "../../buttons/solid-button";

const DaoModal = ({ isModal, sideModal, closeModal }) => {
    if (!isModal) return null;

    return ReactDOM.createPortal(
        <div className="dao-modal">
            <h2 className="dao-modal__header">
                Voting {sideModal ? "for" : "against"}
            </h2>
            <div className="dao-modal__number">
                <div className="dao-modal__number_icon">
                    {sideModal ? (
                        <FontAwesomeIcon
                            icon={faCheck}
                            className="dao-modal__number_icon_main icon-for"
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faX}
                            className="dao-modal__number_icon_main icon-against"
                        />
                    )}
                </div>
                <div className="dao-modal__number_main">12398237</div>
                <div className="dao-modal__number_text">tokens</div>
            </div>
            <SolidButton
                text="confirm"
                icon={faCircleCheck}
                action={closeModal}
            />
        </div>,
        document.getElementById("portal")
    );
};

export default DaoModal;
