import styled from "styled-components";

export const AlbumContainer = styled.div`
  display: flex;
  margin-top: 45px;
  width: 1260px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const PhotoContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 32px;
  cursor: pointer;
`;

export const Photo = styled.img`
  width: 396px;
  height: 389px;
`;

export const NoPhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1260px;
  height: 389px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(204, 204, 204, 0.4);
  gap: 38px;
  margin-bottom: 150px;
`;

export const NoPhotoTextContainer = styled.div`
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  color: #444444;
  text-align: center;
`;

export const PhotoInfoContainer = styled.div`
  position: absolute;
  width: 396px;
  height: 255px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 134px 0 0 0;
  gap: 5px;
  opacity: 0;
  color: #ffffff;
  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.45);
  }
`;

export const PhotoDate = styled.div`
  justify-content: space-around;
  font-size: 14px;
  line-height: 16px;
`;

export const PhotoAreaWeather = styled.div`
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
`;

export const Comment = styled.div`
  font-size: 16px;
  line-height: 19px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const PhotoButton = styled.button`
  width: 45px;
  height: 30px;
  border: 2px solid #ffffff;
  border-radius: 4px;
  background-color: transparent;
  background-repeat: no-repeat;
  cursor: pointer;
  color: #ffffff;
`;

export const PhotoClickContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
