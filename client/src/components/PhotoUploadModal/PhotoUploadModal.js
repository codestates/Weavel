import React from "react";
import {
  ConfirmButton,
  CancelButton,
  ButtonContainer,
} from "../Modal/Modal.style";

import { InputLabel, EmailInput } from "../../pages/LoginPage/LoginPage.style";
import { area } from "./SearchData";
import {
  WeatherButtonContainer,
  WeatherButton,
} from "../MyPageMiddle/MyPageMiddle.style";

import AutoComplete from "./AutoComplete";

import {
  PhotoUploadContainer,
  PhotoUploadPlace,
} from "./PhotoUploadModal.style";
import { EditInfoContainer } from "../EditUserInfoModal/EditUserInfoModal.style";
import PhotoUpload from "../PhotoUpload/PhotoUpload";
function PhotoUploadModal({ openCloseModalHandler }) {
  const weatherbuttontext = ["맑음", "구름", "비", "눈"];

  return (
    <PhotoUploadContainer onClick={(e) => e.stopPropagation()}>
      <PhotoUpload />
      <EditInfoContainer margin={"200px"}>
        <InputLabel>날짜</InputLabel>
        <EmailInput placeholder="YYYY / MM / DD" maxLength="10" />
        <InputLabel>지역</InputLabel>
        <AutoComplete suggestions={area} />
        <InputLabel>날씨</InputLabel>
        <div>
          <WeatherButtonContainer>
            {weatherbuttontext.map((weather, idx) => (
              <WeatherButton key={idx}>{weather}</WeatherButton>
            ))}
          </WeatherButtonContainer>
        </div>
        <InputLabel margin={"15px"}>코멘트</InputLabel>
        <EmailInput
          placeholder="25글자 이내로 남기고 싶은 코멘트를 적어주세요"
          maxLength="25"
        />
        <span>
          <ButtonContainer>
            <ConfirmButton>업로드</ConfirmButton>
            <CancelButton onClick={openCloseModalHandler}>취소</CancelButton>
          </ButtonContainer>
        </span>
      </EditInfoContainer>
    </PhotoUploadContainer>
  );
}

export default PhotoUploadModal;
