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
        setDateInfo([res.data[0], res.data[54], res.data[155]]);
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
    console.log(nowTime);
    setDateTime({
      date: nowDate,
      time: nowTime,
    });
    setGraphOption(initGraph);
  }, []);

  const dataHandle = (areaWeatherData, date) => {
    let dayArr = [[], [], []];
    let popArr = [[], [], []];
    let tmpArr = [[], [], []];
    let rehArr = [[], [], []];

    let today = 54;
    let tomorrow = 24 * 3 + today;
    let dayAfterTomorrow = 24 * 3 + tomorrow;
    //15 16~87     72+16+72
    let rootIdx = 2;
    for (let i = 0; i < areaWeatherData.length; i++) {
      if (rootIdx - i === 0 && i < today) {
        dayArr[0].push(`${areaWeatherData[i].time.slice(0, 2)}시`);
        rootIdx += 3;
      } else if (rootIdx - i === 0 && i < tomorrow) {
        dayArr[1].push(`${areaWeatherData[i].time.slice(0, 2)}시`);
        rootIdx += 3;
      } else if (rootIdx - i === 0 && i < dayAfterTomorrow) {
        dayArr[2].push(`${areaWeatherData[i].time.slice(0, 2)}시`);
        rootIdx += 3;
      }
    }

    for (let i = 0; i < areaWeatherData.length; i++) {
      if (areaWeatherData[i].category === "POP") {
        if (i < today) {
          popArr[0].push(parseInt(areaWeatherData[i].value));
        } else if (i < tomorrow) {
          popArr[1].push(parseInt(areaWeatherData[i].value));
        } else if (i < dayAfterTomorrow) {
          popArr[2].push(parseInt(areaWeatherData[i].value));
        }
      } else if (areaWeatherData[i].category === "TMP") {
        if (i < today) {
          tmpArr[0].push(parseInt(areaWeatherData[i].value));
        } else if (i < tomorrow) {
          tmpArr[1].push(parseInt(areaWeatherData[i].value));
        } else if (i < dayAfterTomorrow) {
          tmpArr[2].push(parseInt(areaWeatherData[i].value));
        }
      } else if (areaWeatherData[i].category === "REH") {
        if (i < today) {
          rehArr[0].push(parseInt(areaWeatherData[i].value));
        } else if (i < tomorrow) {
          rehArr[1].push(parseInt(areaWeatherData[i].value));
        } else if (i < dayAfterTomorrow) {
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
            width: "100%",
          },
          dataLabels: {
            enabled: true,
            style: {
              colors: ["#4d90fa"],
            },
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
            type: "bar",
            width: "100%",
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
              fontSize: "12px",
              colors: ["#2d2d2d"],
            },
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
            type: "bar",
            width: "100%",
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
              fontSize: "12px",
              colors: ["#2d2d2d"],
            },
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
