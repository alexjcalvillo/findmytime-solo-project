
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "user_profile" (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR(80),
	"last_name" VARCHAR(80),
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "frequency" (
	"id" SERIAL PRIMARY KEY,
	"frequency" VARCHAR(20),
	"interval" INT,
	"count" INT,
	"until" DATE
);

CREATE TABLE "events" (
	"id" SERIAL PRIMARY KEY,
	"event_type" VARCHAR(20),
	"event_title" VARCHAR(80),
	"event_details" VARCHAR(240),
	"event_date" DATE,
	"start_time" TIME,
	"end_time" TIME,
	"recurring" BOOLEAN,
	"recurring_event_id" INT REFERENCES "frequency",
	"profile_id" INT REFERENCES "user_profile"
);

CREATE TABLE "google_import" (
	"id" SERIAL PRIMARY KEY,
	"event_type" VARCHAR(20),
	"event_title" VARCHAR(80),
	"event_details" VARCHAR(240),
	"event_date" DATE,
	"start_time" TIME,
	"end_time" TIME,
	"recurring" BOOLEAN,
	"recurring_event_id" INT REFERENCES "frequency",
	"profile_id" INT REFERENCES "user_profile"
);

-- Testing queries while in development

INSERT INTO "google_import" ("event_type", "event_title", "event_details", "event_date", "start_time", "end_time", "recurring", "recurring_event_id", "profile_id")
VALUES ();

SELECT * FROM google_import WHERE profile_id = 2;

SELECT "user_profile".first_name, "user_profile".last_name FROM "user_profile"
JOIN "user" ON "user".id = "user_profile".user_id
WHERE "user".id = 3;

SELECT * FROM events
WHERE events.profile_id = 2 AND events.event_type = 'wakeup' OR events.event_type = 'winddown';