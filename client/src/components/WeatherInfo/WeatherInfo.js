import React from "react";
import LineChart from "../Graph/LineGraph";

import {
  WeatherInfoContainer,
  InfoTitle,
  InfoContainer,
  InfoItemTitle,
  InfoItemDate,
  InfoItemItem,
  TitleContainer,
  DaySelectButton,
  DaySelectButtonContainer,
} from "./WeatherInfo.style";

function WeatherInfo({ graphOption, areaWeather, areaName }) {
  return (
    <div>
      <WeatherInfoContainer>
        <TitleContainer>
          <InfoTitle>{areaName}의 날씨 정보</InfoTitle>
          <DaySelectButtonContainer>
            <DaySelectButton id={1}>오늘</DaySelectButton>
            <DaySelectButton id={2}>내일</DaySelectButton>
            <DaySelectButton id={3}>모레</DaySelectButton>
          </DaySelectButtonContainer>
        </TitleContainer>
        <InfoContainer>
          <InfoItemTitle>기온</InfoItemTitle>
          <InfoItemDate>
            <span>2021.10.06</span>
            <span>섭씨 (°C)</span>
          </InfoItemDate>
          <InfoItemItem>
            <LineChart areaWeather={areaWeather} graphOption={graphOption}></LineChart>
          </InfoItemItem>
        </InfoContainer>
        <InfoContainer>
          <InfoItemTitle>강수</InfoItemTitle>
          <InfoItemDate>
            <span>2021.10.06</span>
            <span>확률 (%)</span>
          </InfoItemDate>
          <InfoItemItem>
            <LineChart
              areaWeather={areaWeather}
              graphOption={graphOption}
              POPbar={true}
            ></LineChart>
          </InfoItemItem>
        </InfoContainer>
        <InfoContainer>
          <InfoItemTitle>습도</InfoItemTitle>
          <InfoItemDate>
            <span>2021.10.06</span>
            <span>상대습도 (%)</span>
          </InfoItemDate>
          <InfoItemItem>
            <LineChart REHbar={true} graphOption={graphOption}></LineChart>
          </InfoItemItem>
        </InfoContainer>
      </WeatherInfoContainer>
    </div>
  );
}

export default WeatherInfo;
