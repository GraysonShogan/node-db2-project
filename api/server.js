const express = require("express");
const knex = require("knex");
const dbConfig = require("./knexfile");

const app = express();

const db = knex(dbConfig.development);

app.use(express.json());

app.get("/cars", async (req, res) => {
  try {
    const cars = await db("cars");
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/cars/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const car = await db("cars").where({ id }).first();
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/cars", async (req, res) => {
  const { vin, make, model, mileage, title, transmission } = req.body;
  if (!vin || !make || !model || !mileage) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  try {
    const newCar = await db("cars").insert({
      vin,
      make,
      model,
      mileage,
      title,
      transmission,
    });
    res.json({ id: newCar[0], ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = server;
