import styled from "styled-components";

export const PhotoUploadContainer = styled.div`
  max-width: 396px;
  width: 100%;
  height: 640px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffff;
  padding: 40px 108px;
  border-radius: 4px;
  z-index: 99;
  label {
    width: 100%;
    font-size: 16px;
    color: #444444;
    text-align: left;
    margin: 14px 0 6px 0;
  }
`;

export const PhotoUploadFileContainer = styled.div`
  width: 200px;
  height: 200px;
  background: #ffff;
  filter: drop-shadow(0px 0px 11px rgba(0, 0, 0, 0.1));
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  input {
    position: absolute;
    opacity: 0;
    width: 200px;
    height: 200px;
    cursor: pointer;
    ::file-selector-button {
      display: none;
      text-decoration: none;
    }
  }
  #img_container {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    #preview_img {
      width: 200px;
      height: 200px;
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: ${(props) => props.row || "column"};
  justify-content: ${(props) => (props.row ? "space-between" : "")};
  border: ${(props) => (props.row ? "none" : "1px solid #dcdcdc")};
  box-sizing: border-box;
  border-radius: 4px;
  input[type="date"] {
    padding-right: 20px;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
  ul {
    position: absolute;
    top: 50;
    margin-top: 50px;
    z-index: 2;
    display: flex;
    padding-inline-start: 0px;
    flex-direction: column;
    max-width: 394px;
    width: 100%;
    background: transparent;
    box-shadow: 4px 4px 4px rgb(0 0 0 / 25%);
    border-radius: 10px;
  }
  li {
    height: 30px;
    list-style: none;
    opacity: 0.9;
    border: 1px solid #dcdcdc;
    padding: 10px 5px 0 20px;
    cursor: pointer;
    background: rgba(255, 255, 255, 1);
    &:hover {
      background: #f4f4f4;
    }
  }

  img {
    width: 18px;
    height: 18px;
  }
`;

export const PhotoUploadInput = styled.input`
  height: 47px;
  padding-left: 20px;
  border: none;
  font-size: 16px;
  ::placeholder {
    font-size: 16px;
    line-height: 19px;
    color: #b0afaf;
  }
  &:focus {
    outline-color: #4d70ff;
  }
`;

export const WeatherButton = styled.button`
  max-width: 92px;
  width: 100%;
  height: 47px;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: ${(props) => (props.isClick ? "#4d70ff" : "#b0afaf")};
  border-color: ${(props) => (props.isClick ? "#4d70ff" : "none")};
  background: #ffff;
  cursor: pointer;
`;

export const BottomButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 34px;
`;

export const UploadButton = styled.button`
  width: 87px;
  height: 47px;
  background: ${(props) => (props.isFilled ? "#c0cbf7" : "#4d70ff")};
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: 500;
  font-size: 15px;
  color: #ffffff;
  border: none;
  cursor: ${(props) => (props.isFilled ? "default" : "pointer")};
  margin-right: 5px;
`;

export const CancelButton = styled.button`
  width: 87px;
  height: 47px;
  border: 1px solid #869bf2;
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: 500;
  font-size: 15px;
  color: #4d70ff;
  background: #ffff;
  cursor: pointer;
  margin-left: 5px;
  &:active {
    background-color: rgba(240, 240, 240, 0.7);
  }
`;
