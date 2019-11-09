const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const login = require("./login.js");
const port = 3000;

//登入狀態保留實作
//session
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret", //cookieParser
    resave: true, //(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。
    rolling: true, //强制在每个响应中重设cookie的过期时间，并重新开始计时
    saveUninitialized: true, //初始化session
    cookie: {
      maxAge: 60 * 60 //session暫存在網頁的有效時間 60秒Ｘ60
    }
  })
);

//handlebars setting
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body-parser setting
app.use(bodyParser.urlencoded({ extended: true }));

//static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  if (req.session.output) {
    //連接首頁時，若在session中有找到資料，會直接導入登入畫面
    console.log(req.session.output);
    res.render("login", { output: req.session.output });
  } else {
    res.render("index");
  }
});
//log in
app.post("/login", (req, res) => {
  console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;
  let output = login(email, password);

  if (output === "error") {
    let error = "Username/Password 錯誤";
    res.render("index", { error });
  } else {
    req.session.output = output; //login成功時設定session的name
    console.log(req.session.output);
    res.render("login", { output });
  }
});
//log out
app.post("/", (req, res) => {
  req.session.destroy(); //登出時刪除
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Server:Easylog in is running!");
});
