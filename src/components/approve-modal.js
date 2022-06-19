import ReactDOM from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import SolidButton from "./buttons/solid-button";

const ApproveModal = ({ isModal, sideModal, closeModal }) => {
    if (!isModal) return null;

    return ReactDOM.createPortal(
        <div className="dao-modal" style={{ top: "50%" }}>
            <h2 className="dao-modal__header">Do you approve?</h2>
            <SolidButton
                text="confirm"
                icon={faCircleCheck}
                action={closeModal}
            />
        </div>,
        document.getElementById("portal")
    );
};

export default ApproveModal;
