import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./buttons.sass";

const SolidButton = ({ text, icon, size, inMarketplace, action }) => {
    return (
        <button
            className={`solid-button ${size ? size : ""}`}
            style={{ marginRight: `${inMarketplace ? "2rem" : ""}` }}
            onClick={action}
        >
            {text} {icon && <FontAwesomeIcon icon={icon} />}
        </button>
    );
};

export default SolidButton;
