import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  EditModalContainer,
  HeadText,
  EditInfoContainer,
  FixedDiv,
  AllPasswordContainer,
  WeatherBox,
} from "./EditUserInfoModal.style";
import {
  ConfirmButton,
  CancelButton,
  ButtonContainer,
} from "../Modal/Modal.style";

import { InputLabel } from "../../pages/LoginPage/LoginPage.style";

import {
  Sunny,
  Cloud,
  Rain,
  Snow,
} from "../../pages/SignupPage/SignupPage.style";

import {
  PasswordContainer,
  PasswordInput,
  PasswordMessage,
  PasswordConfirmContainer,
  PasswordConfirmInput,
  PasswordConfirmMessage,
} from "../../pages/SignupPage/SignupPage.style";

function EditUserInfoModal({
  openCloseModalHandler,
  loginUserInfo,
  putUserInfo,
  isWeather,
  weatherCheckHandle,
}) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitValid, setIsSubmitValid] = useState(false);

  const isValidInput = {
    isPassword: null,
    isPasswordConfirm: null,
  };

  const [isCheckInput, SetIsCheckInput] = useState(isValidInput);

  const inputValueHandle = (e) => {
    if (e.target.id === "password") {
      setPassword(e.target.value);
    } else if (e.target.id === "passwordConfirm") {
      setPasswordConfirm(e.target.value);
    }
  };

  const editInfohandler = (e) => {
    let arrEditWeather = [];
    if (isWeather.sunny) {
      arrEditWeather.push(1);
    }
    if (isWeather.cloud) {
      arrEditWeather.push(2);
    }
    if (isWeather.rain) {
      arrEditWeather.push(3);
    }
    if (isWeather.snow) {
      arrEditWeather.push(4);
    }
    if (password === passwordConfirm) {
      putUserInfo(arrEditWeather, password, loginUserInfo.email);
    }
    openCloseModalHandler(e);
  };

  useEffect(() => {
    if (isCheckInput.isPassword && isCheckInput.isPasswordConfirm) {
      setIsSubmitValid(true);
    } else {
      setIsSubmitValid(false);
    }
  }, [isCheckInput]);

  const inputValidHandle = (e) => {
    let isNewCheckInput = { ...isCheckInput };
    if (e.target.id === "password") {
      isNewCheckInput.isPassword = passwordHandle(e.target.value);
      SetIsCheckInput(isNewCheckInput);
    } else if (e.target.id === "passwordConfirm") {
      isNewCheckInput.isPasswordConfirm = isPasswordConfirmHandle(
        e.target.value
      );
      SetIsCheckInput(isNewCheckInput);
    }
  };

  const passwordHandle = (password) => {
    if (!password.length) {
      return null;
    }

    let check = password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    );
    return password.length > 7 && password.length < 17 && check ? true : false;
  };

  const isPasswordConfirmHandle = (passwordConfirm) => {
    if (!passwordConfirm.length) {
      return null;
    }
    return password === passwordConfirm ? true : false;
  };

  return (
    <EditModalContainer onClick={(e) => e.stopPropagation()}>
      <HeadText>회원정보 수정</HeadText>
      <EditInfoContainer>
        <InputLabel margin={"0 0 5px 0"}>이름</InputLabel>
        <FixedDiv margin={"0 0 20px 0"}>{loginUserInfo.name} </FixedDiv>
        <InputLabel margin={"0 0 5px 0"}>이메일</InputLabel>
        <FixedDiv margin={"0 0 20px 0"}>{loginUserInfo.email}</FixedDiv>
        <span>좋아하는 날씨</span>
        <WeatherBox>
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
        <AllPasswordContainer>
          <PasswordContainer margin={"20px"}>
            <span>비밀번호</span>
            <PasswordInput
              type="password"
              id="password"
              onChange={(e) => inputValueHandle(e)}
              onKeyUp={(e) => inputValidHandle(e)}
            />
            <PasswordMessage margin={"0"} isPassword={isCheckInput.isPassword}>
              {isCheckInput.isPassword === null
                ? null
                : isCheckInput.isPassword
                ? "사용 가능한 비밀번호입니다"
                : "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요"}
            </PasswordMessage>
          </PasswordContainer>
          <PasswordConfirmContainer margin={"0"}>
            <span>비밀번호 확인</span>
            <PasswordConfirmInput
              type="password"
              id="passwordConfirm"
              onChange={(e) => inputValueHandle(e)}
              onKeyUp={(e) => inputValidHandle(e)}
            />
            <PasswordConfirmMessage
              margin={"0"}
              isPasswordConfirm={isCheckInput.isPasswordConfirm}
            >
              {isCheckInput.isPasswordConfirm === null
                ? null
                : isCheckInput.isPasswordConfirm
                ? "비밀번호가 일치합니다"
                : "비밀번호를 다시 확인해 주세요"}
            </PasswordConfirmMessage>
          </PasswordConfirmContainer>
        </AllPasswordContainer>
      </EditInfoContainer>
      <ButtonContainer>
        <ConfirmButton
          noSubmit={!isSubmitValid}
          onClick={(e) => {
            editInfohandler(e);
          }}
          disabled={!isSubmitValid}
        >
          수정
        </ConfirmButton>
        <CancelButton onClick={openCloseModalHandler}>취소</CancelButton>
      </ButtonContainer>
    </EditModalContainer>
  );
}

export default EditUserInfoModal;
