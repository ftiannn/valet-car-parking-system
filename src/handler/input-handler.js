import { errorType } from "../constant/errors";
import { vehicleType } from "../constant/vehicle";
import { Vehicle } from "../entities/vehicle";
import { ParkingLot } from "../entities/parkingLot";

import { errorHandler } from "./error-handler";

const _enter = (parkingLot, vehicleDetails) => {
  const [type, plate, enterTime] = vehicleDetails;

  if (!vehicleType[type]) {
    errorHandler(errorType.vehicleTypeError);
    return;
  }

  parkingLot.enterCar(new Vehicle(vehicleType[type], plate, enterTime));
};

const _exit = (parkingLot, vehicleDetails) => {
  const [plate, exitTime] = vehicleDetails;

  parkingLot.exitCar(plate, exitTime);
};

export const enterExitHandler = (keyword, parkingLot, vehicleDetails) => {
  switch (keyword.toLowerCase()) {
    case "enter":
      _enter(parkingLot, vehicleDetails);
      break;

    case "exit":
      _exit(parkingLot, vehicleDetails);
      break;

    default:
      errorHandler(errorType.inputError);
  }
};

const _isInvalidInputHandler = (details) => {
  if (details.length <= 1 || details.length > 2) return true;

  for (let i = 0; i < 2; i++) {
    let val = parseInt(details[i]);
    if (val < 0 || isNaN(val)) return true;
  }
};

export const createParkingLot = (details) => {
  if (_isInvalidInputHandler(details)) {
    errorHandler(errorType.inputError);
    return false;
  }

  const [carLot, motorCycleLot] = details;

  let parkingLot = new ParkingLot(parseInt(carLot), parseInt(motorCycleLot));

  parkingLot.init();

  return parkingLot;
};
