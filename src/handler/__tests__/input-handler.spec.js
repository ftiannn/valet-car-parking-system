import { ParkingLot } from "../../entities/parkingLot";
import { createParkingLot, enterExitHandler } from "../input-handler";
import setUpTest from "../../../setUpTest";

describe("createParkingLot", () => {
  let spy = setUpTest();

  it("successfully created parking lot", () => {
    let parkingLot = createParkingLot(["2", "2"]);
    expect(parkingLot.carLot).toEqual([0, 0]);
    expect(parkingLot.motorCycleLot).toEqual([0, 0]);
  });

  test.each`
    input
    ${[]}
    ${["2"]}
    ${["2", "2", "2"]}
    ${["abc", "abc"]}
    ${[true, true]}
    ${["-2", "-10"]}
  `("failed: $input", ({ input }) => {
    let parkingLot = createParkingLot(input);
    expect(console.error).toHaveBeenCalled();
    expect(spy.console.mock.calls[0][1]).toContain(
      "There is an error in the input. Please try again."
    );

    expect(parkingLot).toBeFalsy();
  });
});

describe("enterExitHandler", () => {
  let spy = setUpTest();

  let parkingLot = new ParkingLot(1, 1);
  parkingLot.init();

  it("enter", async () => {
    await enterExitHandler("ENTER", parkingLot, [
      "motorcycle",
      "SGX1234A",
      "1613541902",
    ]);
    expect(console.log).toHaveBeenCalledWith("Accept MotorcycleLot1");
  });

  it("exit", async () => {
    await enterExitHandler("EXIT", parkingLot, ["SGX1234A", "1613545602"]);
    expect(console.log).toHaveBeenCalledWith("MotorcycleLot1 2");
  });

  it("enter with invalid car type", async () => {
    await enterExitHandler("ENTER", parkingLot, [
      "van",
      "SGX1234A",
      "1613541902",
    ]);

    expect(console.error).toHaveBeenCalled();
    expect(spy.console.mock.calls[0][1]).toContain(
      "No valid vehicle parking lot available for this car type. Entry request rejected."
    );
  });

  it("invalid input", () => {
    enterExitHandler("xxx", parkingLot, []);
    expect(console.error).toHaveBeenCalled();
    expect(spy.console.mock.calls[0][1]).toContain(
      "There is an error in the input. Please try again."
    );
  });
});
