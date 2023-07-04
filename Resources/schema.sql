DROP TABLE cleaned_ufo_au;

CREATE TABLE cleaned_ufo_au 
(
	country VARCHAR(30)
	, state VARCHAR(50)
	, city TEXT
	, shape VARCHAR(30)
	, duration_hours FLOAT	
	, duration_minutes FLOAT
	, duration_seconds FLOAT
	, comments TEXT
	, date_posted DATE
	, latitude FLOAT
	, longitude FLOAT
	, date DATE
	, time TIME
);
--Confirm Data was imported correctly--
SELECT * FROM cleaned_ufo_au;


--Total Sightings per State--
SELECT 
	"state"
	, "country"
	, count("state") as "Total Sightings"
FROM cleaned_ufo_au 
GROUP BY ("state", "country")
ORDER BY "Total Sightings" DESC;

--Create Table Total Sightings per State--
CREATE TABLE total_sightings AS 
WITH australia_sightings AS(
SELECT 
	"state"
	, "country"
	, count("state") as "Total Sightings"
FROM cleaned_ufo_au 
GROUP BY ("state", "country")
ORDER BY "Total Sightings" DESC
	)
SELECT * FROM australia_sightings	
	;

--Confirm Table was created correctly--
SELECT * FROM total_sightings;

--Create Table for Population Data per state--
CREATE TABLE population_states
(
	Date DATE
	, population_NSW INT
	, population_VIC INT
	, population_QLD INT
	, population_SA INT
	, population_WA INT
	, population_TAS INT
	, population_NT INT
	, population_ACT INT
);

--Confirm Table was imported correctly--
SELECT * FROM population_states;

--Create a Table with Sightings per State per Year--
CREATE TABLE sightings_state_year AS 
WITH state_year AS
(
	SELECT 
		"state"
		, EXTRACT (YEAR FROM "date") AS "year"
		, count("state") as "Total Sightings"
	FROM cleaned_ufo_au
	GROUP BY ("state", "year")
	ORDER BY "year" ASC
)
SELECT * FROM state_year;

CREATE TABLE population_states_year AS 
WITH population_year AS
	(
	SELECT
		*
		, EXTRACT (YEAR FROM "date") AS "year"
	FROM population_states
	)


	





