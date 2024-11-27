import "./CalendarHeader.css";
import diarySublogo from "../../images/img_diary_sublogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getWeather, icons } from "../../utils";
import UserProfile from "./UserProfile";
import { useEffect, useState } from "react";

const CalendarHeader = () => {
    const [weatherInfo, setWeatherInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getWeatherInfo = async () => {
            try {
                const weatherData = await getWeather("seoul");
                setWeatherInfo(weatherData);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getWeatherInfo();
    }, []);

    return (
        <div className="CalendarHeader">
            <div className="left_section">
                <img src={diarySublogo} alt="DIARY" />
                <div className="sublogo_text">마음의 날씨</div>
                <div className="search_wrapper">
                    <FontAwesomeIcon icon={icons.faMagnifyingGlass} style={{ color: "gray"}}/>
                    <input type="text"></input>
                </div>
            </div>
            <div className="right_section">
                <div className="weather_wrapper">
                    {isLoading ? "날씨 로드 중" : (
                        <>
                            <div className="location">
                                {weatherInfo.location}
                            </div>
                            <div className="temperature">
                                {`${Math.round(weatherInfo.weather.temperature)}°`}
                            </div>
                            <div className="description">
                                {weatherInfo.weather.description}
                            </div>
                        </>
                    )}
                </div>
                <UserProfile />
            </div>
        </div>
    );
};

export default CalendarHeader;