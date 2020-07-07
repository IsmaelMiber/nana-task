import * as API from "../src/API";

const PRODUCT_ID_THAT_EXIST = 27861;

it("Fetching All-Products Work Correctly", async () => {
  expect.assertions(1);
  var data = await API.getProducts();
  var result = typeof data == "object" && data != null && data.length > 0;
  expect(result).toBe(true);
});

it("Fetching One-Product Work Correctly", async () => {
  expect.assertions(1);
  var data = await API.getProduct(PRODUCT_ID_THAT_EXIST);
  var result = typeof data == "object" && data != null;
  expect(result).toBe(true);
});
