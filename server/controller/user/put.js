const { user } = require("../../models");

module.exports = async (req, res) => {
  // 로그인되어 있는 유저의 좋아하는 날씨 및 비밀번호 수정
  // 좋아하는 날씨 : 여러개 선택 가능, user 테이블과 user_weather 테이블 업데이트(좋아하는 날씨의 개수가 달라질 수 있어 삭제하고 다시 만들기)
  // 비밀번호 : user에 저장된 비밀번호 삭제 후 새로 받는 비밀번호를 암호화 하여 salt와 함께 저장
};
