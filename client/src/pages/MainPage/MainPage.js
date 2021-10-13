import React, { useEffect, useState } from "react";
import WeatherInfo from "../../components/WeatherInfo/WeatherInfo";
import WeatherSearch from "../../components/WeatherSearch/WeatherSearch";
import { MainPageContainer } from "./MainPage.style";
import axios from "axios";

function MainPage() {
  const [isShowWeatherInfo, setIsShowWeatherInfo] = useState(false);
  const [areaName, setAreaName] = useState("");
  const [dateTime, setDateTime] = useState();

  const searchWeatherHandle = (boolean) => {
    setIsShowWeatherInfo(boolean);
  };

  const [graphOption, setGraphOption] = useState([]);
  const [nowWeather, setNowWeather] = useState([]);
  const [areaWeather, setAreaWeather] = useState([
    ["20211012", "2200", "POP", "20"],
    ["20211012", "2200", "TMP", "17"],
    ["20211012", "2200", "REH", "30"],
    ["20211012", "2300", "POP", "10"],
    ["20211012", "2300", "TMP", "19"],
    ["20211012", "2300", "REH", "40"],
    ["20211013", "0000", "TMP", "21"],
    ["20211013", "0000", "POP", "90"],
    ["20211013", "0000", "REH", "20"],
    ["20211013", "0100", "TMP", "16"],
    ["20211013", "0100", "POP", "80"],
    ["20211013", "0100", "REH", "50"],
    ["20211013", "0200", "POP", "70"],
    ["20211013", "0200", "TMP", "18"],
    ["20211013", "0200", "REH", "30"],
    ["20211013", "0300", "TMP", "15"],
    ["20211013", "0300", "REH", "25"],
    ["20211013", "0300", "POP", "40"],
    ["20211013", "0400", "TMP", "14"],
    ["20211013", "0400", "REH", "15"],
    ["20211013", "0400", "POP", "60"],
    ["20211013", "0500", "TMP", "16"],
    ["20211013", "0500", "REH", "35"],
    ["20211013", "0500", "POP", "30"],
  ]);

  const getAreaWeather = (x, y) => {
    axios
      .get("http://localhost:4000/weather/area", {
        params: {
          nx: x,
          ny: y,
        },
      })
      .then((res) => {
        setAreaWeather(res.data);
        console.log(res.data);
      });
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
        console.log(res.data);
      })
      .catch((err) => {
        console.log("err~!!!!");
      });
  };

  const getSearchHandle = (weather, day, time, area) => {
    getCityWeather(`${weather}`, `${day}`, time, area);
  };

  const changeAreaHandle = (area, x, y) => {
    setAreaName(area);
    // dataHandle(dummy);
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

  // const dataHandle = (dummy) => {
  //   let tempArr = [];
  //   let dayArr = [];

  //   dummy.map((data) => {
  //     tempArr.push(data.tmp);
  //     dayArr.push(data.time.slice(0, 2));
  //   });

  const dataHandle = () => {
    let dayArr = [];
    let popArr = [];
    let tmpArr = [];
    let rehArr = [];

    areaWeather.sort((a, b) => a[0] - b[0]);
    // areaWeather.sort((a, b) => a[1] - b[1]);
    let rootIdx = 2;
    areaWeather.map((data, idx) => {
      if (idx - rootIdx === 0) {
        if (idx > 2 && data[1] === "0000") {
          dayArr.push(`내일 ${data[1].slice(0, 2)}시`);
        } else if (idx > 2) {
          dayArr.push(`${data[1].slice(0, 2)}시`);
          rootIdx += 3;
        }
      }
    });

    areaWeather.map((data) => {
      if (data[2] === "POP") {
        popArr.push(data[3]);
      } else if (data[2] === "TMP") {
        tmpArr.push(`${data[3]}`);
      } else if (data[2] === "REH") {
        rehArr.push(`${data[3]}`);
      }
    });

    let graphData = [
      {
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
            name: "강수확률",
            data: popArr,
          },
        ],
      },
      {
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
            data: tmpArr,
          },
        ],
      },
      {
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
            name: "습도",
            data: rehArr,
          },
        ],
      },
    ];

    setGraphOption(graphData);
  };

  return (
    <MainPageContainer>
      <WeatherSearch
        changeAreaHandle={changeAreaHandle}
        searchWeatherHandle={searchWeatherHandle}
        isShowWeatherInfo={isShowWeatherInfo}
        getSearchHandle={getSearchHandle}
        nowWeather={nowWeather}
        dataHandle={dataHandle}
      ></WeatherSearch>
      {isShowWeatherInfo ? (
        <WeatherInfo
          areaWeather={areaWeather}
          graphOption={graphOption}
          areaName={areaName}
        ></WeatherInfo>
      ) : null}
    </MainPageContainer>
  );
}

export default MainPage;
