const express = require("express");
const Cars = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

const router = express.Router();

// [GET] /api/cars
router.get("/", async (req, res) => {
  try {
    const cars = await Cars.getAll();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// [GET] /api/cars/:id
router.get("/:id", checkCarId, async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Cars.getById(id);
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// [POST] /api/cars
router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res) => {
    const car = req.body;
    try {
      const newCar = await Cars.create(car);
      res.status(201).json(newCar);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
