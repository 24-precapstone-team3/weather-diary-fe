// CalendarBackground.js
import React from "react";
import "./CalendarBackground.css"; // 기존 달력 스타일 재사용

const CalendarBackground = () => {
    return (
        <div className="CalendarBackground">
            <div className="calendar_header">
                <button>◀</button>
                <div>2024.10</div>
                <button>▶</button>
            </div>
            <div className="calendar_grid">
                {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
                    <div key={idx} className="calendar_day">
                        {day}
                    </div>
                ))}
                {Array.from({ length: 42 }, (_, idx) => (
                    <div key={idx} className="calendar_tile"></div>
                ))}
            </div>
        </div>
    );
};

export default CalendarBackground;
