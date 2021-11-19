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
import DeletePhotoModal from "../../components/Modal/DeletePhotoModal";
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
  getAllPhotosInfo,
  DeleteUser,
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
  // onst userId = req.userId;
  //   const { id, weather, date, area, filename }
  // 사진 삭제
  function handleDeletePhoto(e) {
    axios
      .delete(
        "http://localhost:4000/photo",

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          data: {
            id: allPhotoInfo[photoIdx].id,
            userId: loginUserInfo.id,
            weather: allPhotoInfo[photoIdx].weather,
            date: allPhotoInfo[photoIdx].date,
            area: allPhotoInfo[photoIdx].area,
            filename: allPhotoInfo[photoIdx].filename,
          },
        },
      )
      .then((res) => {
        console.log(res);
        openCloseModalHandler(e);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

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
        getAllPhotosInfo={getAllPhotosInfo}
        isModal={isModal}
        isLogin={isLogin}
        loginUserInfo={loginUserInfo}
        isWeather={isWeather}
        openCloseModalHandler={openCloseModalHandler}
        weatherAndPhotoIdxHandle={weatherAndPhotoIdxHandle}
        allPhotoInfo={allPhotoInfo}
        token={token}
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
            isPhotoWeather={isPhotoWeather}
            photoIdx={photoIdx}
            allPhotoInfo={allPhotoInfo}
            setPhotoIdx={setPhotoIdx}

            //
          ></PhotoUploadModal>
        </ModalContainer>
      ) : null}
      {isModal.newPhotoUpload ? (
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

      {isModal.deletePhoto ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <DeletePhotoModal
            message={"사진을 삭제 하시겠습니까?"}
            openCloseModalHandler={openCloseModalHandler}
            handleDeletePhoto={handleDeletePhoto}
          ></DeletePhotoModal>
        </ModalContainer>
      ) : null}

      {isModal.deleteAccount ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <DeleteUserModal
            DeleteUser={DeleteUser}
            message={"정말 탈퇴하시겠습니까?"}
            openCloseModalHandler={openCloseModalHandler}
          ></DeleteUserModal>
        </ModalContainer>
      ) : null}
    </MyPageContainer>
  );
}

export default MyPage;
