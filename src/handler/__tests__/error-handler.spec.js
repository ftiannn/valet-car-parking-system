import { errorHandler } from "../error-handler";
import setUpTest from "../../../setUpTest";

describe("errorHandler", () => {
  let spy = setUpTest();

  it("inputError", () => {
    errorHandler("inputError");
    expect(console.error).toHaveBeenCalled();
    expect(spy.console.mock.calls[0][1]).toEqual(
      "There is an error in the input. Please try again."
    );
  });

  it("invalidPlateError", () => {
    errorHandler("invalidPlateError");
    expect(console.error).toHaveBeenCalled();
    expect(spy.console.mock.calls[0][1]).toEqual(
      "Invalid plate provided. Exit request rejected."
    );
  });

  it("exitTimeError", () => {
    errorHandler("exitTimeError");
    expect(console.error).toHaveBeenCalled();
    expect(spy.console.mock.calls[0][1]).toEqual(
      "Invalid exit time provided. Exit time should not be earlier than entry time. Exit request rejected."
    );
  });

  it("vehicleTypeError", () => {
    errorHandler("vehicleTypeError");
    expect(console.error).toHaveBeenCalled();
    expect(spy.console.mock.calls[0][1]).toEqual(
      "No valid vehicle parking lot available for this car type. Entry request rejected."
    );
  });

  it("expect no logs", async () => {
    await errorHandler("abc");
    expect(console.error).not.toHaveBeenCalled();
  });
});
