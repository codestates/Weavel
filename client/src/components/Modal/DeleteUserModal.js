import React from "react";
import {
  ModalContainer,
  ModalMessage,
  ButtonContainer,
  ConfirmButton,
  CancelButton,
} from "./Modal.style";
function DeleteUserModal({ message, openCloseModalHandler }) {
  return (
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      <ModalMessage>{message}</ModalMessage>
      <ButtonContainer>
        {/* <ConfirmButton onClick={(e) => handleLogout(e)}>확인</ConfirmButton> */}
        <CancelButton onClick={openCloseModalHandler}>취소</CancelButton>
      </ButtonContainer>
    </ModalContainer>
  );
}

export default DeleteUserModal;
