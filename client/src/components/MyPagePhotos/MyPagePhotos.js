import React from "react";
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
} from "./MyPagePhotos.style";
import { PhotoUploadButton } from "../MyPageTop/MyPageTop.style";
function MyPagePhotos({ openCloseModalHandler }) {
  return (
    <AlbumContainer>
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
