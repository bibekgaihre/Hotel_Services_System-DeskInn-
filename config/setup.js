const mongoose = require("mongoose");
const UserController = require("../modules/user/user.controller");

mongoose.connect("mongodb://localhost:27017/DeskInnDB", { useNewUrlParser: true });

var setup = {
  initialize: async () => {
    await mongoose.connection.dropDatabase();
    console.log("DB reset");
    let frontdesk = await UserController.createUsingEmail({
      _id: "5bb752fac800bb022cee5aba",
      name: "Test Account",
      email: "frontdesk@admin.com",
      phone: "1234567890",
      password: "T$mp1234",
      roles: "frontdesk"
    });
    console.log("users created");

    return frontdesk;
  }
};
setup.initialize();
