import styled from "styled-components";

export const SelectListContainer = styled.div`
  width: 1044px;
  height: 312px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1px;
`;

export const SelectListBox = styled.div`
  width: 232px;
  height: 292px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: ${(props) => props.border || "1px solid #dcdcdc"};
`;

export const ArrowPosition = styled.div`
  height: 25px;
  width: 40px;
  text-align: center;
  cursor: pointer;
  img {
    width: 25px;
  }
`;

export const SelectList = styled.div`
  height: 230px;
  overflow: scroll;
  font-family: Roboto;
  margin: ${(props) => props.area || "5px 0 5px 0"};
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const WeatherItem = styled.div`
  display: flex;
  color: ${(props) => (props.selectId ? "#4D70FF" : "#b0afaf")};
  padding-right: 40px;
  margin-bottom: 44px;
  cursor: pointer;

  div {
    margin-right: 10px;
  }
`;
export const DayItem = styled.div`
  display: flex;
  color: ${(props) => (props.selectId ? "#4D70FF" : "#b0afaf")};
  margin-bottom: 44px;
  cursor: pointer;

  div {
    margin-right: 10px;
  }
`;
export const TimeItem = styled.div`
  color: ${(props) => (props.selectId ? "#4D70FF" : "#b0afaf")};
  text-align: center;
  width: 40px;
  height: 19px;
  margin: 9px 0 9px 0;
  cursor: pointer;
`;
export const AreaItem = styled.div`
  color: ${(props) => (props.selectId ? "#4D70FF" : "#b0afaf")};
  display: inline-block;
  margin: 0 18px 20px 18px;
  cursor: pointer;
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
