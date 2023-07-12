const request = require("supertest");
const app = require("../api/server"); // Adjust the path if needed
const { expect } = require("chai");

describe("Cars API", () => {
  it("should get all cars", async () => {
    const res = await request(app).get("/api/cars");
    expect(res.status).to.equal(200);
    expect(res.body).to.eql([]);
  });

  it("should create a new car", async () => {
    const newCar = {
      vin: "ABC123",
      make: "Toyota",
      model: "Camry",
      mileage: 50000,
    };
    const res = await request(app)
      .post("/api/cars")
      .send(newCar)
      .set("Accept", "application/json");
    expect(res.status).to.equal(201);
    expect(res.body).to.eql(newCar);
  });

  it("should get a car by ID", async () => {
    const res = await request(app).get("/api/cars/1");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("id", 1);
  });
});
