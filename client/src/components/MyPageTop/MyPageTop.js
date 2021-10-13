import React from "react";
import {
  UserInfoContainer,
  ContainerFirstText,
  UserEmail,
  UploadPhotoText,
  UserButtonContainer,
  PhotoUploadButton,
  EditUserInfoButton,
  DeleteAccountButton,
  FavoriteWeatherContainer,
  FavoriteWeather,
  FavoriteWeatherIcon,
  FavoriteWeatherText,
  FavoriteWeatherUsers,
  FavWeathersContainer,
  MyPageTopContainer,
} from "./MyPageTop.style";
function MyPageTop({ openCloseModalHandler, loginUserInfo, isLogin }) {
  console.log("hi");
  const weather = [
    {
      id: 1,
      title: "맑은 날",
      src: "./images/sunny.svg",
    },
    {
      id: 2,
      title: "구름낀 날",
      src: "./images/cloudy.svg",
    },
    {
      id: 3,
      title: "비오는 날",
      src: "./images/rainy.svg",
    },
    {
      id: 4,
      title: "눈오는 날",
      src: "./images/snowy.svg",
    },
  ];

  return (
    <MyPageTopContainer>
      <UserInfoContainer>
        <div className="container">
          <ContainerFirstText>{loginUserInfo.name}님</ContainerFirstText>
          <UserEmail>{loginUserInfo.email}</UserEmail>
          <UploadPhotoText>
            오늘의 기록하고 싶은 날씨를 사진 한장으로 남겨보세요
          </UploadPhotoText>
          <UserButtonContainer>
            <PhotoUploadButton
              disabled={!isLogin}
              margin={"242px"}
              name={"photoUpload"}
              onClick={(e) => {
                openCloseModalHandler(e);
              }}
            >
              사진 업로드
            </PhotoUploadButton>
            <EditUserInfoButton
              disabled={!isLogin}
              name={"editUserInfo"}
              onClick={(e) => {
                openCloseModalHandler(e);
              }}
            >
              프로필 수정
            </EditUserInfoButton>
            <DeleteAccountButton
              disabled={!isLogin}
              name={"deleteAccount"}
              onClick={(e) => {
                openCloseModalHandler(e);
              }}
            >
              회원 탈퇴
            </DeleteAccountButton>
          </UserButtonContainer>
        </div>
      </UserInfoContainer>
      <FavoriteWeatherContainer>
        <div className="container">
          <ContainerFirstText margin={"23px"}>좋아하는 날씨</ContainerFirstText>
          <FavWeathersContainer>
            {isLogin ? (
              weather
                .filter((weatherNum) => {
                  return loginUserInfo.weather.includes(weatherNum.id);
                })
                .map((weather, idx) => {
                  return (
                    <FavoriteWeather id={idx}>
                      <FavoriteWeatherIcon id={idx} src={weather.src} />
                      <FavoriteWeatherText id={idx}>
                        {weather.title}
                      </FavoriteWeatherText>
                      <FavoriteWeatherUsers id={idx}>
                        32명의 회원이 좋아합니다
                      </FavoriteWeatherUsers>
                    </FavoriteWeather>
                  );
                })
            ) : (
              <>
                <FavoriteWeather>
                  <FavoriteWeatherIcon src="./images/sunny.svg" />
                  <FavoriteWeatherText>맑은 날</FavoriteWeatherText>
                  <FavoriteWeatherUsers>
                    32명의 회원이 좋아합니다
                  </FavoriteWeatherUsers>
                </FavoriteWeather>
                <FavoriteWeather>
                  <FavoriteWeatherIcon src="./images/cloudy.svg" />
                  <FavoriteWeatherText>구름낀 날</FavoriteWeatherText>
                  <FavoriteWeatherUsers>
                    32명의 회원이 좋아합니다
                  </FavoriteWeatherUsers>
                </FavoriteWeather>
                <FavoriteWeather>
                  <FavoriteWeatherIcon src="./images/rainy.svg" />
                  <FavoriteWeatherText>비오는 날</FavoriteWeatherText>
                  <FavoriteWeatherUsers>
                    32명의 회원이 좋아합니다
                  </FavoriteWeatherUsers>
                </FavoriteWeather>
                <FavoriteWeather>
                  <FavoriteWeatherIcon src="./images/snowy.svg" />
                  <FavoriteWeatherText>눈오는 날</FavoriteWeatherText>
                  <FavoriteWeatherUsers>
                    32명의 회원이 좋아합니다
                  </FavoriteWeatherUsers>
                </FavoriteWeather>
              </>
            )}
          </FavWeathersContainer>
        </div>
      </FavoriteWeatherContainer>
    </MyPageTopContainer>
  );
}

export default MyPageTop;
