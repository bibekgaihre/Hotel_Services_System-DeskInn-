const RequestModel = require("./request.model");
const NotificationModel = require("../notification/notification.model");
const { Socket } = require("../../utils/socket");
const config = require("config");
// const { TextUtils, ERR } = require("../../utils");

class RequestController {
  constructor() {}
  async create(payload) {
    let request = new RequestModel(payload);
    let info =
      "There is a new " +
      payload.request_type +
      "  request from " +
      payload.source +
      " in Room No " +
      payload.room_no;

    await request.save();
    let title = "New " + payload.request_type + " Request";
    let url = config.get("notifications.url") + "/requests/" + request.id;
    let notification = new NotificationModel({ info, title, url });
    Socket.emit("new_request", {
      title: title,
      body: info,
      url: url
    });
    await notification.save();

    return RequestModel.findById(request.id);
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
