const LaunchHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.type === "LaunchRequest";
  },
  handle(handlerInput) {
    const speechText = "Hello Hello Is anybody in there!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt("IS there anybody")
      .withSimpleCard("Hello World", speechText)
      .getResponse();
  }
};

module.exports = LaunchHandler;
