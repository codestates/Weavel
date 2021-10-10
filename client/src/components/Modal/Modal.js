import React from "react";
import {
  ModalContainer,
  ModalMessage,
  ButtonContainer,
  ConfirmButton,
  CancelButton,
} from "./Modal.style";
function Modal({ message, openCloseModalHandler }) {
  return (
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      <ModalMessage>{message}</ModalMessage>
      <ButtonContainer>
        <ConfirmButton>확인</ConfirmButton>
        <CancelButton onClick={openCloseModalHandler}>취소</CancelButton>
      </ButtonContainer>
    </ModalContainer>
  );
}

export default Modal;
