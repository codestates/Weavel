import { useState } from "react";

import {
  SuggestionUl,
  NoSuggestions,
  AutoCompleteInput,
} from "./AutoComplete.style";

const AutoComplete = ({ suggestions, photoInfo }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  const onChange = (e) => {
    const userInput = e.target.value;
    const unLinked = suggestions.filter(
      (suggestion) => suggestion.indexOf(userInput) > -1
    );

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setShowSuggestions(true);
  };

  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setShowSuggestions(false);
    photoInfo.area = e.target.innerText;
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <SuggestionUl>
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          return (
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </SuggestionUl>
    ) : (
      ""
    );
  };

  return (
    <>
      <AutoCompleteInput
        name="area"
        type="text"
        onChange={onChange}
        value={input}
        placeholder={"지역을 검색해보세요"}
      />
      {showSuggestions && input && <SuggestionsListComponent />}
    </>
  );
};
export default AutoComplete;
