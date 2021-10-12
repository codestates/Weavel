import React, { useEffect, useState } from "react";
import WeatherInfo from "../../components/WeatherInfo/WeatherInfo";
import WeatherSearch from "../../components/WeatherSearch/WeatherSearch";
import { MainPageContainer } from "./MainPage.style";
import { dummy } from "../../components/Graph/data";

function MainPage() {
  const [isShowWeatherInfo, setIsShowWeatherInfo] = useState(false);
  const [areaName, setAreaName] = useState("");
  const [dateTime, setDateTime] = useState();
  const searchWeatherHandle = (boolean) => {
    setIsShowWeatherInfo(boolean);
  };

  const changeAreaHandle = (area, x, y) => {
    setAreaName(area);
  };

  const chartHandle = (x, y) => {
    console.log(x, y);
    dataHandle(dummy);
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
      series: [
        {
          name: "기온",
          data: tempArr,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#77B6EA"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },

        markers: {
          size: 1,
        },
        xaxis: {
          categories: dayArr,
        },
        yaxis: {
          min: -20,
          max: 45,
        },
      },
    };

    setTemp(temp);
  };

  return (
    <MainPageContainer>
      <WeatherSearch
        chartHandle={chartHandle}
        changeAreaHandle={changeAreaHandle}
        searchWeatherHandle={searchWeatherHandle}
        isShowWeatherInfo={isShowWeatherInfo}
      ></WeatherSearch>
      {isShowWeatherInfo ? <WeatherInfo tem={tem} areaName={areaName}></WeatherInfo> : null}
    </MainPageContainer>
  );
}

export default MainPage;
