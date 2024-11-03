import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import LoginModal from "../components/login/LoginModal";
import LoginContent from "../components/login/LoginContent";

const Calendar = () => {
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
        {!isLoggedIn ? (
            <button onClick={() => setShowLogin(true)}>로그인</button>
        ) : (
            <button onClick={() => signOut(auth)}>로그아웃</button>
        )}
        {showLogin && (
            <LoginModal onClose={() => setShowLogin(false)}>
            <LoginContent onClose={() => setShowLogin(false)} />
            </LoginModal>
        )}
        </div>
    );
};

export default Calendar;
