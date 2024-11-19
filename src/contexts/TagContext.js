import React, { useReducer } from "react";
import useAuthUser from "../hooks/useAuthUser";
import axios from "axios";

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
    const { currentUser } = useAuthUser();

    const fetchTagsForDiaries = async (diaryIds) => {
        if (!currentUser || diaryIds.length <= 0) {
            return;
        }

        try {
            const tagPromises = diaryIds.map((id) => 
                axios.get(`/api/tag/${id}`).then((res) => ({ id, tags: res.data }))
            );

            const tagsData = await Promise.all(tagPromises);
            dispatch({
                type: "INIT",
                data: tagsData
            });
        } catch (error) {
            console.log(error);
        }
    };

    const onCreate = async (tags, diary_id) => {
        try {
            // tags는 ["# 행복", "# 사랑"] 과 같이 사용자가 선택한 해시태그 배열
            await axios.post("/api/tag", {
                tags,
                diary_id
            });

            /*
            dispatch({
                type: "CREATE",
                data: { id: diary_id, tags }
            });
            */
        } catch (error) {
            console.log(error);
        }

        dispatch({
            type: "CREATE",
            data: { id: diary_id, tags }
        });
    };

    return (
        <TagStateContext.Provider value={state}>
            <TagDispatchContext.Provider value={{ fetchTagsForDiaries, onCreate }}>
                {children}
            </TagDispatchContext.Provider>
        </TagStateContext.Provider>
    )
};