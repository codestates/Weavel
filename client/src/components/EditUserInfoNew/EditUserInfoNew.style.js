import styled from "styled-components";

export const UserInfoEditContainer = styled.div`
  max-width: 612px;
  width: 100%;
  height: 660px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: #fbfbfb;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  #title {
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: #000000;
  }
`;

export const UserInfoEditInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  input {
    min-width: 396px;
    width: 100%;
    height: 47px;
    background: #fbfbfb;
    border: 1px solid #dcdcdc;
    box-sizing: border-box;
    border-radius: 4px;
    padding-left: 20px;
    font-size: 16px;
    :focus {
      outline-color: rgb(77, 112, 255);
    }
  }
  .ineditable {
    color: #b0afaf;
    cursor: default;
    :focus {
      cursor: none;
      outline: none;
    }
  }
`;

export const UserInfoLabel = styled.label`
  font-size: 16px;
  line-height: 19px;
  color: #444444;
  margin-bottom: 8px;
`;

export const UserInfoWeatherContainer = styled.div`
  width: 395px;
  display: flex;
  justify-content: space-between;
`;

export const UserInfoWeatherButton = styled.button`
  width: 92px;
  height: 47px;
  background: #fbfbfb;
  border: 1px solid #dcdcdc;
  color: ${(props) => (props.isClick ? "#4d70ff" : "#b0afaf")};
  border-color: ${(props) => (props.isClick ? "#4d70ff" : "#dcdcdc")};
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 16px;

  cursor: pointer;
`;

export const BottomButtonContainer = styled.div`
  width: 195px;
  display: flex;
  justify-content: space-between;
`;

export const EditButton = styled.button`
  width: 85px;
  height: 47px;
  background: ${(props) => (props.isButtonValid ? "#4D70FF" : "#c0cbf7")};
  color: #ffffff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  border: none;
  cursor: ${(props) => (props.isButtonValid ? "pointer" : "default")};
`;

export const CancelButton = styled.button`
  width: 85px;
  height: 47px;
  background: white;
  color: #4d70ff;
  border: 1px solid #4d70ff;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
`;

export const PasswordMessage = styled.div`
  margin: 5px 0 0 0;
  margin-left: ${(props) => props.margin || "11px"};
  font-size: 14px;
  color: ${(props) => (props.isPassword ? "#4D70FF" : "#E34A49")};
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

export const PasswordConfirmMessage = styled.div`
  margin: 5px 0 0 0;
  margin-left: ${(props) => props.margin || "11px"};
  font-size: 14px;
  color: ${(props) => (props.isPasswordConfirm ? "#4D70FF" : "#E34A49")};
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;
