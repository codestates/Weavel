const jwt = require("jsonwebtoken");
const crypto = require("crypto");

class userController {
  constructor(userDB, userWeatherDB) {
    this.user = userDB;
    this.userWeather = userWeatherDB;
  }

  signup = async (req, res) => {
    try {
      const { name, email, password, weather } = req.body;

      if (await this.user.resultUserByEmail(email)) {
        return res.status(409).json({ message: `이미 존재하는 이메일입니다.` });
      }

      const [salt, encryptedPassword] = createCrypto(password);
      const createUserData = await this.user.createUser(
        name,
        email,
        salt,
        encryptedPassword,
      );
      const userId = createUserData.id;
      const result = { userId, name, email, weather };

      this.userWeather.createMapUserWeather(userId, weather);

      return res
        .status(201)
        .json({ date: result, message: "회원가입이 완료되었습니다." });
    } catch (err) {
      console.log("err", err);
      return res.status(500).json({ message: "서버 에러입니다." });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.user.resultUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "회원을 찾을수 없습니다." });
      }

      const resultCheckPassword = checkUserPassword(user, password);
      if (!resultCheckPassword) {
        return res.status(403).json({ message: "비밀번호가 틀렸습니다." });
      }

      const accessToken = createAccessToken(user);

      return res.status(200).json({
        data: { accessToken: accessToken, id: user.id },
        message: "로그인에 성공하였습니다.",
      });
    } catch (err) {
      console.log("err", err);
      return res.status(500).json({ message: "서버 에러입니다." });
    }
  };

  logout = async (req, res) => {
    try {
      return res
        .clearCookie("jwt")
        .status(200)
        .json({ message: "로그아웃 되었습니다." });
    } catch (err) {
      console.log("err", err);
      return res.status(500).json({ message: "서버 에러입니다." });
    }
  };

  get = async (req, res) => {
    try {
      const userId = req.userId;
      const findUser = await this.user.resultUserById(userId);

      if (!findUser) {
        return res
          .status(404)
          .json({ message: "해당 유저를 찾을 수 없습니다." });
      }

      const findUserInfo = await this.user.findUserInfo(userId);
      const { id, email, name, user_weathers } = findUserInfo[0].dataValues;
      const weatherDB = user_weathers.map((el) => {
        return el.dataValues.weatherId - 1;
      });

      const result = { id, email, name, weatherDB };

      return res.status(200).json({ data: result });
    } catch (err) {
      console.log("err", err);
      return res.status(500).json({ message: "서버 에러입니다." });
    }
  };

  patch = async (req, res) => {
    try {
      const userId = req.userId;
      const { email, password, weather } = req.body;

      if (password) {
        const [salt, encryptedPassword] = createCrypto(password);
        this.user.putUser(email, userId, salt, encryptedPassword);
      }

      if (email) {
        this.user.putUser(email, userId);
      }

      if (weather) {
        this.userWeather.deleteUserWeather(userId);
        this.userWeather.createMapUserWeather(userId, weather);
      }

      return res.status(200).json({ message: "정보 수정이 완료되었습니다" });
    } catch (err) {
      console.log("err", err);
      return res.status(500).json({ message: "서버 에러입니다." });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const userId = req.userId;

      this.user.deleteUser(userId);

      return res.status(200).json({ message: "회원탈퇴가 완료 되었습니다." });
    } catch (err) {
      console.log("err", err);
      return res.status(500).json({ message: "서버 에러입니다." });
    }
  };

  checkEmail = async (req, res) => {
    try {
      const email = req.query.email;
      const useEmail = await this.user.resultUserByEmail(email);

      if (useEmail) {
        return res.status(200).json({ message: `이메일이 중복됩니다.` });
      }

      return res.status(200).json({ message: `이메일이 중복되지 않습니다.` });
    } catch (err) {
      console.log("err", err);
      return res.status(500).json({ message: "서버 에러입니다." });
    }
  };

  weatherCount = async (req, res) => {
    try {
      const weatherCountData = await this.userWeather.likeWeatherCount();

      return res.status(200).json({ data: weatherCountData });
    } catch (err) {
      console.log("err", err);
      return res.status(500).json({ message: "서버 에러입니다." });
    }
  };
}

function checkUserPassword(user, password) {
  const dbPassword = user.password;
  const salt = user.salt;
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 9999, 64, "sha512")
    .toString("base64");

  return hashedPassword === dbPassword ? true : false;
}

function createCrypto(password) {
  const salt = (crypto.randomBytes(64) || "").toString("hex");
  const encryptedPassword = (
    crypto.pbkdf2Sync(password, salt, 9999, 64, "sha512") || ""
  ).toString("base64");

  return [salt, encryptedPassword];
}

function createAccessToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
    expiresIn: "1d",
  });

  return accessToken;
}

module.exports = {
  userController,
  checkUserPassword,
  createCrypto,
  createAccessToken,
};
