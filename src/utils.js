import { faAngleDown, faHashtag, faLocationArrow, faMagnifyingGlass, faPhone, faPowerOff, faXmark } from "@fortawesome/free-solid-svg-icons";
import { auth } from "./firebase";
import axios from "axios";

export const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const icons = {
    faPhone,
    faHashtag,
    faXmark,
    faMagnifyingGlass,
    faAngleDown,
    faLocationArrow
};

export const menuItems = [
    {
        icon: faPowerOff,
        content: "Logout",
        onClick: () => {
            auth.signOut();
            window.location.reload();
        }
    }
];

export const toLocalePhoneNumber = (input) => {
    const cleanText = input.replace(/-/g, "");
    const MAX_LENGTH = 11;
    const FIRST_HYPHEN_INDEX = 3;
    const SECOND_HYPHEN_INDEX = 7;

    let localePhoneNumber = cleanText.slice(0, MAX_LENGTH);

    if (localePhoneNumber.length > SECOND_HYPHEN_INDEX) {
        localePhoneNumber = localePhoneNumber.slice(0, SECOND_HYPHEN_INDEX) +
        "-" +
        localePhoneNumber.slice(SECOND_HYPHEN_INDEX);
    }
    if (localePhoneNumber.length > FIRST_HYPHEN_INDEX) {
        localePhoneNumber = localePhoneNumber.slice(0, FIRST_HYPHEN_INDEX) +
        "-" +
        localePhoneNumber.slice(FIRST_HYPHEN_INDEX);
    }

    return localePhoneNumber;
};

export const toIntlPhoneNumber = (input) => {
    let intlPhoneNumber = input.replace(/-/g, "");
    if (intlPhoneNumber.length > 0 && intlPhoneNumber[0] === "0") {
        intlPhoneNumber = "+82" + intlPhoneNumber.substring(1);
    } else {
        intlPhoneNumber = "+82" + intlPhoneNumber;
    }

    return intlPhoneNumber;
};

export const processHashtags = (hashTag) => {
    const tags = hashTag.match(/[\w가-힣]+/g) || [];
    return tags.map(tag => `#${tag.trim()}`);
};

// db에서 가져온 2024-11-27 형식을 2024.11.27. 수 와 같이 표시하기 위한 변환 함수
export const getDateForDisplay = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];

    return {
        dateForDisplay: `${year}.${month}.${day}.`,
        dayOfWeek,
    };
};

// db 요구 형식(2024-11-27)으로 date 객체 변환 함수
export const getFormattedDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export const uploadPhoto = async (file, diaryId) => {
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("diary_id", diaryId);

    try {
        await axios.post(`http://13.124.144.246:3000/api/photo/upload`,
            formData,
            {
                headers: {
                    "firebase-uid": auth.currentUser.uid,
                    //"Content-Type": "application/json"
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};

export const getPhotoByDiaryId = async (diaryId) => {
    try {
        const response = await axios.get(`http://13.124.144.246:3000/api/photo/${diaryId}`,
            {
                headers: {
                    "firebase-uid": auth.currentUser.uid
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// 일기 분석
export const analyzeDiary = async (content) => {
    try {
        const response = await axios.post(`http://13.124.144.246:3000/api/openai/analyze`,
            { content },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data; // { mood, date, hashTag }
    } catch (error) {
        console.log(error);
    }
};

// 심리 상담 관련
export const provideCounsel = async (content) => {
    try {
        const response = await axios.post(`http://13.124.144.246:3000/api/openai/counsel`,
            { content },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const saveCounsel = async (diaryId, feedback) => {
    await axios.post(`http://13.124.144.246:3000/api/feedback`,
        {
            diary_id: diaryId,
            feedback
        },
        {
            headers: {
                "firebase-uid": auth.currentUser.uid,
                "Content-Type": "application/json"
            }
        }
    );
};

export const getCounselByDiaryId = async (diaryId) => {
    try {
        const response = await axios.get(`http://13.124.144.246:3000/api/feedback/${diaryId}`,
            {
                headers: {
                    "firebase-uid": auth.currentUser.uid
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getWeather = async (city) => {
    try {
        const response = await axios.get(`http://13.124.144.246:3000/api/weather?location=${city}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};