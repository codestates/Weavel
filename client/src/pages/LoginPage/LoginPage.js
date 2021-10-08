import React, { useState } from "react";
import axios from "axios";

import {
  LoginContainer,
  LoginText,
  EmailInput,
  PasswordInput,
  LoginButton,
  GoSignup,
  InputLabel,
  AlertBox,
  AlertImg,
  AlertText,
  MiddleContainer,
} from "./LoginPage.style";

function LoginPage() {
  const [isdisabled, setIsDisabled] = useState(true);
  const [inputPw, setInputPw] = useState("");
  const [inputId, setInputId] = useState("");
  const [isValid, setIsValid] = useState(null);

  const handleInputId = (e) => {
    if (e.key === "Enter") {
      handleLoginButton(e);
    }
    setInputId(e.target.value);

    if (inputId.length > 0 && inputPw.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    setIsValid(false);
  };

  const handleInputPw = (e) => {
    if (e.key === "Enter") {
      handleLoginButton(e);
    }
    setInputPw(e.target.value);
    if (inputId.length > 0 && inputPw.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    setIsValid(false);
  };

  const handleLoginButton = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/user/login",
        {
          email: inputId,
          password: inputPw,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(`signin error: ${err.message}`);
        setIsValid(true);
      });
  };

  return (
    <LoginContainer>
      <LoginText>로그인</LoginText>
      <InputLabel>이메일</InputLabel>
      <EmailInput onKeyUp={(e) => handleInputId(e)} />
      <InputLabel>비밀번호</InputLabel>
      <PasswordInput type="password" onKeyUp={(e) => handleInputPw(e)} />
      <MiddleContainer>
        {!isValid ? (
          ""
        ) : (
          <AlertBox>
            <AlertImg src="../images/alert.svg" />
            <AlertText>이메일과 비밀번호를 다시한번 확인해 주세요</AlertText>
          </AlertBox>
        )}
      </MiddleContainer>
      <LoginButton disabled={isdisabled} onClick={(e) => handleLoginButton(e)}>
        로그인
      </LoginButton>
      <GoSignup>아직 이메일이 없으신가요? 회원가입 하러가기</GoSignup>
    </LoginContainer>
  );
}

export default LoginPage;
