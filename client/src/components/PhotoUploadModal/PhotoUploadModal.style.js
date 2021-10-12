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
  span {
    display: flex;
    margin-top: 10px;
  }
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
