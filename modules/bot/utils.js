class Utils {
  getSlotValues(filledSlots) {
    const slotValues = {};

    Object.keys(filledSlots).forEach(item => {
      const name = filledSlots[item].name;

      if (
        filledSlots[item] &&
        filledSlots[item].resolutions &&
        filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
        filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
        filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code
      ) {
        switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
          case "ER_SUCCESS_MATCH":
            slotValues[name] = {
              heardAs: filledSlots[item].value,
              resolved:
                filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
              ERstatus: "ER_SUCCESS_MATCH"
            };
            break;
          case "ER_SUCCESS_NO_MATCH":
            slotValues[name] = {
              heardAs: filledSlots[item].value,
              resolved: "",
              ERstatus: "ER_SUCCESS_NO_MATCH"
            };
            break;
          default:
            break;
        }
      } else {
        slotValues[name] = {
          heardAs: filledSlots[item].value || "", // may be null
          resolved: "",
          ERstatus: ""
        };
      }
    }, this);

    return slotValues;
  }
}

module.exports = new Utils();
