import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  SignupPageContainer,
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
import axios from "axios";
import { useHistory } from "react-router";
import { UnderLine } from "../LoginPage/LoginPage.style";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isSubmitValid, setIsSubmitValid] = useState(false);
  const history = useHistory();
  const isValidInput = {
    isEmail: null,
    isPassword: null,
    isPasswordConfirm: null,
  };

  const [isCheckEmail, SetIsCheckEmail] = useState({
    isSuccess: false,
    isFail: false,
  });
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
      name.length >= 2 &&
      isCheckInput.isEmail &&
      isCheckInput.isPassword &&
      isCheckInput.isPasswordConfirm
    ) {
      setIsSubmitValid(true);
    } else {
      setIsSubmitValid(false);
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
      isNewCheckInput.isPasswordConfirm = isPasswordConfirmHandle(
        e.target.value
      );
      SetIsCheckInput(isNewCheckInput);
    }
  };

  const emailHandle = (email) => {
    if (!email.length) {
      return null;
    }
    let check = email.match(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    );

    return email.indexOf(".") !== -1 && check ? true : false;
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

  const editInfohandler = (e) => {
    let arrEditWeather = [];
    if (isWeather.sunny) {
      arrEditWeather.push(0);
    }
    if (isWeather.cloud) {
      arrEditWeather.push(1);
    }
    if (isWeather.rain) {
      arrEditWeather.push(2);
    }
    if (isWeather.snow) {
      arrEditWeather.push(3);
    }
    if (password === passwordConfirm) {
    }
    handlesignin(e, arrEditWeather);
  };

  const handlesignin = (e, arrEditWeather) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/user/signup`,
        {
          name: name,
          email: email,
          password: password,
          weather: arrEditWeather,
        },
        { withCredentials: true }
      )

      .then((res) => {
        if (res.status === 201) {
          // ?????? ???????????? ??????
          history.push("/login");
        }
      })
      .catch((error) => console.log("Error", error.message));
  };

  const handleConfirmEmail = (e) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/email?email=${email}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          isCheckEmail.isSuccess = true;
          isCheckEmail.isFail = false;
          SetIsCheckEmail({ ...isCheckEmail });
        }
      })
      .catch((error) => {
        isCheckEmail.isSuccess = false;
        isCheckEmail.isFail = true;
        SetIsCheckEmail({ ...isCheckEmail });
        console.log("Error", error.message);
      });
  };

  return (
    <SignupPageContainer>
      <SignupContainer>
        <SignupTitle>????????????</SignupTitle>
        <NameContainer>
          <span>??????</span>
          <NameInput id="name" onChange={(e) => inputValueHandle(e)} />
        </NameContainer>
        <EmailContainer>
          <span>?????????</span>
          <EmailInputBox>
            <EmailInput
              id="email"
              onChange={(e) => inputValueHandle(e)}
              onKeyUp={(e) => inputValidHandle(e)}
            />

            <CheckEmail
              onClick={(e) => handleConfirmEmail(e)}
              disabled={!isCheckInput.isEmail}
              isButtonValid={isCheckInput.isEmail}
            >
              ?????? ??????
            </CheckEmail>
          </EmailInputBox>
          <EmailConfirmMessage
            isSuccess={isCheckEmail.isSuccess}
            isFail={isCheckEmail.isFail}
            isEmail={isCheckInput.isEmail}
          >
            {isCheckEmail.isSuccess
              ? "?????? ????????? ??????????????????."
              : isCheckEmail.isFail
              ? "?????? ?????? ??? ??????????????????."
              : isCheckInput.isEmail === null
              ? null
              : isCheckInput.isEmail
              ? null
              : "????????? ???????????? ??????????????????."}
          </EmailConfirmMessage>
        </EmailContainer>
        <WeatherContainer>
          <span>???????????? ??????</span>
          <WeatherChoiceBox>
            <Sunny
              isSunny={isWeather.sunny}
              id="0"
              onClick={(e) => weatherCheckHandle(e)}
            >
              ??????
            </Sunny>
            <Cloud
              isCloud={isWeather.cloud}
              id="1"
              onClick={(e) => weatherCheckHandle(e)}
            >
              ??????
            </Cloud>
            <Rain
              isRain={isWeather.rain}
              id="2"
              onClick={(e) => weatherCheckHandle(e)}
            >
              ???
            </Rain>
            <Snow
              isSnow={isWeather.snow}
              id="3"
              onClick={(e) => weatherCheckHandle(e)}
            >
              ???
            </Snow>
          </WeatherChoiceBox>
        </WeatherContainer>
        <PasswordContainer>
          <span>????????????</span>
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
              ? "?????? ????????? ?????????????????????"
              : "8~16??? ?????? ??? ?????????, ??????, ??????????????? ???????????????"}
          </PasswordMessage>
        </PasswordContainer>
        <PasswordConfirmContainer>
          <span>???????????? ??????</span>
          <PasswordConfirmInput
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
              ? "??????????????? ???????????????"
              : "??????????????? ?????? ????????? ?????????"}
          </PasswordConfirmMessage>
        </PasswordConfirmContainer>
        <SubmitSignup
          onClick={(e) => editInfohandler(e)}
          disabled={!isSubmitValid}
          isButtonValid={isSubmitValid}
        >
          ??????
        </SubmitSignup>
        <Link to="/login">
          ???????????? ???????????? ???????????????? <UnderLine>????????? ????????????</UnderLine>
        </Link>
      </SignupContainer>
    </SignupPageContainer>
  );
}

export default SignupPage;
