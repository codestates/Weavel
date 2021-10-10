import React, { useState, useEffect } from "react";
import {
  SignupContainer,
  SignupTitle,
  NameContainer,
  NameInput,
  EmailContainer,
  EmailInputBox,
  EmailInput,
  EmailConfirmMessage,
  CheckEmail,
  WeatherContainer,
  WeatherChoiceBox,
  Sunny,
  Cloud,
  Rain,
  Snow,
  PasswordContainer,
  PasswordInput,
  PasswordMessage,
  PasswordConfirmContainer,
  PasswordConfirmInput,
  PasswordConfirmMessage,
  SubmitSignup,
} from "./SignupPage.style";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isSubmitValid, setIsSubmitValid] = useState(false);

  const isValidInput = {
    isEmail: null,
    isPassword: null,
    isPasswordConfirm: null,
  };
  const isEmailResponse = { isSuccess: false, isFail: false };
  const [isCheckEmail, SetIsCheckEmail] = useState(isEmailResponse);
  const [isCheckInput, SetIsCheckInput] = useState(isValidInput);

  const isCheckWeather = {
    sunny: false,
    cloud: false,
    rain: false,
    snow: false,
  };

  const [isWeather, setIsWeather] = useState(isCheckWeather);
  const weatherCheckHandle = (e) => {
    let newWeather = { ...isWeather };
    if (e.target.id === "0") {
      newWeather.sunny = !newWeather.sunny;
      setIsWeather(newWeather);
    }
    if (e.target.id === "1") {
      newWeather.cloud = !newWeather.cloud;
      setIsWeather(newWeather);
    }
    if (e.target.id === "2") {
      newWeather.rain = !newWeather.rain;
      setIsWeather(newWeather);
    }
    if (e.target.id === "3") {
      newWeather.snow = !newWeather.snow;
      setIsWeather(newWeather);
    }
  };

  const inputValueHandle = (e) => {
    if (e.target.id === "name") {
      setName(e.target.value);
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    } else if (e.target.id === "passwordConfirm") {
      setPasswordConfirm(e.target.value);
    }
  };

  useEffect(() => {
    if (
      name.length > 5 &&
      isCheckInput.isEmail &&
      isCheckInput.isPassword &&
      isCheckInput.isPasswordConfirm
    ) {
      setIsSubmitValid(false);
    } else {
      setIsSubmitValid(true);
    }
  }, [isCheckInput, name]);

  const inputValidHandle = (e) => {
    let isNewCheckInput = { ...isCheckInput };
    if (e.target.id === "email") {
      isNewCheckInput.isEmail = emailHandle(e.target.value);
      SetIsCheckInput(isNewCheckInput);
    } else if (e.target.id === "password") {
      isNewCheckInput.isPassword = passwordHandle(e.target.value);
      SetIsCheckInput(isNewCheckInput);
    } else if (e.target.id === "passwordConfirm") {
      isNewCheckInput.isPasswordConfirm = isPasswordConfirmHandle(e.target.value);
      SetIsCheckInput(isNewCheckInput);
    }
  };

  const emailHandle = (email) => {
    if (!email.length) {
      return null;
    }
    let check = email.match(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    );

    return email.indexOf(".") !== -1 && check ? true : false;
  };

  const passwordHandle = (password) => {
    if (!password.length) {
      return null;
    }

    let check = password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
    return password.length > 7 && password.length < 17 && check ? true : false;
  };

  const isPasswordConfirmHandle = (passwordConfirm) => {
    if (!passwordConfirm.length) {
      return null;
    }
    return password === passwordConfirm ? true : false;
  };

  return (
    <SignupContainer>
      <SignupTitle>회원가입</SignupTitle>
      <NameContainer>
        <span>이름</span>
        <NameInput id="name" onChange={(e) => inputValueHandle(e)} />
      </NameContainer>
      <EmailContainer>
        <span>이메일</span>
        <EmailInputBox>
          <EmailInput
            id="email"
            onChange={(e) => inputValueHandle(e)}
            onKeyUp={(e) => inputValidHandle(e)}
          />
          <CheckEmail disabled={!isCheckInput.isEmail} isButtonValid={!isCheckInput.isEmail}>
            중복 확인
          </CheckEmail>
        </EmailInputBox>
        <EmailConfirmMessage
          isSuccess={isEmailResponse.isSuccess}
          isFail={isEmailResponse.isFail}
          isEmail={isCheckInput.isEmail}
        >
          {isEmailResponse.isSuccess
            ? "사용 가능한 이메일입니다."
            : isEmailResponse.isFail
            ? "이미 가입 된 이메일입니다."
            : isCheckInput.isEmail === null
            ? null
            : isCheckInput.isEmail
            ? null
            : "올바른 이메일을 입력해주세요."}
        </EmailConfirmMessage>
      </EmailContainer>
      <WeatherContainer
        isSuccess={isEmailResponse.isSuccess}
        isFail={isEmailResponse.isFail}
        isEmail={isCheckInput.isEmail}
      >
        <span>좋아하는 날씨</span>
        <WeatherChoiceBox>
          <Sunny isSunny={isWeather.sunny} id="0" onClick={(e) => weatherCheckHandle(e)}>
            맑음
          </Sunny>
          <Cloud isCloud={isWeather.cloud} id="1" onClick={(e) => weatherCheckHandle(e)}>
            구름
          </Cloud>
          <Rain isRain={isWeather.rain} id="2" onClick={(e) => weatherCheckHandle(e)}>
            비
          </Rain>
          <Snow isSnow={isWeather.snow} id="3" onClick={(e) => weatherCheckHandle(e)}>
            눈
          </Snow>
        </WeatherChoiceBox>
      </WeatherContainer>
      <PasswordContainer>
        <span>비밀번호</span>
        <PasswordInput
          type="password"
          id="password"
          onChange={(e) => inputValueHandle(e)}
          onKeyUp={(e) => inputValidHandle(e)}
        />
        <PasswordMessage isPassword={isCheckInput.isPassword}>
          {isCheckInput.isPassword === null
            ? null
            : isCheckInput.isPassword
            ? "사용 가능한 비밀번호입니다"
            : "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요"}
        </PasswordMessage>
      </PasswordContainer>
      <PasswordConfirmContainer>
        <span>비밀번호 확인</span>
        <PasswordConfirmInput
          type="password"
          id="passwordConfirm"
          onChange={(e) => inputValueHandle(e)}
          onKeyUp={(e) => inputValidHandle(e)}
        />
        <PasswordConfirmMessage isPasswordConfirm={isCheckInput.isPasswordConfirm}>
          {isCheckInput.isPasswordConfirm === null
            ? null
            : isCheckInput.isPasswordConfirm
            ? "비밀번호가 일치합니다"
            : "비밀번호를 다시 확인해 주세요"}
        </PasswordConfirmMessage>
      </PasswordConfirmContainer>
      <SubmitSignup disabled={isSubmitValid} isButtonValid={isSubmitValid}>
        가입
      </SubmitSignup>
      <a>가입하신 이메일이 있으신가요? 로그인 하러가기</a>
    </SignupContainer>
  );
}

export default SignupPage;
