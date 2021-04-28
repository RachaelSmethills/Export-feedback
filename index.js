const express = require("express");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const port = process.env.PORT || 3000;
const ObjectsToCsv = require("objects-to-csv");

const app = express();

const handlebars = expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");

app.get("/", async (req, res) => {
  res.render("index", {});
});

// CSV Example
app.post("/csv", async (req, res) => {
  const moo = { sdds: "stuff" };
  const csv = new ObjectsToCsv([moo]);
  console.log("Called");

  res.writeHead(200, {
    "Content-Type": "text/csv",
    "Content-Disposition": "attachment; filename=*CSV-Data-Example*.csv",
  });

  res.end(await csv.toString(), "binary");
});

app.listen(port, () => {
  console.log("Listening..", port);
  console.log(`Example app listening at http://localhost:${port}`);
});
