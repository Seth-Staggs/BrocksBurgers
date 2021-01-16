const express = require("express");
const exphbs  = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

// Parse application body as JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//register a Handlebars view engine
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(require("./controllers/burgers_controller.js"));

//start the server
app.listen(PORT, function(){
	console.log("listenning on http://localhost:" + PORT);
});