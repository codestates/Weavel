import React, { useState, useEffect } from "react";
import { MyPageContainer, ModalContainer } from "./MyPage.style";
import MyPageTop from "../../components/MyPageTop/MyPageTop";
import MyPageMiddle from "../../components/MyPageMiddle/MyPageMiddle";
import MyPagePhotos from "../../components/MyPagePhotos/MyPagePhotos";
import EditUserInfoModal from "../../components/EditUserInfoModal/EditUserInfoModal";
import PhotoUploadModal from "../../components/PhotoUploadModal/PhotoUploadModal";
import { EditUserInfoButton } from "../../components/MyPageTop/MyPageTop.style";
import Modal from "../../components/Modal/Modal";
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
}) {
  const [keyword, setKeyword] = useState("");
  const [isModal, setIsModal] = useState({
    photoUpload: false,
    editUserInfo: false,
    deleteAccount: false,
    deletePhoto: false,
    newPhotoUpload: false,
  });

  const isLogin = useSelector((state) => state.authReducer.isLogin);

  const openCloseModalHandler = (e) => {
    let newIsModal = { ...isModal };

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
    } else {
      if (isModal.photoUpload) {
        newIsModal.photoUpload = !newIsModal.photoUpload;
      } else if (isModal.deleteAccount) {
        newIsModal.deleteAccount = !newIsModal.deleteAccount;
      } else if (isModal.deletePhoto) {
        newIsModal.deletePhoto = !newIsModal.deletePhoto;
      } else if (isModal.editUserInfo) {
        newIsModal.editUserInfo = !newIsModal.editUserInfo;
      } else if (isModal.newPhotoUpload) {
        newIsModal.newPhotoUpload = !newIsModal.newPhotoUpload;
      }
    }
    setIsModal(newIsModal);
  };

  const {
    photoUpload,
    editUserInfo,
    deleteAccount,
    deletePhoto,
    newPhotoUpload,
  } = isModal;

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow =
      photoUpload ||
      editUserInfo ||
      deleteAccount ||
      deletePhoto ||
      newPhotoUpload
        ? "hidden"
        : "auto";
  }, [photoUpload, editUserInfo, deleteAccount, deletePhoto, newPhotoUpload]);

  // const weatherDataHandle = () => {
  //   loginUserInfo.weather.map((weatherNum) => {
  //     if (weatherNum === 1) {
  //       isWeather.sunny = true;
  //     } else if (weatherNum === 2) {
  //       isWeather.cloud = true;
  //     } else if (weatherNum === 3) {
  //       isWeather.rain = true;
  //     } else if (weatherNum === 4) {
  //       isWeather.snow = true;
  //     }
  //   });
  //   weatherHandle({ ...isWeather });
  // };

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
        setKeyword={setKeyword}
        keyword={keyword}
        isWeather={isWeather}
        weatherCheckHandle={weatherCheckHandle}
      />
      <MyPagePhotos
        isLogin={isLogin}
        keyword={keyword}
        loginUserInfo={loginUserInfo}
        isWeather={isWeather}
        allPhotoInfo={allPhotoInfo}
        token={token}
        openCloseModalHandler={openCloseModalHandler}
      />

      {isModal.newPhotoUpload ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <NewPhotoUploadModal
            token={token}
            loginUserInfo={loginUserInfo}
            isWeather={isWeather}
            weatherCheckHandle={weatherCheckHandle}
            openCloseModalHandler={openCloseModalHandler}
          ></NewPhotoUploadModal>
        </ModalContainer>
      ) : null}
      {isModal.editUserInfo ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <EditUserInfoModal
            putUserInfo={putUserInfo}
            isWeather={isWeather}
            weatherCheckHandle={weatherCheckHandle}
            loginUserInfo={loginUserInfo}
            openCloseModalHandler={openCloseModalHandler}
          ></EditUserInfoModal>
        </ModalContainer>
      ) : null}
      {isModal.deleteAccount ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <Modal
            message={"정말 탈퇴하시겠습니까?"}
            openCloseModalHandler={openCloseModalHandler}
          ></Modal>
        </ModalContainer>
      ) : null}
      {isModal.deletePhoto ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <Modal
            message={"사진을 삭제하시겠습니까?"}
            openCloseModalHandler={openCloseModalHandler}
          ></Modal>
        </ModalContainer>
      ) : null}
    </MyPageContainer>
  );
}

export default MyPage;
