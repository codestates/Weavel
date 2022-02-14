function logout(req, res) {
  try {
    return res
      .clearCookie("jwt")
      .status(200)
      .json({ message: "로그아웃 되었습니다." });
  } catch (err) {
    console.log("err", err);
    return res.status(400).json({ message: "서버 에러입니다." });
  }
}

module.exports = { logout };
