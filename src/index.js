import { errorType } from "./constant/errors";
import { createReadStream } from "fs";
import { createInterface } from "readline";
import { errorHandler } from "./handler/error-handler";
import { createParkingLot, enterExitHandler } from "./handler/input-handler";

const main = async (filePath) => {
  const readLine = createInterface({
    input: createReadStream(filePath),
  });

  let firstLine = true;
  let parkingLot = [];

  for await (const line of readLine) {
    const details = line.split(" ");

    if (firstLine) {
      parkingLot = createParkingLot(details);

      if (!parkingLot) return;

      firstLine = false;
    } else {
      const keyword = details.shift();

      keyword
        ? enterExitHandler(keyword, parkingLot, details)
        : errorHandler(errorType.inputError);
    }
  }
};

const filePath = "src/input/input-file.txt";

main(filePath);

export default main;
