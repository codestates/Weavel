import React, { useEffect, useState } from "react";
import WeatherInfo from "../../components/WeatherInfo/WeatherInfo";
import WeatherSearch from "../../components/WeatherSearch/WeatherSearch";
import { MainPageContainer } from "./MainPage.style";
import axios from "axios";
import { AlertBox, AlertText } from "../LoginPage/LoginPage.style";

function MainPage() {
  const [isShowWeatherInfo, setIsShowWeatherInfo] = useState(false);
  const [areaName, setAreaName] = useState("");
  const [dateTime, setDateTime] = useState();

  const searchWeatherHandle = (boolean) => {
    setIsShowWeatherInfo(boolean);
  };

  const [graphOption, setGraphOption] = useState([
    {
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: "강수확률",
          data: [],
        },
      ],
    },
    {
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: "기온",
          data: [],
        },
      ],
    },
    {
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: "습도",
          data: [],
        },
      ],
    },
  ]);
  const [nowWeather, setNowWeather] = useState([]);
  const [areaWeather, setAreaWeather] = useState([]);

  const getAreaWeather = (x, y, date) => {
    console.log(x, y);
    axios
      .get("http://localhost:4000/weather/area", {
        params: {
          nx: x,
          ny: y,
        },
      })
      .then((res) => {
        setAreaWeather(res.data);
        dataHandle(res.data, date);
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
      })
      .catch((err) => {
        console.log("err~!!!!");
      });
  };

  const [weatherColor, setWeatherColor] = useState("0");

  const getSearchHandle = (weather, day, time, area) => {
    getCityWeather(`${weather}`, `${day}`, time, area);
    setWeatherColor(weather);
  };

  const changeAreaHandle = (area, x, y, date) => {
    setAreaName(area);
    getAreaWeather(x, y, date);
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

  const dataHandle = (areaWeather, date) => {
    let dayArr = [[], [], []];
    let popArr = [[], [], []];
    let tmpArr = [[], [], []];
    let rehArr = [[], [], []];

    // areaWeather.sort((a, b) => a[0] - b[0]);
    console.log(areaWeather);

    let today = (24 - dateTime.time) * 3;
    let tomorrow = (48 - today) * 3;
    let dayAfterTomorrow = (72 - tomorrow) * 3;

    let rootIdx = 2;
    for (let i = 0; i < today; i++) {
      if (rootIdx - i === 0 && i < today) {
        dayArr[0].push(`${areaWeather[i][1].slice(0, 2)}시`);
        rootIdx += 3;
      } else if (rootIdx - i === 0 && i < tomorrow) {
        dayArr[1].push(`${areaWeather[i][1].slice(0, 2)}시`);
        rootIdx += 3;
      }
      if (rootIdx - i === 0 && i < dayAfterTomorrow) {
        dayArr[2].push(`${areaWeather[i][1].slice(0, 2)}시`);
        rootIdx += 3;
      }
    }

    for (let i = 0; i < areaWeather.length; i++) {
      if (areaWeather[i][2] === "POP") {
        if (i < today) {
          popArr[0].push(areaWeather[i][3]);
        } else if (i < tomorrow) {
          popArr[1].push(areaWeather[i][3]);
        }
        if (i < dayAfterTomorrow) {
          popArr[2].push(areaWeather[i][3]);
        }
      } else if (areaWeather[i][2] === "TMP") {
        if (i < today) {
          tmpArr[0].push(`${areaWeather[i][3]}`);
        } else if (i < tomorrow) {
          tmpArr[1].push(`${areaWeather[i][3]}`);
        }
        if (i < dayAfterTomorrow) {
          tmpArr[2].push(`${areaWeather[i][3]}`);
        }
      } else if (areaWeather[i][2] === "REH") {
        if (i < today) {
          rehArr[0].push(`${areaWeather[i][3]}`);
        } else if (i < tomorrow) {
          rehArr[1].push(`${areaWeather[i][3]}`);
        }
        if (i < dayAfterTomorrow) {
          rehArr[2].push(`${areaWeather[i][3]}`);
        }
      }
    }

    let graphData = [
      {
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: dayArr[date],
          },
        },
        series: [
          {
            name: "강수확률",
            data: popArr[date],
          },
        ],
      },
      {
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: dayArr[date],
          },
        },
        series: [
          {
            name: "기온",
            data: tmpArr[date],
          },
        ],
      },
      {
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: dayArr[date],
          },
        },
        series: [
          {
            name: "습도",
            data: rehArr[date],
          },
        ],
      },
    ];

    // let graphData = [...graphOption];
    // if (date === undefined) {
    //   date = 1;
    // }
    // graphData[0].options.xaxis.categories = dayArr[date];
    // graphData[0].series[0].data = popArr[date];
    // graphData[1].options.xaxis.categories = dayArr[date];
    // graphData[1].series[0].data = tmpArr[date];
    // graphData[2].options.xaxis.categories = dayArr[date];
    // graphData[2].series[0].data = rehArr[date];

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
        dateTime={dateTime}
        weatherColor={weatherColor}
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
