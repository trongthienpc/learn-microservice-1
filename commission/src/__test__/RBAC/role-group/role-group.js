import request from "supertest";
import app from "../../../index.js";

describe("Role group CRUD", () => {
  const data = {
    groupId: "64cb57533a79255cdf367744",
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

  // test create role-group
  it("should create role-group successfully", async () => {
    const res = await request(app)
      .post("/api/role-group/create")
      .set("Authorization", "Bearer " + accessToken)
      .send(data);

    id = res.body.data.id;

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get all role-group method
  it("should get all role-group successfully", async () => {
    const res = await request(app)
      .get("/api/role-group/")
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get role-group by id method
  it("should get role-group by id successfully", async () => {
    const res = await request(app)
      .get(`/api/role-group/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test delete role-group by id method
  it("should delete role-group by id successfully", async () => {
    const res = await request(app)
      .delete(`/api/role-group/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });
});
