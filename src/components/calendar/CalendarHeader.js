import "./CalendarHeader.css";
import diarySublogo from "../../images/img_diary_sublogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../utils";
import UserProfile from "./UserProfile";

const CalendarHeader = () => {
    return (
        <div className="CalendarHeader">
            <div className="left_section">
                <img src={diarySublogo} alt="DIARY" />
                <div className="sublogo_text">마음의 날씨</div>
                <div className="search_wrapper">
                    <FontAwesomeIcon icon={icons.faMagnifyingGlass} style={{ color: "gray"}}/>
                    <input type="text"></input>
                </div>
            </div>
            <div className="right_section">
                <div className="weather_wrapper">
                    대체로 청명함
                </div>
                <UserProfile />
            </div>
        </div>
    );
};

export default CalendarHeader;