const app = require("../../src/app");
const request = require("supertest");

describe("Route GET '/standards' status codes", () => {
  test("If '/src/controllers/getStandard.js' works properly, status should be 200", async () => {
    const res = await request(app).get("/psp/standards").send();

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Request must be to /standards exactly, if not status should be 404", async () => {
    const res = await request(app).get("/psp/standard").send();

    expect(res.status).toBe(404);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Response has to include data with 'id', 'value', 'name' and 'soilType' ", async () => {
    const res = await request(app).get("/psp/standards").send();

    expect(res.body).toBeInstanceOf(Object);
    res.body.data.standards.forEach((element) => {
      expect(element).toHaveProperty("id");
      expect(element).toHaveProperty("value");
      expect(element).toHaveProperty("name");
      expect(element).toHaveProperty("soilType");
    });
  });
});
