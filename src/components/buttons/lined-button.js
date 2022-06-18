import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./buttons.sass";

const LinedButton = ({ text, icon, size }) => {
    return (
        <button className={`lined-button ${size ? size : ""}`}>
            {text} {icon && <FontAwesomeIcon icon={icon} />}
        </button>
    );
};

export default LinedButton;
