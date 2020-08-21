const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// let array = [];

function queryNum(n, array) {
  if (n <= 0) {
    return;
  } else {
    let day = n + 1;
    let queryValues = `($1, $${day})`;
    array.push(queryValues);
    queryNum(n - 1, array);
    console.log(array);
  }
}

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
  const id = Number(req.params.id);
  console.log(id);

  const query = `SELECT * FROM events
  WHERE events.profile_id = $1 ORDER BY events.id DESC;`;
  pool
    .query(query, [id])
    .then((dbResponse) => {
      console.log(dbResponse.rows);
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/days/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  const query = `SELECT days.num, events.id FROM "events"
    JOIN frequency ON frequency.event_id = events.id
    JOIN days ON frequency.day_id = days.id
    WHERE events.profile_id = $1 GROUP BY events.id, days.num;`;

  pool
    .query(query, [id])
    .then((dbResponse) => {
      console.log(dbResponse.rows);
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/google_calendar/add-event', (req, res) => {
  console.log('POSTING', req.body);
  const event = req.body.event;
  const query = `INSERT INTO "google_import" ("event_type", "title", "details", "date", "start", "end", "recurring", "profile_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
  pool
    .query(query, [
      event.event_type,
      event.event_title,
      event.event_details,
      event.event_date,
      event.start_time,
      event.end_time,
      event.recurring,
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

  const query = `INSERT INTO "events" ("event_type", "title", "details", "date", "start", "end", "recurring", "profile_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8),
  ($9, $10, $11, $12, $13, $14, $15, $16);`;

  pool
    .query(query, [
      wakeup.type,
      wakeup.title,
      wakeup.details,
      wakeup.startDate,
      wakeup.start,
      wakeup.end,
      wakeup.recurring,
      wakeup.profile_id,
      winddown.type,
      winddown.title,
      winddown.details,
      winddown.startDate,
      winddown.start,
      winddown.end,
      winddown.recurring,
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

router.post('/new-event', (req, res) => {
  console.log(req.body);
  const newEvent = req.body;

  const query = `INSERT INTO "events" ("event_type", "title", "details", "date", "start", "end", "recurring", "profile_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;

  pool
    .query(query, [
      newEvent.type,
      newEvent.title,
      newEvent.details,
      newEvent.startDate,
      newEvent.start,
      newEvent.end,
      newEvent.recurring,
      newEvent.profile_id,
    ])
    .then((dbReponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post('/create-freq', (req, res) => {
  const days = req.body;
  console.log(days);
  const dbdays = days.days.map((day, i) => {
    return day;
  });

  const array = [];
  dbdays.unshift(days.id);
  const numStart = days.days.length;
  queryNum(numStart, array);

  const finalQuery = array.reverse().join(', ');
  const query = `INSERT INTO "frequency" (event_id, day_id)
  VALUES ${finalQuery};`;

  pool
    .query(query, dbdays)
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
