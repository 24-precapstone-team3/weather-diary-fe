// src/calendar/Calendar.jsx
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import CalendarView from "./CalendarView";
import LoginButton from "./LoginButton";
import LoginModal from "./LoginModal";
import "./Calendar.css";

const Calendar = ({ diaryEntries }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="Calendar">
      <LoginButton
        isLoggedIn={isLoggedIn}
        onLogin={() => setShowLogin(true)}
        onLogout={() => signOut(auth)}
      />
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
      <CalendarView diaryEntries={diaryEntries} />
    </div>
  );
};

export default Calendar;