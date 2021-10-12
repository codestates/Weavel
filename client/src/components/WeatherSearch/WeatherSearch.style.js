import styled from "styled-components";

export const SearchContainer = styled.div`
  padding-top: 69px;
  height: 750px;
`;

export const SelectContainer = styled.div`
  width: 1044px;
  height: 81px;
  background: #fbfbfb;
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto";
  cursor: pointer;
`;

export const SelectBoxContainer = styled.div`
  display: flex;
`;

export const SelectBox = styled.div`
  width: 215px;
  height: 62px;
  padding-left: 17px;
  border-right: ${(props) => props.line || "1px solid #dcdcdc"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    color: #444444;
  }
`;

export const SelectContents = styled.div`
  padding-top: 6px;
  color: #b0afaf;
`;

export const WeatherSelectContainer = styled.div`
  width: 1044px;
  height: ${(props) =>
    props.isActivation.isLender ? "700px" : props.isActivation.isOpen ? "401px" : "81px"};
  background: #fbfbfb;
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  font-family: "Roboto";
  position: relative;
  transition: 0.5s all;
`;
