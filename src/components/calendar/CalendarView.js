// src/calendar/CalendarView.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarView.css";

const CalendarView = ({ diaryEntries }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const entry = diaryEntries.find((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getFullYear() === date.getFullYear() &&
          entryDate.getMonth() === date.getMonth() &&
          entryDate.getDate() === date.getDate()
        );
      });
      return entry ? <p>{entry.preview}</p> : null;
    }
  };

  return (
    <div className="CalendarView">
      <Calendar
        onChange={onDateChange}
        value={selectedDate}
        tileContent={tileContent}
      />
    </div>
  );
};

export default CalendarView;