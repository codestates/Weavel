import React, { useEffect, useState } from "react";
import WeatherInfo from "../../components/WeatherInfo/WeatherInfo";
import WeatherSearch from "../../components/WeatherSearch/WeatherSearch";
import { MainPageContainer } from "./MainPage.style";

function MainPage() {
  const [isShowWeatherInfo, setIsShowWeatherInfo] = useState(false);
  const [areaName, setAreaName] = useState("");

  const searchWeatherHandle = (boolean) => {
    setIsShowWeatherInfo(boolean);
  };

  const changeAreaHandle = (area, x, y) => {
    setAreaName(area);
  };
  return (
    <MainPageContainer>
      <WeatherSearch
        changeAreaHandle={changeAreaHandle}
        searchWeatherHandle={searchWeatherHandle}
        isShowWeatherInfo={isShowWeatherInfo}
      ></WeatherSearch>
      {isShowWeatherInfo ? <WeatherInfo areaName={areaName}></WeatherInfo> : null}
    </MainPageContainer>
  );
}

export default MainPage;
