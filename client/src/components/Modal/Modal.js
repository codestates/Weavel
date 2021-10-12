import React from "react";
import {
  ModalContainer,
  ModalMessage,
  ButtonContainer,
  ConfirmButton,
  CancelButton,
} from "./Modal.style";
function Modal({ message, openCloseModalHandler, handleLogout }) {
  return (
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      <ModalMessage>{message}</ModalMessage>
      <ButtonContainer>
        <ConfirmButton onClick={(e) => handleLogout(e)}>확인</ConfirmButton>
        <CancelButton onClick={openCloseModalHandler}>취소</CancelButton>
      </ButtonContainer>
    </ModalContainer>
  );
}

export default Modal;
