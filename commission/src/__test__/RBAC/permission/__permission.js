import request from "supertest";
import app from "../../../index.js";

describe("Permission CRUD", () => {
  const data = {
    action: "test",
    resource: "test",
    fields: "id",
    conditions: "",
    inverted: true,
    system: false,
    description: "Permission for user to create a new record in this resource",
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

  // test create permission
  it("should create permission successfully", async () => {
    const res = await request(app)
      .post("/api/permission/create")
      .set("Authorization", "Bearer " + accessToken)
      .send(data);

    id = res.body.data.id;

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get all permission method
  it("should get all permission successfully", async () => {
    const res = await request(app)
      .get("/api/permission/")
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get permission by id method
  it("should get permission by id successfully", async () => {
    const res = await request(app)
      .get(`/api/permission/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test update permission by id method
  it("should update permission by id successfully", async () => {
    const res = await request(app)
      .put(`/api/permission/${id}`)
      .set("Authorization", "Bearer " + accessToken)
      .send({ action: "funny oldest bad partly " });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test delete permission by id method
  it("should delete permission by id successfully", async () => {
    const res = await request(app)
      .delete(`/api/permission/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });
});
