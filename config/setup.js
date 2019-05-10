const mongoose = require("mongoose");
const axios = require("axios");
mongoose.connect("mongodb://localhost:27017/DeskInnDB", { useNewUrlParser: true });

var setup = {
  initialize: async () => {
    await mongoose.connection.dropDatabase();
    console.log("DB reset");
    let data = {
      name: "Frontdesk Account",
      email: "frontdesk@admin.com",
      password: "T$mp1234",
      roles: "frontdesk"
    };
    let frontdesk = await axios({
      method: "post",
      baseURL: "localhost:localhost:3000/api/v1/user",
      data
    })
      .then(function(response) {
        console.log("user created");
      })
      .catch(function(err) {
        console.log(err);
      });

    return frontdesk;
  }
};
setup.initialize();
