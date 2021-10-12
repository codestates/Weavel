import styled from "styled-components";

export const SignupContainer = styled.main`
  width: 468px;
  height: 720px;
  background: #fbfbfb;
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  color: #444444;
  margin-top: 50px;
  margin-bottom: 120px;
  a {
    text-decoration: none;
    color: #4d70ff;
    font-family: "Roboto";
    cursor: pointer;
  }
`;

export const SignupTitle = styled.div`
  width: 396px;
  display: flex;
  justify-content: start;
  font-weight: 900;
  font-size: 32px;
  margin-top: 21px;
`;

export const NameContainer = styled.div`
  width: 396px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 34px;
`;

export const NameInput = styled.input`
  width: 386px;
  height: 45px;
  background: #fbfbfb;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 0;
  margin-top: 5px;
  padding-left: 10px;
  outline-color: #4d70ff;
`;

export const EmailContainer = styled.div`
  width: 396px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 31px;
`;

export const EmailInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

export const EmailInput = styled.input`
  width: 278px;
  height: 45px;
  background: #fbfbfb;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 0;
  padding-left: 10px;
  outline-color: #4d70ff;
`;

export const CheckEmail = styled.button`
  width: 103px;
  height: 47px;
  background: ${(props) => (props.isButtonValid ? "#4D70FF" : "#c0cbf7 ")};
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  color: #ffffff;
  font-size: 16px;
  padding: 0;
  cursor: ${(props) => (props.isButtonValid ? "pointer" : "")};
`;

export const EmailConfirmMessage = styled.div`
  margin: 5px 0 0 11px;
  height: 26px;
  font-size: 14px;
  color: ${(props) =>
    props.isSuccess ? "#4D70FF" : props.isFail ? "#F44336" : props.isEmail ? "" : "#F44336"};
`;

export const WeatherContainer = styled.div`
  width: ${(props) => props.margin || "396px"};
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export const WeatherChoiceBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  flex-wrap: nowrap;
`;

export const Sunny = styled.div`
  width: 92px;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb;
  border: 1px solid ${(props) => (props.isSunny ? "#4D70FF" : "#dcdcdc")};
  border-radius: 4px;
  color: ${(props) => (props.isSunny ? "#4D70FF" : "#b0afaf")};
  cursor: pointer;
`;

export const Cloud = styled.div`
  width: 92px;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb;
  border: 1px solid ${(props) => (props.isCloud ? "#4D70FF" : "#dcdcdc")};
  border-radius: 4px;
  color: ${(props) => (props.isCloud ? "#4D70FF" : "#b0afaf")};
  cursor: pointer;
`;

export const Rain = styled.div`
  width: 92px;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb;
  border: 1px solid ${(props) => (props.isRain ? "#4D70FF" : "#dcdcdc")};
  border-radius: 4px;
  color: ${(props) => (props.isRain ? "#4D70FF" : "#b0afaf")};
  cursor: pointer;
`;

export const Snow = styled.div`
  width: 92px;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb;
  border: 1px solid ${(props) => (props.isSnow ? "#4D70FF" : "#dcdcdc")};
  border-radius: 4px;
  color: ${(props) => (props.isSnow ? "#4D70FF" : "#b0afaf")};
  cursor: pointer;
`;

export const PasswordContainer = styled.div`
  width: 396px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: ${(props) => props.margin || "31px"};
`;

export const PasswordInput = styled.input`
  width: 386px;
  height: 45px;
  background: #fbfbfb;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 0;
  margin-top: 5px;
  padding-left: 10px;
  outline-color: #4d70ff;
`;

export const PasswordMessage = styled.div`
  margin: 5px 0 0 0;
  margin-left: ${(props) => props.margin || "11px"};
  height: 26px;
  font-size: 14px;
  color: ${(props) => (props.isPassword ? "#4D70FF" : "#E34A49")};
`;

export const PasswordConfirmContainer = styled.div`
  width: 396px;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export const PasswordConfirmInput = styled.input`
  width: 386px;
  height: 45px;
  background: #fbfbfb;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 0;
  margin-top: 5px;
  padding-left: 10px;
  outline-color: #4d70ff;
`;

export const PasswordConfirmMessage = styled.div`
  margin: 5px 0 9px 0;
  margin-left: ${(props) => props.margin || "11px"};
  height: 26px;
  font-size: 14px;
  color: ${(props) => (props.isPasswordConfirm ? "#4D70FF" : "#E34A49")};
`;

export const SubmitSignup = styled.button`
  width: 398px;
  height: 49px;
  background: ${(props) => (props.isButtonValid ? "#c0cbf7 " : "#4D70FF")};
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  border: none;
  font-family: "Roboto";
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 13px;
  cursor: ${(props) => (props.isButtonValid ? "" : "pointer")};
`;
