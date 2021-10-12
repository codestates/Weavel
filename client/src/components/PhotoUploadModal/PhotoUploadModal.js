import React from "react";
import {
  ConfirmButton,
  CancelButton,
  ButtonContainer,
} from "../Modal/Modal.style";

import { InputLabel, EmailInput } from "../../pages/LoginPage/LoginPage.style";
import { area } from "./SearchData";

import AutoComplete from "./AutoComplete";
import {
  Sunny,
  Cloud,
  Rain,
  Snow,
} from "../../pages/SignupPage/SignupPage.style";

import { WeatherBox } from "../EditUserInfoModal/EditUserInfoModal.style";
import { PhotoUploadContainer } from "./PhotoUploadModal.style";
import { EditInfoContainer } from "../EditUserInfoModal/EditUserInfoModal.style";
import PhotoUpload from "../PhotoUpload/PhotoUpload";
function PhotoUploadModal({
  openCloseModalHandler,
  isWeather,
  weatherCheckHandle,
  loginUserInfo,
  token,
}) {
  return (
    <PhotoUploadContainer onClick={(e) => e.stopPropagation()}>
      <PhotoUpload token={token} loginUserInfo={loginUserInfo} />
      <EditInfoContainer margin={"270px"}>
        <InputLabel>날짜</InputLabel>
        <EmailInput placeholder="YYYY / MM / DD" maxLength="10" />
        <InputLabel>지역</InputLabel>
        <AutoComplete suggestions={area} />
        <InputLabel>날씨</InputLabel>
        <WeatherBox margin={"0 10px 15px 34px"}>
          <Sunny
            isSunny={isWeather.sunny}
            id="0"
            onClick={(e) => weatherCheckHandle(e)}
          >
            맑음
          </Sunny>
          <Cloud
            isCloud={isWeather.cloud}
            id="1"
            onClick={(e) => weatherCheckHandle(e)}
          >
            구름
          </Cloud>
          <Rain
            isRain={isWeather.rain}
            id="2"
            onClick={(e) => weatherCheckHandle(e)}
          >
            비
          </Rain>
          <Snow
            isSnow={isWeather.snow}
            id="3"
            onClick={(e) => weatherCheckHandle(e)}
          >
            눈
          </Snow>
        </WeatherBox>
        <InputLabel>코멘트</InputLabel>
        <EmailInput
          placeholder="25글자 이내로 남기고 싶은 코멘트를 적어주세요"
          maxLength="25"
        />
        <span>
          <ButtonContainer>
            <ConfirmButton>업로드</ConfirmButton>
            <CancelButton onClick={openCloseModalHandler}>취소</CancelButton>
          </ButtonContainer>
        </span>
      </EditInfoContainer>
    </PhotoUploadContainer>
  );
}

export default PhotoUploadModal;
