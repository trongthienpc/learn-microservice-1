import request from "supertest";
import app from "../../index.js";

describe("Commission CRUD", () => {
  const data = {
    type: "fixed",
    value: 99000,
    appliedDate: "2023-07-01T00:00:00.000Z",
    expiredDate: "2023-12-31T00:00:00.000Z",
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

  // test create commission
  it("should create commission successfully", async () => {
    const res = await request(app)
      .post("/api/commission/create")
      .set("Authorization", "Bearer " + accessToken)
      .send(data);

    id = res.body.data.id;

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get all commission method
  it("should get all commission successfully", async () => {
    const res = await request(app)
      .get("/api/commission/")
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get commission by id method
  it("should get commission by id successfully", async () => {
    const res = await request(app)
      .get(`/api/commission/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test update commission by id method
  it("should update commission by id successfully", async () => {
    const res = await request(app)
      .put(`/api/commission/${id}`)
      .set("Authorization", "Bearer " + accessToken)
      .send({ value: 79000 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });
});
