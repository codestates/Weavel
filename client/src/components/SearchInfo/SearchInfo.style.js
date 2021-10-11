import styled from "styled-components";

export const InfoContainer = styled.div`
  width: 1036px;
  height: 486px;
  display: flex;
  justify-content: space-between;
  margin-top: 72px;
`;

export const InfoContentsContainer = styled.div`
  width: 489px;
  height: 213px;
  display: flex;
  flex-direction: column;
  margin-right: 57px;
`;

export const InfoContents = styled.div`
  width: 490px;
  padding-left: 20px;
  margin-top: 46px;
  > .infoTitle {
    font-size: 2rem;
    color: #2d24a3;
    font-weight: bold;
    margin-bottom: 20px;
  }
  > .infoComment {
    font-size: 1rem;
    color: #585656;
    margin-bottom: 30px;
  }
`;

export const InfoImg = styled.div`
  margin-right: 0;
  img {
    width: 490px;
  }
`;

export const LoginButton = styled.button`
  width: 87px;
  height: 47px;
  background: #4d70ff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12);
  border: none;
  border-radius: 4px;
  color: #ffff;
  font-family: "Roboto";
  font-weight: 500;
  font-size: 15px;
`;
