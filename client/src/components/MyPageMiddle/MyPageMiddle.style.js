import styled from "styled-components";
export const MiddleBar = styled.div`
  height: 48px;
  display: flex;
  justify-content: space-between;
  margin-top: 42px;
`;

export const WeatherButtonContainer = styled.div`
  height: 48px;
  flex-wrap: nowrap;
`;

export const WeatherButton = styled.button`
  width: 92px;
  height: 47px;
  background: #fbfbfb;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #b0afaf;
  margin-right: 9px;
  cursor: pointer;
  &:hover {
    color: #4d70ff;
    border-color: #4d70ff;
  }
`;

export const AreaSearchBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 396px;
  height: 47px;
  background: #fbfbfb;
  border: 1px solid #dcdcdc;
  border-radius: 23.5px;
  margin-right: 30px;
`;

export const AreaSearchInput = styled.input`
  width: 300px;
  height: 19px;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;

  border-style: none;
  background: none;
  margin-top: 12.5px;
  ::placeholder {
    color: #b0afaf;
  }
  :focus {
    outline: none;
  }
`;

export const AreaSearchIcon = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin-top: 12.5px;
`;

export const SearchList = styled.ul`
  z-index: 1;
  position: absolute;
  margin: 48px 0 0 0;
  padding: 10px;
  width: 376px;
  border-radius: 23.5px;
  background: #fbfbfb;
  opacity: ${(props) => props.isSame || "0"};
  display: flex;
  flex-direction: column;
  border: 1px solid #dcdcdc;
  &.selected {
    background-color: #ebe5f9;
    cursor: pointer;
  }
  li {
    padding: 5px 0 5px 40px;
    list-style: none;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    margin-left: 5px;
    &:hover {
      background-color: #eee;
    }
    &.selected {
      background-color: #ebe5f9;
      cursor: pointer;
    }
  }
`;
