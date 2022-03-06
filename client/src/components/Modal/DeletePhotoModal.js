import React from "react";
import {
  ModalContainer,
  ModalMessage,
  ButtonContainer,
  ConfirmButton,
  CancelButton,
} from "./Modal.style";
function DeletePhotoModal({ message, photoDeleteHandler, handleDeletePhoto }) {
  return (
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      <ModalMessage>{message}</ModalMessage>
      <ButtonContainer>
        <ConfirmButton onClick={(e) => handleDeletePhoto(e)}>
          확인
        </ConfirmButton>
        <CancelButton onClick={photoDeleteHandler}>취소</CancelButton>
      </ButtonContainer>
    </ModalContainer>
  );
}

export default DeletePhotoModal;
