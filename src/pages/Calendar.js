import { useContext, useState } from "react";
import CalendarContent from "../components/calendar/CalendarContent";
import CalendarHeader from "../components/calendar/CalendarHeader";
import { DiaryStateContext } from "../contexts/DiaryContext";
import { TagDispatchContext } from "../contexts/TagContext";

const Calendar = () => {
    const state = useContext(DiaryStateContext);
    const { fetchTagsForDiaries } = useContext(TagDispatchContext);
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
    };

    return (
        <div className="Calendar">
            <CalendarHeader onSearch={handleSearch} />
            <CalendarContent
                diaries={state}
                fetchTagsForDiaries={fetchTagsForDiaries}
                searchKeyword={searchKeyword}
            />
        </div>
    );
};

export default Calendar;