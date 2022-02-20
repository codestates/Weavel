import React, { useState } from "react";
import PhotoUploadModalNew from "../../components/PhotoUploadModalNew/PhotoUploadModalNew";
import SearchData from "../../components/PhotoUploadModal/SearchData";
import axios from "axios";

import {
  MyPageContainer,
  MyPageContainerTop,
  MyPageTopLeft,
  MyPageTopRight,
  MyPageContainerMiddle,
  WeatherButtonContainer,
  WeatherButton,
  SearchBar,
  SearchInput,
  MyPageContainerBottom,
  MyPhotoContainer,
  TopFirstText,
  UserEmail,
  TopSmallText,
  TopButtonContainer,
  TopRightButtonContainer,
  TopButtonBlue,
  TopButtonWhite,
  TopAllContainer,
  FavWeathersContainer,
  FavWeather,
  FavWeatherLeft,
  FavWeatherRight,
  Modal,
} from "./MyPageNew.style";

function MyPageNew({
  loginUserInfo,
  putUserInfo,
  isWeather,
  weatherHandle,
  token,
  allUserWeather,
  allPhotoInfo,
  filterPhotoHandler,
  SearchWeatherPhoto,
  setSearchWeatherPhoto,
  handleInputChange,
  DeleteUser,
}) {
  const [isUpload, setIsUpload] = useState(false);
  const uploadHandler = () => {
    setIsUpload(!isUpload);
  };

  const weatherTxt = ["맑음", "구름", "비", "눈"];

  const peopleWeather = {
    1: "맑은 날",
    2: "구름낀 날",
    3: "비오는 날",
    4: "눈오는 날",
  };

  const weatherIcon = {
    1: "./images/sunny.svg",
    2: "./images/cloudy.svg",
    3: "./images/rainy.svg",
    4: "./images/snowy.svg",
  };

  return (
    <>
      {isUpload ? (
        <Modal onClick={uploadHandler}>
          <PhotoUploadModalNew uploadHandler={uploadHandler} token={token} />
        </Modal>
      ) : (
        ""
      )}
      <MyPageContainer>
        <MyPageContainerTop>
          <MyPageTopLeft>
            <TopAllContainer>
              <TopFirstText>{loginUserInfo.name}님</TopFirstText>
              <UserEmail>{loginUserInfo.email}</UserEmail>
              <TopSmallText>
                오늘의 기록하고 싶은 날씨를 사진 한장으로 남겨보세요
              </TopSmallText>
              <TopButtonContainer>
                <TopButtonBlue onClick={uploadHandler}>
                  사진 업로드
                </TopButtonBlue>
                <TopRightButtonContainer>
                  <TopButtonWhite>프로필 수정</TopButtonWhite>
                  <TopButtonWhite>회원 탈퇴</TopButtonWhite>
                </TopRightButtonContainer>
              </TopButtonContainer>
            </TopAllContainer>
          </MyPageTopLeft>
          <MyPageTopRight>
            <TopAllContainer>
              <TopFirstText>좋아하는 날씨</TopFirstText>
              <FavWeathersContainer>
                {loginUserInfo.weatherDB ? (
                  loginUserInfo.weatherDB.map((weather, idx) => {
                    return (
                      <FavWeather key={idx}>
                        <FavWeatherLeft>
                          <img src={weatherIcon[weather]} />
                          {peopleWeather[weather]}
                        </FavWeatherLeft>
                        <FavWeatherRight>
                          {allUserWeather[weather]}명이 좋아합니다
                        </FavWeatherRight>
                      </FavWeather>
                    );
                  })
                ) : (
                  <>
                    <FavWeather>
                      <FavWeatherLeft>
                        <img src="./images/sunny.svg" alt="sunny" />
                        맑은 날
                      </FavWeatherLeft>
                      <FavWeatherRight>
                        32명의 회원이 좋아합니다
                      </FavWeatherRight>
                    </FavWeather>
                    <FavWeather>
                      <FavWeatherLeft>
                        <img src="./images/cloudy.svg" alt="cloudy" />
                        구름낀 날
                      </FavWeatherLeft>
                      <FavWeatherRight>
                        32명의 회원이 좋아합니다
                      </FavWeatherRight>
                    </FavWeather>
                    <FavWeather>
                      <FavWeatherLeft>
                        <img src="./images/rainy.svg" alt="rainy" />
                        비오는 날
                      </FavWeatherLeft>
                      <FavWeatherRight>
                        32명의 회원이 좋아합니다
                      </FavWeatherRight>
                    </FavWeather>
                    <FavWeather>
                      <FavWeatherLeft>
                        <img src="./images/snowy.svg" alt="snowy" />
                        눈오는 날
                      </FavWeatherLeft>
                      <FavWeatherRight>
                        32명의 회원이 좋아합니다
                      </FavWeatherRight>
                    </FavWeather>
                  </>
                )}
              </FavWeathersContainer>
            </TopAllContainer>
          </MyPageTopRight>
        </MyPageContainerTop>
        <MyPageContainerMiddle>
          <WeatherButtonContainer>
            {weatherTxt.map((weather, idx) => {
              return <WeatherButton key={idx}>{weather}</WeatherButton>;
            })}
          </WeatherButtonContainer>
          <SearchBar>
            <SearchInput placeholder="지역을 검색해 보세요" />
            <img src="./images/search.svg" />
          </SearchBar>
        </MyPageContainerMiddle>
        <MyPageContainerBottom>
          {allPhotoInfo ? (
            allPhotoInfo.map((photo) => {
              console.log(photo, "@@@");
              return (
                <MyPhotoContainer>
                  <img
                    src={`http://localhost:80/${photo.image.slice(8)}`}
                    key={photo.id}
                    alt={photo.image}
                  />
                </MyPhotoContainer>
              );
            })
          ) : (
            <>
              <MyPhotoContainer>
                <img src="./images/search.svg" />
              </MyPhotoContainer>
              <MyPhotoContainer>
                <img src="./images/search.svg" />
              </MyPhotoContainer>
              <MyPhotoContainer>
                <img src="./images/search.svg" />
              </MyPhotoContainer>{" "}
              <MyPhotoContainer>
                <img src="./images/search.svg" />
              </MyPhotoContainer>{" "}
              <MyPhotoContainer>
                <img src="./images/search.svg" />
              </MyPhotoContainer>
            </>
          )}
        </MyPageContainerBottom>
      </MyPageContainer>
    </>
  );
}

export default MyPageNew;
