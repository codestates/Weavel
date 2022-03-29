import React, { useState } from "react";
import PhotoUploadModalNew from "../../components/PhotoUploadModalNew/PhotoUploadModalNew";
import DeletePhotoModal from "../../components/Modal/DeletePhotoModal";
import EditUserInfo from "../../components/EditUserInfoNew/EditUserInfoNew";
import PhotoEditModalNew from "../../components/PhotoEditModalNew/PhotoEditModalNew";
import DeleteUserModal from "../../components/Modal/DeleteUserModal";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../../reducers/authReducer";
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
import EditUserInfoNew from "../../components/EditUserInfoNew/EditUserInfoNew";

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
  setLoginUserInfo,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  const [isUpload, setIsUpload] = useState(false);
  const [isPhotoDelete, setIsPhotoDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSelectInfo, setIsSelectInfo] = useState("");
  const [isPhotoEdit, setIsPhotoEdit] = useState(false);
  const [isUserDelete, setIsUserDelete] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const clickHandler = (e) => {
    setIsClicked(!isClicked);
    photoInfoFinder(e.target.id);
  };

  const userDeleteHandler = () => {
    setIsUserDelete(!isUserDelete);
  };

  const editHandler = () => {
    setIsEdit(!isEdit);
  };

  const uploadHandler = () => {
    setIsUpload(!isUpload);
  };

  const photoDeleteHandler = (e) => {
    if (e) {
      e.stopPropagation();
      photoInfoFinder(e.target.name);
    }
    setIsPhotoDelete(!isPhotoDelete);
  };

  const photoEditHandler = (e) => {
    if (e) {
      e.stopPropagation();
      photoInfoFinder(e.target.name);
    }
    setIsPhotoEdit(!isPhotoEdit);
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

  function photoInfoFinder(id) {
    let photoIdFinder = allPhotoInfo.filter((el) => {
      return el.id === Number(id);
    });
    // photoIdFinder.filename = photoIdFinder.image;
    setIsSelectInfo(photoIdFinder);
  }

  // 사진 삭제
  function handleDeletePhoto(e) {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/photo`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          data: isSelectInfo[0],
        }
      )
      .then((res) => {
        let photoDeleteRefresh = allPhotoInfo.filter((el) => {
          return el.id !== Number(isSelectInfo[0].id);
        });
        setAllPhotoInfo(photoDeleteRefresh);
        photoDeleteHandler(e);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }
  // 회원 탈퇴
  const DeleteUser = () => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/user`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((res) => {
      dispatch(setLogOut());
      userDeleteHandler();
      history.push("/");
    });
  };

  return (
    <>
      {isEdit ? (
        <Modal onClick={(e) => e.stopPropagation()}>
          <EditUserInfoNew
            editHandler={editHandler}
            loginUserInfo={loginUserInfo}
            putUserInfo={putUserInfo}
            setLoginUserInfo={setLoginUserInfo}
          />
        </Modal>
      ) : (
        ""
      )}
      {isPhotoDelete ? (
        <Modal onClick={(e) => photoDeleteHandler(e)}>
          <DeletePhotoModal
            photoDeleteHandler={photoDeleteHandler}
            handleDeletePhoto={handleDeletePhoto}
            message={"사진을 삭제하시겠습니까?"}
          />
        </Modal>
      ) : (
        ""
      )}
      {isPhotoEdit ? (
        <Modal onClick={(e) => photoEditHandler(e)}>
          <PhotoEditModalNew
            photoEditHandler={photoEditHandler}
            isSelectInfo={isSelectInfo}
            setAllPhotoInfo={setAllPhotoInfo}
            allPhotoInfo={allPhotoInfo}
          />
        </Modal>
      ) : (
        ""
      )}
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
      {isUserDelete ? (
        <Modal onClick={userDeleteHandler}>
          <DeleteUserModal
            message={"정말 탈퇴하시겠습니까?"}
            userDeleteHandler={userDeleteHandler}
            DeleteUser={DeleteUser}
          ></DeleteUserModal>
        </Modal>
      ) : (
        ""
      )}
      {isClicked ? (
        <Modal onClick={(e) => clickHandler(e)}>
          <img
            onClick={(e) => e.stopPropagation()}
            id="clicked_img"
            src={`${process.env.REACT_APP_API_URL}/${isSelectInfo[0].image}`}
            alt={isSelectInfo.image}
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
                  <TopButtonWhite onClick={editHandler}>
                    프로필 수정
                  </TopButtonWhite>
                  <TopButtonWhite onClick={userDeleteHandler}>
                    회원 탈퇴
                  </TopButtonWhite>
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
                  <MyPhotoContainer
                    key={photo.id}
                    name={photo.id}
                    onClick={clickHandler}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}/${photo.image}`}
                      alt={photo.image}
                    />
                    <PhotoInfoContainer id={photo.id}>
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
                        <PhotoButton
                          id="photo_edit"
                          onClick={photoEditHandler}
                          name={photo.id}
                        >
                          수정
                        </PhotoButton>
                        <PhotoButton
                          id="photo_delete"
                          onClick={photoDeleteHandler}
                          name={photo.id}
                        >
                          삭제
                        </PhotoButton>
                      </PhotoButtonContainer>
                    </PhotoInfoContainer>
                  </MyPhotoContainer>
                </>
              );
            })
          ) : (
            <>
              <NoPhotoContainer>
                기록하고 싶은 날씨가 있으신가요?
                <br />
                사진을 찍어 올려보세요
                <TopButtonBlue onClick={uploadHandler}>
                  사진 업로드
                </TopButtonBlue>
              </NoPhotoContainer>
            </>
          )}
        </MyPageContainerBottom>
      </MyPageContainer>
    </>
  );
}

export default MyPageNew;
