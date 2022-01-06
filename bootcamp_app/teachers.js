const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// above connects our bootcampx db using pool to our JS server (node). In the terms of our server/back end JS and DB via postgres. 
// The postgreSQL is the server and the back end JS (node) is our client


const cohortName = process.argv[2];
const values = [`%${cohortName}%`];
const queryString = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort 
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = assistance_requests.student_id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`;

pool.query(queryString, values)
.then(res => {
  //console.log(res.rows);
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));