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

function MyPagePhotos({ openCloseModalHandler, token }) {
  const [isModal, setIsModal] = useState({
    photoClickModal: false,
  });

  const openCloseModalHandlerPhoto = (e) => {
    let newIsModal = { ...isModal };

    if (e.target.name === "photoClickModal") {
      newIsModal.photoClickModal = !newIsModal.photoClickModal;
    } else {
      if (isModal.photoClickModal) {
        newIsModal.photoClickModal = !newIsModal.photoClickModal;
      }
    }
    setIsModal(newIsModal);
  };

  const { photoClickModal } = isModal;

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = photoClickModal ? "hidden" : "auto";
  }, [photoClickModal]);

  return (
    <AlbumContainer>
      <PhotoContainer onClick={(e) => openCloseModalHandlerPhoto(e)}>
        <Photo src="../../images/photo_example1.jpg" />
        <PhotoInfoContainer>
          <PhotoDate>2021.10.03</PhotoDate>
          <PhotoAreaWeather>서울시 서초구, 맑음</PhotoAreaWeather>
          <Comment>간만에 한강 산책한 날</Comment>
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
      </PhotoContainer>
      <PhotoContainer>
        <Photo src="../../images/photo_example1.jpg" />
        <PhotoInfoContainer>
          <PhotoDate>2021.10.03</PhotoDate>
          <PhotoAreaWeather>서울시 서초구, 맑음</PhotoAreaWeather>
          <Comment>간만에 한강 산책한 날</Comment>
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
      </PhotoContainer>
      <PhotoContainer>
        <Photo src="../../images/photo_example1.jpg" />
        <PhotoInfoContainer>
          <PhotoDate>2021.10.03</PhotoDate>
          <PhotoAreaWeather>서울시 서초구, 맑음</PhotoAreaWeather>
          <Comment>간만에 한강 산책한 날</Comment>
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
      </PhotoContainer>
      <PhotoContainer>
        <Photo src="../../images/photo_example1.jpg" />
        <PhotoInfoContainer>
          <PhotoDate>2021.10.03</PhotoDate>
          <PhotoAreaWeather>서울시 서초구, 맑음</PhotoAreaWeather>
          <Comment>간만에 한강 산책한 날</Comment>
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
      </PhotoContainer>
      <PhotoContainer>
        <Photo src="../../images/photo_example1.jpg" />
        <PhotoInfoContainer>
          <PhotoDate>2021.10.03</PhotoDate>
          <PhotoAreaWeather>서울시 서초구, 맑음</PhotoAreaWeather>
          <Comment>간만에 한강 산책한 날</Comment>
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
      </PhotoContainer>
      <PhotoContainer>
        <Photo src="../../images/photo_example1.jpg" />
        <PhotoInfoContainer>
          <PhotoDate>2021.10.03</PhotoDate>
          <PhotoAreaWeather>서울시 서초구, 맑음</PhotoAreaWeather>
          <Comment>간만에 한강 산책한 날</Comment>
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
      </PhotoContainer>
      <PhotoContainer>
        <Photo src="../../images/photo_example1.jpg" />
        <PhotoInfoContainer>
          <PhotoDate>2021.10.03</PhotoDate>
          <PhotoAreaWeather>서울시 서초구, 맑음</PhotoAreaWeather>
          <Comment>간만에 한강 산책한 날</Comment>
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
      </PhotoContainer>

      {/* <NoPhotoContainer>
        <NoPhotoTextContainer>
          기록하고 싶은 날씨가 있으신가요? <div></div>사진을 찍어 올려보세요
        </NoPhotoTextContainer>
        <PhotoUploadButton
          name={"photoUpload"}
          onClick={(e) => {
            openCloseModalHandler(e);
          }}
        >
          사진 업로드
        </PhotoUploadButton>
      </NoPhotoContainer> */}
    </AlbumContainer>
  );
}

export default MyPagePhotos;
