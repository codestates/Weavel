import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Switch, useHistory, Redirect, Link } from "react-router-dom";

import axios from "axios";
import Modal from "./components/Modal/Modal";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import MyPage from "./pages/MyPage/MyPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import { ModalContainer } from "./pages/MyPage/MyPage.style";
import {
  Container,
  Header,
  HeaderBox,
  MenuContainer,
  Menu,
  Logo,
  LoginButton,
  Body,
  Footer,
  FooterLine,
  FooterContents,
  FooterProjectLink,
  FooterTeamLink,
} from "./App.style";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");
  const [isValid, setIsValid] = useState(null);
  const history = useHistory();
  const [loginUserInfo, setLoginUserInfo] = useState({
    id: "guest",
    email: "guest@codemon.com",
    name: "코드몬",
    weather: [],
  });
  const [isModal, setIsModal] = useState({
    logOut: false,
  });
  const [isWeather, setIsWeather] = useState({
    sunny: false,
    cloud: false,
    rain: false,
    snow: false,
  });

  const weatherHandle = (weather) => {
    setIsWeather(weather);
  };

  const openCloseModalHandler = (e) => {
    let newIsModal = { ...isModal };

    if (e.target.name === "logOut") {
      newIsModal.logOut = !newIsModal.logOut;
    } else {
      if (isModal.logOut) {
        newIsModal.logOut = !newIsModal.logOut;
      }
    }
    setIsModal(newIsModal);
  };

  const { logOut } = isModal;

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = logOut ? "hidden" : "auto";
  }, [logOut]);

  const handleLogout = (e) => {
    axios(
      {
        method: "post",
        url: "http://localhost:4000/user/logout",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true },
    )
      .then((res) => {
        console.log(res);
        setIsLogin(false);
        openCloseModalHandler(e);
        test();
      })
      .catch((error) => console.log("Error", error.message));
  };

  const test = () => {
    history.push("/signup");
  };

  const putUserInfo = (weather, password, email) => {
    axios
      .put(
        "http://localhost:4000/user",
        {
          email: email,
          password: password,
          weather: weather,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => console.log(res));
  };

  const handleLoginButton = (e, inputId, inputPw) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/user/login",
        {
          email: inputId,
          password: inputPw,
        },
        { withCredentials: true },
      )
      .then((res) => {
        setIsLogin(true);
        setToken(res.data.data.accessToken);
        getUserInfo(res.data.data.accessToken);
      })
      .catch((err) => {
        console.error(`signin error: ${err.message}`);
        setIsValid(true);
      });
  };

  const getUserInfo = (token) => {
    axios({
      method: "get",
      url: "http://localhost:4000/user",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((res) => {
      const { id, email, name, weather } = res.data.data;

      weather.map((weather) => {
        if (weather === 1) {
          isWeather.sunny = true;
        } else if (weather === 2) {
          isWeather.cloud = true;
        } else if (weather === 3) {
          isWeather.rain = true;
        } else if (weather === 4) {
          isWeather.snow = true;
        }
      });
      setLoginUserInfo({ id, email, name, weather });
    });
  };

  return (
    <BrowserRouter>
      <Container>
        <Header>
          <HeaderBox logo={"logo"}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Logo src="./images/logo.svg"></Logo>
            </Link>
          </HeaderBox>
          <MenuContainer>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Menu>홈</Menu>
            </Link>
            <Link to="/mypage" style={{ textDecoration: "none" }}>
              <Menu>마이페이지</Menu>
            </Link>
          </MenuContainer>
          <HeaderBox>
            {!isLogin ? (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <LoginButton>로그인</LoginButton>
              </Link>
            ) : (
              <LoginButton
                name={"logOut"}
                onClick={(e) => {
                  openCloseModalHandler(e);
                }}
              >
                로그아웃
              </LoginButton>
            )}
            {isModal.logOut ? (
              <ModalContainer onClick={openCloseModalHandler}>
                <Modal
                  handleLogout={handleLogout}
                  message={"로그아웃하시겠습니까?"}
                  openCloseModalHandler={openCloseModalHandler}
                ></Modal>
              </ModalContainer>
            ) : null}
          </HeaderBox>
        </Header>
        <Body>
          <Switch>
            <Route exact path="/">
              <MainPage isLogin={isLogin} />
            </Route>
            <Route path="/login">
              <LoginPage
                setIsValid={setIsValid}
                isValid={isValid}
                isLogin={isLogin}
                loginUserInfo={loginUserInfo}
                handleLoginButton={handleLoginButton}
              />
            </Route>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Route path="/mypage">
              <MyPage
                token={token}
                loginUserInfo={loginUserInfo}
                isLogin={isLogin}
                weatherHandle={weatherHandle}
                isWeather={isWeather}
                putUserInfo={putUserInfo}
              />
            </Route>
          </Switch>
        </Body>
        <FooterLine>
          <div></div>
        </FooterLine>
      </Container>
      <Footer>
        <FooterContents>
          <a href="https://github.com/codestates/Weavel/wiki" target="_blank">
            <FooterProjectLink>
              <img src="./images/githubLogo.svg" />
              <span>Codemon</span>
            </FooterProjectLink>
          </a>
          <FooterTeamLink>
            <a href="https://github.com/suzyhwang" target="_blank">
              황소영
            </a>
            <a href="https://github.com/choigicheol" target="_blank">
              최기철
            </a>
            <a href="https://github.com/iysh321" target="_blank">
              정인용
            </a>
            <a href="https://github.com/devSominPark" target="_blank">
              박소민
            </a>
          </FooterTeamLink>
        </FooterContents>
      </Footer>
    </BrowserRouter>
  );
}

export default App;
