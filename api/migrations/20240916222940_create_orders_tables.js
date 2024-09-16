exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('customers', function(table) {
      table.increments('id').primary(); // Should be of type INTEGER by default
      table.string('name').notNullable();
      table.string('phone').notNullable();
      table.string('address').notNullable();
      table.timestamps(true, true);
    }),

    knex.schema.createTable('orders', function(table) {
      table.increments('id').primary();
      table.integer('customer_id').unsigned().references('id').inTable('customers').notNullable(); // Make sure 'unsigned' is used
      table.enu('category', ['pickup', 'delivery']).notNullable();
      table.timestamp('order_time').defaultTo(knex.fn.now());
      table.json('order_details').notNullable();
      table.timestamps(true, true);
    }),

    knex.schema.createTable('payments', function(table) {
      table.increments('id').primary();
      table.integer('order_id').unsigned().references('id').inTable('orders').notNullable();
      table.enu('method', ['cash', 'card']).notNullable();
      table.enu('status', ['paid', 'pending']).notNullable();
      table.decimal('amount', 10, 2).notNullable();
      table.timestamps(true, true);
    }),

    knex.schema.createTable('feedback', function(table) {
      table.increments('id').primary();
      table.integer('order_id').unsigned().references('id').inTable('orders').notNullable();
      table.integer('rating').notNullable();
      table.text('comments');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('inventory', function(table) {
      table.increments('id').primary();
      table.string('ingredient').notNullable();
      table.integer('stock').notNullable();
      table.string('supplier').notNullable();
      table.timestamps(true, true);
    }),

    knex.schema.createTable('employees', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.enu('role', ['cook', 'cashier', 'manager']).notNullable();
      table.timestamp('shift_start').notNullable();
      table.timestamp('shift_end').notNullable();
      table.timestamps(true, true);
    }),
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('employees'),
    knex.schema.dropTableIfExists('inventory'),
    knex.schema.dropTableIfExists('feedback'),
    knex.schema.dropTableIfExists('payments'),
    knex.schema.dropTableIfExists('orders'),
    knex.schema.dropTableIfExists('customers'),
  ]);
};
