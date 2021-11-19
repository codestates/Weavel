import styled from "styled-components";

export const PhotoUploadContainer = styled.div`
  width: 612px;
  padding-right: 45px;
  height: 800px;
  background: #fbfbfb;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-content: space-evenly;
  margin-top: 10vh;
`;

export const PhotoUploadPlace = styled.div`
  width: 200px;
  height: 200px;
  background: #fbfbfb;
  filter: drop-shadow(0px 0px 11px rgba(0, 0, 0, 0.1));
  border-radius: 4px;
  margin-top: 39px;
  margin-left: 208px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const DateInput = styled.input`
  background: #fbfbfb;
  width: 396px;
  height: 47px;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 0 0 18px 36px;
  padding-left: 10px;
  &:focus {
    outline-color: #4d70ff;
  }
  ::placeholder {
    color: #b0afaf;
  }
`;
