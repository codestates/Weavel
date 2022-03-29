import styled from "styled-components";

export const MyPageContainer = styled.div`
  max-width: 1260px;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 825px) {
    justify-content: center;
    align-items: center;
  }
`;

export const MyPageContainerTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  @media screen and (max-width: 825px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const TopAllContainer = styled.div`
  margin: 35px;
  width: 100%;
  @media screen and (max-width: 370px) {
    margin: 25px;
  }
`;

export const MyPageTopLeft = styled.div`
  display: flex;
  align-items: center;
  max-width: 612px;
  width: 100%;
  background: #fbfbfb;
  border-radius: 4px;
  filter: drop-shadow(0px 0px 11px rgba(0, 0, 0, 0.1));
  margin-right: 5px;
  @media screen and (max-width: 825px) {
    margin-right: 0;
  }
`;

export const MyPageTopRight = styled.div`
  display: flex;
  align-items: center;
  max-width: 612px;
  width: 100%;
  background: #fbfbfb;
  border-radius: 4px;
  filter: drop-shadow(0px 0px 11px rgba(0, 0, 0, 0.1));
  margin-left: 5px;
  @media screen and (max-width: 825px) {
    margin: 20px 0;
  }
`;

export const MyPageContainerMiddle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  @media screen and (max-width: 825px) {
    margin-top: 0;
    max-width: 612px;
    width: 100%;
  }
`;

export const WeatherButtonContainer = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 825px) {
    max-width: 280px;
  }
`;

export const WeatherButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 92px;
  height: 47px;
  background: #fbfbfb;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  font-size: 16px;
  line-height: 19px;
  color: #b0afaf;
  box-sizing: border-box;
  cursor: pointer;
  &:active {
    color: #4d70ff;
    border-color: #4d70ff;
  }
  @media screen and (max-width: 825px) {
    width: 64px;
    height: 38px;
  }
  @media screen and (max-width: 450px) {
    font-size: 12px;
    width: 52px;
    height: 36px;
  }
  @media screen and (max-width: 370px) {
    width: 34px;
    height: 28px;
  }
`;

export const SearchBar = styled.div`
  width: 396px;
  height: 47px;
  background: #fbfbfb;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  border-radius: 23.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 18px;
    height: 18px;
    margin-left: 10px;
  }
  @media screen and (max-width: 825px) {
    height: 38px;
    box-sizing: border-box;
    margin-left: 10px;
  }
  @media screen and (max-width: 450px) {
    height: 36px;
  }
  @media screen and (max-width: 370px) {
    height: 28px;
  }
`;

export const SearchInput = styled.input`
  border-style: none;
  width: 80%;
  margin-left: 10px;
  background-color: transparent;
  ::placeholder {
    color: #b0afaf;
  }
  :focus {
    outline: none;
  }
  @media screen and (max-width: 370px) {
    font-size: 12px;
  }
`;

export const MyPageContainerBottom = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(396px, 1fr));
  margin-top: 45px;
  column-gap: 36px;
  justify-items: center;
  @media screen and (max-width: 825px) {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

export const MyPhotoContainer = styled.div`
  display: flex;
  margin-bottom: 32px;
  cursor: pointer;
  max-width: 396px;
  max-height: 396px;
  width: 100%;
  height: 100%;

  img {
    max-width: 396px;
    max-height: 396px;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  @media screen and (max-width: 825px) {
    justify-content: center;
    align-items: center;
  }
`;

export const PhotoInfoContainer = styled.div`
  position: absolute;
  opacity: 0;
  color: #ffffff;
  display: flex;
  cursor: pointer;
  max-width: 396px;
  max-height: 396px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.45);
  }
  #photo_date {
    font-size: 14px;
    line-height: 16px;
  }
  #photo_area {
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
  }
`;

export const PhotoButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;
  #photo_edit {
    &:active {
      background: rgba(255, 255, 255, 0.35);
    }
  }
  #photo_delete {
    &:active {
      background: rgba(255, 255, 255, 0.35);
    }
  }
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
  z-index: 1;
`;

export const TopFirstText = styled.div`
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  color: #000000;
  @media screen and (max-width: 370px) {
    font-size: 16px;
  }
`;

export const UserEmail = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #444444;
  margin-bottom: 5px;
  @media screen and (max-width: 370px) {
    font-size: 14px;
  }
`;

export const TopSmallText = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #b0afaf;
  @media screen and (max-width: 370px) {
    font-size: 12px;
  }
`;

export const TopButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const TopRightButtonContainer = styled.div`
  max-width: 220px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const TopButtonBlue = styled.button`
  max-width: 103px;
  width: 100%;
  height: 36px;
  background: #4d70ff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: #ffffff;
  border: none;
  cursor: pointer;

  &:active {
    background-color: #2b55fe;
  }
  @media screen and (max-width: 370px) {
    max-width: 80px;
    font-size: 12px;
  }
`;

export const TopButtonWhite = styled.button`
  max-width: 103px;
  width: 100%;
  height: 36px;
  border: 1px solid #4d70ff;
  color: #4d70ff;
  border-radius: 4px;
  background-color: transparent;
  background-repeat: no-repeat;
  cursor: pointer;
  margin-left: 10px;
  &:active {
    background-color: rgba(240, 240, 240, 0.7);
  }
  @media screen and (max-width: 370px) {
    max-width: 80px;
    font-size: 12px;
  }
`;

export const FavWeathersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 20px;
  @media screen and (max-width: 450px) {
    display: flex;
    flex-direction: column;
  }
`;

export const FavWeather = styled.div`
  display: flex;
  align-items: center;
  max-width: 250px;
  width: 100%;
  justify-content: space-between;
  margin: 10px 0;
  @media screen and (max-width: 450px) {
    max-width: none;
  }
`;

export const FavWeatherLeft = styled.div`
  display: flex;
  max-width: 95px;
  width: 100%;
  font-size: 16px;
  line-height: 19px;
  color: #4d70ff;
  gap: 6px;
  @media screen and (max-width: 370px) {
    font-size: 12px;
  }
`;

export const FavWeatherRight = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: #b0afaf;
  display: flex;
  align-items: center;
  align-content: center;
  word-break: keep-all;
  @media screen and (max-width: 370px) {
    font-size: 12px;
  }
`;

export const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  font-family: "Roboto";
  z-index: 999;
  #clicked_img {
    max-width: 80%;
    max-height: 80%;
  }
`;

export const NoPhotoContainer = styled.div`
  position: absolute;
  max-width: 1260px;
  min-height: 389px;
  width: 100%;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(204, 204, 204, 0.4);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  color: #444444;
`;
