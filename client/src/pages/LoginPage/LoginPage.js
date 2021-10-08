import React, { useState } from "react";
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
    setInputId(e.target.value);

    if (inputId.length > 0 && inputPw.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    if (window.event.keyCode === 13) {
      // return handleLoginButton(e);
    }
    setIsValid(false);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
    if (inputId.length > 0 && inputPw.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    if (window.event.keyCode === 13) {
      // return handleLoginButton(e);
    }
    setIsValid(false);
  };

  return (
    <LoginContainer>
      <LoginText>로그인</LoginText>
      <InputLabel>이메일</InputLabel>
      <EmailInput value={inputId} onChange={handleInputId} />
      <InputLabel>비밀번호</InputLabel>
      <PasswordInput type="password" value={inputPw} onChange={handleInputPw} />
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
      <LoginButton disabled={isdisabled}>로그인</LoginButton>
      <GoSignup>아직 이메일이 없으신가요? 회원가입 하러가기</GoSignup>
    </LoginContainer>
  );
}

export default LoginPage;
