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

  const [graphOption, setGraphOption] = useState();
  const [nowWeather, setNowWeather] = useState([]);
  const [areaWeather, setAreaWeather] = useState([]);
  const [dateInfo, setDateInfo] = useState([]);
  const [chartId, setChartId] = useState(0);
  const initGraph = [
    {
      options: {
        chart: {
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: "10px",
            colors: ["#2d2d2d"],
          },
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
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: "10px",
            colors: ["#2d2d2d"],
          },
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
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: "10px",
            colors: ["#2d2d2d"],
          },
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
  ];
  //상세날씨정보
  const getAreaWeather = (x, y, date) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/weather/area`, {
        params: {
          nx: x,
          ny: y,
        },
      })
      .then((res) => {
        setAreaWeather(res.data);
        setDateInfo([res.data[0], res.data[72], res.data[144]]);
        dataHandle(res.data, date);
      });
  };

  const getCityWeather = (weather, day, time, area) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/weather/city`, {
        params: {
          city: area,
          day: day,
          time: time,
          weather: weather,
        },
      })
      .then((res) => {
        if (res.data.message) {
          alert("조건에 맞는 정보가 없습니다.");
        } else {
          setNowWeather(res.data);
          setGraphOption(initGraph);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [weatherColor, setWeatherColor] = useState("0");

  const getSearchHandle = (weather, day, time, area) => {
    getCityWeather(`${weather}`, `${day}`, time, area);
    setWeatherColor(weather);
  };

  const ChartHandle = (idx) => {
    setChartId(idx);
    dataHandle(areaWeather, idx);
  };

  const changeAreaHandle = (area, x, y) => {
    setAreaName(area);
    getAreaWeather(x, y, chartId);
  };

  useEffect(() => {
    const date = new Date();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const nowDate = `${date.getFullYear()}${month}${date.getDate()}`;
    const nowTime = `${date.getHours()}`;

    setDateTime({
      date: nowDate,
      time: nowTime,
    });
    setGraphOption(initGraph);
  }, []);

  const dataHandle = (areaWeatherData, date) => {
    let dayArr = [];
    let popArr = [[], [], []];
    let tmpArr = [[], [], []];
    let rehArr = [[], [], []];

    let day = 71;
    let tomorrow = day * 2;
    let dayAfterTomorrow = day * 3;

    let rootIdx = 2;
    for (let i = 0; i < areaWeatherData.length; i++) {
      if (rootIdx - i === 0 && i <= day) {
        dayArr.push(`${areaWeatherData[i].time.slice(0, 2)}시`);
        rootIdx += 3;
      }
    }

    for (let i = 0; i < areaWeatherData.length; i++) {
      if (areaWeatherData[i].category === "POP") {
        if (i <= day) {
          popArr[0].push(parseInt(areaWeatherData[i].value));
        } else if (i <= tomorrow) {
          popArr[1].push(parseInt(areaWeatherData[i].value));
        } else if (i <= dayAfterTomorrow) {
          popArr[2].push(parseInt(areaWeatherData[i].value));
        }
      } else if (areaWeatherData[i].category === "TMP") {
        if (i <= day) {
          tmpArr[0].push(parseInt(areaWeatherData[i].value));
        } else if (i <= tomorrow) {
          tmpArr[1].push(parseInt(areaWeatherData[i].value));
        } else if (i <= dayAfterTomorrow) {
          tmpArr[2].push(parseInt(areaWeatherData[i].value));
        }
      } else if (areaWeatherData[i].category === "REH") {
        if (i <= day) {
          rehArr[0].push(parseInt(areaWeatherData[i].value));
        } else if (i <= tomorrow) {
          rehArr[1].push(parseInt(areaWeatherData[i].value));
        } else if (i <= dayAfterTomorrow) {
          rehArr[2].push(parseInt(areaWeatherData[i].value));
        }
      }
    }

    let graphData = [
      {
        options: {
          chart: {
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              colors: ["#4d90fa"],
            },
          },
          xaxis: {
            type: "category",
            categories: dayArr,
            tickAmount: 3,
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
            type: "bar",
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: "top", // top, center, bottom
              },
            },
          },
          dataLabels: {
            enabled: true,
            offsetY: -20,
            style: {
              fontSize: "10px",
              colors: ["#4d90fa"],
            },
            background: {
              enabled: true,
              foreColor: "#ffffff",
            },
          },
          xaxis: {
            type: "category",
            categories: dayArr,
            tickAmount: 3,
            tickPlacement: "on",
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
            type: "bar",
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: "top", // top, center, bottom
              },
            },
          },
          dataLabels: {
            enabled: true,
            offsetY: -20,
            style: {
              fontSize: "10px",
              colors: ["#4d90fa"],
            },
            background: {
              enabled: true,
              foreColor: "#ffffff",
            },
          },
          xaxis: {
            type: "category",
            categories: dayArr,
            tickAmount: 3,
            tickPlacement: "on",
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

    setGraphOption(graphData);
  };

  const [buttonColor, setButton] = useState({
    today: true,
    tomorrow: false,
    dayAfterTomorrow: false,
  });

  const showChart = (idx) => {
    let newButtonColor = {
      today: false,
      tomorrow: false,
      dayAfterTomorrow: false,
    };

    if (idx === "0") {
      newButtonColor.today = true;
    } else if (idx === "1") {
      newButtonColor.tomorrow = true;
    } else if (idx === "2") {
      newButtonColor.dayAfterTomorrow = true;
    }
    setButton(newButtonColor);
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
        setNowWeather={setNowWeather}
      ></WeatherSearch>
      {isShowWeatherInfo ? (
        <WeatherInfo
          dateInfo={dateInfo}
          graphOption={graphOption}
          areaName={areaName}
          ChartHandle={ChartHandle}
          showChart={showChart}
          buttonColor={buttonColor}
        ></WeatherInfo>
      ) : (
        <></>
      )}
    </MainPageContainer>
  );
}

export default MainPage;
