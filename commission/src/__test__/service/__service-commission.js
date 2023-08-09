import request from "supertest";
import app from "../../index.js";

describe("Service commission CRUD", () => {
  const data = {
    serviceId: "64af571b81432befd69cc674",
    commissionId: "64af59a381ce96ce499b6b6f",
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

  // test create service-commission
  it("should create service-commission successfully", async () => {
    const res = await request(app)
      .post("/api/service-commission/create")
      .set("Authorization", "Bearer " + accessToken)
      .send(data);

    id = res.body.data.id;

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get all service-commission method
  it("should get all service-commission successfully", async () => {
    const res = await request(app)
      .get("/api/service-commission/")
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get service-commission by id method
  it("should get service-commission by id successfully", async () => {
    const res = await request(app)
      .get(`/api/service-commission/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });
});
