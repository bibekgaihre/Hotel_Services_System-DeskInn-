const moment = require("moment");
const appSecret = "ghgjgjgjh";

const userAuthModel = require("./user.auth.model");
const UserCommsModel = require("./user.comms.model");
const UserModel = require("./user.model");
const Token = require("../../utils/tokenManager");
const Secure = require("../../utils/secure");

const tokenManager = new Token({ appSecret });

const throwErr = err => {
  throw Error(err);
};

class UserController {
  constructor() {
    this.jwtDuration = 1000 * 60 * 2;
  }

  async authenticate({ username, password, options = {} }) {
    let user = await this.verifyLogin({ username, password, type: options.type });
    let token = await this.generateToken(user);
    user.token = token;
    return user;
  }

  addAuth(payload, options) {
    let user_auth = {
      username: payload.username,
      user_id: payload.user_id
    };
    if (options.type === "email") user_auth.type = "email";
    if (options.type === "phone") user_auth.type = "phone";
    user_auth.type = "user_name";
    user_auth = new userAuthModel(user_auth);
    return user_auth.save();
  }

  //ToDo options to add multiple comms to user
  async addComms(user_id, comms) {
    try {
      let user = await find({ _id: user_id });
      if (!user) throwErr("User No Exists");
      let user_comms = await UserCommsModel.insertMany(comms);
      let comm_id = user_comms.map(c => c._id);
      let users = await UserModel.findByIdAndUpdate(
        user_id,
        {
          $addToSet: {
            comms: comm_id
          }
        },
        { new: true }
      );
      return users;
    } catch (e) {
      return e;
    }
  }

  async create(payload, options) {
    try {
      let username;
      if (options.type === "email") username = payload.email;
      if (options.type === "phone") username = payload.phone;
      username = payload.username;
      let authexists = await this.checkUserAuth({ username });
      if (authexists) throwErr("User Already Exists");
      let users = new UserModel(payload);
      let password = Secure.saltAndHash(payload.password);
      delete users.password;
      users.password = {
        hash: password.hash.toString("base64"),
        salt: password.salt.toString("base64")
      };
      await users.save();
      let authPayload = {
        username: username,
        user_id: users._id
      };
      try {
        let comms = [];
        if (payload.email) {
          comms.push({
            type: "email",
            address: payload.email,
            is_verified: options.comms.verified,
            is_primary: true
          });
        }

        if (payload.phone) {
          comms.push({
            type: "phone",
            address: payload.phone,
            is_verified: options.comms.verified,
            is_primary: true
          });
        }
        let users_auth = await this.addAuth(authPayload, options);
        let userCommPayload = {
          user_id: user_id,
          type: payload
        };
        let user_comms = await this.addComms(users._id, comms);
        return await UserModel.findById(users._id);
      } catch (e) {
        await this.remove({ user_id: users._id });
      }
    } catch (e) {
      return e;
    }
  }

  //ToDo send email after registrationComplete
  async createUsingEmail(payload, options = {}) {
    try {
      options.type = "email";
      let user = await this.create(payload, options);
      return user;
    } catch (e) {
      return e;
    }
  }

  async createUsingPhone(payload, options = {}) {
    try {
      options.type = "phone";
      let user = await this.create(payload, options);
      return user;
    } catch (e) {
      return e;
    }
  }

  async checkUserAuth({ username }) {
    let username = await userAuthModel.find({ username: username });
    return username ? true : false;
  }

  async generateToken(user) {
    let data = {
      user_id: user.id,
      roles: user.roles,
      name: name.user.full
    };
    return tokenManager.generate(data, this.jwtDuration);
  }

  getById(id, options) {
    let showPassword = { password: 0 };
    if (options.pwd) showPassword = {};
    return UserModel.findById({ _id: id, is_active: true }, showPassword).populate("comms");
  }

  async getByUsername({ username, type, options }) {
    let userAuth = await userAuthModel.findOne({ username, type });
    if (userAuth.length == 0) return null;
    let user = await this.getById(userAuth[0].user_id, options);
    return user;
  }

  login({ username, password, options }) {
    return this.authenticate({ username, password, options });
  }

  async remove({ user_id }) {
    await userAuthModel.deleteMany({ user_id });
    await UserCommsModel.deleteMany({ user_id });
    await UserModel.findByIdAndDelete({ _id: user_id });
  }

  validateToken(token) {
    return tokenManager.validate(token);
  }

  async verifyLogin({ username, password, type }) {
    try {
      if (!username) throw "UserName is required";
      if (!password) throw "Password is required";
      let user = await this.getByUsername({ username, type, options: { pwd: true } });
      password = Secure.hash(password, Buffer.from(user.password.salt, "base64"));
      if (user.password.hash !== password.hash.toString("base64"))
        throw Error("Invalid Login Options");
      user.password = null;
      return user;
    } catch (e) {
      return e;
    }
  }
}

module.exports = new UserController();
