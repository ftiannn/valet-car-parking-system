import { ParkingLot } from "../parkingLot";
import { Vehicle } from "../vehicle";
import setUpTest from "../../../setUpTest";
describe("ParkingLot Object", () => {
  let spy = setUpTest();

  let car1, car2, car3;

  let parkingLot = new ParkingLot(2, 2);

  it("init", async () => {
    expect(parkingLot.carLot).toEqual([]);
    await parkingLot.init();

    expect(parkingLot.carLot).toEqual([0, 0]);
  });

  describe("enterCar", () => {
    it("has available slot", async () => {
      car1 = new Vehicle("Car", "A123X", 1613549730);
      await parkingLot.enterCar(car1);

      expect(parkingLot.carLot).toEqual([car1, 0]);
      expect(console.log).toHaveBeenCalledWith("Accept CarLot1");
    });

    it("enter next available slot", async () => {
      car2 = new Vehicle("Car", "B123C", 1613549740);
      await parkingLot.enterCar(car2);

      expect(parkingLot.carLot).toEqual([car1, car2]);
      expect(console.log).toHaveBeenCalledWith("Accept CarLot2");
    });

    it("no available slot", async () => {
      car3 = new Vehicle("Car", "X123C", 1613549750);
      await parkingLot.enterCar(car3);

      expect(parkingLot.carLot).toEqual([car1, car2]);
      expect(console.log).toHaveBeenCalledWith("Reject");
    });
  });

  describe("exitCar", () => {
    it("found car", async () => {
      await parkingLot.exitCar(car2.carPlateNumber, 1613559745);
      expect(parkingLot.carLot).toEqual([car1, 0]);
      expect(console.log).toHaveBeenCalledWith(car2.parkingLot + " " + 6);
    });

    it("cannot find car", async () => {
      await parkingLot.exitCar(car3.carPlateNumber, 1613559745);
      expect(parkingLot.carLot).toEqual([car1, 0]);
      expect(console.error).toHaveBeenCalled();
      expect(spy.console.mock.calls[0][1]).toContain(
        "Invalid plate provided. Exit request rejected."
      );
    });

    it("exit time before entry time", async () => {
      await parkingLot.exitCar(car1.carPlateNumber, 1613339745);
      expect(parkingLot.carLot).toEqual([car1, 0]);
      expect(console.error).toHaveBeenCalled();
      expect(spy.console.mock.calls[0][1]).toContain(
        "Invalid exit time provided. Exit time should not be earlier than entry time. Exit request rejected."
      );
    });
  });

  it("get/set carLot", () => {
    parkingLot.carLot = [0, 0];
    expect(parkingLot.carLot).toEqual([0, 0]);
  });

  it("get/set motorCycleLot", () => {
    parkingLot.motorCycleLot = [0, 0];
    expect(parkingLot.motorCycleLot).toEqual([0, 0]);
  });
});
