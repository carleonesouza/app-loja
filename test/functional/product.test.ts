import { SetupServer } from "@src/app/server";
import supertest from "supertest";

const server = new SetupServer();
const app = server.getApp();

beforeAll(() => {
  server.init();
});

describe("GET /products", () => {
  it("Should be to return products", async () => {
    const { body, status } = await supertest(app).get("/v1/api/products/");
    expect(status).toBe(200);
    expect(body).toEqual([
      {
        name: "Cerveja Lata",
        category: "Bebidas",
        quantity: 50,
        classification: "ML",
        volume: 300,
        description: "Cerveja Heineken",
        price: 10.5,
      },
    ]);
  });
});

describe("GET /products", () => {
  it("Should be to return a product", async () => {
    const { body, status } = await supertest(app).get(`/v1/api/products/${2}`);
    expect(status).toBe(200);
    expect(body).toEqual({
      id: 2,
      name: "Cerveja Lata",
      category: "Bebidas",
      quantity: 50,
      classification: "ML",
      volume: 300,
      description: "Cerveja Heineken",
      price: 10.5,
    });
  });
});

describe("POST /products", () => {
  it("Should respond with 201 created", async () => {
    const { status } = await supertest(app).post(`/v1/api/products/`);
    expect(status).toBe(201);
  });
});

describe("PUT /products", () => {
  it("Should respond with 200 OK", async () => {
    const { body, status } = await supertest(app).put(`/v1/api/products/${2}`);
    expect(status).toBe(200);
    expect(body).toEqual([
      {
        name: "Cerveja Lata",
        category: "Bebidas",
        quantity: 50,
        classification: "ML",
        volume: 300,
        description: "Cerveja Heineken",
        price: 15.5,
      },
    ]);
  });
});

describe("DELETE /products", () => {
  it("Should respond with 200 OK", async () => {
    const { status } = await supertest(app).delete(`/v1/api/products/${2}`);
    expect(status).toBe(200);
  });
});
