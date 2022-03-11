import styled from "styled-components";

export const SelectListContainer = styled.div`
  width: 100%;
  height: ${(props) =>
    props.isActivation.isLender
      ? "auto"
      : props.isActivation.isOpen
      ? "310px"
      : "0px"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fbfbfb;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 50px 50px;

  @media screen and (max-width: 500px) {
    height: 240px;
  }
`;

export const SelectListBox = styled.div`
  width: 100%;
  height: 292px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: ${(props) => props.border || "1px dashed #dcdcdc"};
  flex-direction: ${(props) => (props.width ? "row" : "")};
  @media screen and (max-width: 500px) {
    height: 220px;
  }
`;

export const ArrowPosition = styled.div`
  height: 25px;
  width: 40px;
  text-align: center;
  cursor: pointer;
  img {
    width: 25px;
    @media screen and (max-width: 500px) {
      width: 20px;
    }
  }
`;

export const SelectList = styled.div`
  width: ${(props) => (props.width ? "90px" : "100%")};
  height: 230px;
  overflow: scroll;
  font-family: "Roboto";
  padding-left: ${(props) => props.padding || "0"};
  margin: ${(props) => props.area || "5px 0 5px 0"};
  flex-wrap: ${(props) => (props.wrap ? "wrap" : "")};
  display: ${(props) =>
    props.wrap || props.around || props.width ? "flex" : "block"};
  flex-direction: ${(props) => (props.around || props.width ? "column" : "")};
  justify-content: ${(props) =>
    props.around || props.width ? "space-around" : ""};
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  @media screen and (max-width: 500px) {
    height: 180px;
    width: ${(props) => (props.width ? "65px" : "100%")};
  }
`;

export const SideArea = styled.div`
  flex: 1;
`;

export const WeatherItem = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => (props.selectId ? "#4D70FF" : "#b0afaf")};
  cursor: pointer;
  div {
    margin-right: 5px;
    height: 20px;
    @media screen and (max-width: 500px) {
      margin-right: 2px;
      height: 10px;
    }
  }
  img {
    @media screen and (max-width: 500px) {
      width: 10px;
    }
  }
`;

export const DayItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.selectId ? "#4D70FF" : "#b0afaf")};
  cursor: pointer;
  div {
    margin-right: 5px;
    height: 18px;
    @media screen and (max-width: 500px) {
      margin-right: 2px;
      height: 10px;
    }
  }
  img {
    @media screen and (max-width: 500px) {
      width: 10px;
    }
  }
`;

export const TimeItem = styled.div`
  color: ${(props) => (props.selectId ? "#4D70FF" : "#b0afaf")};
  /* width: 100%; */
  text-align: center;
  height: 19px;
  margin: 9px 0 9px 0;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    height: 14px;
  }
`;

export const AreaItem = styled.span`
  color: ${(props) => (props.selectId ? "#4D70FF" : "#b0afaf")};
  margin: 0 18px 20px 18px;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    margin: 0 9px 10px 9px;
  }
`;

export const SearchButton = styled.div`
  margin-top: 40px;
  text-align: center;
  button {
    width: 73px;
    height: 47px;
    background: ${(props) => (props.isSuccess ? "#C0CBF7" : "#4d70ff")};
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12);
    border: none;
    border-radius: 4px;
    color: #ffff;
    font-family: "Roboto";
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
  }
`;
