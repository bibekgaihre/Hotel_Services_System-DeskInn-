const moment = require("moment");
const RequestController = require("./request.controller");
const config = require("config");

const BellboyHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "BellboyIntent"
    );
  },
  async handle(handlerInput) {
    let deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
    let speechText;
    let room_no;

    if (deviceId === config.get("bot.alexa.RoomNo101")) {
      room_no = "101";
    } else if (deviceId === config.get("bot.alexa.RoomNo102")) {
      room_no = "102";
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

      let payload = { requested_time, room_no, request_type: "baggage", source: "Alexa" };
      await RequestController.create(payload);
      speechText = `Your luggage request has been logged. Bellboy will be arriving on time to pickup your luggage. Thank you`;
    } catch (e) {
      speechText = `Some error occured, please try again.`;
    }
    return responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  }
};
const TransportHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "TransportIntent"
    );
  },
  async handle(handlerInput) {
    let deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
    let speechText;
    let room_no;

    if (deviceId === config.get("bot.alexa.RoomNo101")) {
      room_no = "101";
    } else if (deviceId === config.get("bot.alexa.RoomNo102")) {
      room_no = "102";
    }
    const responseBuilder = handlerInput.responseBuilder;
    try {
      const currentIntent = handlerInput.requestEnvelope.request.intent;
      const timeSlot = currentIntent.slots.time;
      const destinationSlot = currentIntent.slots.destination;
      if (!timeSlot.value || !destinationSlot.value) {
        return;
      }

      let date = moment().format("L");
      let requested_time = date + "" + timeSlot.value;
      let destination = destinationSlot.value;
      requested_time = moment(requested_time, "MM/DD/YYYY HH:mm").format();
      let payload = {
        requested_time,
        room_no,
        request_type: "transport",
        source: "Alexa",
        details: { destination }
      };
      console.log(payload);
      await RequestController.create(payload);
      speechText = `Your transport request has been logged. You will be shortly notified after Taxi Arrives.Thank You`;
    } catch (e) {
      speechText = `Some error occured, please try again.`;
    }
    return responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  }
};

module.exports = { BellboyHandler, TransportHandler };
