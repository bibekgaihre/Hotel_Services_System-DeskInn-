const NotificationModel = require("./notification.model");

class NotificationController {
  constructor() {}
  async read() {
    let data = await NotificationModel.find()
      .limit(9)
      .sort({ created_at: -1 });
    return data;
  }
}
module.exports = new NotificationController();
