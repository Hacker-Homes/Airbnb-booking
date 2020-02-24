require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('../db/index.js');

require('dotenv').config();

const app = express();
const PORT = 5555;
app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(bodyParser.json());
app.use(cors());


// app.get('*.js', (req, res, next) => {
//   req.url = `${req.url}.gz`;
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

app.get('/room', (req, res) => {
  pool.query('SELECT * FROM rooms WHERE roomId=$1', [req.query.id])
    .then((response) => {
      /* eslint-disable no-alert, no-console */
      console.log('response', response, 'response.rows', response.rows, 'response.rows[0]', response.rows[0]);
      return res.send(response.rows[0]);
    })
    .catch((e) => {
      /* eslint-disable no-alert, no-console */
      console.log(e.stack);
      res.sendStatus(500);
    });
  // db.Room.findAll({
  //   where: {
  //     id: req.query.id,
  //   },
  // })
  //   .then((result) => {
  //     res.send(result[0].dataValues);
  //   })
  //   .catch(() => {
  //     res.sendStatus(500);
  //   });
  // }
});

// app.get('/booking', (req, res) => {
//   db.Booking.findAll({
//     where: {
//       roomId: req.query.id,
//     },
//   })
//     .then((result) => {
//       res.send(result);
//     })
//     .catch(() => {
//       res.sendStatus(500);
//     });
// });


// making booking

// app.post('/booking', (req, res) => {
//   const data = {
//     roomId: req.body.roomId,
//     email: req.body.email,
//     guests: req.body.guests,
//     check_in: new Date(req.body.check_in),
//     check_out: new Date(req.body.check_out),
//     createdAt: new Date(req.body.createdAt),
//   };


//   db.Booking.create(data)
//     .catch((err) => {
//       console.log(`err: ${err}`);
//       res.sendStatus(500);
//     })
//     .then(() => {
//       console.log('Booking data is saved');
//       res.sendStatus(200);
//     });
// });

app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`);
});
