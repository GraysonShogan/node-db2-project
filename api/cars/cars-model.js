const db = require("../../data/db-config");

function getAll() {
  return db("cars");
}

function getById(id) {
  return db("cars").where({ id }).first();
}

async function create(car) {
  const [newCarId] = await db("cars").insert(car);
  return getById(newCarId);
}

module.exports = {
  getAll,
  getById,
  create,
};
