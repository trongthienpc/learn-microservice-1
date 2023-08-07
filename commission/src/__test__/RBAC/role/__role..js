import request from "supertest";
import app from "../../../index.js";

describe("Role CRUD", () => {
  const data = {
    name: "create where winter old possibly younger gone",
    type: 0,
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

  // test create branch
  it("should create role successfully", async () => {
    const res = await request(app)
      .post("/api/role/create")
      .set("Authorization", "Bearer " + accessToken)
      .send(data);

    id = res.body.data.id;

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get all role method
  it("should get all role successfully", async () => {
    const res = await request(app)
      .get("/api/role/")
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get role by id method
  it("should get role by id successfully", async () => {
    const res = await request(app)
      .get(`/api/role/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test update role by id method
  it("should update role by id successfully", async () => {
    const res = await request(app)
      .put(`/api/role/${id}`)
      .set("Authorization", "Bearer " + accessToken)
      .send({ name: "funny oldest bad partly " });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test delete role by id method
  it("should delete role by id successfully", async () => {
    const res = await request(app)
      .delete(`/api/role/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });
});
