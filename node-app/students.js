const { Client } = require("pg");

function createClient() {
  return new Client({
    host: "localhost",
    port: 5432,
    database: "tp",
    user: "postgres",
    password: "postgres",
  });
}

async function addStudent(client, name, grade) {
  const res = await client.query(
    "INSERT INTO students (name, grade) VALUES ($1, $2) RETURNING id",
    [name, grade]
  );
  return res.rows[0].id;
}

async function getStudent(client, id) {
  const res = await client.query(
    "SELECT name, grade FROM students WHERE id = $1",
    [id]
  );
  if (res.rows.length === 0) return null;
  return { name: res.rows[0].name, grade: parseFloat(res.rows[0].grade) };
}

async function averageGrade(client) {
  const res = await client.query("SELECT AVG(grade) AS avg FROM students");
  const value = res.rows[0].avg;
  return value === null ? null : parseFloat(value);
}

module.exports = { createClient, addStudent, getStudent, averageGrade };
