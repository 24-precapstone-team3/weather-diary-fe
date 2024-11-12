import React, { useEffect, useReducer } from "react";
import useAuthUser from "../hooks/useAuthUser";
import axios from "axios";

// 일기 데이터를 저장하고 불러오는데 쓰이는 context
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

/*
    일기 객체
    {
        firebase_uid,
        content,
        date,
        weather
    }
*/

const reducer = (state, action) => {
    switch (action.type) {
        case "INIT":
            return action.data;
        case "CREATE": {
            const newState = [action.data, ...state];
            sessionStorage.setItem("diary", JSON.stringify(newState));
            return newState;
        }
        case "UPDATE": {
            const newState = state.map((it) => 
                it.diary_id === action.data.diary_id ? { ...action.data } : it
            );
            sessionStorage.setItem("diary", JSON.stringify(newState));
            return newState;
        }
        default:
            return state;
    }
};

export const DiaryProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    const { currentUser } = useAuthUser();

    const fetchDiaries = async () => {
        if (!currentUser) return;

        const rawData = sessionStorage.getItem("diary");
        if (rawData) {
            const localData = JSON.parse(rawData);
            if (localData.length > 0) {
                dispatch({ type: "INIT", data: localData });
                return;
            }
        }

        try {
            const response = await axios.get("/api/diaries", {
                params: { firebase_uid: currentUser.firebase_uid },
            });
            dispatch({ type: "INIT", data: response.data });
            sessionStorage.setItem("diary", JSON.stringify(response.data));
        } catch (error) {
            console.error("Failed to fetch diaries:", error);
        }
    };

    useEffect(() => {
        fetchDiaries();
    }, [currentUser]);

    const onCreate = async (newData) => {
        try {
            const { firebase_uid, content, date, weather } = newData;
            const response = await axios.post("/api/diaries", {
                firebase_uid,
                content,
                date,
                weather,
            });
            
            dispatch({
                type: "CREATE",
                data: response.data,
            });
        } catch (error) {
            console.error("Failed to create diary:", error);
        }
    };
    

    const onUpdate = async (updatedData) => {
        try {
            await axios.put(`/api/diaries/${updatedData.diary_id}`, updatedData);
            dispatch({
                type: "UPDATE",
                data: updatedData,
            });
        } catch (error) {
            console.error("Failed to update diary:", error);
        }
    };

    return (
        <DiaryStateContext.Provider value={state}>
            <DiaryDispatchContext.Provider value={{ onCreate, onUpdate }}>
                {children}
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
};
