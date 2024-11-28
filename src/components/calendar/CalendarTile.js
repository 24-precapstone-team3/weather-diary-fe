import { useNavigate } from "react-router-dom";
import "./CalendarTile.css";
import { useContext } from "react";
import { TagStateContext } from "../../contexts/TagContext";

const CalendarTile = ({ date, isWeekend, isToday, diary }) => {
    const tags = useContext(TagStateContext);
    const diaryTags = tags.find((tag) => tag.id === diary?.diary_id)?.tags || []; // id와 일치하는 태그 필터링
    const tagColor = ["#fcc3cc", "#dbbefc", "#52acff"];
    const navigate = useNavigate();

    const handleCalendarTileClick = () => {
        diary ? navigate(`/diary/${diary.diary_id}`, { state: { diary, diaryTags } }) :
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
            {diary && diaryTags.length > 0 && (
                <div className="tag_wrapper">
                    {diaryTags.map((tag, idx) => (
                        <div key={idx} className="tag" style={{ backgroundColor: `${tagColor[idx]}`}}>{tag}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CalendarTile;