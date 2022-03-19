import React, { useEffect, useState } from "react";

import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  Link,
} from "react-router-dom";

import axios from "axios";
import LogOutModal from "./components/Modal/LogoutModal";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import MyPage from "./pages/MyPageNew/MyPageNew";
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
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setLogOut } from "./reducers/authReducer";

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  const accessToken = useSelector((state) => state.authReducer.accessToken);
  useEffect(() => {
    setToken(accessToken);
    getUserInfo(accessToken);
    // getPhotos(accessToken);
    getAllPhotosInfo(accessToken);
    getAllUserWeather(accessToken);
  }, [accessToken]);

  const [token, setToken] = useState("");
  const history = useHistory();
  const [loginUserInfo, setLoginUserInfo] = useState({
    id: "guest",
    email: "guest@codemon.com",
    name: "코드몬",
    weather: [],
  });

  const [allUserWeather, setAllUserWeather] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
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
  const [allPhotoInfo, setAllPhotoInfo] = useState([]);
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
        url: `${process.env.REACT_APP_API_URL}/user/logout`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    )
      .then((res) => {
        dispatch(setLogOut());
        openCloseModalHandler(e);
        history.push("/home");
      })
      .catch((error) => console.log("Error", error.message));
  };

  const putUserInfo = (weather, password) => {
    axios.patch(
      `${process.env.REACT_APP_API_URL}/user`,
      {
        password: password,
        weather: weather,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleLoginButton = (e, email, password) => {
    e.preventDefault();

    dispatch(setAuth({ email: email, password: password }));
  };

  const getUserInfo = (token) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/user`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((res) => {
      const { id, email, name, weatherDB } = res.data.data;

      weatherDB.map((weather) => {
        if (weather === 0) {
          isWeather.sunny = true;
        } else if (weather === 1) {
          isWeather.cloud = true;
        } else if (weather === 2) {
          isWeather.rain = true;
        } else if (weather === 3) {
          isWeather.snow = true;
        }
      });
      setLoginUserInfo({ id, email, name, weatherDB });
    });
  };

  // 사진 정보 받기
  const getAllPhotosInfo = (token) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/photo/info`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((res) => {
      setAllPhotoInfo(res.data.reverse());
    });
  };

  // 모든 회원 날씨 정보
  const getAllUserWeather = (token) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/user/weather`,
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

  // const filterPhotoHandler = (num) => {
  //   let filterPhotoInfo = [];

  //   allPhotoInfo.map((el) => {
  //     const newEl = { ...el };
  //     filterPhotoInfo.push(newEl);
  //   });
  //   const newFilterPhotoInfo = filterPhotoInfo.filter((el) => {
  //     return el.weather === num;
  //   });
  //   setAllPhotoInfo(newFilterPhotoInfo);
  // };
  const [allPhotoSearch, setAllPhotoSearch] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState(null);

  // const handleInputChange = (e) => {
  //   if (e.target.value) {
  //     setSearchInputValue(e.target.value);
  //   }

  //   let filterPhotoInfo = [];

  //   allPhotoInfo.map((el) => {
  //     const newEl = { ...el };
  //     filterPhotoInfo.push(newEl);
  //   });
  //   const newSearchPhotoInfo = filterPhotoInfo.filter((el) => {
  //     if (el.area.indexOf(searchInputValue > -1)) {
  //       return true;
  //     }
  //   });
  //   setAllPhotoInfo(newSearchPhotoInfo);
  // };

  return (
    <BrowserRouter>
      <Container>
        <Header>
          <HeaderBox logo={"logo"}>
            <Logo
              src="./images/logo.svg"
              alt="logo"
              onClick={() => {
                window.location.replace("/");
              }}
            ></Logo>
          </HeaderBox>
          <MenuContainer>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Menu margin="0 20.5px 0 20.5px">홈</Menu>
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
              <MainPage />
            </Route>
            <Route path="/login">
              <LoginPage
                loginUserInfo={loginUserInfo}
                handleLoginButton={handleLoginButton}
              />
            </Route>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Route path="/mypage">
              <MyPage
                SearchWeatherPhoto={SearchWeatherPhoto}
                setSearchWeatherPhoto={setSearchWeatherPhoto}
                // filterPhotoHandler={filterPhotoHandler}
                allUserWeather={allUserWeather}
                allPhotoInfo={allPhotoInfo}
                isLogin={isLogin}
                weatherHandle={weatherHandle}
                loginUserInfo={loginUserInfo}
                token={token}
                isWeather={isWeather}
                putUserInfo={putUserInfo}
                setAllPhotoInfo={setAllPhotoInfo}
                setLoginUserInfo={setLoginUserInfo}
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
              <img src="./images/githubLogo.svg" alt="githubLogo" />
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
