const RequestController = require("../../../modules/request/request.controller");
const config = require("config");

const FoodOrderHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "FoodOrderIntent"
    );
  },
  async handle(handlerInput) {
    let deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
    let speechText;
    let room_no;

    if (deviceId === config.get("bot.alexa.RoomNo101")) {
      room_no = "101";
    }
    const responseBuilder = handlerInput.responseBuilder;
    try {
      const currentIntent = handlerInput.requestEnvelope.request.intent;
      const foodSlot = currentIntent.slots.food;
      const quantitySlot = currentIntent.slots.number;
      if (!foodSlot.value || !quantitySlot.value) {
        return;
      }
      let food = foodSlot.value;
      let food_quantity = quantitySlot.value;
      let payload = {
        room_no,
        request_type: "food",
        source: "Alexa",
        details: { food, food_quantity }
      };
      await RequestController.create(payload);
      speechText = `Your Food request has been logged. Your food will arrive shortly. If you want any other of menu. You can request now`;
    } catch (e) {
      speechText = `Some error occured, please try again.`;
    }
    return responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  }
};

module.exports = { FoodOrderHandler };
