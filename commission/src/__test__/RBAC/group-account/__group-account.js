import request from "supertest";
import app from "../../../index.js";

describe("Group account CRUD", () => {
  const data = {
    groupId: "64cb57533a79255cdf367744",
    accountId: "64c8bc4d40614afa8ee976c7",
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

  // test create group-account
  it("should create group-account successfully", async () => {
    const res = await request(app)
      .post("/api/group-account/create")
      .set("Authorization", "Bearer " + accessToken)
      .send(data);

    id = res.body.data.id;

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get all group-account method
  it("should get all group-account successfully", async () => {
    const res = await request(app)
      .get("/api/group-account/")
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get group-account by id method
  it("should get group-account by id successfully", async () => {
    const res = await request(app)
      .get(`/api/group-account/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test delete group-account by id method
  it("should delete group-account by id successfully", async () => {
    const res = await request(app)
      .delete(`/api/group-account/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });
});
