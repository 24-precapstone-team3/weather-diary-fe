import { useContext } from "react";
import CalendarContent from "../components/calendar/CalendarContent";
import CalendarHeader from "../components/calendar/CalendarHeader";
import { DiaryStateContext } from "../contexts/DiaryContext";
import { TagDispatchContext } from "../contexts/TagContext";

const Calendar = () => {
    const state = useContext(DiaryStateContext);
    const { fetchTagsForDiaries } = useContext(TagDispatchContext);

    return (
        <div className="Calendar">
            <CalendarHeader />
            <CalendarContent diaries={state} fetchTagsForDiaries={fetchTagsForDiaries} />
        </div>
    );
};

export default Calendar;
