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
  PhotoInfoContainer,
  PhotoButtonContainer,
  PhotoButton,
  NoPhotoContainer,
} from "./MyPageNew.style";

function MyPageNew({
  loginUserInfo,
  putUserInfo,
  isWeather,
  weatherHandle,
  token,
  allUserWeather,
  setAllPhotoInfo,
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
    0: "맑은 날",
    1: "구름낀 날",
    2: "비오는 날",
    3: "눈오는 날",
  };

  const weatherIcon = {
    0: "./images/sunny.svg",
    1: "./images/cloudy.svg",
    2: "./images/rainy.svg",
    3: "./images/snowy.svg",
  };

  return (
    <>
      {isUpload ? (
        <Modal onClick={uploadHandler}>
          <PhotoUploadModalNew
            uploadHandler={uploadHandler}
            token={token}
            setAllPhotoInfo={setAllPhotoInfo}
            allPhotoInfo={allPhotoInfo}
          />
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
          {allPhotoInfo[0] ? (
            allPhotoInfo.map((photo) => {
              return (
                <>
                  <MyPhotoContainer>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/${photo.image}`}
                      key={photo.id}
                      alt={photo.image}
                    />
                    <PhotoInfoContainer>
                      <div id="photo_date">{photo.date}</div>
                      <div id="photo_area">
                        {`${photo.area}, 
                        ${
                          photo.weather === "0"
                            ? "맑음"
                            : "" || photo.weather === "1"
                            ? "흐림"
                            : "" || photo.weather === "2"
                            ? "비"
                            : "" || photo.weather === "3"
                            ? "눈"
                            : ""
                        }`}
                      </div>
                      <div id="photo_comment">{photo.comment}</div>
                      <PhotoButtonContainer>
                        <PhotoButton id="photo_edit">수정</PhotoButton>
                        <PhotoButton id="photo_delete">삭제</PhotoButton>
                      </PhotoButtonContainer>
                    </PhotoInfoContainer>
                  </MyPhotoContainer>
                </>
              );
            })
          ) : (
            <>
              <MyPhotoContainer>
                <NoPhotoContainer>
                  기록하고 싶은 날씨가 있으신가요?
                  <br />
                  사진을 찍어 올려보세요
                  <TopButtonBlue onClick={uploadHandler}>
                    사진 업로드
                  </TopButtonBlue>
                </NoPhotoContainer>
              </MyPhotoContainer>
            </>
          )}
        </MyPageContainerBottom>
      </MyPageContainer>
    </>
  );
}

export default MyPageNew;
