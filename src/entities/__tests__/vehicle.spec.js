import { jest } from "@jest/globals";
import { Vehicle } from "../vehicle";
describe("Vehicle Object", () => {
  let vehicle;

  beforeEach(() => {
    vehicle = new Vehicle("Car", "A1234X", "1613549730");

    console.log = jest.fn();
    console.error = jest.fn();
  });

  it("should return vehicle object", () => {
    let expected = {
      _type: "Car",
      _carPlate: "A1234X",
      _carLot: "",
      _entryTime: "1613549730",
    };

    expect(vehicle).toEqual(expected);
  });

  it("get vehicleType", () => {
    expect(vehicle.vehicleType).toEqual("Car");
  });
  it("get carPlateNumber", () => {
    expect(vehicle.carPlateNumber).toEqual("A1234X");
  });
  it("set/get parkingLot", () => {
    vehicle.parkingLot = 1;
    expect(vehicle.parkingLot).toEqual("CarLot1");
  });

  it("getParkingFee", () => {
    expect(vehicle.getParkingFee("1613559745")).toEqual(6);
  });

  it("getParkingFee return false if exitTime > entryTime", () => {
    expect(vehicle.getParkingFee("1613339730")).toEqual(false);
  });
});
