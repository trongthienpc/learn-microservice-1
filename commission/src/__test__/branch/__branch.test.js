import request from "supertest";
import app from "../../index.js";

describe("Authentication CRUD", () => {
  const data = {
    name: "create where winter old possibly younger gone",
  };

  let accessToken;
  let id;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "testnet102@gmail.com", password: "123456" });

    accessToken = res.body.data;
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("Login succeeded");
  });

  // test create branch
  it("should create branch successfully", async () => {
    const res = await request(app)
      .post("/api/branch/create")
      .set("Authorization", "Bearer " + accessToken)
      .send(data);

    id = res.body.data.id;

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get all branch method
  it("should get all branch successfully", async () => {
    const res = await request(app)
      .get("/api/branch/")
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get branch by id method
  it("should get branch by id successfully", async () => {
    const res = await request(app)
      .get(`/api/branch/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test update branch by id method
  it("should update branch by id successfully", async () => {
    const res = await request(app)
      .put(`/api/branch/${id}`)
      .set("Authorization", "Bearer " + accessToken)
      .send({ name: "funny oldest bad partly " });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });
});
