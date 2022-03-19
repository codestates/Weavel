import React from "react";
import {
  ModalContainer,
  ModalMessage,
  ButtonContainer,
  ConfirmButton,
  CancelButton,
} from "./Modal.style";
function DeleteUserModal({ message, userDeleteHandler, DeleteUser }) {
  return (
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      <ModalMessage>{message}</ModalMessage>
      <ButtonContainer>
        <ConfirmButton onClick={DeleteUser}>확인</ConfirmButton>
        <CancelButton onClick={userDeleteHandler}>취소</CancelButton>
      </ButtonContainer>
    </ModalContainer>
  );
}

export default DeleteUserModal;
