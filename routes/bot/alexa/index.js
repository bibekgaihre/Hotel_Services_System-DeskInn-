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
const CleaningHandler = require("../../../modules/bot/housekeeping/housekeeping.handlers");

router.get("/", (req, res, next) => {
  res.sendStatus(200);
});
router.post("/", (req, res, next) => {
  // Build the context manually, because Amazon Lambda is missing
  fs.writeFile(__dirname + "/../../../play/response.alexa.json", JSON.stringify(req.body, null, 2));
  // console.log(config.get("bot.alexa.applicationId"));
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        CleaningHandler,
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
  // Delegate the request to the Alexa SDK and the declared intent-handlers\

  // var alexa = Alexa.handler(req.body, context);
  // alexa.appId = config.get("bot.alexa.applicationId");

  // alexa.registerHandlers(handlers);
  // alexa.execute();
});

module.exports = router;
