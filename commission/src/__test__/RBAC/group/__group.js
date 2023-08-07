import request from "supertest";
import app from "../../../index.js";

describe("Group CRUD", () => {
  const data = {
    name: "test",
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

  // test create group
  it("should create group successfully", async () => {
    const res = await request(app)
      .post("/api/group/create")
      .set("Authorization", "Bearer " + accessToken)
      .send(data);

    id = res.body.data.id;

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get all group method
  it("should get all group successfully", async () => {
    const res = await request(app)
      .get("/api/group/")
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get group by id method
  it("should get group by id successfully", async () => {
    const res = await request(app)
      .get(`/api/group/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test update group by id method
  it("should update group by id successfully", async () => {
    const res = await request(app)
      .put(`/api/group/${id}`)
      .set("Authorization", "Bearer " + accessToken)
      .send({ name: "funny oldest bad partly " });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test delete group by id method
  it("should delete group by id successfully", async () => {
    const res = await request(app)
      .delete(`/api/group/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });
});
