import React, { useEffect, useRef, useState } from "react";
import SearchDetail from "../SearchDetail/SearchDetail";
import SearchInfo from "../SearchInfo/SearchInfo";
import MapIndex from "../Map/MapIndex";
import {
  SearchContainer,
  SelectContainer,
  SelectBoxContainer,
  SelectBox,
  SelectContents,
  WeatherSelectContainer,
} from "./WeatherSearch.style";

function WeatherSearch({ isShowWeatherInfo, searchWeatherHandle, changeAreaHandle }) {
  const [isActivation, setIsActivation] = useState({ isOpen: false, isLender: false });
  const [isSelectSuccess, setIsSelectSuccess] = useState(false);
  const [allSelect, setAllSelect] = useState({
    weather: false,
    day: false,
    time: false,
    area: false,
  });

  const activationHandle = () => {
    const isOpen = { ...isActivation };
    isOpen.isOpen = !isActivation.isOpen;
    isOpen.isLender = false;
    setIsActivation(isOpen);
    searchWeatherHandle(false);
  };

  useEffect(() => {
    if (allSelect.weather && allSelect.day && allSelect.time && allSelect.area) {
      setIsSelectSuccess(false);
    } else {
      setIsSelectSuccess(true);
    }
  }, [allSelect]);

  const [selectTitle, setSelectTitle] = useState({
    weather: "날씨를 선택하세요",
    day: "날짜를 선택하세요",
    time: "시간을 선택하세요",
    area: "지역을 선택하세요",
  });

  const [showArea, setShowArea] = useState(null);

  const showAreaHandle = (idx) => {
    if (idx < 9) {
      idx += 1;
      idx = `0${idx}`;
    } else {
      idx += 1;
      idx = `${idx}`;
    }
    setShowArea(idx);
  };

  return (
    <SearchContainer>
      <WeatherSelectContainer isActivation={isActivation}>
        <SelectContainer isActivation={isActivation.isOpen} onClick={() => activationHandle()}>
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
        {isActivation.isLender ? (
          <MapIndex
            isShowWeatherInfo={isShowWeatherInfo}
            searchWeatherHandle={searchWeatherHandle}
            showArea={showArea}
            changeAreaHandle={changeAreaHandle}
          />
        ) : isActivation.isOpen ? (
          <SearchDetail
            setSelectTitle={setSelectTitle}
            selectTitle={selectTitle}
            isSelectSuccess={isSelectSuccess}
            allSelect={allSelect}
            setAllSelect={setAllSelect}
            setIsActivation={setIsActivation}
            showAreaHandle={showAreaHandle}
          />
        ) : (
          <SearchInfo />
        )}
      </WeatherSelectContainer>
    </SearchContainer>
  );
}

export default WeatherSearch;
