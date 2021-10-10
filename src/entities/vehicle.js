import { parkingFee } from "../constant/parkingFee";
import { vehicleLot } from "../constant/vehicle";

export class Vehicle {
  constructor(vehicleType, carPlate, entryTimestamp) {
    this._type = vehicleType;
    this._carPlate = carPlate;
    this._carLot = "";
    this._entryTime = entryTimestamp;
  }

  get vehicleType() {
    return this._type;
  }

  get carPlateNumber() {
    return this._carPlate;
  }

  set parkingLot(lotNumber) {
    this._carLot = lotNumber;
  }

  get parkingLot() {
    return vehicleLot[this._type] + this._carLot;
  }

  getParkingFee(exitTime) {
    if (exitTime < this._entryTime) return false;

    const timeDiffInHours = (exitTime - this._entryTime) / (60 * 60);

    return Math.ceil(timeDiffInHours) * parkingFee[this._type];
  }
}
