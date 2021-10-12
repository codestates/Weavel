import styled from "styled-components";

export const SuggestionUl = styled.ul`
  font-size: 14px;
  line-height: 19px;
  list-style: none;
  margin-top: 0;
  max-height: 143px;
  overflow-y: auto;
  padding-left: 20;
  width: 396px;
  li {
    padding: 0.5rem;
    z-index: 1;
  }
  li:hover {
    background-color: #eee;
    font-weight: normal;
    font-size: 14px;
    cursor: pointer;
  }
  li:not(:last-of-type) {
    border-bottom: 1px solid #dcdcdc;
  }
`;

export const NoSuggestions = styled.div`
  color: #b0afaf;
  font-size: 14px;
  margin-left: 20px;
`;

export const AutoCompleteInput = styled.input`
 background: #fbfbfb;
    width: 396px;
    height: 47px;
    border: 1px solid #dcdcdc;
    box-sizing: border-box;
    border-radius: 4px;
    margin: 0 0 18px 36px;
    padding-left: 10px;
  }
  :focus {
    outline-color: #4d70ff;
  }
  ::placeholder {
    color: #b0afaf;
`;
