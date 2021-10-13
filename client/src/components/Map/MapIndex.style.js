import styled from "styled-components";

export const MapContainer = styled.div`
  width: 1044px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Path = styled.path`
  fill: ${(props) => (props.lenderMap ? "#f48fb1" : "#ffffff")};
  stroke: #e4e4e4;
  stroke-width: ${(props) => props.outline || "1px"};
`;
