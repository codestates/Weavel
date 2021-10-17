import React from "react";
import {
  InfoContainer,
  InfoContentsContainer,
  InfoContents,
  // LoginButton,
  InfoImg,
} from "./SearchInfo.style";

function SearchInfo() {
  return (
    <InfoContainer>
      <InfoContentsContainer>
        <InfoContents>
          <div className={"infoTitle"}>
            즉흥적으로 떠나는 여행
            <br />
            날씨를 선택해서 가보는건 어떨까요?
          </div>
          <div className={"infoComment"}>
            구름 한점없이 맑은 곳, 시원한 비가 내리는 곳, 펑펑 눈이 내리는 곳
            <br />
            날씨를 느끼러 떠나보세요
          </div>
          {/* <LoginButton>로그인</LoginButton> */}
        </InfoContents>
      </InfoContentsContainer>
      <InfoImg>
        <img src="./images/info.svg" alt="./images/info.png" />
      </InfoImg>
    </InfoContainer>
  );
}

export default SearchInfo;
