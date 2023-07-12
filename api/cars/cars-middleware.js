const Cars = require("./cars-model");

async function checkCarId(req, res, next) {
  const { id } = req.params;
  try {
    const car = await Cars.getById(id);
    if (car) {
      next();
    } else {
      res.status(404).json({ message: `Car with id ${id} is not found` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

function checkCarPayload(req, res, next) {
  const { vin, make, model, mileage } = req.body;
  if (!vin || !make || !model || !mileage) {
    res.status(400).json({ message: "Required field(s) are missing" });
  } else {
    next();
  }
}

function checkVinNumberValid(req, res, next) {
  const { vin } = req.body;
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
  if (!vinRegex.test(vin)) {
    res.status(400).json({ message: `VIN ${vin} is invalid` });
  } else {
    next();
  }
}

async function checkVinNumberUnique(req, res, next) {
  const { vin } = req.body;
  try {
    const car = await db("cars").where({ vin }).first();
    if (car) {
      res.status(400).json({ message: `VIN ${vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
