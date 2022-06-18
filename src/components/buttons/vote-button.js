import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./buttons.sass";

const VoteButton = ({ text, icon, size, side, action }) => {
    return (
        <button
            onClick={action}
            className={`lined-button ${size ? size : ""} ${
                side ? side : ""
            }-button`}
        >
            {text} {icon && <FontAwesomeIcon icon={icon} />}
        </button>
    );
};

export default VoteButton;
