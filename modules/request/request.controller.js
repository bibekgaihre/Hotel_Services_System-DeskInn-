const RequestModel = require("./request.model");
// const { Socket } = require("../../utils");
// const { TextUtils, ERR } = require("../../utils");

class RequestController {
  constructor() {}
  create(payload) {
    let request = new RequestModel(payload);
    return request.save();
  }
  async read({ limit, start, page, status }) {
    let total = await RequestModel.countDocuments();

    let data = await RequestModel.find()
      .skip(start)
      .limit(limit)
      .sort({ created_at: -1 });
    return {
      total,
      limit,
      start,
      page,
      status,
      data
    };
  }
  async readById(id) {
    return RequestModel.findById(id);
  }
  async update(id, payload) {
    return RequestModel.findByIdAndUpdate(id, payload);
  }
}
module.exports = new RequestController();
