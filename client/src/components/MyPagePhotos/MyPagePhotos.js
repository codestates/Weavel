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
import { Modal, ModalContent } from "./Modal";

function MyPagePhotos({ openCloseModalHandler, token }) {
  const [isOpen, setIsopen] = useState(false);
  const showModal = () => setIsopen((prev) => !prev);

  return (
    <AlbumContainer>
      <Modal onOpen={showModal}>
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
      </Modal>
      {isOpen && (
        <ModalContent onClose={() => setIsopen(false)}>
          <img src="../../images/photo_example1.jpg" alt="" />
        </ModalContent>
      )}
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
