import { useNavigate } from "react-router-dom";
import "./CalendarTile.css";

const CalendarTile = ({ date, isWeekend, isToday }) => {
    const navigate = useNavigate();
    return (
        <div
            className={[
                "CalendarTile",
                `CalendarTile_${isWeekend ? "weekend" : "weekdays"}`,
                `CalendarTile_${isToday ? "today" : ""}`].join(" ")
            }
            onClick={() => navigate("/new")}
        >
            <div className="date_wrapper">
                {date}
            </div>
        </div>
    );
};

export default CalendarTile;