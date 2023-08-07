import request from "supertest";
import app from "../../../index.js";

describe("Role permission CRUD", () => {
  const data = {
    permissionId: "64ccc3488272b552f1a8c4d7",
    roleId: "64cb55e33a79255cdf36773f",
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

  // test create role-permission
  it("should create role-permission successfully", async () => {
    const res = await request(app)
      .post("/api/role-permission/create")
      .set("Authorization", "Bearer " + accessToken)
      .send(data);

    id = res.body.data.id;

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get all role-permission method
  it("should get all role-permission successfully", async () => {
    const res = await request(app)
      .get("/api/role-permission/")
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get role-permission by id method
  it("should get role-permission by id successfully", async () => {
    const res = await request(app)
      .get(`/api/role-permission/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test delete role-permission by id method
  it("should delete role-permission by id successfully", async () => {
    const res = await request(app)
      .delete(`/api/role-permission/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });
});
