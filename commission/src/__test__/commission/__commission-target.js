import request from "supertest";
import app from "../../index.js";

describe("Commission target CRUD", () => {
  const data = {
    commissionId: "64af59a381ce96ce499b6b6f",
    target: 20,
    value: 50000,
    period: "month",
  };

  let accessToken;
  let id;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "thientt.bdst@gmail.com", password: "654321" });

    accessToken = res.body.data;
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("Login succeeded");
  });

  // test create commission-target
  it("should create commission-target successfully", async () => {
    const res = await request(app)
      .post("/api/commission-target/create")
      .set("Authorization", "Bearer " + accessToken)
      .send(data);

    id = res.body.data.id;

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get all commission-target method
  it("should get all commission-target successfully", async () => {
    const res = await request(app)
      .get("/api/commission-target/")
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get commission-target by id method
  it("should get commission-target by id successfully", async () => {
    const res = await request(app)
      .get(`/api/commission-target/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });
});
