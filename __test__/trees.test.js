const request = require("supertest");
const server = require("../index.js");
const app = require("../index.js");

describe("Testing Trees Routes", () => {
  beforeAll(async () => {
    try {
      await app.locals.dal.connect();
      global.collection = app.locals.dal.db("algosprint").collection("trees");
      global.DEBUG = true;
    } catch (error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    app.locals.dal.close();
  });

  test("Responds to /trees/", async () => {
    const res = await request(app).get("/trees/");
    expect(res.header["content-type"]).toMatch(/html/);
    expect(res.statusCode).toEqual(200);
  });

  test("Responds to /input", async () => {
    const res = await request(app).get("/input");
    expect(res.header["content-type"]).toMatch(/html/);
    expect(res.statusCode).toBe(200);
  });
});
