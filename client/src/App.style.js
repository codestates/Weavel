import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  font-family: "Roboto";
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  flex: 1;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.05);
  span {
    margin: 0 40.5px 0 40.5px;
    color: #444444;
  }
`;

export const Logo = styled.img`
  width: 40px;
  margin-right: 459.5px;
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
  margin-left: 417.5px;
`;

export const Body = styled.div`
  flex: 7.5;
  width: 100vw;
  background: linear-gradient(0deg, rgba(128, 185, 239, 0.1), rgba(128, 185, 239, 0.1)), #fbfbfb;
`;

export const Footer = styled.div`
  flex: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FooterLine = styled.div`
  background: linear-gradient(0deg, rgba(128, 185, 239, 0.1), rgba(128, 185, 239, 0.1)), #fbfbfb;
  width: 100vw;
  div {
    margin: 0 auto;
    height: 1px;
    border-bottom: 1px solid #dcdcdc;
    background: linear-gradient(0deg, rgba(128, 185, 239, 0.1), rgba(128, 185, 239, 0.1)), #fbfbfb;
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
  justify-content: center;
  align-items: center;
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
