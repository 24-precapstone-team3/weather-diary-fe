import React from "react";
import "./LoginModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../utils";

const LoginModal = ({ onClose, children }) => {
    return (
        <div className="LoginModal" onClick={onClose}>
            <div className="content_section" onClick={(e) => e.stopPropagation()}>
                <div className="icon_wrapper">
                    <FontAwesomeIcon
                        icon={icons.faXmark}
                        style={{ color: "black", cursor: "pointer" }}
                        onClick={onClose}
                    />
                </div>
                {children}
            </div>
        </div>
    );
};

export default LoginModal;