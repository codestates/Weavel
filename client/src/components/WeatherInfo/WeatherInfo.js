import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

function WeatherInfo({
  graphOption,
  areaName,
  ChartHandle,
  showChart,
  buttonColor,
}) {
  const chartButtonIdx = (e) => {
    ChartHandle(e.target.id);
    showChart(e.target.id);
  };

  return (
    <div>
      <WeatherInfoContainer>
        <TitleContainer>
          <InfoTitle>{areaName}의 날씨 정보</InfoTitle>
          <DaySelectButtonContainer>
            <DaySelectButton
              buttonColor={buttonColor.today}
              onClick={(e) => chartButtonIdx(e)}
              id={"0"}
            >
              오늘
            </DaySelectButton>
            <DaySelectButton
              buttonColor={buttonColor.tomorrow}
              onClick={(e) => chartButtonIdx(e)}
              id={"1"}
            >
              내일
            </DaySelectButton>
            <DaySelectButton
              buttonColor={buttonColor.dayAfterTomorrow}
              onClick={(e) => chartButtonIdx(e)}
              id={"2"}
            >
              모레
            </DaySelectButton>
          </DaySelectButtonContainer>
        </TitleContainer>
        <InfoContainer>
          <InfoItemTitle>기온</InfoItemTitle>
          <InfoItemDate>
            <span>2021.10.06</span>
            <span>섭씨 (°C)</span>
          </InfoItemDate>
          <InfoItemItem>
            <LineChart graphOption={graphOption} TMPline={true}></LineChart>
          </InfoItemItem>
        </InfoContainer>
        <InfoContainer>
          <InfoItemTitle>강수</InfoItemTitle>
          <InfoItemDate>
            <span>2021.10.06</span>
            <span>확률 (%)</span>
          </InfoItemDate>
          <InfoItemItem>
            <LineChart graphOption={graphOption} POPbar={true}></LineChart>
          </InfoItemItem>
        </InfoContainer>
        <InfoContainer>
          <InfoItemTitle>습도</InfoItemTitle>
          <InfoItemDate>
            <span>2021.10.06</span>
            <span>상대습도 (%)</span>
          </InfoItemDate>
          <InfoItemItem>
            <LineChart graphOption={graphOption} REHbar={true}></LineChart>
          </InfoItemItem>
        </InfoContainer>
      </WeatherInfoContainer>
    </div>
  );
}

export default WeatherInfo;
