import styled from "styled-components";

export const WeatherInfoContainer = styled.div`
  width: 65.25rem;
  height: 79.875rem;
  background: #fbfbfb;
  margin: 44px 0 60px 0;
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
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
  width: 63.313rem;
`;

export const InfoContainer = styled.div`
  height: 24.875rem;
  width: 63.313rem;
  border-top: 1px solid #dcdcdc;
  display: flex;
  flex-direction: column;
`;

export const InfoItemTitle = styled.div`
  box-sizing: border-box;
  margin-top: 1.813rem;
  height: 1.813rem;
  width: 63.313rem;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.813rem;
  padding: 0 1.063rem 0 1.063rem;
`;

export const InfoItemDate = styled.div`
  box-sizing: border-box;
  height: 1.813rem;
  width: 63.313rem;
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
  width: 63.313rem;
  padding: 0 1.063rem 0 1.063rem;
`;
