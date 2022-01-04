
SELECT AVG(total_duration) AS average_total_duration
FROM (
SELECT cohorts.name, SUM(completed_at - started_at) AS total_duration
FROM assistance_requests
JOIN students ON student_id = students.id 
JOIN cohorts ON cohort_id = cohorts.id 
GROUP BY cohorts.name
ORDER BY total_duration
) AS total_durations; /* THIS CREATES A NEW TABLE WITH ALL THE SUMS of the cohort durations as rows with a total_duration column 
this (everything together) is called total_durations which is passed into first select as a column summing the result of the avg
the code is saying SELECT AVG (total_durations) FROM (NEW TABLE COLUMN) */

