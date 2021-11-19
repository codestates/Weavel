import styled from "styled-components";

export const MyPageTopContainer = styled.div`
  display: flex;
`;
export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 612px;
  height: 182px;
  background: #fbfbfb;
  border-radius: 4px;
  filter: drop-shadow(0px 0px 11px rgba(0, 0, 0, 0.1));
  margin-right: 36px;
`;

export const ContainerFirstText = styled.div`
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  color: #000000;
  margin-bottom: ${(props) => props.margin || "7px"};
`;

export const UserEmail = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #444444;
  margin-bottom: 18px;
`;

export const UploadPhotoText = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #b0afaf;
  margin-bottom: 18px;
`;

export const UserButtonContainer = styled.div`
  width: 549px;
  height: 36px;
  display: flex;
  justify-content: space-around;
  gap: 6px;
`;

export const PhotoUploadButton = styled.button`
  width: 103px;
  height: 36px;
  background: #4d70ff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: #ffffff;
  border: none;
  cursor: pointer;
  margin-right: ${(props) => props.margin || "0px"};
`;

export const EditUserInfoButton = styled.button`
  width: 103px;
  height: 36px;
  border: 1px solid #4d70ff;
  color: #4d70ff;
  border-radius: 4px;
  background-color: transparent;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const DeleteAccountButton = styled.button`
  width: 103px;
  height: 36px;
  border: 1px solid #4d70ff;
  color: #4d70ff;
  border-radius: 4px;
  background-color: transparent;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const FavoriteWeatherContainer = styled.div`
  width: 612px;
  height: 182px;
  background: #fbfbfb;
  border-radius: 4px;
  filter: drop-shadow(0px 0px 11px rgba(0, 0, 0, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FavoriteWeather = styled.div`
  display: flex;
  width: 240px;
  height: 26px;
  justify-content: space-around;
  align-content: center;
`;

export const FavoriteWeatherText = styled.span`
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #4d70ff;
  margin-right: 10px;
`;

export const FavoriteWeatherIcon = styled.img`
  width: 18px;
  height: 18px;
`;

export const FavoriteWeatherUsers = styled.span`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #b0afaf;
  text-align: right;
`;

export const FavWeathersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  height: 80px;
  gap: 10px;
  flex-wrap: wrap;
`;
