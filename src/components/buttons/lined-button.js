import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./buttons.sass";

const LinedButton = ({ text, icon, size, action }) => {
    return (
        <button className={`lined-button ${size ? size : ""}`} onClick={action}>
            {text} {icon && <FontAwesomeIcon icon={icon} />}
        </button>
    );
};

export default LinedButton;
