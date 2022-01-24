import styled from "styled-components";

export const MapContainer = styled.div`
  width: 1044px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1060px) {
  }
  @media screen and (max-width: 500px) {
    width: 300px;
    height: 300px;
  }
`;

export const Path = styled.path`
  fill: ${(props) =>
    props.lenderMap
      ? "#FFFFFF"
      : props.weatherColor === 0
      ? "#FBD489"
      : props.weatherColor === 1
      ? "#FBD489"
      : props.weatherColor === 2
      ? "#D6E7F7"
      : "#D6E7F7"};
  stroke: #e4e4e4;
  stroke-width: ${(props) => props.outline || "1px"};
`;
