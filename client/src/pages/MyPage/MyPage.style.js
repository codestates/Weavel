import styled from "styled-components";

export const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${(props) => props.background || "rgba(0, 0, 0, 0.5)"};
  font-family: "Roboto";
  z-index: 999;
`;
