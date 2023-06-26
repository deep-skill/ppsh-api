const app = require("../../src/app");
const request = require("supertest");

describe(`Route GET '/location' status codes`, () => {
  test("If coordinates are ok should be 200", async () => {
    const res = await request(app)
      .get("/psp/location?lat=-12.1&long=-77")
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  test(`If there's not coordinates should be 400`, async () => {
    const res = await request(app).get("/psp/location").send();
    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
  });

  test("If coordinates are not in DB should be 404", async () => {
    const res = await request(app).get("/psp/location?lat=0&long=0").send();
    expect(res.status).toBe(404);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe(`Route GET '/location' responses`, () => {
  test("Response property for location: test 1", async () => {
    const res1 = await request(app)
      .get("/psp/location?lat=-12.1&long=-77")
      .send();
    expect(res1.body).toHaveProperty("status", "success");
    expect(res1.body).toHaveProperty("data");
    expect(res1.body).toHaveProperty("total");
  });

  test("Response property for location: test 2", async () => {
    const res2 = await request(app)
      .get("/psp/location?lat=-4.9&long=-74.8")
      .send();

    expect(res2.body).toHaveProperty("status", "success");
    expect(res2.body).toHaveProperty("data");
    expect(res2.body).toHaveProperty("total");
  });

  test("Response property for location: test 3", async () => {
    const res3 = await request(app)
      .get("/psp/location?lat=-16.3&long=-71.6")
      .send();

    expect(res3.body).toHaveProperty("status", "success");
    expect(res3.body).toHaveProperty("data");
    expect(res3.body).toHaveProperty("total");
  });

  test("Bad request response: without data query", async () => {
    const res = await request(app).get("/psp/location").send();

    expect(res.body).toHaveProperty("message");
  });

  test("Bad request response: Data is not in database", async () => {
    const res = await request(app).get("/psp/location?lat=0&long=0").send();

    expect(res.body).toHaveProperty("message");
  });
});
