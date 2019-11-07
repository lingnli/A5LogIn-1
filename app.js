const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const login = require("./login.js");
const port = 3000;

//handlebars setting
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body-parser setting
app.use(bodyParser.urlencoded({ extended: true }));

//static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;

  let output = login(email, password);

  if (output === "error") {
    let error = "Username/Password 錯誤";
    res.render("index", { error });
  } else {
    res.render("login", { output });
  }
});

app.listen(port, () => {
  console.log("Server:Easylog in is running!");
});
