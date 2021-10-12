import React from "react";

import { PhotoModal, CloseModal, ModalContentDiv } from "./ModalDiv.style";

export const Modal = ({ onOpen, children }) => {
  return <div onClick={onOpen}> {children}</div>;
};

export const ModalContent = ({ onClose, children }) => {
  return (
    <PhotoModal>
      <CloseModal onClick={onClose}>&times;</CloseModal>
      <ModalContentDiv>{children}</ModalContentDiv>
    </PhotoModal>
  );
};
