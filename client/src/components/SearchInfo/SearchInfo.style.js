import styled from "styled-components";

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 50px 0;
  @media screen and (max-width: 1060px) {
    flex-direction: column;
    align-items: center;
  }
  @media screen and (max-width: 500px) {
    margin-top: 40px;
  }
`;

export const InfoContentsContainer = styled.div`
  width: 100%;
  height: 213px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 57px;
  @media screen and (max-width: 1060px) {
    margin: 0;
    height: 120px;
  }
`;

export const InfoContents = styled.div`
  padding-left: 20px;
  margin-top: 46px;
  @media screen and (max-width: 1060px) {
    margin-top: 26px;
  }
  > .infoTitle {
    font-size: 2rem;
    color: #2d24a3;
    font-weight: bold;
    margin-bottom: 20px;
    @media screen and (max-width: 500px) {
      font-size: 1.2rem;
      div {
        margin-top: 5px;
      }
    }
  }
  > .infoComment {
    font-size: 1rem;
    color: #585656;

    @media screen and (max-width: 500px) {
      font-size: 0.7rem;
      margin-bottom: 0;
      div {
        margin-top: 5px;
      }
    }
  }
`;

export const InfoImgContainer = styled.div`
  margin-top: 50px;
  margin-right: 0;
`;
export const InfoImg = styled.img`
  width: 490px;
  @media screen and (max-width: 500px) {
    width: 300px;
  }
`;
