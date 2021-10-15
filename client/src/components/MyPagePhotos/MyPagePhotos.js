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
              <Photo src={`http://localhost:4000/${photo.image}`} />
              <PhotoInfoContainer>
                <PhotoDate>{photo.date}</PhotoDate>
                <PhotoAreaWeather>
                  {photo.area},{" "}
                  {photo.weather === "1" ? "맑음" : "2" ? "구름" : "3" ? "비" : "4" ? "눈" : null}
                </PhotoAreaWeather>
                <Comment>{photo.comment}</Comment>
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
                      photoDeleteHandler(e);
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
              <img src={`http://localhost:4000/${allPhotoInfo[photoIdx].image}`} />
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
