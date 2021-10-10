import { errorType } from "../constant/errors";
import { vehicleType } from "../constant/vehicle";
import { errorHandler } from "../handler/error-handler";

export class ParkingLot {
  constructor(carLot, motorCycleLot) {
    this._totalCarLot = carLot;
    this._totalMotorCycleLot = motorCycleLot;
    this._carLot = [];
    this._motorCycleLot = [];
  }

  get carLot() {
    return this._carLot;
  }

  set carLot(carLot) {
    this._carLot = carLot;
  }

  get motorCycleLot() {
    return this._motorCycleLot;
  }

  set motorCycleLot(motorCycleLot) {
    this._motorCycleLot = motorCycleLot;
  }

  _getCarLot(type) {
    const carLotMapping = {
      [vehicleType.car]: this._carLot,
      [vehicleType.motorcycle]: this._motorCycleLot,
    };

    return carLotMapping[type];
  }

  _nextAvailableCarLot(type) {
    return this._getCarLot(type).indexOf(0);
  }

  _findCar(carPlate) {
    let carRes = this._carLot.filter(
      (vehicle) => vehicle.carPlateNumber === carPlate
    );

    if (carRes.length === 1) return carRes[0];

    let motorcycleRes = this._motorCycleLot.filter(
      (vehicle) => vehicle.carPlateNumber === carPlate
    );

    if (motorcycleRes.length === 1) return motorcycleRes[0];

    return false;
  }

  async init() {
    this._carLot = [...new Array(this._totalCarLot).fill(0)];
    this._motorCycleLot = [...new Array(this._totalMotorCycleLot).fill(0)];
  }

  async enterCar(car) {
    const nextAvailabeCarLot = this._nextAvailableCarLot(car.vehicleType);

    if (nextAvailabeCarLot !== -1) {
      car.parkingLot = nextAvailabeCarLot + 1;
      this._getCarLot(car.vehicleType)[nextAvailabeCarLot] = car;

      console.log(`Accept ${car.parkingLot}`);
    } else console.log("Reject");
  }

  async exitCar(carplate, exitTime) {
    const vehicle = await this._findCar(carplate);

    if (!vehicle) {
      errorHandler(errorType.invalidPlateError);
      return;
    }

    const parkingFee = vehicle.getParkingFee(exitTime);

    if (!parkingFee) {
      errorHandler(errorType.exitTimeError);
      return;
    }

    this._getCarLot(vehicle.vehicleType)[vehicle.parkingLot.slice(-1) - 1] = 0;

    console.log(`${vehicle.parkingLot} ${vehicle.getParkingFee(exitTime)}`);
  }
}
