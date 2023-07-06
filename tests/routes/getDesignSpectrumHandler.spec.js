const app = require("../../src/app");
const request = require("supertest");

describe(`Route GET '/desingspectrum' e30_2003 status codes`, () => {
  test("Request with e30_2003: type= 0 should be 200", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=e30_2003&soilType=0"
    );
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Request with e30_2003: type= 1 should be 200", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=e30_2003&soilType=1"
    );
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Request with e30_2003: type= 2 should be 200", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=e30_2003&soilType=2"
    );
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Bad request with e30_2003: type= 3", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=e30_2003&soilType=3"
    );
    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe(`Route GET '/desingspectrum' e30_2015 status codes `, () => {
  test("Request with e30_2015: type= 0", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=e30_2015&soilType=0"
    );
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Request with e30_2015: type= 2", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=e30_2015&soilType=1"
    );
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Request with e30_2015: type= 1", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=e30_2015&soilType=2"
    );
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Request with e30_2015: type= 3", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=e30_2015&soilType=3"
    );
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Bad request with e30_2015: type= 4", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=e30_2015&soilType=4"
    );
    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe(`Route GET '/desingspectrum' e30_2015_esp status codes `, () => {
  test("Request with e30_2015_esp: type= 0", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=e30_2015_esp&soilType=0"
      );
      expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Request with e30_2015_esp: type= 1", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=e30_2015_esp&soilType=1"
      );
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
    });
    test("Request with e30_2015_esp: type= 2", async () => {
      const res = await request(app).get(
        "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=e30_2015_esp&soilType=2"
      );
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
    });
    test("Request with e30_2015_esp: type= 3", async () => {
      const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=e30_2015_esp&soilType=3"
    );
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Bad request with e30_2015_esp: type= 4", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=e30_2015_esp&soilType=4"
    );
    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Bad request with e30_2015_esp: location= 0", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=0&standardType=e30_2015_esp&soilType=2"
    );
    expect(res.status).toBe(404);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe(`Route GET '/desingspectrum' ibc status codes `, () => {
  test("Request with ibc: type= 0", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=ibc&soilType=0"
      );
      expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Request with ibc: type= 1", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=ibc&soilType=1"
      );
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
    });
    test("Request with ibc: type= 2", async () => {
      const res = await request(app).get(
        "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=ibc&soilType=2"
      );
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
    });
    test("Request with ibc: type= 3", async () => {
      const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=ibc&soilType=3"
    );
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Request with ibc: type= 4", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=ibc&soilType=4"
    );
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Bad request with ibc: type= 5", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=ibc&soilType=5"
    );
    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Bad request with ibc: location= 0", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=0&standardType=ibc&soilType=2"
    );
    expect(res.status).toBe(404);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe(`Route GET '/desingspectrum' asce status codes `, () => {
  test("Request with asce: type= 0", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=asce&soilType=0"
    );
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Request with asce: type= 1", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=asce&soilType=1"
      );
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
    });
    test("Request with asce: type= 2", async () => {
      const res = await request(app).get(
        "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=asce&soilType=2"
      );
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
    });
    test("Request with asce: type= 3", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=asce&soilType=3"
    );
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Request with asce: type= 4", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=asce&soilType=4"
    );
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Bad request with asce: type= 5", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=asce&soilType=5"
    );
    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("Bad request with asce: location= 0", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=0&standardType=asce&soilType=0"
    );
    expect(res.status).toBe(404);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe(`Route GET '/desingspectrum'`, () => {
  test(`If there's not data from query`, async () => {
    const res = await request(app).get("/psp/designspectrum").send();

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
  });
  test(`If there's not all data from query: just location defined`, async () => {
    const res = await request(app).get("/psp/designspectrum?location=0").send();

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
  });
  test(`If there's not all data from query: just standardType defined`, async () => {
    const res = await request(app)
      .get("/psp/designspectrum?standardType=0")
      .send();

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
  });
  test(`If there's not all data from query: just soilType defined`, async () => {
    const res = await request(app).get("/psp/designspectrum?soilType=0").send();

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
  });

  test("If there's not all data from query: standardType = empty ", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=&soilType=0"
    );
    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("If there's not all data from query: location = empty ", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=&standardType=asce&soilType=0"
    );
    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("If there's not all data from query: soilType = empty ", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=-12.10000&long=-77.065416&location=8800&standardType=asce&soilType="
    );
    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
  });
  test("If there's not all data from query: all defined but empty ", async () => {
    const res = await request(app).get(
      "/psp/designspectrum?lat=&long&location=&standardType=&soilType="
    );
    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
  });
});