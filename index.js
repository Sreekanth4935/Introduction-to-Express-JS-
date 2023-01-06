const express = require("express");
const app = express();
const { open } = require("sqlite");
const path = require("path");
const dbPath = path.join(__dirname, "goodreads.db");
const sqlite3 = require("sqlite3");

// app.get("/", (request, response) => {
//   response.send("I am running properly");
// });

let db = null;

const initilizeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("The server is running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB error: ${e.message}`);
    process.exit(1);
  }
};

initilizeDBAndServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    SELECT *
    FROM  
    book
    ORDER BY 
    book_id
    limit 1;
    `;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
