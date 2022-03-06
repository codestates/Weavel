import styled from "styled-components";

export const MapContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
