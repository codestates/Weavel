import styled from "styled-components";

export const ModalContainer = styled.div`
  margin: 0 auto;
  width: 396px;
  height: 255px;
  filter: drop-shadow(0px 0px 11px rgba(0, 0, 0, 0.1));
  font-family: Roboto;
  font-style: normal;
  background: #fbfbfb;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-top: 18vh;
`;

export const ModalMessage = styled.div`
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
  margin-top: 90px;
  flex: 1.5;
`;
export const ButtonContainer = styled.div`
  font-weight: 500;
  font-size: 15px;
  line-height: 26px;
  letter-spacing: 0.46px;
  display: flex;
  flex: 1.5;
  justify-content: center;
  gap: 11px;
`;
export const ConfirmButton = styled.button`
  width: 85px;
  height: 47px;
  background: #4d70ff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: #ffffff;
  border-style: none;
  cursor: pointer;
`;

export const CancelButton = styled.button`
  width: 85px;
  height: 47px;
  border: 1px solid #4d70ff;
  border-radius: 4px;
  color: #4d70ff;
  background: #ffffff;
  cursor: pointer;
`;
