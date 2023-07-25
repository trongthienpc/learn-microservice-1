import request from "supertest";
import app from "../index.js";

describe("Transaction CRUD", () => {
  const data = {
    serviceId: "64af571b81432befd69cc674",
    staffId: "64af56ad81432befd69cc670",
    transactionDate: "2023-07-25T00:00:00.000Z",
    status: "created",
  };
  it("should create a new transaction", async () => {
    const res = await request(app).post("/api/transaction/create").send(data);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "SUCCESS",
      data: data,
    });
  });
});
