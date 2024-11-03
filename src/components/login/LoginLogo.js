import React from "react";
import "./LoginLogo.css";
import diaryLogo from "../../images/img_diary_logo.png";

const LoginLogo = () => {
    return (
        <div className="LoginLogo">
            <img alt="DIARY" src={diaryLogo} />
            <div className="logo_text">로그인</div>
        </div>
    );
};

export default React.memo(LoginLogo);