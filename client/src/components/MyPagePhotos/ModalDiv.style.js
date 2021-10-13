import styled from "styled-components";

export const PhotoModal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const CloseModal = styled.span`
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 35px;
  font-weight: bold;
  cursor: pointer;
`;

export const ModalContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  height: 100%;
  margin: auto;
`;
