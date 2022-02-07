import request from "supertest";
import app from "../../app";
import { createConnection, getConnection } from "typeorm";
import jwt from "jsonwebtoken";
import { config } from "../../database";

describe("Test User routes status code and returns", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();

    await connection.close();
  });

  it("Create - Status code must be 201 and return these properties ", async () => {
    const newUser = await request(app)
      .post("/user")
      .send({
        name: "Test",
        email: "test@gmail.com",
        password: "123456",
        isAdm: false,
      })
      .expect(201);

    expect(newUser.body).toHaveProperty("name");
    expect(newUser.body).toHaveProperty("email");
    expect(newUser.body).toHaveProperty("uuid");
    expect(newUser.body).not.toHaveProperty("password");
  });

  it("Login - Should return token and status code 200", async () => {
    const user = await request(app)
      .post("/login")
      .send({
        email: "test@gmail.com",
        password: "123456",
      })
      .expect(200);

    expect(user.body).toHaveProperty("token");
  });

  it("Find - Should get user by id and return 200 status code", async () => {
    const newUser = await request(app)
      .post("/user")
      .send({
        name: "Tester",
        email: "tester@gmail.com",
        password: "123456",
        isAdm: false,
      })
      .expect(201);

    const user = await request(app)
      .post("/login")
      .send({
        email: "tester@gmail.com",
        password: "123456",
      })
      .expect(200);

    const searchIdNotAdm = await request(app)
      .get(`/user/${newUser.body.uuid}`)
      .set({
        Authorization: `Bearer ${user.body.token}`,
      })
      .expect(200);

    expect(searchIdNotAdm.body).toHaveProperty("name");
    expect(searchIdNotAdm.body).toHaveProperty("email");
    expect(searchIdNotAdm.body).toHaveProperty("uuid");

    expect(searchIdNotAdm.body.name).toBe("Tester");
    expect(searchIdNotAdm.body.email).toBe("tester@gmail.com");
  });

  it("Get - Should return all users and status code 200", async () => {
    const token = jwt.sign({ isAdm: true }, config.secret);

    const allUsers = await request(app)
      .get("/user")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .expect(200);

    await request(app).get("/user").expect(401);
    expect(allUsers.body).toHaveProperty("data");
    expect(allUsers.body.data).toHaveProperty("map");
  });
});
