const utils = require("../utils");
const moment = require("moment");

const CleaningHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "CleaningIntent"
    );
  },
  handle(handlerInput) {
    let deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
    let speechText;
    let room_no;
    if (
      deviceId ===
      "amzn1.ask.device.AHSFMFLMLDZI4X5ZG5MRVPBJFV7HRAU3Y6ZB43FV5XIAOVSKIRGW6FSP75XPBDFXBJUFCFYV3VLLJ2GOEHARUTBJB5CND6FRWUUEKQSJG4LRRB56G4VZJYDHKHUC25CEGTF6VGGSR46LWBKRMMOEHYZE645S4NNSBQYPF6FVBYKLCI7JBWRPY"
    ) {
      room_no = "101";
    }
    const responseBuilder = handlerInput.responseBuilder;
    try {
      const currentIntent = handlerInput.requestEnvelope.request.intent;
      const timeSlot = currentIntent.slots.time;
      if (!timeSlot.value) {
        return;
      }
      if (timeSlot.value) {
        let date = moment().format("L");
        let requested_time = date + "" + timeSlot.value;
        requested_time = moment(requested_time, "MM/DD/YYYY HH:mm").format();

        payload = { requested_time, room_no, request_type: "cleaning", source: "Alexa" };
        console.log(payload);
        speechText = `Your cleaning request has been logged. Someone will be there shortly`;
      }
    } catch (e) {
      speechText = `Some error occured, please try again.`;
    }
    return responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  }
};

module.exports = CleaningHandler;
// let slotStatus = "";
// let resolvedSlot;
// let time;
// let slotValues = utils.getSlotValues(request.intent.slots);
// console.log(slotValues);
// if (slotValues.time.heardAs && slotValues.time.heardAs !== "") {
//   time = slotValues.time.heardAs;
//   console.log(time);
// } else {
//   return responseBuilder
//     .speak("I have not understood you Please repeat the operation")
//     .reprompt("I have not understood you Please repeat the operation")
//     .getResponse();
// }
// console.log(handlerInput);
