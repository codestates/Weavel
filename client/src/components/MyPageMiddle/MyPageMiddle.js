import React from "react";
import {
  MiddleBar,
  AreaSearchBar,
  AreaSearchInput,
  AreaSearchIcon,
} from "./MyPageMiddle.style";

import {
  Sunny,
  Cloud,
  Rain,
  Snow,
} from "../../pages/SignupPage/SignupPage.style";

import { WeatherBox } from "../EditUserInfoModal/EditUserInfoModal.style";

function MyPageMiddle({
  filterPhotoHandler,
  SearchWeatherPhoto,
  setSearchWeatherPhoto,
  handleInputChange,
}) {
  const searchWeatherCheckHandle = (e) => {
    let newWeather = { ...SearchWeatherPhoto };
    if (e.target.id === "1") {
      newWeather.sunny = !newWeather.sunny;
      setSearchWeatherPhoto(newWeather);
    }
    if (e.target.id === "2") {
      newWeather.cloud = !newWeather.cloud;
      setSearchWeatherPhoto(newWeather);
    }
    if (e.target.id === "3") {
      newWeather.rain = !newWeather.rain;
      setSearchWeatherPhoto(newWeather);
    }
    if (e.target.id === "4") {
      newWeather.snow = !newWeather.snow;
      setSearchWeatherPhoto(newWeather);
    }
    filterPhotoHandler(e.target.id);
  };

  return (
    <MiddleBar>
      <WeatherBox margin={"0"}>
        <Sunny
          isSunny={SearchWeatherPhoto.sunny}
          id="1"
          onClick={(e) => searchWeatherCheckHandle(e)}
        >
          맑음
        </Sunny>
        <Cloud
          isCloud={SearchWeatherPhoto.cloud}
          id="2"
          onClick={(e) => searchWeatherCheckHandle(e)}
        >
          구름
        </Cloud>
        <Rain
          isRain={SearchWeatherPhoto.rain}
          id="3"
          onClick={(e) => searchWeatherCheckHandle(e)}
        >
          비
        </Rain>
        <Snow
          isSnow={SearchWeatherPhoto.snow}
          id="4"
          onClick={(e) => searchWeatherCheckHandle(e)}
        >
          눈
        </Snow>
      </WeatherBox>
      <AreaSearchBar>
        <AreaSearchInput
          type="text"
          placeholder="지역을 검색해 보세요"
          onChange={(e) => handleInputChange(e)}
        />
        <AreaSearchIcon src="../../images/search.svg" />
      </AreaSearchBar>
    </MiddleBar>
  );
}

export default MyPageMiddle;
