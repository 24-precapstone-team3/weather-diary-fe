import React, { useReducer } from "react";
import axios from "axios";
import { auth } from "../firebase";

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

const reducer = (state, action) => {
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
            const tagRequests = diaryIds.map((diaryId) =>
                axios.get(`http://13.124.144.246:3000/api/tag/${diaryId}`, {
                    headers: {
                        "firebase-uid": auth.currentUser.uid,
                    },
                })
            );
    
            // 모든 요청을 병렬로 처리하고 결과를 배열로 수집
            const responses = await Promise.all(tagRequests);
    
            // 각 응답 데이터를 id에 매핑하여 tagData를 생성
            const tagData = responses.map((response, idx) => ({
                id: diaryIds[idx],
                tags: response.data,
            }));
    
            // 상태 초기화
            dispatch({
                type: "INIT",
                data: tagData,
            });
    
            console.log("tags fetched:", tagData);
        } catch (error) {
            console.error("Failed to fetch tags:", error);
        }
    };    

    const onCreate = async (tags, diary_id) => {
        try {
            // tags는 ["#행복", "#사랑"] 과 같이 사용자가 선택한 해시태그 배열
            const response = await axios.post(`http://13.124.144.246:3000/api/tag`,
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

            // 백엔드 응답이 새로 생성된 해시태그를 반환하지는 않아서 매개변수로 dispatch
            console.log(response.data);
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