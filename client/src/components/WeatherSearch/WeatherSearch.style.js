import styled from "styled-components";

export const SearchContainer = styled.div`
  width: 100%;
  padding-top: 69px;
`;

export const SelectContainer = styled.div`
  width: 100%;
  height: 81px;
  background: #fbfbfb;
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto";
  cursor: pointer;
  @media screen and (max-width: 500px) {
    height: 61px;
    border-radius: 20px;
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
  border-right: ${(props) => props.line || "1px solid #dcdcdc"};
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
  height: ${(props) =>
    props.isActivation.isLender
      ? "700px"
      : props.isActivation.isOpen
      ? "390px"
      : "81px"};
  background: #fbfbfb;
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  font-family: "Roboto";
  position: relative;
  transition: 0.5s all;
  @media screen and (max-width: 500px) {
    font-size: 10px;
    height: ${(props) =>
      props.isActivation.isLender
        ? "400px"
        : props.isActivation.isOpen
        ? "300px"
        : "61px"};
    border-radius: 20px;
  }
`;
