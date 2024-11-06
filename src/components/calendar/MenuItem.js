import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MenuItem.css";

const MenuItem = ({ icon, content, onClick }) => {
    return (
        <div className="MenuItem" onClick={onClick}>
            <FontAwesomeIcon icon={icon} style={{ color: "gray" }} />
            {content}
        </div>
    );
};

export default MenuItem;