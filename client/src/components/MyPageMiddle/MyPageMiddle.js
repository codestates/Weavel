import React, { useState, useEffect } from "react";
import { FooterProjectLink } from "../../App.style";
import {
  MiddleBar,
  WeatherButtonContainer,
  WeatherButton,
  AreaSearchBar,
  AreaSearchInput,
  AreaSearchIcon,
  SearchList,
} from "./MyPageMiddle.style";

function MyPageMiddle() {
  const [hasText, setHasText] = useState(false);
  const [keyword, setKeyword] = useState("");
  const weatherbuttontext = ["맑음", "구름", "비", "눈"];
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    if (keyword === "") {
      setHasText(false);
      setisSame("0.5");
    }
  }, [keyword]);

  const area = [
    { id: 0, area: "서울", isSelect: false },
    { id: 1, area: "부산", isSelect: false },
    { id: 2, area: "인천", isSelect: false },
    { id: 3, area: "대구", isSelect: false },
    { id: 4, area: "대전", isSelect: false },
    { id: 5, area: "광주", isSelect: false },
    { id: 6, area: "울산", isSelect: false },
    { id: 7, area: "세종", isSelect: false },
    { id: 8, area: "제주", isSelect: false },
    { id: 9, area: "경기", isSelect: false },
    { id: 10, area: "강원", isSelect: false },
    { id: 11, area: "충남", isSelect: false },
    { id: 12, area: "충북", isSelect: false },
    { id: 13, area: "전남", isSelect: false },
    { id: 14, area: "전북", isSelect: false },
    { id: 15, area: "경남", isSelect: false },
    { id: 16, area: "경북", isSelect: false },
  ];
  const [options, setOptions] = useState(area);
  const [isSame, setisSame] = useState("1");
  const handleInputChange = (event) => {
    const { value } = event.target;
    if (value.includes("\\")) return;

    // input에 텍스트가 있는지 없는지 확인하는 코드
    value ? setHasText(true) : setHasText(false);

    // updateText
    setKeyword(value);

    // dropdown을 위한 기능
    const filterRegex = new RegExp(value, "i");
    const resultOptions = area.filter((area) => area.area.match(filterRegex));
    setOptions(resultOptions);
  };

  const handleDropDownClick = (clickedOption) => {
    setKeyword(clickedOption);
    setisSame("0");
    const resultOptions = area.filter((area) => area.area === clickedOption);
    setOptions(resultOptions);
  };

  const handleKeyUp = (event) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState#example
    // eslint-disable-next-line
    if (
      event.getModifierState("Fn") ||
      event.getModifierState("Hyper") ||
      event.getModifierState("OS") ||
      event.getModifierState("Super") ||
      event.getModifierState("Win")
    )
      return;
    if (
      event.getModifierState("Control") +
        event.getModifierState("Alt") +
        event.getModifierState("Meta") >
      1
    )
      return;
    if (hasText) {
      if (event.code === "ArrowDown" && options.length - 1 > selected) {
        setSelected(selected + 1);
      }
      if (event.code === "ArrowUp" && selected >= 0) {
        setSelected(selected - 1);
      }
      if (event.code === "Enter" && selected >= 0) {
        handleDropDownClick(options.area[selected]);
        setSelected(-1);
      }
    }
  };

  return (
    <MiddleBar>
      <WeatherButtonContainer>
        {weatherbuttontext.map((weather, idx) => (
          <WeatherButton key={idx}>{weather}</WeatherButton>
        ))}
      </WeatherButtonContainer>
      <AreaSearchBar>
        <AreaSearchInput
          value={keyword}
          type="text"
          placeholder="지역을 검색해 보세요"
          onChange={handleInputChange}
        />
        <AreaSearchIcon src="../../images/search.svg" />
        {keyword.length === 0 ? null : (
          <SearchList
            onKeyUp={handleKeyUp}
            className={selected}
            isSame={isSame}
          >
            {area.map((area, idx) =>
              area.area.includes(keyword) && area.area !== keyword ? (
                <li
                  onKeyUp={handleKeyUp}
                  key={idx}
                  className={selected === idx ? "selected" : ""}
                  value={area.area}
                  onClick={() => handleDropDownClick(area.area)}
                >
                  {area.area}
                </li>
              ) : null
            )}
          </SearchList>
        )}
      </AreaSearchBar>
    </MiddleBar>
  );
}

export default MyPageMiddle;
