import React, { useRef, useState, useEffect } from "react";
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
  SideArea,
} from "./SearchDetail.style";

function SearchDetail({
  setSelectTitle,
  selectTitle,
  setIsActivation,
  isActivation,
  showAreaHandle,
  getSearchHandle,
}) {
  const weather = [
    {
      id: 0,
      weather: "맑은 날",
      click: "./images/sunny.svg",
      unClick: "./images/unCLickedSunny.svg",
      isSelect: false,
    },
    {
      id: 1,
      weather: "구름 낀 날",
      click: "./images/cloudy.svg",
      unClick: "./images/unCLickedCloudy.svg",
      isSelect: false,
    },
    {
      id: 2,
      weather: "비오는 날",
      click: "./images/rainy.svg",
      unClick: "./images/unCLickedRainy.svg",
      isSelect: false,
    },
    {
      id: 3,
      weather: "눈오는 날",
      click: "./images/snowy.svg",
      unClick: "./images/unCLickedSnowy.svg",
      isSelect: false,
    },
  ];
  const day = [
    {
      id: 0,
      day: "오늘 떠날래요",
      click: "./images/check.svg",
      unClick: "./images/unCheck.svg",
      isSelect: false,
    },
    {
      id: 1,
      day: "내일 떠날래요",
      click: "./images/check.svg",
      unClick: "./images/unCheck.svg",
      isSelect: false,
    },
    {
      id: 2,
      day: "모레 떠날래요",
      click: "./images/check.svg",
      unClick: "./images/unCheck.svg",
      isSelect: false,
    },
  ];
  const time = [
    { id: "00", time: "00 시", isSelect: false },
    { id: "01", time: "01 시", isSelect: false },
    { id: "02", time: "02 시", isSelect: false },
    { id: "03", time: "03 시", isSelect: false },
    { id: "04", time: "04 시", isSelect: false },
    { id: "05", time: "05 시", isSelect: false },
    { id: "06", time: "06 시", isSelect: false },
    { id: "07", time: "07 시", isSelect: false },
    { id: "08", time: "08 시", isSelect: false },
    { id: "09", time: "09 시", isSelect: false },
    { id: "10", time: "10 시", isSelect: false },
    { id: "11", time: "11 시", isSelect: false },
    { id: "12", time: "12 시", isSelect: false },
    { id: "13", time: "13 시", isSelect: false },
    { id: "14", time: "14 시", isSelect: false },
    { id: "15", time: "15 시", isSelect: false },
    { id: "16", time: "16 시", isSelect: false },
    { id: "17", time: "17 시", isSelect: false },
    { id: "18", time: "18 시", isSelect: false },
    { id: "19", time: "19 시", isSelect: false },
    { id: "20", time: "20 시", isSelect: false },
    { id: "21", time: "21 시", isSelect: false },
    { id: "22", time: "22 시", isSelect: false },
    { id: "23", time: "23 시", isSelect: false },
  ];
  const area = [
    { id: "01", area: "서울", isSelect: false },
    { id: "02", area: "부산", isSelect: false },
    { id: "03", area: "인천", isSelect: false },
    { id: "04", area: "대구", isSelect: false },
    { id: "05", area: "대전", isSelect: false },
    { id: "06", area: "광주", isSelect: false },
    { id: "07", area: "울산", isSelect: false },
    { id: "08", area: "세종", isSelect: false },
    { id: "09", area: "제주", isSelect: false },
    { id: "10", area: "경기", isSelect: false },
    { id: "11", area: "강원", isSelect: false },
    { id: "12", area: "충북", isSelect: false },
    { id: "13", area: "충남", isSelect: false },
    { id: "14", area: "전북", isSelect: false },
    { id: "15", area: "전남", isSelect: false },
    { id: "16", area: "경북", isSelect: false },
    { id: "17", area: "경남", isSelect: false },
  ];

  const timeScroll = useRef([]);
  const downIdx = ["12", "18", "23"];
  const upIdx = ["00", "00", "05", "11"];
  const [scrollIdx, setScrollIdx] = useState(0);
  const onButtonClick = (e) => {
    if (e.target.id === "up" && scrollIdx > 0) {
      setScrollIdx(scrollIdx - 1);
      const idx = upIdx[scrollIdx];
      timeScroll.current[idx].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    } else if (e.target.id === "down" && scrollIdx < 3) {
      setScrollIdx(scrollIdx + 1);
      const idx = downIdx[scrollIdx];
      timeScroll.current[idx].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const [weatherSelect, setWeatherSelect] = useState(weather);
  const [daySelect, setDaySelect] = useState(day);
  const [timeSelect, setTimeSelect] = useState(time);
  const [areaSelect, setAreaSelect] = useState(area);
  const [isSelectSuccess, setIsSelectSuccess] = useState(true);
  const [allSelect, setAllSelect] = useState({
    weather: false,
    day: false,
    time: false,
    area: false,
  });

  useEffect(() => {
    if (
      allSelect.weather &&
      allSelect.day &&
      allSelect.time &&
      allSelect.area
    ) {
      setIsSelectSuccess(false);
    } else {
      setIsSelectSuccess(true);
    }
  }, [allSelect]);

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
    weather[e.target.id].isSelect = true;
    setWeatherSelect([...weather]);
    allSelectHandle(weather[e.target.id].isSelect, null, null, null);
  };

  const daySelectHandle = (e) => {
    day[e.target.id].isSelect = true;
    setDaySelect([...day]);
    allSelectHandle(null, day[e.target.id].isSelect, null, null);
  };

  const timeSelectHandle = (e) => {
    time[parseInt(e.target.id)].isSelect = true;
    setTimeSelect([...time]);
    allSelectHandle(null, null, time[parseInt(e.target.id)].isSelect, null);
  };

  const areaSelectHandle = (e) => {
    area[parseInt(e.target.id) - 1].isSelect = true;
    setAreaSelect([...area]);
    allSelectHandle(null, null, null, area[parseInt(e.target.id) - 1].isSelect);
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
      getSearchHandle(
        weatherTitle.id,
        dayTitle.id,
        `${timeTitle.id}00`,
        areaTitle.id
      );
    }
  };

  return (
    <>
      <SelectListContainer isActivation={isActivation}>
        <SelectListBox width="true">
          <SideArea />
          <SelectList width="true">
            {weatherSelect.map((weather, idx) => {
              return (
                <WeatherItem
                  selectId={weather.isSelect}
                  onClick={(e) => weatherSelectHandle(e)}
                  id={weather.id}
                  key={idx}
                >
                  {weather.isSelect ? (
                    <div>
                      <img src={weather.click} alt="weatherClick" />
                    </div>
                  ) : (
                    <div>
                      <img src={weather.unClick} alt="weatherUnClick" />
                    </div>
                  )}
                  {weather.weather}
                </WeatherItem>
              );
            })}
          </SelectList>
          <SideArea />
        </SelectListBox>
        <SelectListBox>
          <SelectList around="true">
            {daySelect.map((day, idx) => {
              return (
                <DayItem
                  selectId={day.isSelect}
                  onClick={(e) => daySelectHandle(e)}
                  id={day.id}
                  key={idx}
                >
                  {day.isSelect ? (
                    <div>
                      <img src={day.click} alt="dayClick" />
                    </div>
                  ) : (
                    <div>
                      <img src={day.unClick} alt="dayUnClick" />
                    </div>
                  )}
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
              alt="upArrow"
            />
          </ArrowPosition>
          <SelectList>
            {timeSelect.map((time, idx) => {
              return (
                <TimeItem
                  selectId={time.isSelect}
                  onClick={(e) => timeSelectHandle(e)}
                  id={time.id}
                  ref={(el) => (timeScroll.current[time.id] = el)}
                  key={idx}
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
              alt="downArrow"
            />
          </ArrowPosition>
        </SelectListBox>
        <SelectListBox border={"none"}>
          <SelectList wrap="true" area={"5px 0 5px 0"} padding={"10px"}>
            {areaSelect.map((area, idx) => {
              return (
                <AreaItem
                  selectId={area.isSelect}
                  onClick={(e) => areaSelectHandle(e)}
                  id={area.id}
                  key={idx}
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
