import React, { useEffect, useState } from "react";
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

function PhotoUploadModal({ openCloseModalHandler, loginUserInfo, token }) {
  const [photoInfo, setphotoInfo] = useState({
    id: null,
    weather: [],
    date: null,
    area: null,
    filename: null,
    comment: null,
  });

  const [isPhotoWeather, setIsPhotoWeather] = useState({
    sunny: false,
    cloud: false,
    rain: false,
    snow: false,
    num: [],
  });

  function weatherButtonHandler(e) {
    const photoweather = {
      sunny: false,
      cloud: false,
      rain: false,
      snow: false,
      num: [],
    };
    if (e.target.id === "1") {
      photoweather.sunny = true;
      photoweather.num.push(1);
    } else if (e.target.id === "2") {
      photoweather.cloud = true;
      photoweather.num.push(2);
    } else if (e.target.id === "3") {
      photoweather.rain = true;
      photoweather.num.push(3);
    } else if (e.target.id === "4") {
      photoweather.snow = true;
      photoweather.num.push(4);
    }
    setIsPhotoWeather({ ...photoweather });
  }

  function commentHandler(e) {
    const newphotoInfo = { ...photoInfo };
    if (e.target.name === "comment") {
      newphotoInfo.comment = e.target.value;
    }
    if (e.target.name === "date") {
      newphotoInfo.date = e.target.value;
    }
    if (e.target.name === "area") {
      newphotoInfo.area = e.target.value;
    }
    newphotoInfo.weather = isPhotoWeather.num;
    setphotoInfo(newphotoInfo);
    console.log(newphotoInfo);
  }

  function photoUploadFinalHandler() {
    // 사진 저장 axios
    // 사진 정보 Input값 commentHandler
    // 사진 정보 저장 axios
  }

  const [fileInfo, setFileInfo] = useState({
    userId: loginUserInfo.id,
    image: null,
    filename: null,
  });

  const formData = new FormData();
  formData.append("userId", loginUserInfo.id);
  formData.append("image", fileInfo.image);
  formData.append("filename", fileInfo.filename);

  const handlePhotoUpload = () => {
    axios
      .post(
        "http://localhost:4000/photo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data.data);
        handlePhotoInfoUpload(res.data.data);
      })
      .catch((err) => {
        console.error(`signin error: ${err.message}`);
      });
  };

  const setFileHandle = (file) => {
    setFileInfo(file);
  };

  const handlePhotoInfoUpload = (photo) => {
    axios
      .post(
        "http://localhost:4000/photo/info",
        {
          id: photo.id,
          filename: photo.filename,
        },
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(`signin error: ${err.message}`);
      });
  };

  return (
    <PhotoUploadContainer onClick={(e) => e.stopPropagation()}>
      <PhotoUpload
        fileInfo={fileInfo}
        setFileHandle={setFileHandle}
        token={token}
        loginUserInfo={loginUserInfo}
      />
      <EditInfoContainer margin={"270px"}>
        <InputLabel>날짜</InputLabel>
        <EmailInput
          name="date"
          onChange={(e) => commentHandler(e)}
          placeholder="YYYYMMDD 형식으로 숫자만 입력해주세요"
          maxLength="10"
        />
        <InputLabel>지역</InputLabel>
        <AutoComplete
          photoInfo={photoInfo}
          name="area"
          suggestions={area}
          commentHandler={(e) => commentHandler(e)}
        />
        <InputLabel>날씨</InputLabel>
        <WeatherBox margin={"0 10px 15px 34px"}>
          <Sunny
            isSunnyPhoto={isPhotoWeather.sunny}
            id="1"
            onClick={(e) => weatherButtonHandler(e)}
          >
            맑음
          </Sunny>
          <Cloud
            isCloudPhoto={isPhotoWeather.cloud}
            id="2"
            onClick={(e) => weatherButtonHandler(e)}
          >
            구름
          </Cloud>
          <Rain
            isRainPhoto={isPhotoWeather.rain}
            id="3"
            onClick={(e) => weatherButtonHandler(e)}
          >
            비
          </Rain>
          <Snow
            isSnowPhoto={isPhotoWeather.snow}
            id="4"
            onClick={(e) => weatherButtonHandler(e)}
          >
            눈
          </Snow>
        </WeatherBox>
        <InputLabel>코멘트</InputLabel>
        <EmailInput
          name="comment"
          onChange={(e) => commentHandler(e)}
          placeholder="25글자 이내로 남기고 싶은 코멘트를 적어주세요"
          maxLength="25"
        />
        <span>
          <ButtonContainer>
            <ConfirmButton onClick={() => handlePhotoUpload()}>
              업로드
            </ConfirmButton>
            <CancelButton onClick={openCloseModalHandler}>취소</CancelButton>
          </ButtonContainer>
        </span>
      </EditInfoContainer>
    </PhotoUploadContainer>
  );
}

export default PhotoUploadModal;
