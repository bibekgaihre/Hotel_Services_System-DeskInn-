const fs = require("fs");
const config = require("config");
const router = require("express").Router();
const Alexa = require("ask-sdk");
let skill;

const {
  LaunchRequestHandler,
  SessionEndedRequestHandler,
  UnhandledIntent
} = require("../../../modules/bot/general/general.handlers");
const {
  CleaningHandler,
  ToiletriesHandler
} = require("../../../modules/bot/housekeeping/housekeeping.handlers");

router.get("/", (req, res, next) => {
  res.sendStatus(200);
});
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
