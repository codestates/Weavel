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
  ClickPhotoModal,
} from "./MyPagePhotos.style";
import DeletePhotoModal from "../../components/Modal/DeletePhotoModal";
import { ModalContainer } from "../../pages/MyPage/MyPage.style";
import { PhotoUploadButton } from "../MyPageTop/MyPageTop.style";
import PhotoUploadModal from "../PhotoUploadModal/PhotoUploadModal";
import axios from "axios";
function MyPagePhotos({
  openCloseModalHandler,
  allPhotoInfo,
  token,
  loginUserInfo,
  isWeather,
  weatherCheckHandle,
  isModal,
  isLogin,
  photoIdx,
  deletephotohandler,
  weatherAndPhotoIdxHandle,
  isPhotoWeather,
  OnlyOneWeatherHandle,
}) {
  console.log("dyrlrlrlrl", allPhotoInfo);
  function photoEditHandler(e) {
    openCloseModalHandler(e);
  }
  const photoSelectHandle = (e) => {
    weatherAndPhotoIdxHandle(e);
  };

  function photoDeleteHandler(e) {
    openCloseModalHandler(e);
  }

  return (
    <AlbumContainer>
      <>
        {allPhotoInfo.map((photo, idx) => {
          return (
            <PhotoContainer
              onClick={(e) => {
                photoSelectHandle(e);
              }}
              name={"clickPhoto"}
              id={idx}
            >
              <Photo src={`https://server.weavel.site/${photo.image}`} />
              <PhotoInfoContainer>
                <PhotoDate>
                  {photo.date === "날짜 정보가 없습니다"
                    ? "날짜 정보가 없습니다"
                    : photo.date}
                </PhotoDate>
                <PhotoAreaWeather>
                  {photo.area === "위치 정보가 없습니다"
                    ? "위치 정보가 없습니다"
                    : photo.area}
                  ,{" "}
                  {photo.weather === "1"
                    ? "맑음"
                    : photo.weather === "2"
                    ? "구름"
                    : photo.weather === "3"
                    ? "비"
                    : photo.weather === "4"
                    ? "눈"
                    : ""}
                </PhotoAreaWeather>
                <Comment>
                  {photo.comment === "코멘트 정보가 없습니다"
                    ? "코멘트 정보가 없습니다"
                    : photo.comment}
                </Comment>
                <ButtonContainer>
                  <PhotoButton
                    id={idx}
                    name={"photoUpload"}
                    onClick={(e) => {
                      photoEditHandler(e);
                    }}
                  >
                    수정
                  </PhotoButton>
                  <PhotoButton
                    id={idx}
                    name={"deletePhoto"}
                    onClick={(e) => {
                      openCloseModalHandler(e);
                    }}
                  >
                    삭제
                  </PhotoButton>
                </ButtonContainer>
              </PhotoInfoContainer>
            </PhotoContainer>
          );
        })}

        {isModal.clickPhoto ? (
          <ModalContainer onClick={openCloseModalHandler}>
            <ClickPhotoModal openCloseModalHandler={openCloseModalHandler}>
              <img
                src={`https://server.weavel.site/${allPhotoInfo[photoIdx].image}`}
              />
            </ClickPhotoModal>
          </ModalContainer>
        ) : null}
      </>
      {/*   
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
      {isModal.photoUpload ? (
        <ModalContainer
          background={"rgba(0, 0, 0, 0.1)"}
          onClick={openCloseModalHandler}
        >
          <PhotoUploadModal
            photoEditWeather={photoEditWeather}
            photoEditHandler={photoEditHandler}
            photoIdx={photoIdx}
            allPhotoInfo={allPhotoInfo}
            token={token}
            loginUserInfo={loginUserInfo}
            isWeather={isWeather}
            weatherCheckHandle={weatherCheckHandle}
            openCloseModalHandler={openCloseModalHandler}
          ></PhotoUploadModal>
        </ModalContainer>
      ) : null}
      {isModal.deletePhoto ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <DeletePhotoModal
            handleDeletePhoto={handleDeletePhoto}
            message={"사진을 삭제하시겠습니까?"}
            openCloseModalHandler={openCloseModalHandler}
          ></DeletePhotoModal>
        </ModalContainer>
      ) : null} */}
    </AlbumContainer>
  );
}

export default MyPagePhotos;
