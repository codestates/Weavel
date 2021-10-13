import React, { useEffect, useState } from "react";
import WeatherInfo from "../../components/WeatherInfo/WeatherInfo";
import WeatherSearch from "../../components/WeatherSearch/WeatherSearch";
import { MainPageContainer } from "./MainPage.style";
import { dummy } from "../../components/Graph/data";
import axios from "axios";

function MainPage() {
  const [isShowWeatherInfo, setIsShowWeatherInfo] = useState(false);
  const [areaName, setAreaName] = useState("");
  const [dateTime, setDateTime] = useState();
  const searchWeatherHandle = (boolean) => {
    if (!isShowWeatherInfo) {
      setIsShowWeatherInfo(boolean);
    }
  };
  const [nowWeather, setNowWeather] = useState([]);

  const getAreaWeather = (x, y) => {
    axios
      .get("http://localhost:4000/weather/area", {
        params: {
          nx: x,
          ny: y,
        },
      })
      .then((res) => console.log(res));
  };
  const getCityWeather = (weather, day, time, area) => {
    console.log(weather, day, time, area);
    axios
      .get("http://localhost:4000/weather/city", {
        params: {
          city: area,
          day: day,
          time: time,
          weather: weather,
        },
      })
      .then((res) => {
        setNowWeather(res.data);
      });
  };

  const getSearchHandle = (weather, day, time, area) => {
    getCityWeather(`${weather}`, `${day}`, time, area);
  };

  const changeAreaHandle = (area, x, y) => {
    setAreaName(area);
    dataHandle(dummy);
    // getAreaWeather(x, y);
  };

  useEffect(() => {
    const date = new Date();
    const month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const nowDate = `${date.getFullYear()}${month}${date.getDate()}`;
    const nowTime = `${date.getHours()}`;
    setDateTime({
      date: nowDate,
      time: nowTime,
    });
  }, []);

  const [tem, setTemp] = useState();

  const dataHandle = (dummy) => {
    let tempArr = [];
    let dayArr = [];

    dummy.map((data) => {
      tempArr.push(data.tmp);
      dayArr.push(data.time.slice(0, 2));
    });

    let temp = {
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: dayArr,
        },
      },
      series: [
        {
          name: "기온",
          data: tempArr,
        },
      ],
    };
    setTemp(temp);
  };

  return (
    <MainPageContainer>
      <WeatherSearch
        changeAreaHandle={changeAreaHandle}
        searchWeatherHandle={searchWeatherHandle}
        isShowWeatherInfo={isShowWeatherInfo}
        getSearchHandle={getSearchHandle}
        nowWeather={nowWeather}
      ></WeatherSearch>
      {isShowWeatherInfo ? (
        <WeatherInfo tem={tem} areaName={areaName}></WeatherInfo>
      ) : null}
    </MainPageContainer>
  );
}

export default MainPage;
