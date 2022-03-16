import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  LoginPageContainer,
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
  UnderLine,
} from "./LoginPage.style";
import { Link, Redirect } from "react-router-dom";

function LoginPage({ handleLoginButton }) {
  const [isdisabled, setIsDisabled] = useState(true);
  const [inputPw, setInputPw] = useState("");
  const [inputId, setInputId] = useState("");
  const { isLogin, isValid } = useSelector((state) => state.authReducer);
  // const isValid = useSelector((state) => state.authReducer.isValid);
  const handleInputId = (e) => {
    if (e.key === "Enter") {
      handleLoginButton(e, inputId, inputPw);
    }
    setInputId(e.target.value);

    if (inputId.length > 0 && inputPw.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleInputPw = (e) => {
    if (e.key === "Enter") {
      handleLoginButton(e, inputId, inputPw);
    }
    setInputPw(e.target.value);
    if (inputId.length > 0 && inputPw.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  // console.log(isValid);
  return (
    <>
      {isLogin ? (
        <Redirect to="/"></Redirect>
      ) : (
        <LoginPageContainer>
          <LoginContainer>
            <LoginText>로그인</LoginText>
            <InputLabel>이메일</InputLabel>
            <EmailInput onKeyUp={(e) => handleInputId(e)} />
            <InputLabel>비밀번호</InputLabel>
            <PasswordInput type="password" onKeyUp={(e) => handleInputPw(e)} />
            <MiddleContainer>
              {!isValid ? (
                <></>
              ) : (
                <AlertBox>
                  <AlertImg src="../images/alert.svg" />
                  <AlertText>
                    이메일과 비밀번호를 다시한번 확인해 주세요
                  </AlertText>
                </AlertBox>
              )}
            </MiddleContainer>
            <LoginButton
              disabled={isdisabled}
              onClick={(e) => handleLoginButton(e, inputId, inputPw)}
            >
              로그인
            </LoginButton>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <GoSignup>
                아직 이메일이 없으신가요?{" "}
                <UnderLine>회원가입 하러가기</UnderLine>
              </GoSignup>
            </Link>
          </LoginContainer>
        </LoginPageContainer>
      )}
    </>
  );
}

export default LoginPage;
