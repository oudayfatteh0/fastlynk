const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");

afterAll(() => mongoose.connection.close());

describe("POST /shorten", () => {
  it("should return a shortened URL", async () => {
    const res = await request(app).post("/shorten").send({ longUrl: "https://example.com" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("shortUrl");
  });

  it("should return error for invalid URL", async () => {
    const res = await request(app).post("/shorten").send({ longUrl: "invalid-url" });
    expect(res.status).toBe(400);
  });
});
