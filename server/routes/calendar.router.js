const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */
router.get('/google_calendar/:id', (req, res) => {
  const profileId = Number(req.params.id);
  const query = `SELECT * FROM "google_import" WHERE profile_id = $1;`;

  pool
    .query(query, [profileId])
    .then((dbResponse) => {
      const events = dbResponse.rows;
      res.send(events);
    })
    .catch((err) => {
      console.log(`Can't get events. ${err}`);
    });
});

router.get('/events/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;

  const query = `SELECT * FROM events
  WHERE events.profile_id = $1 AND (events.event_type = 'wakeup' OR events.event_type = 'winddown');`;
  pool
    .query(query, [id])
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

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

router.post('/self-add-routine', (req, res) => {
  const wakeup = req.body.wakeup;
  const winddown = req.body.winddown;
  console.log(wakeup, winddown);

  const query = `INSERT INTO "events" ("event_type", "event_title", "event_details", "event_date", "start_time", "end_time", "recurring", "recurring_event_id", "profile_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9),
  ($10, $11, $12, $13, $14, $15, $16, $17, $18);`;

  pool
    .query(query, [
      wakeup.type,
      wakeup.type,
      wakeup.details,
      wakeup.date,
      wakeup.startTime,
      wakeup.endTime,
      wakeup.recurring,
      wakeup.recurring_event_id,
      wakeup.profile_id,
      winddown.type,
      winddown.type,
      winddown.details,
      winddown.date,
      winddown.startTime,
      winddown.endTime,
      winddown.recurring,
      winddown.recurring_event_id,
      winddown.profile_id,
    ])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
