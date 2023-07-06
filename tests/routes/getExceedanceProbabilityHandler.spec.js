const app = require("../../src/app");
const request = require("supertest");

describe("Route GET '/eprobability' status codes", () => {
  test("If location and period are ok should be 200", async () => {
    const res = await request(app)
      .get("/psp/eprobability?lat=-12.10&long=-77&location=8800&period=0.05")
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  test("If there's not location, lat, long or period should be 400", async () => {
    const res = await request(app).get("/psp/eprobability").send();
    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
  });

  test("If location, lat, long or period are not in DB should be 404", async () => {
    const res = await request(app)
      .get("/psp/eprobability?lat=-123.10&long=77.6876&location=0&period=99")
      .send();
    expect(res.status).toBe(404);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("Route GET '/eprobability' responses", () => {
  test("Response property for eprobability: test 1", async () => {
    const res = await request(app)
      .get("/psp/eprobability?lat=-12.10&long=-77&location=8800&period=0.05")
      .send();
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body).toHaveProperty("data");
  });

  test("Response property for eprobability: test 2", async () => {
    const res1 = await request(app)
      .get("/psp/eprobability?lat=-11&long=-76.0&location=7632&period=0.35")
      .send();

    expect(res1.body).toHaveProperty("status", "success");
    expect(res1.body).toHaveProperty("data");
  });

  test("Response property for eprobability: test 3", async () => {
    const res2 = await request(app)
      .get("/psp/eprobability?lat=-13&long=-76.53&location=9501&period=0.45")
      .send();

    expect(res2.body).toHaveProperty("status", "success");
    expect(res2.body).toHaveProperty("data");
  });

  test("Bad request response: without data query", async () => {
    const res = await request(app).get("/psp/eprobability").send();

    expect(res.body).toHaveProperty("message");
  });

  test("Bad request response: Data is not in database", async () => {
    const res = await request(app)
      .get("/psp/eprobability?lat=-12.10&long=-7777&location=0&period=999")
      .send();

    expect(res.body).toHaveProperty("message");
  });
});
