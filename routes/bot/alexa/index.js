const fs = require("fs");

const router = require("express").Router();
const Alexa = require("ask-sdk");
let skill;
//importing general handler files
const {
  LaunchRequestHandler,
  SessionEndedRequestHandler,
  HelpHandler,
  UnhandledIntent
} = require("../../../modules/bot/general/general.handlers");
//importing housekeeping handler files
const {
  CleaningHandler,
  ToiletriesHandler
} = require("../../../modules/bot/housekeeping/housekeeping.handlers");
//importing concierge handler files
const {
  BellboyHandler,
  TransportHandler
} = require("../../../modules/bot/concierge/concierge.handler");
//importing food handler files
const { FoodOrderHandler } = require("../../../modules/bot/food/food.handlers");
router.get("/", (req, res, next) => {
  res.sendStatus(200);
});
//importing other handler files
const { TableBookHandler } = require("../../../modules/bot/other/other.handlers");
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
        HelpHandler,
        SessionEndedRequestHandler,
        UnhandledIntent
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
