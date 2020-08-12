const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {});

/**
 * POST route template
 */
router.post('/google_calendar/add-event', (req, res) => {
  console.log('POSTING', req.body);
  const event = req.body.event;
  const query = `INSERT INTO "google_import" ("event_type", "event_title", "event_details", "event_date", "start_time", "end_time", "recurring", "recurring_event_id", "profile_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
  pool
    .query(query, [
      event.event_type,
      event.event_title,
      event.event_details,
      event.event_date,
      event.start_time,
      event.end_time,
      event.recurring,
      event.recurring_event_id,
      event.profile_id,
    ])
    .then((dbResponse) => {
      console.log(dbResponse);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Something went wrong. ${err}`);
    });
});

module.exports = router;
