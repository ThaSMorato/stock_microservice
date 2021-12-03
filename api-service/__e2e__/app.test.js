import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import { app } from "../app";
import { onStart } from "../server/onStart";
import faker from "faker";

const SERVER_TEST_PORT = 4000;

describe("#App", () => {
  const app_test = app.listen(SERVER_TEST_PORT, () => onStart(SERVER_TEST_PORT));
  const user = {
    email: faker.internet.email(),
    password: "",
    token: "",
  };

  const admin = {
    email: faker.internet.email("admin"),
    isAdmin: true,
    password: "",
    token: "",
  };

  describe("/register", () => {
    it("should create a user from email", async () => {
      const response = await request(app_test)
        .post("/register")
        .send({ email: user.email })
        .expect(201);

      user.password = response.body.password;

      expect(response.body).toMatchObject({
        email: user.email,
        password: expect.any(String),
      });
    });

    it("should return a error if user already exists", async () => {
      const response = await request(app_test)
        .post("/register")
        .send({ email: user.email })
        .expect(400);

      expect(response.body.error).toBeTruthy();
    });
  });

  describe("/login", () => {
    it("should return the user and the token if credentials are right", async () => {
      const response = await request(app_test)
        .post("/login")
        .send({ email: user.email, password: user.password })
        .expect(200);

      user.token = response.body.token;

      expect(response.body).toMatchObject({
        user: {
          id: expect.any(String),
          email: expect.any(String),
          isAdmin: false,
        },
        token: expect.any(String),
      });
    });

    it("should return an error if email is wrong", async () => {
      const response = await request(app_test)
        .post("/login")
        .send({ email: `not${user.email}`, password: user.password })
        .expect(400);

      expect(response.body.error).toBeTruthy();
    });

    it("should return an error if password is wrong", async () => {
      const response = await request(app_test)
        .post("/login")
        .send({ email: user.email, password: "12345678" })
        .expect(400);

      expect(response.body.error).toBeTruthy();
    });
  });

  describe("token", () => {
    it("should return an error if bearer token is not provided", async () => {
      const response = await request(app_test).get("/stock").query({ q: "aapl.us" }).expect(401);

      expect(response.body.error).toBeTruthy();
    });

    it("should return an error if token type is diferent than Bearer", async () => {
      const response = await request(app_test)
        .get("/stock")
        .set("Authorization", `not-bearer ${user.token}`)
        .query({ q: "aapl.us" })
        .expect(401);

      expect(response.body.error).toBeTruthy();
    });

    it("should return an error if token is invalid", async () => {
      const response = await request(app_test)
        .get("/stock")
        .set("Authorization", `Bearer 123${user.token}`)
        .query({ q: "aapl.us" })
        .expect(401);

      expect(response.body.error).toBeTruthy();
    });
  });

  describe("/history", () => {
    it("should return an empty array if user did not make a search", async () => {
      const response = await request(app_test)
        .get("/history")
        .set("Authorization", `Bearer ${user.token}`)
        .expect(200);

      expect(response.body.length).toBe(0);
    });

    it("should return an array if user did make a search", async () => {
      await request(app_test)
        .get("/stock")
        .set("Authorization", `Bearer ${user.token}`)
        .query({ q: "aapl.us" });

      const response = await request(app_test)
        .get("/history")
        .set("Authorization", `Bearer ${user.token}`)
        .expect(200);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            Symbol: expect.any(String),
            Date: expect.any(String),
            Time: expect.any(String),
            Open: expect.any(String),
            High: expect.any(String),
            Low: expect.any(String),
            Close: expect.any(String),
            Volume: expect.any(String),
            Name: expect.any(String),
          }),
        ])
      );
    });
  });

  describe("/stock", () => {
    it("should return the stock from id", async () => {
      const response = await request(app_test)
        .get("/stock")
        .set("Authorization", `Bearer ${user.token}`)
        .query({ q: "aapl.us" })
        .expect(200);

      expect(response.body).toMatchObject({
        Symbol: expect.any(String),
        Date: expect.any(String),
        Time: expect.any(String),
        Open: expect.any(String),
        High: expect.any(String),
        Low: expect.any(String),
        Close: expect.any(String),
        Volume: expect.any(String),
        Name: expect.any(String),
      });
    });

    it("should return an error if the stock is not found", async () => {
      const response = await request(app_test)
        .get("/stock")
        .set("Authorization", `Bearer ${user.token}`)
        .query({ q: "aapl.us2" })
        .expect(400);

      expect(response.body.error).toBeTruthy();
    });

    it("should return an error if the query is not provided", async () => {
      const response = await request(app_test)
        .get("/stock")
        .set("Authorization", `Bearer ${user.token}`)
        .expect(400);

      expect(response.body.error).toBeTruthy();
    });
  });

  describe("/stats", () => {
    it("should return an error if a normal user tries this route", async () => {
      const response = await request(app_test)
        .get("/stats")
        .set("Authorization", `Bearer ${user.token}`)
        .expect(403);

      expect(response.body.error).toBeTruthy();
    });

    it("should return an array of  each stock searched and how many times it was searched", async () => {
      //creating an admin
      const register_response = await request(app_test)
        .post("/register")
        .send({ email: admin.email, isAdmin: true });

      admin.password = register_response.body.password;

      //login as admin
      const login_response = await request(app_test)
        .post("/login")
        .send({ email: admin.email, password: admin.password });

      admin.token = login_response.body.token;

      const response = await request(app_test)
        .get("/stats")
        .set("Authorization", `Bearer ${admin.token}`)
        .expect(200);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            stock: expect.any(String),
            total: expect.any(Number),
          }),
        ])
      );
    });
  });
});
