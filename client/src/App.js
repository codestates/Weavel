import React, { useEffect, useState } from "react";

import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  Redirect,
  Link,
} from "react-router-dom";

import axios from "axios";
import LogOutModal from "./components/Modal/LogoutModal";
import DeleteUserModalModal from "./components/Modal/DeleteUserModal";
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

  const [allUserWeather, setAllUserWeather] = useState(null);
  const [allPhotoInfo, setAllPhotoInfo] = useState(null);
  const [photo, setPhoto] = useState(null);
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
      { withCredentials: true }
    )
      .then((res) => {
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
        }
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
        { withCredentials: true }
      )
      .then((res) => {
        setIsLogin(true);
        setToken(res.data.data.accessToken);
        getUserInfo(res.data.data.accessToken);
        getPhotos(res.data.data.accessToken);
        getAllPhotosInfo(res.data.data.accessToken);
        getAllUserWeather(res.data.data.accessToken);
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

  // const DeleteUserHandler = (token) => {
  //   DeleteUser(token);
  // };

  // 회원 탈퇴
  const DeleteUser = (token) => {
    axios({
      method: "delete",
      url: "http://localhost:4000/user",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res);
    });
  };

  // 사진 정보 받기
  const getAllPhotosInfo = (token) => {
    axios({
      method: "get",
      url: "http://localhost:4000/photo/info",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((res) => {
      setAllPhotoInfo(res.data);
      console.log("사진정보받기~~~~~", res.data);
    });
  };

  //사진 받기
  const getPhotos = (token) => {
    axios({
      method: "get",
      url: "http://localhost:4000/photo?id=1",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "image/jpg",
      },
      withCredentials: true,
    }).then((res) => {
      console.log("afdadfd", res.data);
      setPhoto(res.data);
    });
  };

  // 모든 회원 날씨 정보
  const getAllUserWeather = (token) => {
    axios({
      method: "get",
      url: "http://localhost:4000/user/weather",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((res) => {
      setAllUserWeather(res.data.data);
    });
  };

  const [SearchWeatherPhoto, setSearchWeatherPhoto] = useState({
    sunny: false,
    cloud: false,
    rain: false,
    snow: false,
  });
  console.log("adadf", SearchWeatherPhoto);
  const filterPhotoHandler = (num) => {
    let filterPhotoInfo = [];

    allPhotoInfo.map((el) => {
      const newEl = { ...el };
      filterPhotoInfo.push(newEl);
    });
    const newFilterPhotoInfo = filterPhotoInfo.filter((el) => {
      return el.weather === num;
    });
    setAllPhotoInfo(newFilterPhotoInfo);
  };
  const [allPhotoSearch, setAllPhotoSearch] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState(null);

  const handleInputChange = (e) => {
    if (e.target.value) {
      setSearchInputValue(e.target.value);
    }

    let filterPhotoInfo = [];

    allPhotoInfo.map((el) => {
      const newEl = { ...el };
      filterPhotoInfo.push(newEl);
    });
    const newSearchPhotoInfo = filterPhotoInfo.filter((el) => {
      if (el.area.indexOf(searchInputValue > -1)) {
        return true;
      }
    });
    setAllPhotoInfo(newSearchPhotoInfo);
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
                <LogOutModal
                  handleLogout={handleLogout}
                  message={"로그아웃하시겠습니까?"}
                  openCloseModalHandler={openCloseModalHandler}
                ></LogOutModal>
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
                handleInputChange={handleInputChange}
                SearchWeatherPhoto={SearchWeatherPhoto}
                setSearchWeatherPhoto={setSearchWeatherPhoto}
                filterPhotoHandler={filterPhotoHandler}
                allUserWeather={allUserWeather}
                allPhotoInfo={allPhotoInfo}
                isLogin={isLogin}
                weatherHandle={weatherHandle}
                loginUserInfo={loginUserInfo}
                token={token}
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
