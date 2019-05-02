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
        "Hello, I am your Assistant. You can now request services as you want. You can ask for help anytime you want. Thank You.",
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

const HelpHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speechText = `Hello. I am Alexa from frontdesk. I was built to provide you quality services. I am connected with hotel staffs. You can ask me to clean room, bring something for Washroom, Order something to eat, book a spa, call bellboy, ask for taxi and book table on our restaurants. Thank You`;
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(
        "You can ask me to clean room, bring something for Washroom, Order something to eat, book a spa, call bellboy, ask for taxi, book table on our restaurants. Thank You`",
        speechText
      )
      .getResponse();
  }
};

module.exports = { LaunchRequestHandler, UnhandledIntent, SessionEndedRequestHandler, HelpHandler };
