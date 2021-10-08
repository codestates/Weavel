const { user } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await user.findOne({
      where: { email: email, password: password },
    });

    // 이메일이 없을 때
    if (!findUser) {
      return res.status(403).json({ message: "잘못된 정보입니다." });
    }

    const payload = {
      id: findUser.id,
      email: findUser.email,
      createdAt: findUser.createdAt,
      updatedAt: findUser.updatedAt,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .json({ data: { accessToken }, message: "로그인에 성공하였습니다." });
  } catch (err) {
    console.log("err");
  }
};
