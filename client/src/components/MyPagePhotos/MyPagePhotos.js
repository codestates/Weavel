import React, { useState, useEffect } from "react";
import {
  AlbumContainer,
  PhotoContainer,
  Photo,
  NoPhotoContainer,
  NoPhotoTextContainer,
  PhotoDate,
  PhotoAreaWeather,
  Comment,
  PhotoButton,
  PhotoInfoContainer,
  ButtonContainer,
  PhotoClickContainer,
} from "./MyPagePhotos.style";
import { ModalContainer } from "../../pages/MyPage/MyPage.style";
import { PhotoUploadButton } from "../MyPageTop/MyPageTop.style";
import PhotoUploadModal from "../PhotoUploadModal/PhotoUploadModal";

function MyPagePhotos({
  openCloseModalHandler,
  allPhotoInfo,
  token,
  loginUserInfo,
  isWeather,
  weatherCheckHandle,
  setKeyword,
  keyword,
  isLogin,
}) {
  const [isModal, setIsModal] = useState({
    photoUpload: false,
  });

  const openCloseModalHandlerPhoto = (e) => {
    let newIsModal = { ...isModal };

    if (e.target.name === "photoUpload") {
      newIsModal.photoUpload = !newIsModal.photoUpload;
    } else {
      if (isModal.photoUpload) {
        newIsModal.photoUpload = !newIsModal.photoUpload;
      }
    }
    setIsModal(newIsModal);
  };

  const { photoUpload } = isModal;

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = photoUpload ? "hidden" : "auto";
  }, [photoUpload]);

  return (
    <AlbumContainer>
      {allPhotoInfo ? (
        <>
          {allPhotoInfo.map((photo) => {
            return (
              <PhotoContainer
                key={photo.id}
                onClick={(e) => openCloseModalHandlerPhoto(e)}
              >
                <Photo src={`http://localhost:4000/${photo.image}`} />
                <PhotoInfoContainer>
                  <PhotoDate>{photo.date}</PhotoDate>
                  <PhotoAreaWeather>
                    {photo.area},{" "}
                    {photo.weather === "1"
                      ? "맑음"
                      : "2"
                      ? "구름"
                      : "3"
                      ? "비"
                      : "4"
                      ? "눈"
                      : null}
                  </PhotoAreaWeather>
                  <Comment>{photo.comment}</Comment>
                  <ButtonContainer>
                    <PhotoButton
                      name={"photoUpload"}
                      onClick={(e) => {
                        openCloseModalHandler(e);
                      }}
                    >
                      수정
                    </PhotoButton>
                    <PhotoButton
                      name={"deletePhoto"}
                      onClick={(e) => {
                        openCloseModalHandler(e);
                      }}
                    >
                      삭제
                    </PhotoButton>
                  </ButtonContainer>
                </PhotoInfoContainer>
                {isModal.photoUpload ? (
                  <ModalContainer onClick={openCloseModalHandler}>
                    <PhotoUploadModal
                      photoId={photo.id}
                      allPhotoInfo={allPhotoInfo}
                      token={token}
                      loginUserInfo={loginUserInfo}
                      isWeather={isWeather}
                      weatherCheckHandle={weatherCheckHandle}
                      openCloseModalHandler={openCloseModalHandler}
                    ></PhotoUploadModal>
                  </ModalContainer>
                ) : null}
              </PhotoContainer>
            );
          })}
        </>
      ) : allPhotoInfo && keyword ? (
        allPhotoInfo
          .filter((photo) => {
            photo.area.includes(keyword);
          })
          .map((photo) => {
            return (
              <PhotoContainer
                key={photo.id}
                onClick={(e) => openCloseModalHandlerPhoto(e)}
              >
                <Photo src={`http://localhost:3000/${photo.image}`} />
                <PhotoInfoContainer>
                  <PhotoDate>{photo.date}</PhotoDate>
                  <PhotoAreaWeather>
                    {photo.area},{" "}
                    {photo.weather === "1"
                      ? "맑음"
                      : "2"
                      ? "구름"
                      : "3"
                      ? "비"
                      : "4"
                      ? "눈"
                      : null}
                  </PhotoAreaWeather>
                  <Comment>{photo.comment}</Comment>
                  <ButtonContainer>
                    <PhotoButton
                      name={"photoUpload"}
                      onClick={(e) => {
                        openCloseModalHandler(e);
                      }}
                    >
                      수정
                    </PhotoButton>
                    <PhotoButton
                      name={"deletePhoto"}
                      onClick={(e) => {
                        openCloseModalHandler(e);
                      }}
                    >
                      삭제
                    </PhotoButton>
                  </ButtonContainer>
                </PhotoInfoContainer>
                {isModal.photoUpload ? (
                  <ModalContainer onClick={openCloseModalHandler}>
                    <PhotoUploadModal
                      date={photo.date}
                      area={photo.area}
                      weather={photo.weather}
                      comment={photo.comment}
                      allPhotoInfo={allPhotoInfo}
                      token={token}
                      loginUserInfo={loginUserInfo}
                      isWeather={isWeather}
                      weatherCheckHandle={weatherCheckHandle}
                      openCloseModalHandler={openCloseModalHandler}
                    ></PhotoUploadModal>
                  </ModalContainer>
                ) : null}
              </PhotoContainer>
            );
          })
      ) : (
        <NoPhotoContainer>
          <NoPhotoTextContainer>
            기록하고 싶은 날씨가 있으신가요? <br></br>사진을 찍어 올려보세요
          </NoPhotoTextContainer>
          <PhotoUploadButton
            disabled={!isLogin}
            name={"newPhotoUpload"}
            onClick={(e) => {
              openCloseModalHandler(e);
            }}
          >
            사진 업로드
          </PhotoUploadButton>
        </NoPhotoContainer>
      )}
    </AlbumContainer>
  );
}

export default MyPagePhotos;
