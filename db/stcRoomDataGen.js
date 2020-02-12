const fs = require('fs');
const path = require('path');
const faker = require('faker');

const ENCODING = ''; // 'base64' || ''
const WRITE_MODE = 'a'; // 'w' || 'a' (write, append)
const OUTPUT_FILE = path.resolve(__dirname, 'stcRoomData.csv');
const SEED_COUNT = 1000000;

const writeStream = fs.createWriteStream(OUTPUT_FILE, { encoding: ENCODING, flags: WRITE_MODE });

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const roomNameAppendix = ["'s Apartment", "'s House", "'s Loft", "'s Condo"];

for (let i = 0; i < SEED_COUNT; i += 1) {
  const price = randomIntFromInterval(50, 200);
  const room = [
    `${faker.name.findName()}${
      roomNameAppendix[randomIntFromInterval(0, roomNameAppendix.length - 1)]
    }`, // roomname
    price, // price
    5, // cleaning_fee
    5, // service_fee
    Math.round(price * 0.085 * 100) / 100, // tax
    randomIntFromInterval(1, 6), // max_guest_adults
    randomIntFromInterval(0, 4), // max_guest_children
    randomIntFromInterval(0, 2), // max_guest_infants
    randomIntFromInterval(1, 2), // min_night
    randomIntFromInterval(3, 6), // max_night
    (Math.random() * (5.0 - 1.0) + 1.0).toFixed(1), // ratings
    randomIntFromInterval(0, 100), // num_reviews
  ];
  const roomString = room.join(',');

  writeStream.write(`${roomString}\n`);
}

writeStream.on('finish', () => console.log('seed complete'));

writeStream.end();

/** ROOM SHAPE
 * const room = {
      roomname: faker.name.findName()
      + roomNameAppendix[randomIntFromInterval(0, roomNameAppendix.length - 1)],
      price: randomIntFromInterval(50, 200),
      cleaning_fee: 5,
      service_fee: 5,
      tax: 10,
      max_guest: {
        adults: randomIntFromInterval(1, 6),
        children: randomIntFromInterval(0, 4),
        infants: randomIntFromInterval(0, 2),
      },
      min_night: randomIntFromInterval(1, 2),
      max_night: randomIntFromInterval(3, 6),
      ratings: (Math.random() * (5.0 - 1.0) + 1.0).toFixed(1),
      num_reviews: randomIntFromInterval(0, 100),
    };
 */
