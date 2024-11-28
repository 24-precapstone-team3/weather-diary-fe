import { useState, useEffect } from "react";
import { auth } from "../firebase";
import axios from "axios";

const useAuthUser = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setCurrentUser(currentUser);

                try {
                    const response = await axios.post(`http://13.124.144.246:3000/api/users/create`,
                        {
                            firebase_uid: currentUser.uid
                        },
                        {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }
                    );
                    console.log(response.data);
                } catch (error) {
                    console.log(error);
                }
            } else {
                setCurrentUser(null);
            }

            setIsDataLoaded(true);
        });

        return () => unsubscribe();
    }, []);

    return { currentUser, isDataLoaded };
};

export default useAuthUser;