import styled from "styled-components";

export const WeatherInfoContainer = styled.div`
  width: 100%;
  height: 79.875rem;
  background: #fbfbfb;
  margin: 44px 0 60px 0;
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.1);
  border-radius: 3.125rem;
  font-family: "Roboto";
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InfoTitle = styled.div`
  text-align: center;
  height: 5.75rem;
  line-height: 5.75rem;
  font-weight: bold;
  font-size: 2rem;
  padding-left: 1.063rem;
`;

export const InfoContainer = styled.div`
  height: 24.875rem;
  width: 100%;
  border-top: 1px solid #dcdcdc;
  display: flex;
  flex-direction: column;
`;

export const InfoItemTitle = styled.div`
  box-sizing: border-box;
  margin-top: 1.813rem;
  height: 1.813rem;
  width: 100%;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.813rem;
  padding: 0 1.063rem 0 1.063rem;
`;

export const InfoItemDate = styled.div`
  box-sizing: border-box;
  height: 1.813rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.063rem 0 1.063rem;
  span {
    font-size: 1rem;
    color: #b0afaf;
  }
`;

export const InfoItemItem = styled.div`
  box-sizing: border-box;
  height: 19.125rem;
  width: 100%;
  padding: 0 1.063rem 0 1.063rem;
`;

export const DaySelectButton = styled.div`
  width: 3.688rem;
  height: 2.2rem;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 0.25rem;
  font-weight: 500;
  font-size: 0.875rem;
  margin-left: 0.5rem;
  border: 1px solid #4d70ff;
  text-align: center;
  line-height: 2.2rem;
  cursor: pointer;
  background: ${(props) => (props.buttonColor ? "#4D70FF" : "#FBFBFB")};
  color: ${(props) => (props.buttonColor ? "#FBFBFB" : "#4D70FF")};
`;

export const DaySelectButtonContainer = styled.div`
  display: flex;
  padding-right: 1.063rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
