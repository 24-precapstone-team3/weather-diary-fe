import React, { useReducer } from "react";
import axios from "axios";
import { auth } from "../firebase";
import { apiBaseUrl } from "../utils";

export const TagStateContext = React.createContext();
export const TagDispatchContext = React.createContext();

/*
    tagsData
    [
        { id: 1, tags: ['#행복', '#사랑'] },
        { id: 2, tags: ['#슬픔', '#불안'] },
        { id: 3, tags: ['#평화'] }
    ]
    dispatch에 data로 전달되어 state가 이와 같이 초기화 됨
*/

const reducer = (action, state) => {
    switch(action.type) {
        case "INIT":
            return action.data;
        case "CREATE": {
            const newState = [action.data, ...state];
            return newState;
        }
        default:
            return state;
    }
}

export const TagProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    const fetchTagsForDiaries = async (diaryIds) => {
        if (!auth.currentUser || diaryIds.length <= 0) {
            return;
        }

        try {
            const tagPromises = diaryIds.map((id) => 
                axios.get(`http://13.124.144.246:3000/api/tag/${id}`,
                    {
                        headers: {
                            "firebase-uid": auth.currentUser.uid
                        }
                    }
                ).then((res) => ({ id, tags: res.data }))
            );

            const tagsData = await Promise.all(tagPromises);
            dispatch({
                type: "INIT",
                data: tagsData
            });
            console.log("tags fetched");
            console.log(state);
        } catch (error) {
            console.log(error);
        }
    };

    const onCreate = async (tags, diary_id) => {
        try {
            // tags는 ["# 행복", "# 사랑"] 과 같이 사용자가 선택한 해시태그 배열
            await axios.post(`http://13.124.144.246:3000/api/tag`,
                {
                    tags,
                    diary_id
                },
                {
                    headers: {
                        "firebase-uid": auth.currentUser.uid,
                        "Content-Type": "application/json"
                    }
                }
            );

            dispatch({
                type: "CREATE",
                data: { id: diary_id, tags }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TagStateContext.Provider value={state}>
            <TagDispatchContext.Provider value={{ fetchTagsForDiaries, onCreate }}>
                {children}
            </TagDispatchContext.Provider>
        </TagStateContext.Provider>
    );
};