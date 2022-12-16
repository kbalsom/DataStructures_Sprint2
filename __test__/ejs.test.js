const fs = require("fs");

test("home.ejs is accessible", async () => {
  const filePath = "views/home.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true);
  } catch (err) {
    expect(true).toBe(false);
  }
});

test("input.ejs is accessible", async () => {
  const filePath = "views/input.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true);
  } catch (err) {
    expect(true).toBe(false);
  }
});

test("previous.ejs is accessible", async () => {
  const filePath = "views/previous.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true);
  } catch (err) {
    expect(true).toBe(false);
  }
});

test("results.ejs is accessible", async () => {
  const filePath = "views/results.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true);
  } catch (err) {
    expect(true).toBe(false);
  }
});
