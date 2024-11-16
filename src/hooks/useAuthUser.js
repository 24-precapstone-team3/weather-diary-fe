import { useState, useEffect } from "react";
import { auth } from "../firebase";
import axios from "axios";

const useAuthUser = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            setCurrentUser(currentUser);

            /*
            try {
                // 엔드포인트 없었던 것 같음
                const response = await axios.post("/api/users/find", {
                    firebase_uid: currentUser.uid
                });

                // db에 해당 유저가 없으면 생성
                if (!response.data || response.data.length === 0) {
                    await axios.post("/api/users/create", {
                        firebase_uid: currentUser.uid
                    });
                    console.log("new user regd");
                }
            } catch (error) {
                console.log(error);
            }
            */

            setIsDataLoaded(true);
        });

        return () => unsubscribe();
    }, []);

    return { currentUser, isDataLoaded };
};

export default useAuthUser;