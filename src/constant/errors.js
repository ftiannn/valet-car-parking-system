export const errorType = {
  inputError: "inputError",
  invalidPlateError: "invalidPlateError",
  exitTimeError: "exitTimeError",
  vehicleTypeError: "vehicleTypeError",
};

export const errorMessage = {
  [errorType.inputError]: "There is an error in the input. Please try again.",
  [errorType.invalidPlateError]:
    "Invalid plate provided. Exit request rejected.",
  [errorType.exitTimeError]:
    "Invalid exit time provided. Exit time should not be earlier than entry time. Exit request rejected.",
  [errorType.vehicleTypeError]:
    "No valid vehicle parking lot available for this car type. Entry request rejected.",
};
