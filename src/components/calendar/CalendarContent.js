import React, { useState } from "react";
import "./CalendarContent.css";
import CalendarTile from "./CalendarTile";

const CalendarContent = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // 선택된 월의 날짜 생성
    const generateDatesForMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const dates = [];
        const firstDayOfWeek = firstDayOfMonth.getDay();

        // 빈 칸
        for (let i = 0; i < firstDayOfWeek; i++) {
            dates.push(null);
        }

        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            dates.push(new Date(year, month, day));
        }

        return dates;
    };

    const handleMonthChange = (direction) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + direction));
        setCurrentDate(new Date(newDate));
    };

    return (
        <div className="CalendarContent">
            <div className="calendar_header">
                <button onClick={() => handleMonthChange(-1)}>◀</button>
                <div>{currentDate.toLocaleDateString("default", { year: "numeric", month: "2-digit" })}</div>
                <button onClick={() => handleMonthChange(1)}>▶</button>
            </div>
            <div className="calendar_grid">
                {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
                    <div key={idx} className="calendar_day">
                        {day}
                    </div>
                ))}
                {generateDatesForMonth(currentDate).map((date, idx) => (
                    <CalendarTile 
                        key={idx} 
                        date={date ? date.getDate() : ""} 
                        isWeekend={date && (date.getDay() === 0 || date.getDay() === 6)}
                        isToday={date && (date.toDateString() === new Date().toDateString())}
                    />
                ))}
            </div>
        </div>
    );
};

export default CalendarContent;