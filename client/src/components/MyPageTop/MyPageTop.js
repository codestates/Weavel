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
function MyPageTop({ openCloseModalHandler, loginUserInfo }) {
  return (
    <MyPageTopContainer>
      <UserInfoContainer>
        <div className="container">
          <ContainerFirstText>
            {loginUserInfo ? loginUserInfo.name : "코드몬"}님
          </ContainerFirstText>
          <UserEmail>
            {loginUserInfo ? loginUserInfo.email : "로그인 해주세요"}
          </UserEmail>
          <UploadPhotoText>
            오늘의 기록하고 싶은 날씨를 사진 한장으로 남겨보세요
          </UploadPhotoText>
          <UserButtonContainer>
            <PhotoUploadButton
              margin={"242px"}
              name={"photoUpload"}
              onClick={(e) => {
                openCloseModalHandler(e);
              }}
            >
              사진 업로드
            </PhotoUploadButton>
            <EditUserInfoButton
              name={"editUserInfo"}
              onClick={(e) => {
                openCloseModalHandler(e);
              }}
            >
              프로필 수정
            </EditUserInfoButton>
            <DeleteAccountButton
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
          </FavWeathersContainer>
        </div>
      </FavoriteWeatherContainer>
    </MyPageTopContainer>
  );
}

export default MyPageTop;
