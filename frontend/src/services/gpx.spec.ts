import { createGPX } from "./gpx";
import { expect, it } from "vitest";

it("returns a gpx file", async () => {
  const string = createGPX("https://zwiftmap.com", [
    [10, 20, 30],
    [11, 21, 31],
    [12, 22, 32],
  ]);
  expect(string).toMatchSnapshot();
});
