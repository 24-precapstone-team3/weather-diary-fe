import "./UserProfile.css";
import imgDefaultProfile from "../../images/img_default_profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons, menuItems } from "../../utils";
import useAuthUser from "../../hooks/useAuthUser";
import Button from "../common/Button";
import LoginModal from "../login/LoginModal";
import LoginContent from "../login/LoginContent";
import { useState } from "react";
import MenuItem from "./MenuItem";

const UserProfile = () => {
    const { currentUser } = useAuthUser();
    const [showLogin, setShowLogin] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="UserProfile">
            {showLogin && (
                <LoginModal onClose={() => setShowLogin(false)}>
                <LoginContent onClose={() => setShowLogin(false)} />
                </LoginModal>
            )}
            {currentUser ? (
                <>
                    <img src={imgDefaultProfile} alt="PROFILE" />
                    <div className="content_section">
                        <div className="nickname_wrapper">
                            {"마음의 날씨"}
                        </div>
                        <div className="menu_wrapper">
                            <FontAwesomeIcon
                                icon={icons.faAngleDown}
                                style={{ color: "gray", cursor: "pointer" }}
                                onClick={() => setShowMenu((prev) => !prev)}
                            />
                            {showMenu && (
                                <div className="dropdown_menu">
                                    {menuItems.map((it, idx) => (
                                        <MenuItem key={idx} {...it} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <Button text={"Login"} onClick={() => setShowLogin(true)}/>
            )}
        </div>
    );
};

export default UserProfile;