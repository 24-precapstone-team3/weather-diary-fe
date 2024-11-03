import "./LoginSublogo.css";
import diarySublogo from "../../images/img_diary_sublogo.png";

const LoginSublogo = () => {
    return (
        <div className="LoginSublogo">
            <img alt="DIARY" src={diarySublogo} />
            <div className="sublogo_text">마음의 날씨</div>
        </div>
    );
};

export default LoginSublogo;