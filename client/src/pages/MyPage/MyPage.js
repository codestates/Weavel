import React, { useState, useEffect } from "react";
import axios from "axios";
import { MyPageContainer, ModalContainer } from "./MyPage.style";
import MyPageTop from "../../components/MyPageTop/MyPageTop";
import MyPageMiddle from "../../components/MyPageMiddle/MyPageMiddle";
import MyPagePhotos from "../../components/MyPagePhotos/MyPagePhotos";
import EditUserInfoModal from "../../components/EditUserInfoModal/EditUserInfoModal";
import PhotoUploadModal from "../../components/PhotoUploadModal/PhotoUploadModal";
import { EditUserInfoButton } from "../../components/MyPageTop/MyPageTop.style";
import DeleteUserModal from "../../components/Modal/DeleteUserModal";
import NewPhotoUploadModal from "../../components/PhotoUploadModal/NewPhotoUploadModal";
import { useSelector } from "react-redux";

function MyPage({
  loginUserInfo,
  putUserInfo,
  // isLogin,
  isWeather,
  weatherHandle,
  token,
  allPhotoInfo,
  allUserWeather,
  filterPhotoHandler,
  SearchWeatherPhoto,
  setSearchWeatherPhoto,
  handleInputChange,
}) {
  const [keyword, setKeyword] = useState("");
  const [isModal, setIsModal] = useState({});

  console.log("요기요", allPhotoInfo);

  const isLogin = useSelector((state) => state.authReducer.isLogin);

  const openCloseModalHandler = (e) => {
    let newIsModal = {
      photoUpload: false,
      editUserInfo: false,
      deleteAccount: false,
      deletePhoto: false,
      newPhotoUpload: false,
    };

    if (e.target.name === "photoUpload") {
      newIsModal.photoUpload = !newIsModal.photoUpload;
    } else if (e.target.name === "editUserInfo") {
      newIsModal.editUserInfo = !newIsModal.editUserInfo;
    } else if (e.target.name === "deleteAccount") {
      newIsModal.deleteAccount = !newIsModal.deleteAccount;
    } else if (e.target.name === "deletePhoto") {
      newIsModal.deletePhoto = !newIsModal.deletePhoto;
    } else if (e.target.name === "newPhotoUpload") {
      newIsModal.newPhotoUpload = !newIsModal.newPhotoUpload;
    } else if (e.target.name === "clickPhoto") {
      newIsModal.clickPhoto = !newIsModal.clickPhoto;
    }
    setIsModal(newIsModal);
  };
  useEffect(() => {}, [isModal]);
  const { photoUpload, editUserInfo, deleteAccount, deletePhoto, newPhotoUpload, clickPhoto } =
    isModal;

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow =
      photoUpload || editUserInfo || deleteAccount || deletePhoto || newPhotoUpload || clickPhoto
        ? "hidden"
        : "auto";
  }, [photoUpload, editUserInfo, deleteAccount, deletePhoto, newPhotoUpload, clickPhoto]);

  const weatherCheckHandle = (e) => {
    let newWeather = { ...isWeather };
    if (e.target.id === "0") {
      newWeather.sunny = !newWeather.sunny;
      weatherHandle(newWeather);
    }
    if (e.target.id === "1") {
      newWeather.cloud = !newWeather.cloud;
      weatherHandle(newWeather);
    }
    if (e.target.id === "2") {
      newWeather.rain = !newWeather.rain;
      weatherHandle(newWeather);
    }
    if (e.target.id === "3") {
      newWeather.snow = !newWeather.snow;
      weatherHandle(newWeather);
    }
  };

  const [isPhotoWeather, setIsPhotoWeather] = useState({});
  const [photoIdx, setPhotoIdx] = useState(0);
  const OnlyOneWeatherHandle = (e) => {
    const photoweather = {
      sunny: false,
      cloud: false,
      rain: false,
      snow: false,
      num: null,
    };
    if (e.target.id === "1") {
      photoweather.sunny = true;
      photoweather.num = "1";
    } else if (e.target.id === "2") {
      photoweather.cloud = true;
      photoweather.num = "2";
    } else if (e.target.id === "3") {
      photoweather.rain = true;
      photoweather.num = "3";
    } else if (e.target.id === "4") {
      photoweather.snow = true;
      photoweather.num = "4";
    }
    setIsPhotoWeather({ ...photoweather });
  };
  const weatherAndPhotoIdxHandle = (e) => {
    setPhotoIdx(e.target.id);
    console.log(e.target.id);
  };
  return (
    <MyPageContainer>
      <MyPageTop
        allUserWeather={allUserWeather}
        isLogin={isLogin}
        isWeather={isWeather}
        loginUserInfo={loginUserInfo}
        openCloseModalHandler={openCloseModalHandler}
      />
      <MyPageMiddle
        handleInputChange={handleInputChange}
        SearchWeatherPhoto={SearchWeatherPhoto}
        setSearchWeatherPhoto={setSearchWeatherPhoto}
        filterPhotoHandler={filterPhotoHandler}
        setKeyword={setKeyword}
        keyword={keyword}
        isWeather={isWeather}
        weatherCheckHandle={weatherCheckHandle}
      />
      <MyPagePhotos
        isModal={isModal}
        isLogin={isLogin}
        loginUserInfo={loginUserInfo}
        isWeather={isWeather}
        allPhotoInfo={allPhotoInfo}
        token={token}
        openCloseModalHandler={openCloseModalHandler}
        weatherAndPhotoIdxHandle={weatherAndPhotoIdxHandle}
        photoIdx={photoIdx}
        isPhotoWeather={isPhotoWeather}
        OnlyOneWeatherHandle={OnlyOneWeatherHandle}
      />

      {isModal.photoUpload ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <PhotoUploadModal
            token={token}
            loginUserInfo={loginUserInfo}
            isWeather={isWeather}
            openCloseModalHandler={openCloseModalHandler}
            isPhotoWeather={isPhotoWeather}
            OnlyOneWeatherHandle={OnlyOneWeatherHandle}
            photoIdx={photoIdx}
            allPhotoInfo={allPhotoInfo}
            setPhotoIdx={setPhotoIdx}

            //
          ></PhotoUploadModal>
        </ModalContainer>
      ) : isModal.newPhotoUpload ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <NewPhotoUploadModal
            token={token}
            loginUserInfo={loginUserInfo}
            isWeather={isWeather}
            openCloseModalHandler={openCloseModalHandler}
            isPhotoWeather={isPhotoWeather}
            OnlyOneWeatherHandle={OnlyOneWeatherHandle}
          ></NewPhotoUploadModal>
        </ModalContainer>
      ) : null}
      {isModal.editUserInfo ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <EditUserInfoModal
            putUserInfo={putUserInfo}
            isWeather={isWeather}
            loginUserInfo={loginUserInfo}
            openCloseModalHandler={openCloseModalHandler}
          ></EditUserInfoModal>
        </ModalContainer>
      ) : null}
      {isModal.deleteAccount ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <DeleteUserModal
            message={"정말 탈퇴하시겠습니까?"}
            openCloseModalHandler={openCloseModalHandler}
          ></DeleteUserModal>
        </ModalContainer>
      ) : null}
    </MyPageContainer>
  );
}

export default MyPage;
