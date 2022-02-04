import request from "supertest";
import app from "../../app";
import { createConnection, getConnection } from "typeorm";

describe("Test User routes status code ", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();

    await connection.close();
  });

  //   it("Status code must be 201 and return these properties ", async () => {
  //     const newUser = await request(app)
  //       .post("/user")
  //       .send({
  //         name: "Test",
  //         email: "test@gmail.com",
  //         password: "123456",
  //         isAdm: false,
  //       })
  //       .expect(201);

  //     expect(newUser.body).toHaveProperty("name");
  //     expect(newUser.body).toHaveProperty("email");
  //     expect(newUser.body).toHaveProperty("uuid");
  //     expect(newUser.body).not.toHaveProperty("password");
  //   });

  //   it("Login Should return token and status code 200", async () => {
  //     const user = await request(app)
  //       .post("/login")
  //       .send({
  //         email: "tester@gmail.com",
  //         password: "123456",
  //       })
  //       .expect(200);

  //     expect(user).toHaveProperty("token");
  //   });

  //   it("Should get user by id and return 200 status code", async () => {
  //     const newUser = await request(app)
  //       .post("/user")
  //       .send({
  //         name: "Tester",
  //         email: "tester@gmail.com",
  //         password: "123456",
  //         isAdm: false,
  //       })
  //       .expect(201);

  //     const user = await request(app)
  //       .post("/login")
  //       .send({
  //         email: "tester@gmail.com",
  //         password: "123456",
  //       })
  //       .expect(200);

  //     const searchIdNotAdm = await request(app)
  //       .get(`/user/${newUser.body.uuid}`)
  //       .set({
  //         Authorization: `Bearer ${user.body.token}`,
  //       })
  //       .expect(200);

  //     expect(searchIdNotAdm.body).toHaveProperty("name");
  //     expect(searchIdNotAdm.body).toHaveProperty("email");
  //     expect(searchIdNotAdm.body).toHaveProperty("uuid");

  //     expect(searchIdNotAdm.body.name).toBe("Test");
  //     expect(searchIdNotAdm.body.email).toBe("test@gmail.com");
  //   });

  it("Should return all users and status code 200", async () => {
    const newUser = await request(app)
      .post("/user")
      .send({
        name: "adm",
        email: "adm@gmail.com",
        password: "123456",
        isAdm: true,
      })
      .expect(201);

    const user = await request(app)
      .post("/login")
      .send({
        email: "adm@gmail.com",
        password: "123456",
      })
      .expect(200);

    const allUsers = await request(app)
      .get("/user")
      .set({
        Authorization: `Bearer ${user.body.token}`,
      })
      .expect(200);

    await request(app).get("/user").expect(401);

    expect(allUsers.body).toHaveProperty("map");
  });
});
