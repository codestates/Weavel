import styled from "styled-components";

export const LoginContainer = styled.h3`
  margin: 150px 0 250px 0;
  display: flex;
  flex-direction: column;
  width: 468px;
  height: 495px;
  background: #fbfbfb;
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-family: Roboto;
`;

export const LoginText = styled.div`
  font-size: 32px;
  line-height: 37px;
  color: #444444;
  font-weight: 700;
  margin: 41px 0 33px 36px;
`;
export const InputLabel = styled.label`
  font-size: 16px;
  line-height: 19px;
  font-weight: normal;
  margin: 0 0 6px 36px;
  margin-top: ${(props) => props.margin || ""};
`;
export const EmailInput = styled.input`
  background: #fbfbfb;
  width: 396px;
  height: 47px;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 0 0 18px 36px;
  padding-left: 10px;
  &:focus {
    outline-color: #4d70ff;
  }
  ::placeholder {
    color: #b0afaf;
  }
`;

export const PasswordInput = styled.input`
  background: #fbfbfb;
  width: 396px;
  height: 47px;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 0 0 18px 36px;
  padding-left: 10px;
  &:focus {
    outline-color: #4d70ff;
  }
`;

export const LoginButton = styled.button`
  width: 396px;
  height: 47px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  border-style: none;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.46px;
  color: #ffffff;

  margin-left: 36px;
  cursor: pointer;
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
  font-size: 16px;
  line-height: 19px;
  color: #4d70ff;
  text-align: center;
  cursor: pointer;
`;

export const AlertBox = styled.div`
  display: flex;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    #f44336;
  width: 396px;
  border-radius: 4px;
  margin-left: 36px;
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
`;

export const AlertImg = styled.img`
  width: 22px;
  height: 36px;
  flex: 1;
`;

export const MiddleContainer = styled.div`
  height: 100px;
`;
