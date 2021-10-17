import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
<<<<<<< HEAD
  isLogin,
  photoIdx,
  deletephotohandler,
  weatherAndPhotoIdxHandle,
  isPhotoWeather,
  OnlyOneWeatherHandle,
}) {
  console.log("dyrlrlrlrl", allPhotoInfo);
  function photoEditHandler(e) {
=======

  getAllPhotosInfo,
}) {
  const [photoIdx, setPhotoIdx] = useState([]);
  const [photoEditWeather, setPhotoEditWeather] = useState([]);
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  function photoEditHandler(e) {
    setPhotoIdx(e.target.id);

    const weatherState = {
      sunny: false,
      cloud: false,
      rain: false,
      snow: false,
      num: null,
    };

    if (allPhotoInfo[e.target.id].weather === "0") {
      weatherState.sunny = true;
    } else if (allPhotoInfo[e.target.id].weather === "1") {
      weatherState.cloud = true;
    } else if (allPhotoInfo[e.target.id].weather === "2") {
      weatherState.rain = true;
    } else if (allPhotoInfo[e.target.id].weather === "3") {
      weatherState.snow = true;
    }

    setPhotoEditWeather(weatherState);
>>>>>>> a5694b07fee67994efde6d54792c02919bf7dde9
    openCloseModalHandler(e);
  }
  const photoSelectHandle = (e) => {
    weatherAndPhotoIdxHandle(e);
  };

  function photoDeleteHandler(e) {
    openCloseModalHandler(e);
  }
  const accessToken = useSelector((state) => state.authReducer.accessToken);

<<<<<<< HEAD
=======
  useEffect(() => {
    setPhotoIdx(photoIdx);
    getAllPhotosInfo(accessToken);
  }, []);
  // 사진 삭제
  function handleDeletePhoto(e) {
    axios
      .delete(
        "http://localhost:4000/photo",

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
        }
      )
      .then((res) => {
        console.log(res);
        openCloseModalHandler(e);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

>>>>>>> a5694b07fee67994efde6d54792c02919bf7dde9
  return (
    <AlbumContainer>
      <>
        {isLogin && allPhotoInfo.length !== 0 ? (
          allPhotoInfo.map((photo, idx) => {
            return (
              <PhotoContainer
                onClick={(e) => {
                  openCloseModalHandler(e);
                }}
                name={"clickPhoto"}
                id={idx}
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
                photoSelectHandle(e);
              }}
            >
<<<<<<< HEAD
              <Photo src={`http://localhost:4000/${photo.image}`} />
              <PhotoInfoContainer>
                <PhotoDate>
                  {photo.date === "날짜 정보가 없습니다" ? "날짜 정보가 없습니다" : photo.date}
                </PhotoDate>
                <PhotoAreaWeather>
                  {photo.area === "위치 정보가 없습니다" ? "위치 정보가 없습니다" : photo.area},{" "}
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
              <img src={`http://localhost:4000/${allPhotoInfo[photoIdx].image}`} />
            </ClickPhotoModal>
=======
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
>>>>>>> a5694b07fee67994efde6d54792c02919bf7dde9
          </ModalContainer>
        ) : null}
      </>
    </AlbumContainer>
  );
}

export default MyPagePhotos;
