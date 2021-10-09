const { user } = require("../../models");
const { user_weather } = require("../../models");
const crypto = require("crypto");

module.exports = async (req, res) => {
  // 비밀번호를 암호화하여 솔트와 함께 저장
  // 이름, 이메일, 비밀번호, 솔트를 담아 user 테이블에 create
  // weather 배열을 활용하여 userId, weatherId를 담아 user_weather 데이블에 create

  try {
    const { name, email, password, weather } = req.body;
    const findUser = await user.findOne({ where: { email: email } });
    const salt = crypto.randomBytes(64).toString("hex");
    const encryptedPassword = crypto
      .pbkdf2Sync(password, salt, 9999, 64, "sha512")
      .toString("base64");

    if (findUser) {
      res.status(409).json({ message: `이미 존재하는 이메일입니다.` });
    } else {
      // user 생성
      const newUser = await user.create({
        name,
        email,
        salt,
        password: encryptedPassword,
      });

      // email로 생성한 유저 조회
      const userId = newUser.id;

      const createRelation = async (userId, weatherId) => {
        return await user_weather.create({ userId, weatherId });
      };

      const proWeather = weather.map((weatherCode) =>
        createRelation(userId, weatherCode + 1)
      );
      console.log(`proWeather`, proWeather);
      Promise.all(proWeather);

      const result = { userId, name, email, weather };

      res
        .status(201)
        .json({ date: result, message: "회원가입이 완료되었습니다" });
    }
  } catch (err) {
    console.log(err);
  }
};
