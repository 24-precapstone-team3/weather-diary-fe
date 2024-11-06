import { useState, useEffect } from "react";
import { auth } from "../firebase";

const useAuthUser = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setIsDataLoaded(true);
        });

        return () => unsubscribe();
    }, []);

    return { currentUser, isDataLoaded };
};

export default useAuthUser;