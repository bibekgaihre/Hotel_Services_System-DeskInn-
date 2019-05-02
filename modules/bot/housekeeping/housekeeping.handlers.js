const moment = require("moment");
const RequestController = require("../../../modules/request/request.controller");
const config = require("config");

const CleaningHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "CleaningIntent"
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
      const timeSlot = currentIntent.slots.time;
      if (!timeSlot.value) {
        return;
      }

      let date = moment().format("L");
      let requested_time = date + "" + timeSlot.value;
      requested_time = moment(requested_time, "MM/DD/YYYY HH:mm").format();

      let payload = { requested_time, room_no, request_type: "cleaning", source: "Alexa" };
      await RequestController.create(payload);
      speechText = `Your cleaning request has been logged. Someone will be there shortly. Thank You`;
    } catch (e) {
      speechText = `Some error occured, please try again.`;
    }
    return responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  }
};

const ToiletriesHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "ToiletriesIntent"
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
      const numberSlot = currentIntent.slots.number;
      const toiletriesitemSlot = currentIntent.slots.toiletries;

      if (!numberSlot.value || !toiletriesitemSlot.value) {
        return;
      }
      let toiletries = toiletriesitemSlot.value;
      let toiletries_quantity = numberSlot.value;
      let payload = {
        room_no,
        request_type: "toiletries",
        source: "Alexa",
        details: { toiletries, toiletries_quantity }
      };
      await RequestController.create(payload);
      speechText = `Your request has been logged. Our staff will be there shortly with requested item`;
    } catch (e) {
      speechText = `Some error occured, please try again.`;
    }
    return responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  }
};

module.exports = { CleaningHandler, ToiletriesHandler };
