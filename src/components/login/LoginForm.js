import React from "react";
import "./LoginForm.css";
import Button from "../common/Button";
import { icons } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = ({ type, value, onChange, placeholder, maxLength, btnText, onSubmit }) => {
    return (
        <div className="LoginForm">
            <FontAwesomeIcon
                icon={type === "tel" ? icons.faPhone : icons.faHashtag}
                style={{ color: "lightgray" }}
            />
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
            />
            <Button text={btnText} onClick={onSubmit} />
        </div>
    )
};

export default React.memo(LoginForm);