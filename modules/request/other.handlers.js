const moment = require("moment");
const RequestController = require("./request.controller");
const config = require("config");

const TableBookHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "TableBookIntent"
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
      const SeatSlot = currentIntent.slots.number;
      if (!timeSlot.value || !SeatSlot.value) {
        return;
      }

      let date = moment().format("L");
      let requested_time = date + "" + timeSlot.value;
      requested_time = moment(requested_time, "MM/DD/YYYY HH:mm").format();
      let number_of_seat = SeatSlot.value;
      let payload = {
        requested_time,
        room_no,
        request_type: "tablebook",
        source: "Alexa",
        details: { number_of_seat }
      };

      await RequestController.create(payload);
      speechText = `Your  request for booking table has been logged. Please make sure to arrive in time Thank You `;
    } catch (e) {
      speechText = `Some error occured, please try again.`;
    }
    return responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  }
};
const SpaBookHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "SpaBookIntent"
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

      let payload = { requested_time, room_no, request_type: "spabook", source: "Alexa" };

      await RequestController.create(payload);
      speechText = `Your request for spa has been logged. Make sure to reach in time. Thank You`;
    } catch (e) {
      speechText = `Some error occured, please try again.`;
    }
    return responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  }
};
module.exports = { TableBookHandler, SpaBookHandler };
