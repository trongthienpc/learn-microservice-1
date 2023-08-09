import request from "supertest";
import app from "../../index.js";

describe("Staff CRUD", () => {
  const data = {
    name: "David John 1",
    address: "1401 Awele Park",
    dateOfBirth: "2023-10-09T14:18:04.000Z",
    sex: true,
    type: "staff",
    branchId: "64ccc49c480bc866bd4da0ad",
    departmentId: "64ce13fb81fa2aad044820a7",
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

  // test create staff
  it("should create staff successfully", async () => {
    const res = await request(app)
      .post("/api/staff/create")
      .set("Authorization", "Bearer " + accessToken)
      .send(data);

    id = res.body.data.id;

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get all staff method
  it("should get all staff successfully", async () => {
    const res = await request(app)
      .get("/api/staff/")
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("SUCCESS");
  });

  // test get staff by id method
  it("should get staff by id successfully", async () => {
    const res = await request(app)
      .get(`/api/staff/${id}`)
      .set("Authorization", "Bearer " + accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });
});
