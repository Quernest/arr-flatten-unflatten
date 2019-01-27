const flatten = require("./flatten");

test("flattens arrays", () => {
  /**
   * tangled array for flattening
   */
  const arr = [2, 4, [8, [2, [32, 64]], 7], 5];

  /**
   * json-like object
   */
  const json = {
    "[0]": 2,
    "[1]": 4,
    "[2][0]": 8,
    "[2][1][0]": 2,
    "[2][1][1][0]": 32,
    "[2][1][1][1]": 64,
    "[2][2]": 7,
    "[3]": 5
  };

  expect(flatten(arr)).toMatchObject(json);
});
