import react, { useState, useEffect } from "react";
import {
  UserInfoEditContainer,
  UserInfoEditInputContainer,
  UserInfoLabel,
  UserInfoWeatherContainer,
  UserInfoWeatherButton,
  BottomButtonContainer,
  EditButton,
  CancelButton,
  PasswordMessage,
  PasswordConfirmMessage,
} from "./EditUserInfoNew.style";

function EditUserInfoNew({
  editHandler,
  loginUserInfo,
  putUserInfo,
  setLoginUserInfo,
}) {
  const weatherArr = ["맑음", "구름", "비", "눈"];
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitValid, setIsSubmitValid] = useState(false);

  const isCheckWeather = {
    0: false,
    1: false,
    2: false,
    3: false,
  };
  const [isWeather, setIsWeather] = useState(isCheckWeather);
  const isValidInput = {
    isPassword: null,
    isPasswordConfirm: null,
  };
  const [isCheckInput, SetIsCheckInput] = useState(isValidInput);

  useEffect(() => {
    if (loginUserInfo.weatherDB.length > 0) {
      let previousWeather = { ...isWeather };
      loginUserInfo.weatherDB.map((el) => {
        previousWeather[el] = true;
      });
      setIsWeather(previousWeather);
    }
  }, []);

  const weatherBtnHandler = (e) => {
    let newWeather = { ...isWeather };
    newWeather[e.target.name] = !newWeather[e.target.name];
    setIsWeather(newWeather);
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

  const inputValueHandle = (e) => {
    if (e.target.id === "password") {
      setPassword(e.target.value);
    } else if (e.target.id === "passwordConfirm") {
      setPasswordConfirm(e.target.value);
    }
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

  const submitHandler = () => {
    let weather = [];

    for (let key in isWeather) {
      if (isWeather[key]) {
        weather.push(Number(key));
      }
    }
    putUserInfo(weather, password);
    let loginUserInfoCopy = { ...loginUserInfo };
    loginUserInfoCopy.weatherDB = weather;
    setLoginUserInfo(loginUserInfoCopy);
    editHandler();
  };

  return (
    <UserInfoEditContainer onClick={(e) => e.stopPropagation()}>
      <div id="title">회원정보 수정</div>
      <UserInfoEditInputContainer>
        <UserInfoLabel>이름</UserInfoLabel>
        <input
          type="text"
          value={loginUserInfo.name}
          className="ineditable"
          disabled
        />
      </UserInfoEditInputContainer>
      <UserInfoEditInputContainer>
        <UserInfoLabel>이메일</UserInfoLabel>
        <input
          type="email"
          value={loginUserInfo.email}
          className="ineditable"
          disabled
        />
      </UserInfoEditInputContainer>
      <UserInfoEditInputContainer>
        <UserInfoLabel>좋아하는 날씨</UserInfoLabel>
        <UserInfoWeatherContainer>
          {weatherArr.map((weather, idx) => {
            return (
              <UserInfoWeatherButton
                key={idx}
                name={idx}
                onClick={(e) => {
                  weatherBtnHandler(e);
                }}
                isClick={isWeather[idx]}
              >
                {weather}
              </UserInfoWeatherButton>
            );
          })}
        </UserInfoWeatherContainer>
      </UserInfoEditInputContainer>
      <UserInfoEditInputContainer>
        <UserInfoLabel>비밀번호</UserInfoLabel>
        <input
          type="password"
          id="password"
          autoComplete="off"
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
      </UserInfoEditInputContainer>
      <UserInfoEditInputContainer>
        <UserInfoLabel>비밀번호 확인</UserInfoLabel>
        <input
          type="password"
          id="passwordConfirm"
          onChange={(e) => inputValueHandle(e)}
          onKeyUp={(e) => inputValidHandle(e)}
        />
        <PasswordConfirmMessage
          isPasswordConfirm={isCheckInput.isPasswordConfirm}
        >
          {isCheckInput.isPasswordConfirm === null
            ? null
            : isCheckInput.isPasswordConfirm
            ? "비밀번호가 일치합니다"
            : "비밀번호를 다시 확인해 주세요"}
        </PasswordConfirmMessage>
      </UserInfoEditInputContainer>
      <BottomButtonContainer>
        <EditButton
          disabled={!isSubmitValid}
          isButtonValid={isSubmitValid}
          onClick={submitHandler}
        >
          수정
        </EditButton>
        <CancelButton onClick={editHandler}>취소</CancelButton>
      </BottomButtonContainer>
    </UserInfoEditContainer>
  );
}

export default EditUserInfoNew;
