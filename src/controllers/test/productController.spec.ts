import { createConnection, getConnection } from "typeorm";
import request from "supertest";
import app from "../../app";
import jwt from "jsonwebtoken";
import { config } from "../../database";

describe("Testing status code and returns", () => {
  const tokenAdm = jwt.sign({ isAdm: true }, config.secret);
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();

    await connection.close();
  });

  it("POST /product - Should create product and only ADM could do that ", async () => {
    await request(app).post("/product").expect(401);

    await request(app)
      .post("/product")
      .send({ name: "", price: 0 })
      .expect(401);

    const product = await request(app)
      .post("/product")
      .send({ name: "potato", price: 500 })
      .set({
        Authorization: `Bearer ${tokenAdm}`,
      })
      .expect(201);

    expect(product.body).toHaveProperty("name");
    expect(product.body).toHaveProperty("uuid");
    expect(product.body).toHaveProperty("price");
  });
  it("GET /product - Should list all products status code 200", async () => {
    const products = await request(app).get("/product").expect(200);
    expect(products.body).toHaveProperty("data");
    expect(products.body.data).toHaveProperty("map");
  });

  it("GET /product/:uuid - Should get a product by id if exists", async () => {
    const products = await request(app).get("/product").expect(200);
    await request(app).get("/product/NotAnID").expect(404);
    const product = await request(app)
      .get(`/product/${products.body.data[0].uuid}`)
      .expect(200);
    expect(product.body).toHaveProperty("name");
    expect(product.body).toHaveProperty("uuid");
    expect(product.body).toHaveProperty("price");
  });

  it("POST /cart - Should add a product to the cart (id)", async () => {
    const products = await request(app).get("/product").expect(200);

    const newUser = await request(app)
      .post("/user")
      .send({
        name: "Test",
        email: "test@gmail.com",
        password: "123456",
        isAdm: false,
      })
      .expect(201);

    const user = await request(app)
      .post("/login")
      .send({
        email: "test@gmail.com",
        password: "123456",
      })
      .expect(200);

    await request(app).post("/cart").expect(400);

    const addProduct = await request(app)
      .post("/cart")
      .send({
        uuid: products.body.data[0].uuid,
      })
      .set({
        Authorization: `Bearer ${user.body.token}`,
      })
      .expect(200);

    expect(addProduct.body).toHaveProperty("cart");
    expect(addProduct.body.cart).toHaveProperty("map");
    expect(addProduct.body).not.toHaveProperty("password");
    expect(addProduct.body).toHaveProperty("name");
  });

  it("GET /cart/:uuid - Should return the cart list ", async () => {
    const newUser = await request(app)
      .post("/user")
      .send({
        name: "Test",
        email: "testa@gmail.com",
        password: "123456",
        isAdm: true,
      })
      .expect(201);

    const token = jwt.sign(
      { isAdm: true, email: "testa@gmail.com" },
      config.secret
    );

    await request(app)
      .get("/cart/notAndId")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .expect(404);
    await request(app).get("/cart/noasdas").expect(404);
    const cart = await request(app)
      .get(`/cart/${newUser.body.uuid}`)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .expect(200);

    expect(cart.body).toHaveProperty("data");
    expect(cart.body.data).toHaveProperty("map");
  });

  it("GET /cart - Should list all carts only for administrators ", async () => {
    const token = jwt.sign(
      { isAdm: true, email: "testa@gmail.com" },
      config.secret
    );
    await request(app).get("/cart").expect(401);
    const carts = await request(app)
      .get("/cart")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(carts.body).toHaveProperty("data");
    expect(carts.body.data).toHaveProperty("map");
    expect(carts.body.data[0]).toHaveProperty("uuid");
    expect(carts.body.data[0]).toHaveProperty("cart");
  });

  it("DELETE /cart/:product_uuid - Only owner and adm can do that ", () => {});
});
