const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
// router.get('/', (req, res) => {
//   axios.get('https://www.googleapis.com/calendar/v3/calendars/primary');
// });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  axios
    .get('https://www.googleapis.com/calendar/v3/calendars/primary', {
      method: 'GET',
      headers: req.body.headers,
    })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
