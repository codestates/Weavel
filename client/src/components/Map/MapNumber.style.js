import styled from "styled-components";

export const MapSVG = styled.svg`
  max-width: ${(props) => props.width};
  width: 100%;
  max-height: ${(props) => props.height};
  height: auto;
  margin: 10px 0 20px 0;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    max-height: 350px;
    height: auto;
  }
`;
