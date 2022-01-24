import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  font-family: "Roboto";
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  height: 80px;
  max-width: 1060px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.05);
`;

export const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 10px;
`;

export const MenuContainer = styled.div`
  display: flex;
`;

export const Menu = styled.div`
  width: 70px;
  margin: 0 40.5px 0 40.5px;
  color: #444444;
  cursor: pointer;
  text-align: center;
  :active {
    color: #4d70ff;
  }
  @media screen and (max-width: 500px) {
    width: 60px;
    font-size: 12px;
    margin: ${(props) => props.margin || "0 20.5px 0 0 "};
  }
`;

export const HeaderContents = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.img`
  width: 40px;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    width: 30px;
  }
`;

export const LoginButton = styled.button`
  width: 72px;
  height: 36px;
  background: #4d70ff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12);
  border: none;
  border-radius: 4px;
  color: #ffff;
  font-family: "Roboto";
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    width: 50px;
    height: 25px;
    font-size: 10px;
  }
`;

export const Body = styled.div`
  width: 100%;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  background: linear-gradient(
      0deg,
      rgba(128, 185, 239, 0.1),
      rgba(128, 185, 239, 0.1)
    ),
    #fbfbfb;
`;

export const Footer = styled.div`
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FooterLine = styled.div`
  background: linear-gradient(
      0deg,
      rgba(128, 185, 239, 0.1),
      rgba(128, 185, 239, 0.1)
    ),
    #fbfbfb;

  div {
    margin: 0 auto;
    height: 1px;
    border-bottom: 1px solid #dcdcdc;
    background: linear-gradient(
        0deg,
        rgba(128, 185, 239, 0.1),
        rgba(128, 185, 239, 0.1)
      ),
      #fbfbfb;
    width: 1260px;
  }
`;

export const FooterContents = styled.div`
  width: 216px;
  height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: #000000;
  }
`;

export const FooterProjectLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-right: 10px;
  }
  span {
    padding-top: 2px;
  }
`;

export const FooterTeamLink = styled.div`
  display: flex;
  justify-content: space-between;
`;
