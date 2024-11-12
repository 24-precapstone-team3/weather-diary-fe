import { useContext } from "react";
import CalendarContent from "../components/calendar/CalendarContent";
import CalendarHeader from "../components/calendar/CalendarHeader";
import { DiaryStateContext } from "../contexts/DiaryContext";

const Calendar = () => {
    const state = useContext(DiaryStateContext);

    return (
        <div className="Calendar">
            <CalendarHeader />
            <CalendarContent diaries={state} />
        </div>
    );
};

export default Calendar;
