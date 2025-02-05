import request from "supertest";
import app from "../server.js";
import mongoose from "mongoose";
import Url from "../models/Url.js";

beforeEach(async () => {
  await Url.deleteMany({}); // Clear the database before each test
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("URL Shortener API", () => {
  describe("POST /shorten", () => {
    it("should create a shortened URL", async () => {
      const res = await request(app)
        .post("/shorten")
        .send({ longUrl: "https://example.com" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("shortId");
      expect(res.body.isProtected).toBe(false);
      expect(res.body.isOneTime).toBe(false);
    });

    it("should create a password-protected URL", async () => {
      const res = await request(app)
        .post("/shorten")
        .send({ 
          longUrl: "https://example.com",
          password: "testpass123"
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("shortId");
      expect(res.body.isProtected).toBe(true);
    });

    it("should create a one-time use URL", async () => {
      const res = await request(app)
        .post("/shorten")
        .send({ 
          longUrl: "https://example.com",
          isOneTime: true
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("shortId");
      expect(res.body.isOneTime).toBe(true);
    });

    it("should reject invalid URLs", async () => {
      const res = await request(app)
        .post("/shorten")
        .send({ longUrl: "invalid-url" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("GET /:shortId", () => {
    it("should return the long URL for valid shortId", async () => {
      // First create a shortened URL
      const createRes = await request(app)
        .post("/shorten")
        .send({ longUrl: "https://example.com" });

      const shortId = createRes.body.shortId;

      // Then try to access it
      const res = await request(app).get(`/${shortId}`);
      expect(res.status).toBe(200);
      expect(res.body).toBe("https://example.com");
    });

    it("should return 404 for non-existent shortId", async () => {
      const res = await request(app).get("/nonexistent");
      expect(res.status).toBe(404);
    });

    it("should return isProtected=true for password-protected URLs", async () => {
      const createRes = await request(app)
        .post("/shorten")
        .send({ 
          longUrl: "https://example.com",
          password: "testpass123"
        });

      const shortId = createRes.body.shortId;

      const res = await request(app).get(`/${shortId}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("isProtected", true);
    });

    it("should mark one-time URLs as used after access", async () => {
      // Create a one-time URL
      const createRes = await request(app)
        .post("/shorten")
        .send({ 
          longUrl: "https://example.com",
          isOneTime: true
        });

      const shortId = createRes.body.shortId;

      // First access
      const firstAccess = await request(app).get(`/${shortId}`);
      expect(firstAccess.status).toBe(200);
      expect(firstAccess.body).toBe("https://example.com");

      // Second access should fail
      const secondAccess = await request(app).get(`/${shortId}`);
      expect(secondAccess.status).toBe(410); // Gone
    });
  });

  describe("POST /:shortId/access", () => {
    it("should return long URL with correct password", async () => {
      // Create a password-protected URL
      const createRes = await request(app)
        .post("/shorten")
        .send({ 
          longUrl: "https://example.com",
          password: "testpass123"
        });

      const shortId = createRes.body.shortId;

      // Try to access with correct password
      const res = await request(app)
        .post(`/${shortId}/access`)
        .send({ password: "testpass123" });

      expect(res.status).toBe(200);
      expect(res.body).toBe("https://example.com");
    });

    it("should reject incorrect passwords", async () => {
      // Create a password-protected URL
      const createRes = await request(app)
        .post("/shorten")
        .send({ 
          longUrl: "https://example.com",
          password: "testpass123"
        });

      const shortId = createRes.body.shortId;

      // Try to access with wrong password
      const res = await request(app)
        .post(`/${shortId}/access`)
        .send({ password: "wrongpass" });

      expect(res.status).toBe(401);
    });

    it("should handle one-time password-protected URLs", async () => {
      // Create a one-time password-protected URL
      const createRes = await request(app)
        .post("/shorten")
        .send({ 
          longUrl: "https://example.com",
          password: "testpass123",
          isOneTime: true
        });

      const shortId = createRes.body.shortId;

      // First access with correct password
      const firstAccess = await request(app)
        .post(`/${shortId}/access`)
        .send({ password: "testpass123" });

      expect(firstAccess.status).toBe(200);
      expect(firstAccess.body).toBe("https://example.com");

      // Second access should fail even with correct password
      const secondAccess = await request(app)
        .post(`/${shortId}/access`)
        .send({ password: "testpass123" });

      expect(secondAccess.status).toBe(410); // Gone
    });
  });
});
