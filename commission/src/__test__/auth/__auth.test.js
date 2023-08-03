import request from "supertest";
import app from "../../index.js";

describe("Authentication CRUD", () => {
  const data = {
    email: "wa@alrug.ng",
    name: "Lillie Roberts",
    password: "123456",
    address: "1401 Awele Park",
    dateOfBirth: "2023-10-09T21:18:04+07:00",
    sex: true,
    branchId: "64c8b6f1ef859ca29488a86d",
  };

  let accessToken;
  let accountId;

  // test register method
  it("should register successfully", async () => {
    const res = await request(app).post("/api/auth/register").send(data);

    accountId = res.body.data.accountId;

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("SUCCESS");
    expect(res.body.data).toHaveProperty("accountId");
  });

  // test login method
  it("should login successfully", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: data.email, password: data.password });

    accessToken = res.body.data;
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("Login succeeded");
  });

  // test change password method
  it("should change password successfully", async () => {
    const res = await request(app)
      .put(`/api/auth/${accountId}/changePassword`)
      .set("Authorization", "Bearer " + accessToken)
      .send({
        password: "123456",
        newPassword: "123456@",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("SUCCESS");
  });
});
