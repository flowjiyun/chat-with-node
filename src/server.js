import express from "express";
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
console.log(__dirname);
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
const handelListen = () => console.log("Listening on http://localhost:3000");
app.listen(3000, handelListen);
