const RequestController = require("../../../modules/request/request.controller");
const config = require("config");

const FoodOrderHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "FoodOrderIntent"
    );
  }
};

module.exports = { FoodOrderHandler };
