import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { auth } from "../firebase";
import { apiBaseUrl } from "../utils";

// 일기 데이터를 저장하고 불러오는데 쓰이는 context
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "INIT":
            return action.data;
        case "CREATE": {
            const newState = [action.data, ...state];
            return newState;
        }
        case "UPDATE": {
            const newState = state.map((it) => 
                it.diary_id === action.data.diary_id ? { ...action.data } : it
            );
            return newState;
        }
        default:
            return state;
    }
};

export const DiaryProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    const fetchDiaries = async () => {
        if (!auth.currentUser) {
            return;
        }

        try {
            const response = await axios.get(`http://13.124.144.246:3000/api/diaries/check`,
                {
                    headers: {
                        "firebase-uid": auth.currentUser.uid
                    },
                }
            );

            dispatch({
                type: "INIT",
                data: response.data
            });
            console.log("diaries fetched");
            console.log(state);
        } catch (error) {
            console.error("Failed to fetch diaries:", error);
        }
    };

    useEffect(() => {
        fetchDiaries();
    }, [auth.currentUser]);

    const onCreate = async (content, date, city) => {
        try {
            const response = await axios.post(`http://13.124.144.246:3000/api/diaries/create`,
                {
                    content,
                    date,
                    city
                },
                {
                    headers: {
                        "firebase-uid": auth.currentUser.uid,
                        "Content-Type": "application/json"
                    }
                }
            );
            
            if (response.data) {
                dispatch({
                    type: "CREATE",
                    data: response.data
                });

                return response.data;
            }
        } catch (error) {
            console.error("Failed to create diary:", error);
        }

        return {};
    };
    
    const onUpdate = async (updatedData) => {
        try {
            const response = await axios.post(`http://13.124.144.246:3000/api/diaries/${updatedData.diary_id}/update`,
                { diaryId: updatedData.diary_id, content: updatedData.content },
                { headers: { 'firebase-uid': updatedData.firebase_uid } }
            );

            dispatch({
                type: "UPDATE",
                data: response.data,
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
