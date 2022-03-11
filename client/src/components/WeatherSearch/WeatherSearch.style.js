import styled from "styled-components";

export const SearchContainer = styled.div`
  width: 100%;
  padding: 69px 0;
`;

export const SelectContainer = styled.div`
  width: 100%;
  height: 81px;
  background: #fbfbfb;
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.1);
  border-radius: ${(props) =>
    props.isOpen ? "40px 40px 0 0" : props.isClose ? "40px 40px 0 0 " : "50px"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto";
  cursor: pointer;
  @media screen and (max-width: 500px) {
    height: 61px;
    font-size: 12px;
    border-radius: ${(props) =>
      props.isOpen
        ? "20px 20px 0 0"
        : props.isClose
        ? "20px 20px 0 0 "
        : "20px"};
  }
`;

export const SelectBoxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SelectBox = styled.div`
  width: 100%;
  height: 62px;
  border-right: ${(props) => props.line || "1px dashed #dcdcdc"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    color: #444444;
  }
`;

export const SelectContents = styled.div`
  padding-top: 6px;
  color: #b0afaf;
`;

export const WeatherSelectContainer = styled.div`
  width: 100%;
  font-family: "Roboto";
  display: ${(props) => (props.isActivation.isLender ? "flex" : "")};
  justify-content: ${(props) => (props.isActivation.isLender ? "center" : "")};
  align-items: ${(props) => (props.isActivation.isLender ? "center" : "")};

  @media screen and (max-width: 500px) {
    font-size: 11px;
    height: ${(props) =>
      props.isActivation.isLender
        ? "auto"
        : props.isActivation.isOpen
        ? "240px"
        : "0px"};
    border-radius: 0 0 20px 20px;
  }
`;
