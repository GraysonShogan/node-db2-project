exports.up = function (knex) {
  return knex.schema.createTable("cars", function (table) {
    table.increments("id").primary();
    table.string("vin").notNullable().unique();
    table.string("make").notNullable();
    table.string("model").notNullable();
    table.decimal("mileage").notNullable();
    table.string("title");
    table.string("transmission");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
