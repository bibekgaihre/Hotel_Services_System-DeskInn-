const config = require("config");
const router = require("express").Router();

const Alexa = require("ask-sdk");
let skill;

const HelloWorldHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "HelloWorldIntent"
    );
  },
  handle(handlerInput) {
    const speechText = "Hello World!";
    console.log("hello");
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Hello World", speechText)
      .getResponse();
  }
};
router.get("/", (req, res, next) => {
  res.sendStatus(200);
});
router.post("/", (req, res, next) => {
  console.log(req.body);
  // Build the context manually, because Amazon Lambda is missing
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(HelloWorldHandler)
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
