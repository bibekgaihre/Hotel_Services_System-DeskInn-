const JWT = require("jsonwebtoken");
const Secure = require("./secure");

class TokenManager {
  constructor({ appSecret }) {
    if (!appSecret) throw "App Secret Required";
    this.secret = appSecret;
  }

  generate(data, jwt_duration) {
    return JWT.sign(
      {
        data: Secure.encrypt(JSON.stringify(data), this.secret)
      },
      this.secret,
      {
        expiresIn: jwt_duration
      }
    );
  }

  async validate(token) {
    let data = await JWT.verify(token, this.secret, (err, tokenData) => {
      if (err) throw "Invalid TokenData";
      let data = tokenData.data || null;
      if (data) {
        data = JSON.parse(Secure.decrypt(data, this.secret));
      }
    });
    return { data, tokenData };
  }
}

module.exports = TokenManager;
