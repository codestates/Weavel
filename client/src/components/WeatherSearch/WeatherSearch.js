import React, { useEffect, useState } from "react";
import SearchDetail from "../SearchDetail/SearchDetail";
import SearchInfo from "../SearchInfo/SearchInfo";
import MapIndex from "../Map/MapIndex";
import { debounce } from "lodash";
import {
  SearchContainer,
  SelectContainer,
  SelectBoxContainer,
  SelectBox,
  SelectContents,
  WeatherSelectContainer,
} from "./WeatherSearch.style";

function WeatherSearch({
  isShowWeatherInfo,
  searchWeatherHandle,
  changeAreaHandle,
  getSearchHandle,
  nowWeather,
  dateTime,
  weatherColor,
  setNowWeather,
}) {
  const [isActivation, setIsActivation] = useState({
    isOpen: false,
    isLender: false,
  });
  const [isInfoImg, setIsInfoImg] = useState(true);

  const activationHandle = () => {
    const isOpen = { ...isActivation };
    isOpen.isOpen = !isActivation.isOpen;
    isOpen.isLender = false;
    setIsActivation(isOpen);
    setNowWeather([]);
    setIsInfoImg(!isOpen.isOpen);
    searchWeatherHandle(false);
  };

  const [selectTitle, setSelectTitle] = useState({
    weather: `날씨를 선택하세요`,
    day: "날짜를 선택하세요",
    time: "시간을 선택하세요",
    area: "지역을 선택하세요",
  });

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 1000);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize.width <= 500) {
      setSelectTitle({
        weather: `선택해 주세요`,
        day: "선택해 주세요",
        time: "선택해 주세요",
        area: "선택해 주세요",
      });
    } else {
      setSelectTitle({
        weather: `날씨를 선택하세요`,
        day: "날짜를 선택하세요",
        time: "시간을 선택하세요",
        area: "지역을 선택하세요",
      });
    }
  }, [windowSize]);

  const [showArea, setShowArea] = useState(null);

  const showAreaHandle = (idx) => {
    setShowArea(idx);
  };

  return (
    <SearchContainer>
      <SelectContainer
        isOpen={isActivation.isOpen}
        isClose={!isInfoImg}
        onClick={() => activationHandle()}
      >
        <SelectBoxContainer>
          <SelectBox>
            <span>날씨</span>
            <SelectContents>{selectTitle.weather}</SelectContents>
          </SelectBox>
          <SelectBox>
            <span>날짜</span>
            <SelectContents>{selectTitle.day}</SelectContents>
          </SelectBox>
          <SelectBox>
            <span>시간</span>
            <SelectContents>{selectTitle.time}</SelectContents>
          </SelectBox>
          <SelectBox line={"none"}>
            <span>지역</span>
            <SelectContents>{selectTitle.area}</SelectContents>
          </SelectBox>
        </SelectBoxContainer>
      </SelectContainer>
      <WeatherSelectContainer isActivation={isActivation}>
        {isActivation.isLender ? (
          <MapIndex
            isShowWeatherInfo={isShowWeatherInfo}
            searchWeatherHandle={searchWeatherHandle}
            showArea={showArea}
            changeAreaHandle={changeAreaHandle}
            nowWeather={nowWeather}
            weatherColor={weatherColor}
          />
        ) : isActivation.isOpen ? (
          <SearchDetail
            setSelectTitle={setSelectTitle}
            selectTitle={selectTitle}
            setIsActivation={setIsActivation}
            showAreaHandle={showAreaHandle}
            isActivation={isActivation}
            getSearchHandle={getSearchHandle}
            dateTime={dateTime}
          />
        ) : (
          <></>
        )}
      </WeatherSelectContainer>
      {isActivation.isLender ? <></> : isInfoImg ? <SearchInfo /> : <></>}
    </SearchContainer>
  );
}

export default WeatherSearch;
