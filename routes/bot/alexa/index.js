const fs = require("fs");

const router = require("express").Router();
const Alexa = require("ask-sdk");
let skill;
//importing general handler files
const {
  LaunchRequestHandler,
  SessionEndedRequestHandler,
  HelpHandler
} = require("../../../modules/request/general.handlers");
//importing housekeeping handler files
const {
  CleaningHandler,
  ToiletriesHandler
} = require("../../../modules/request/housekeeping.handlers");
//importing concierge handler files
const { BellboyHandler, TransportHandler } = require("../../../modules/request/concierge.handler");
//importing food handler files
const { FoodOrderHandler } = require("../../../modules/request/food.handlers");
router.get("/", (req, res, next) => {
  res.sendStatus(200);
});
//importing other handler files
const { TableBookHandler, SpaBookHandler } = require("../../../modules/request/other.handlers");
router.post("/", (req, res, next) => {
  // Build the context manually, because Amazon Lambda is missing
  fs.writeFile(__dirname + "/../../../play/response.alexa.json", JSON.stringify(req.body, null, 2));
  // console.log(config.get("bot.alexa.applicationId"));
  // Delegate the request to the Alexa SDK and the declared intent-handlers\

  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        CleaningHandler,
        ToiletriesHandler,
        BellboyHandler,
        TransportHandler,
        FoodOrderHandler,
        TableBookHandler,
        SpaBookHandler,
        HelpHandler,
        SessionEndedRequestHandler
      )
      .create();
  }
  skill
    .invoke(req.body)
    .then(responseBody => {
      res.json(responseBody);
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).send("Error during the request");
    });
});

module.exports = router;
