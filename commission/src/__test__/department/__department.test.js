import request from "supertest";
import app from "../../index.js";

describe("Authentication CRUD", () => {
  const data = {
    name: "create where winter old possibly younger gone",
    branchId: "64ccc49c480bc866bd4da0ad",
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

  // test create department
  it("should create department successfully", async () => {
    const res = await request(app)
      .post("/api/department/create")
      .set("Authorization", "Bearer " + accessToken)
      .send(data);

    id = res.body.data.id;

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get all department method
  it("should get all department successfully", async () => {
    const res = await request(app)
      .get("/api/department/")
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get department by id method
  it("should get department by id successfully", async () => {
    const res = await request(app)
      .get(`/api/department/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test update department by id method
  it("should update department by id successfully", async () => {
    const res = await request(app)
      .put(`/api/department/${id}`)
      .set("Authorization", "Bearer " + accessToken)
      .send({ name: "funny oldest bad partly " });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });
});
