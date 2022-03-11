class userController {
  constructor(userDB, userWeatherDB, crypto, jwt) {
    this.user = userDB;
    this.userWeather = userWeatherDB;
    this.crypto = crypto;
    this.jwt = jwt;
  }

  signup = async (req, res) => {
    const { name, email, password, weather } = req.body;

    if (await this.user.resultUserByEmail(email)) {
      return res.status(409).json({ message: `이미 존재하는 이메일입니다.` });
    }

    const [salt, encryptedPassword] = this.crypto.createCrypto(password);
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
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    const user = await this.user.resultUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "회원을 찾을수 없습니다." });
    }

    const resultCheckPassword = this.crypto.checkUserPassword(user, password);
    if (!resultCheckPassword) {
      return res.status(401).json({ message: "비밀번호가 틀렸습니다." });
    }

    const accessToken = this.jwt.createAccessToken(user);
    const userId = user.id;

    return res.status(200).json({
      data: { accessToken: accessToken, id: userId },
      message: "로그인에 성공하였습니다.",
    });
  };

  logout = async (req, res) => {
    return res
      .clearCookie("jwt")
      .status(200)
      .json({ message: "로그아웃 되었습니다." });
  };

  get = async (req, res) => {
    const userId = req.userId;
    const findUser = await this.user.resultUserById(userId);

    if (!findUser) {
      return res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
    }

    const findUserInfo = await this.user.findUserInfo(userId);
    const { id, email, name, user_weathers } = findUserInfo[0].dataValues;
    const weatherDB = await this.userWeather.returnMapUserWeather(
      user_weathers,
    );

    const result = { id, email, name, weatherDB };

    return res.status(200).json({ data: result });
  };

  patch = async (req, res) => {
    const userId = req.userId;
    const { email, password, weather } = req.body;

    if (password) {
      const [salt, encryptedPassword] = this.crypto.createCrypto(password);
      this.user.putUser(email, userId, salt, encryptedPassword);
    }

    if (email) {
      if (await this.user.resultUserByEmail(email)) {
        return res.status(409).json({ message: `이미 존재하는 이메일입니다.` });
      }
      this.user.putUser(email, userId);
    }

    if (weather) {
      this.userWeather.deleteUserWeather(userId);
      this.userWeather.createMapUserWeather(userId, weather);
    }

    return res.status(200).json({ message: "정보 수정이 완료되었습니다" });
  };

  deleteUser = async (req, res) => {
    const userId = req.userId;

    this.user.deleteUser(userId);

    return res.status(200).json({ message: "회원탈퇴가 완료 되었습니다." });
  };

  checkEmail = async (req, res) => {
    const email = req.query.email;
    const useEmail = await this.user.resultUserByEmail(email);

    if (useEmail) {
      return res.status(409).json({ message: `이메일이 중복됩니다.` });
    }

    return res.status(200).json({ message: `이메일이 중복되지 않습니다.` });
  };

  weatherCount = async (req, res) => {
    const weatherCountData = await this.userWeather.likeWeatherCount();

    return res.status(200).json({ data: weatherCountData });
  };
}

module.exports = {
  userController,
};
