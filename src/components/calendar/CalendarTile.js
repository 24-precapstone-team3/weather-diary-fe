import { useNavigate } from "react-router-dom";
import "./CalendarTile.css";
import { useContext } from "react";
import { TagStateContext } from "../../contexts/TagContext";

const CalendarTile = ({ date, isWeekend, isToday, diary }) => {
    const tags = useContext(TagStateContext);
    const navigate = useNavigate();

    const handleCalendarTileClick = () => {
        diary ? navigate(`/diary/${diary.diary_id}`, { state: { diary } }) :
        navigate("/new", { state: { date } })
    };

    return (
        <div
            className={[
                "CalendarTile",
                `CalendarTile_${isWeekend ? "weekend" : "weekdays"}`,
                `CalendarTile_${isToday ? "today" : ""}`].join(" ")
            }
            {...(date && { onClick: handleCalendarTileClick })}
        >
            <div className="date_wrapper">{date ? date.getDate() : ""}</div>
            {diary && tags[diary.diary_id] && (
                <div className="tag_wrapper">
                    {tags[diary.diary_id].map((tag, idx) => (
                        <div key={idx} className="tag">#{tag}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CalendarTile;