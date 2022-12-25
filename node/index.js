const express = require("express");
const mysql = require("mysql2");

const app = express();

const dbConfig = {
  host: "db",
  user: "root",
  password: "@S3nh4_",
  database: "nodedb",
};
const port = 3000;

const conn = mysql.createConnection(dbConfig);

app.get("/", async (req, res) => {
  try {
    await addPerson();
    let html = `<h1>Full Cycle Rocks!</h1>${await generatePeopleList()}`;

    return res.send(`${html}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `error: ${error}`,
    });
  }
});

app.listen(port, () => {
  console.log("Rodando na porta", port);
});

const generatePeopleList = async () => {
  const people = await getPeople();
  let peopleHtmlList = people.map((person) => {
    return `<li>${person.name}</li>`;
  });
  peopleHtmlList = peopleHtmlList.toString().replaceAll(",", "");
  console.log(peopleHtmlList);
  return `<h2>Lista de Pessoas</h2><ul>${peopleHtmlList}</ul>`;
};

const addPerson = async () => {
  return new Promise((resolve, reject) => {
    const name = "Fulano";
    const sql = "INSERT INTO people(name) VALUES(?)";
    const values = [name];
    conn.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }

      return resolve(results);
    });
  });
};

const getPeople = async () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM people";
    conn.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};
