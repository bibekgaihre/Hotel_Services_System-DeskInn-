const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    const speechText = "Hello, I am your Assistant. You can now request services as you want.";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(
        "Hello, I am your Assistant. You can now request services as you want.",
        speechText
      )
      .getResponse();
  }
};

const UnhandledIntent = {
  canHandle(handlerInput) {
    return true;
  },
  handle(handlerInput, error) {
    // console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Sorry. there was an error")
      .reprompt("Sorry. there was an error")
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

module.exports = { LaunchRequestHandler, UnhandledIntent, SessionEndedRequestHandler };
