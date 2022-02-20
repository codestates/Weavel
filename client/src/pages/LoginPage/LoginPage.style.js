import styled from "styled-components";

export const LoginPageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px 0 5px;
  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
`;

export const LoginContainer = styled.div`
  margin: 150px 0 250px 0;
  padding: 40px 50px 40px 50px;
  display: flex;
  flex-direction: column;
  max-width: 468px;
  width: 100%;
  height: 555px;
  background: #fbfbfb;
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: Roboto;
  box-sizing: border-box;
  @media screen and (max-width: 500px) {
    padding: 30px 25px 30px 25px;
    height: 455px;
  }
`;

export const LoginText = styled.div`
  font-size: 32px;
  line-height: 37px;
  color: #444444;
  font-weight: 700;
  margin-bottom: 33px;
  @media screen and (max-width: 500px) {
    font-size: 26px;
    margin-bottom: 25px;
  }
`;
export const InputLabel = styled.label`
  font-size: 16px;
  line-height: 19px;
  font-weight: normal;
  margin-bottom: 6px;
  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;

export const EmailInput = styled.input`
  background: #fbfbfb;
  width: 100%;
  height: 47px;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 30px;
  padding-left: 5px;
  @media screen and (max-width: 500px) {
    height: 37px;
  }
  &:focus {
    outline-color: #4d70ff;
  }
  ::placeholder {
    color: #b0afaf;
  }
`;

export const PasswordInput = styled.input`
  background: #fbfbfb;
  width: 100%;
  height: 47px;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 18px;
  padding-left: 5px;
  @media screen and (max-width: 500px) {
    height: 37px;
  }
  &:focus {
    outline-color: #4d70ff;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 47px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  border-style: none;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.46px;
  color: #ffffff;
  margin-bottom: 20px;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 14px;
    height: 35px;
  }
  ${(props) =>
    props.disabled
      ? `
          background: #C0CBF7;
        `
      : `
          background: #4D70FF;
        `};
`;

export const GoSignup = styled.div`
  position: relative;
  margin-top: 13px;
  font-weight: normal;
  line-height: 19px;
  color: #4d70ff;
  text-align: center;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 13px;
  }
`;
export const UnderLine = styled.span`
  @media screen and (max-width: 500px) {
    font-size: 13px;
  }
  :hover {
    text-decoration: underline;
  }
`;

export const AlertBox = styled.div`
  display: flex;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    #f44336;
  width: 100%;
  border-radius: 4px;
`;

export const AlertText = styled.span`
  color: #f44336;
  font-weight: normal;
  font-size: 14px;
  padding-top: 10px;
  flex-direction: row;
  justify-content: center;
  vertical-align: middle;
  flex: 6;
  justify-content: center;
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

export const AlertImg = styled.img`
  height: 36px;
  flex: 1;
  @media screen and (max-width: 500px) {
    height: 32px;
  }
`;

export const MiddleContainer = styled.div`
  height: 100px;
`;
