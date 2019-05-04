const RequestModel = require("./request.model");
// const { Socket } = require("../../utils");
// const { TextUtils, ERR } = require("../../utils");

class RequestController {
  constructor() {}
  create(payload) {
    let request = new RequestModel(payload);
    return request.save();
  }
}
module.exports = new RequestController();
