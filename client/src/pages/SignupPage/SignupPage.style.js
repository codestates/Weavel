import styled from "styled-components";

export const SignupPageContainer = styled.div`
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

export const SignupContainer = styled.div`
  max-width: 468px;
  width: 100%;
  height: 720px;
  background: #fbfbfb;
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  color: #444444;
  padding: 30px 40px 30px 40px;
  @media screen and (max-width: 500px) {
    padding: 20px 30px 20px 30px;
    height: 620px;
  }
  a {
    text-decoration: none;
    color: #4d70ff;
    font-family: "Roboto";
    cursor: pointer;
    @media screen and (max-width: 500px) {
      display: block;
      font-size: 13px;
    }
  }
`;

export const SignupTitle = styled.div`
  width: 100%;
  font-weight: 900;
  font-size: 32px;
  margin-top: 21px;
  @media screen and (max-width: 500px) {
    font-size: 24px;
  }
`;

export const NameContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 34px;
  span {
    @media screen and (max-width: 500px) {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 500px) {
    margin-top: 25px;
  }
`;

export const NameInput = styled.input`
  width: 100%;
  height: 45px;
  background: #fbfbfb;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  padding-left: 5px;
  border-radius: 4px;
  margin-top: 5px;
  outline-color: #4d70ff;
  @media screen and (max-width: 500px) {
    height: 37px;
    font-size: 12px;
  }
`;

export const EmailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 31px;
  span {
    @media screen and (max-width: 500px) {
      font-size: 14px;
    }
  }
`;

export const EmailInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

export const EmailInput = styled.input`
  width: 100%;
  height: 45px;
  background: #fbfbfb;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  box-sizing: border-box;
  padding-left: 5px;
  outline-color: #4d70ff;
  @media screen and (max-width: 500px) {
    height: 37px;
    font-size: 12px;
  }
`;

export const CheckEmail = styled.button`
  width: 103px;
  height: 45px;
  background: ${(props) => (props.isButtonValid ? "#4D70FF" : "#c0cbf7 ")};
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  color: #ffffff;
  font-size: 16px;
  margin-left: 20px;
  padding: 0;
  box-sizing: border-box;
  cursor: ${(props) => (props.isButtonValid ? "pointer" : "")};
  @media screen and (max-width: 500px) {
    width: 73px;
    height: 37px;
    font-size: 10px;
    margin-left: 10px;
  }
`;

export const EmailConfirmMessage = styled.div`
  margin: 5px 0 0 11px;
  height: 26px;
  font-size: 14px;
  color: ${(props) =>
    props.isSuccess
      ? "#4D70FF"
      : props.isFail
      ? "#F44336"
      : props.isEmail
      ? ""
      : "#F44336"};
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

export const WeatherContainer = styled.div`
  width: ${(props) => props.margin || "100%"};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  span {
    @media screen and (max-width: 500px) {
      font-size: 14px;
    }
  }
`;

export const WeatherChoiceBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  flex-wrap: nowrap;
`;

export const Sunny = styled.div`
  flex: 1;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb;
  border: 1px solid
    ${(props) =>
      props.isSunny ? "#4D70FF" : props.isSunnyPhoto ? "#4D70FF" : "#dcdcdc"};
  border-radius: 4px;
  color: ${(props) =>
    props.isSunny ? "#4D70FF" : props.isSunnyPhoto ? "#4D70FF" : "#b0afaf"};
  cursor: pointer;
  box-sizing: border-box;
  @media screen and (max-width: 500px) {
    height: 34px;
    font-size: 12px;
  }
`;

export const Cloud = styled.div`
  flex: 1;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb;
  margin: 0 10px 0 10px;
  border: 1px solid
    ${(props) =>
      props.isCloud ? "#4D70FF" : props.isCloudPhoto ? "#4D70FF" : "#dcdcdc"};
  border-radius: 4px;
  color: ${(props) =>
    props.isCloud ? "#4D70FF" : props.isCloudPhoto ? "#4D70FF" : "#b0afaf"};
  cursor: pointer;
  box-sizing: border-box;
  @media screen and (max-width: 500px) {
    height: 34px;
    font-size: 12px;
  }
`;

export const Rain = styled.div`
  flex: 1;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb;
  margin-right: 10px;
  border: 1px solid
    ${(props) =>
      props.isRain ? "#4D70FF" : props.isRainPhoto ? "#4D70FF" : "#dcdcdc"};
  border-radius: 4px;
  color: ${(props) =>
    props.isRain ? "#4D70FF" : props.isRainPhoto ? "#4D70FF" : "#b0afaf"};
  cursor: pointer;
  box-sizing: border-box;
  @media screen and (max-width: 500px) {
    height: 34px;
    font-size: 12px;
  }
`;

export const Snow = styled.div`
  flex: 1;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb;
  border: 1px solid
    ${(props) =>
      props.isSnow ? "#4D70FF" : props.isSnowPhoto ? "#4D70FF" : "#dcdcdc"};
  border-radius: 4px;
  color: ${(props) =>
    props.isSnow ? "#4D70FF" : props.isSnowPhoto ? "#4D70FF" : "#b0afaf"};
  cursor: pointer;
  box-sizing: border-box;
  @media screen and (max-width: 500px) {
    height: 34px;
    font-size: 12px;
  }
`;

export const PasswordContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: ${(props) => props.margin || "31px"};
  span {
    @media screen and (max-width: 500px) {
      font-size: 14px;
    }
  }
`;

export const PasswordInput = styled.input`
  width: 100%;
  height: 45px;
  background: #fbfbfb;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  box-sizing: border-box;
  padding-left: 5px;
  margin-top: 5px;
  outline-color: #4d70ff;
  @media screen and (max-width: 500px) {
    height: 37px;
    font-size: 12px;
  }
`;

export const PasswordMessage = styled.div`
  margin: 5px 0 0 0;
  margin-left: ${(props) => props.margin || "11px"};
  height: 26px;
  font-size: 14px;
  color: ${(props) => (props.isPassword ? "#4D70FF" : "#E34A49")};
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

export const PasswordConfirmContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  span {
    @media screen and (max-width: 500px) {
      font-size: 14px;
    }
  }
`;

export const PasswordConfirmInput = styled.input`
  width: 100%;
  height: 45px;
  background: #fbfbfb;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  box-sizing: border-box;
  padding-left: 5px;
  margin-top: 5px;
  outline-color: #4d70ff;
  @media screen and (max-width: 500px) {
    height: 37px;
    font-size: 12px;
  }
`;

export const PasswordConfirmMessage = styled.div`
  margin: 5px 0 9px 0;
  margin-left: ${(props) => props.margin || "11px"};
  height: 26px;
  font-size: 14px;
  color: ${(props) => (props.isPasswordConfirm ? "#4D70FF" : "#E34A49")};
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

export const SubmitSignup = styled.button`
  width: 100%;
  height: 47px;
  background: ${(props) => (props.isButtonValid ? "#4D70FF" : "#c0cbf7")};
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  border: none;
  font-family: "Roboto";
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 13px;
  box-sizing: border-box;
  cursor: ${(props) => (props.isButtonValid ? "" : "pointer")};
  @media screen and (max-width: 500px) {
    height: 34px;
    font-size: 12px;
  }
`;
