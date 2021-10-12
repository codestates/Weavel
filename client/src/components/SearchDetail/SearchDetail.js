import React, { useRef, useState } from "react";
import {
  SelectListContainer,
  SelectListBox,
  SelectList,
  WeatherItem,
  ArrowPosition,
  DayItem,
  TimeItem,
  AreaItem,
  SearchButton,
} from "./SearchDetail.style";
function SearchDetail({
  setSelectTitle,
  selectTitle,
  isSelectSuccess,
  allSelect,
  setAllSelect,
  setIsActivation,
  showAreaHandle,
}) {
  const weather = [
    { id: 0, weather: "맑은 날이 좋아요", isSelect: false },
    { id: 1, weather: "구름 낀 날이 좋아요", isSelect: false },
    { id: 2, weather: "비오는 날이 좋아요", isSelect: false },
    { id: 3, weather: "눈오는 날이 좋아요", isSelect: false },
  ];
  const day = [
    { id: 0, day: "오늘 떠날래요", isSelect: false },
    { id: 1, day: "내일 떠날래요", isSelect: false },
    { id: 2, day: "모레 떠날래요", isSelect: false },
  ];
  const time = [
    { id: 0, time: "00 시", isSelect: false },
    { id: 1, time: "01 시", isSelect: false },
    { id: 2, time: "02 시", isSelect: false },
    { id: 3, time: "03 시", isSelect: false },
    { id: 4, time: "04 시", isSelect: false },
    { id: 5, time: "05 시", isSelect: false },
    { id: 6, time: "06 시", isSelect: false },
    { id: 7, time: "07 시", isSelect: false },
    { id: 8, time: "08 시", isSelect: false },
    { id: 9, time: "09 시", isSelect: false },
    { id: 10, time: "10 시", isSelect: false },
    { id: 11, time: "11 시", isSelect: false },
    { id: 12, time: "12 시", isSelect: false },
    { id: 13, time: "13 시", isSelect: false },
    { id: 14, time: "14 시", isSelect: false },
    { id: 15, time: "15 시", isSelect: false },
    { id: 16, time: "16 시", isSelect: false },
    { id: 17, time: "17 시", isSelect: false },
    { id: 18, time: "18 시", isSelect: false },
    { id: 19, time: "19 시", isSelect: false },
    { id: 20, time: "20 시", isSelect: false },
    { id: 21, time: "21 시", isSelect: false },
    { id: 22, time: "22 시", isSelect: false },
    { id: 23, time: "23 시", isSelect: false },
  ];
  const area = [
    { id: 0, area: "서울", isSelect: false },
    { id: 1, area: "부산", isSelect: false },
    { id: 2, area: "인천", isSelect: false },
    { id: 3, area: "대구", isSelect: false },
    { id: 4, area: "대전", isSelect: false },
    { id: 5, area: "광주", isSelect: false },
    { id: 6, area: "울산", isSelect: false },
    { id: 7, area: "세종", isSelect: false },
    { id: 8, area: "제주", isSelect: false },
    { id: 9, area: "경기", isSelect: false },
    { id: 10, area: "강원", isSelect: false },
    { id: 11, area: "충북", isSelect: false },
    { id: 12, area: "충남", isSelect: false },
    { id: 13, area: "전북", isSelect: false },
    { id: 14, area: "전남", isSelect: false },
    { id: 15, area: "경북", isSelect: false },
    { id: 16, area: "경남", isSelect: false },
  ];

  const timeScroll = useRef([]);
  const arrIdx = [0, 6, 12, 18, 23];
  const [scrollIdx, setScrollIdx] = useState(0);
  const onButtonClick = (e) => {
    if (e.target.id === "up" && scrollIdx > 0) {
      setScrollIdx(scrollIdx - 1);
    } else if (e.target.id === "down" && scrollIdx < 4) {
      setScrollIdx(scrollIdx + 1);
    }
    const idx = arrIdx[scrollIdx];
    timeScroll.current[idx].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const [weatherSelect, setWeatherSelect] = useState(weather);
  const [daySelect, setDaySelect] = useState(day);
  const [timeSelect, setTimeSelect] = useState(time);
  const [areaSelect, setAreaSelect] = useState(area);

  const allSelectHandle = (weather, day, time, area) => {
    const newAllSelect = { ...allSelect };
    if (weather) {
      newAllSelect.weather = true;
    }
    if (day) {
      newAllSelect.day = true;
    }
    if (time) {
      newAllSelect.time = true;
    }
    if (area) {
      newAllSelect.area = true;
    }
    setAllSelect(newAllSelect);
  };

  const weatherSelectHandle = (e) => {
    const targetId = e.target.id;
    weather[targetId].isSelect = true;
    setWeatherSelect([...weather]);
    allSelectHandle(weather[targetId].isSelect, null, null, null);
  };

  const daySelectHandle = (e) => {
    const targetId = e.target.id;
    day[targetId].isSelect = true;
    setDaySelect([...day]);
    allSelectHandle(null, day[targetId].isSelect, null, null);
  };

  const timeSelectHandle = (e) => {
    const targetId = e.target.id;
    time[targetId].isSelect = true;
    setTimeSelect([...time]);
    allSelectHandle(null, null, time[targetId].isSelect, null);
  };

  const areaSelectHandle = (e) => {
    const targetId = e.target.id;
    area[targetId].isSelect = true;
    setAreaSelect([...area]);
    allSelectHandle(null, null, null, area[targetId].isSelect);
  };

  const searchButton = () => {
    const weatherTitle = weatherSelect.filter((weather) => weather.isSelect)[0];
    const dayTitle = daySelect.filter((day) => day.isSelect)[0];
    const timeTitle = timeSelect.filter((time) => time.isSelect)[0];
    const areaTitle = areaSelect.filter((area) => area.isSelect)[0];

    if (weatherTitle && dayTitle && timeTitle && areaTitle) {
      selectTitle.weather = weatherTitle.weather;
      selectTitle.day = dayTitle.day;
      selectTitle.time = timeTitle.time;
      selectTitle.area = areaTitle.area;
      setSelectTitle({ ...selectTitle });
      setIsActivation({ isOpen: false, isLender: true });
      showAreaHandle(areaTitle.id);
    }
  };

  return (
    <>
      <SelectListContainer>
        <SelectListBox>
          <SelectList>
            {weatherSelect.map((weather) => {
              return (
                <WeatherItem
                  selectId={weather.isSelect}
                  onClick={(e) => weatherSelectHandle(e)}
                  id={weather.id}
                >
                  {weather.weather}
                </WeatherItem>
              );
            })}
          </SelectList>
        </SelectListBox>
        <SelectListBox>
          <SelectList>
            {daySelect.map((day) => {
              return (
                <DayItem
                  selectId={day.isSelect}
                  onClick={(e) => daySelectHandle(e)}
                  id={day.id}
                >
                  {day.day}
                </DayItem>
              );
            })}
          </SelectList>
        </SelectListBox>
        <SelectListBox>
          <ArrowPosition id={"up"} onClick={(e) => onButtonClick(e)}>
            <img
              id={"up"}
              onClick={(e) => onButtonClick(e)}
              src="./images/top_arrow.svg"
            />
          </ArrowPosition>
          <SelectList>
            {timeSelect.map((time) => {
              return (
                <TimeItem
                  selectId={time.isSelect}
                  onClick={(e) => timeSelectHandle(e)}
                  id={time.id}
                  ref={(el) => (timeScroll.current[time.id] = el)}
                >
                  {time.time}
                </TimeItem>
              );
            })}
          </SelectList>
          <ArrowPosition id={"down"} onClick={(e) => onButtonClick(e)}>
            <img
              id={"down"}
              onClick={(e) => onButtonClick(e)}
              src="./images/bottom_arrow.svg"
            />
          </ArrowPosition>
        </SelectListBox>
        <SelectListBox border={"none"}>
          <SelectList area={"5px 0 5px 30px"} padding={"0 32px 0 32px"}>
            {areaSelect.map((area) => {
              return (
                <AreaItem
                  selectId={area.isSelect}
                  onClick={(e) => areaSelectHandle(e)}
                  id={area.id}
                >
                  {area.area}
                </AreaItem>
              );
            })}
          </SelectList>
        </SelectListBox>
      </SelectListContainer>
      <SearchButton isSuccess={isSelectSuccess}>
        <button onClick={() => searchButton()} disabled={isSelectSuccess}>
          검색
        </button>
      </SearchButton>
    </>
  );
}

export default SearchDetail;
