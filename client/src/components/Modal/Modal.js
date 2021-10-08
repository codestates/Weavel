import React from "react";
import {
  ModalContainer,
  ModalMessage,
  ButtonContainer,
  ConfirmButton,
  CancelButton,
} from "./Modal.style";
function Modal() {
  return (
    <ModalContainer>
      <ModalMessage>로그아웃 하시겠습니까?</ModalMessage>
      <ButtonContainer>
        <ConfirmButton>확인</ConfirmButton>
        <CancelButton>취소</CancelButton>
      </ButtonContainer>
    </ModalContainer>
  );
}

export default Modal;
