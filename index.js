const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const waiters = require("./waiter");
const flash = require("express-flash");
const session = require("express-session");
const app = express();
const pg = require("pg");
const Pool = pg.Pool;
// initialise the flash middleware
app.use(flash());

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL) {
  useSSL = true;
}

// which db connection to use
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://coder:coder123@localhost:5432/waiters";

const pool = new Pool({
  connectionString,
  ssl: useSSL
});

const waiter = waiters(pool);
//const greetingRoute = routes(Greet);
let PORT = process.env.PORT || 3040;
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// initialise session middleware - flash-express depends on it
app.use(
  session({
    secret: "this is a text",
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.static("public"));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.get("/waiters/:user_name", async function (req, res, next) {
  try {
    let user_name = req.params.user_name;
    let days = req.body.days;
    console.log(user_name);
    let showdays = await waiter.getdaysofweek();


    res.render("home", {
      showdays

    });
  } catch (error) {
    next(error.stack);
  }
});

app.post("/waiters/:user_name", async function (req, res, next) {
  try {
    let user_name = req.params.user_name;
    let days = req.body.days;
    console.log(user_name);
    let showdays = await waiter.getdaysofweek();


    res.render("home", {
      showdays,
      days
    });
  } catch (error) {
    next(error.stack);
  }
});


app.use(bodyParser.json());
app.listen(PORT, function (err) {
  console.log("APP starting on port", PORT);
});