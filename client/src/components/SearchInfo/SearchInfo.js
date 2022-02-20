import React from "react";
import {
  InfoContainer,
  InfoContentsContainer,
  InfoContents,
  InfoImgContainer,
  InfoImg,
} from "./SearchInfo.style";

function SearchInfo() {
  return (
    <InfoContainer>
      <InfoContentsContainer>
        <InfoContents>
          <div className={"infoTitle"}>
            <div>즉흥적으로 떠나는 여행</div>
            <div>날씨를 선택해서 가보는건 어떨까요?</div>
          </div>
          <div className={"infoComment"}>
            <div>
              구름 한점없이 맑은 곳, 시원한 비가 내리는 곳, 펑펑 눈이 내리는 곳
            </div>
            <div>날씨를 느끼러 떠나보세요</div>
          </div>
          {/* <LoginButton>로그인</LoginButton> */}
        </InfoContents>
      </InfoContentsContainer>
      <InfoImgContainer>
        <InfoImg src="./images/info.png" alt="info" />
      </InfoImgContainer>
    </InfoContainer>
  );
}

export default SearchInfo;
