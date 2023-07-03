DROP TABLE ufo;

CREATE TABLE ufo (
	datetime TIMESTAMP WITHOUT TIME ZONE
	, city TEXT
	, state VARCHAR(30)
	, country VARCHAR(30)
	, shape VARCHAR(30)
	, duration_seconds FLOAT
	, comments TEXT
	, date_posted DATE
	, latitude FLOAT
	, longitude FLOAT
	, date DATE
	, time TIME
	, duration_minutes FLOAT
	, duration_hours FLOAT	
);

SELECT * FROM ufo;

SELECT 
	"state"
	, "country"
	, count("state") as "Total Sightings"
FROM ufo
GROUP BY ("state", "country")
ORDER BY "Total Sightings" DESC;

CREATE TABLE total_sightings AS 
WITH country AS(
SELECT 
	"state"
	, "country"
	--, "city"
	, count("state") as "Total Sightings"
FROM ufo
WHERE "country" ilike 'au'
GROUP BY ("state", "country")
ORDER BY "Total Sightings" DESC
	)
SELECT * FROM country	
	;

select * from total_sightings;


