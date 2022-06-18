import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./buttons.sass";

const GreenButton = ({ text, icon, size, side, action, submitButton }) => {
    return (
        <button
            type={`${submitButton ? "submit" : ""}`}
            onClick={action}
            className={`solid-button green-button ${size ? size : ""} ${
                side ? side : ""
            }-button ${submitButton ? "small-size-button" : ""}`}
        >
            {text} {icon && <FontAwesomeIcon icon={icon} />}
        </button>
    );
};

export default GreenButton;
