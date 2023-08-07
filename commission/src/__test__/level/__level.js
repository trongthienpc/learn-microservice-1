import request from "supertest";
import app from "../../index.js";

describe("Level CRUD", () => {
  const data = {
    name: "Superman",
    exp: 10000000,
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

  // test create level
  it("should create level successfully", async () => {
    const res = await request(app)
      .post("/api/level/create")
      .set("Authorization", "Bearer " + accessToken)
      .send(data);

    id = res.body.data.id;

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get all level method
  it("should get all level successfully", async () => {
    const res = await request(app)
      .get("/api/level/")
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get level by id method
  it("should get level by id successfully", async () => {
    const res = await request(app)
      .get(`/api/level/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });
});
