
require('dotenv').config();
const { Pool } = require('pg');

const {
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASS,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env;

const pool = new Pool({
  user: POSTGRES_USER,
  database: POSTGRES_DB,
  password: POSTGRES_PASS,
  port: POSTGRES_PORT,
  host: POSTGRES_HOST,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 1000,
});

pool.on('error', (err) => {
  /* eslint-disable no-alert, no-console */
  console.log('PG pool error', err);
  process.exit(-1);
});

module.exports = pool;

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('booking', 'root', null, {
//   host: 'database',
//   dialect: 'mysql',
// });

// const Room = sequelize.define('rooms', {
//   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   roomname: Sequelize.STRING,
//   price: Sequelize.INTEGER,
//   cleaning_fee: Sequelize.INTEGER,
//   service_fee: Sequelize.INTEGER,
//   tax: Sequelize.INTEGER,
//   max_guest: Sequelize.STRING,
//   min_night: Sequelize.INTEGER,
//   max_night: Sequelize.INTEGER,
//   ratings: Sequelize.DECIMAL(2, 1),
//   num_reviews: Sequelize.INTEGER,
// });

// const Booking = sequelize.define('bookings', {
//   email: Sequelize.STRING,
//   guests: Sequelize.STRING,
//   check_in: Sequelize.DATE,
//   check_out: Sequelize.DATE,
//   createdAt: Sequelize.DATE,
//   roomId: {
//     type: Sequelize.INTEGER,
//     references: {
//       model: 'rooms',
//       key: 'id',
//     },
//   },
// });

// Room.hasMany(Booking, { foreignKey: 'roomId' });
// Booking.belongsTo(Room, { foreignKey: 'roomId' });

// sequelize.authenticate();

// Room.sync();
// Booking.sync();

// module.exports = {
//   Room,
//   Booking,
// };
