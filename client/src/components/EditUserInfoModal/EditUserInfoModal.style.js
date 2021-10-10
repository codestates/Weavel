import styled from "styled-components";

export const EditModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 612px;
  height: 700px;
  background: #fbfbfb;
  border-radius: 4px;
  filter: drop-shadow(0px 0px 11px rgba(0, 0, 0, 0.1));
  margin-top: 18vh;
`;

export const HeadText = styled.div`
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
  text-align: center;
  margin-top: 45px;
`;

export const EditInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 429px;
  height: 500px;
  justify-content: center;
  margin-left: 80px;
  margin-top: ${(props) => props.margin || "0"};

  div {
    padding-left: 18.6px;
    width: 500px;
  }
`;

export const FixedDiv = styled.span`
  background: #fbfbfb;
  width: 396px;
  height: 47px;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 0 0 18px 36px;
  padding: 15px;
  color: #b0afaf;
`;

export const AllPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
