import styled from "styled-components";

export const PhotoBackground = styled.div`
  width: 200px;
  height: 200px;
  background: #fbfbfb;
  filter: drop-shadow(0px 0px 11px rgba(0, 0, 0, 0.1));
  border-radius: 4px;
  margin-top: 50px;
  margin-left: 238px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  div {
    font-family: Roboto;
    font-size: 14px;
    color: #b0afaf;
    z-index: 1;
  }
  img {
    margin: 30px 0 30px 0;
  }
`;
