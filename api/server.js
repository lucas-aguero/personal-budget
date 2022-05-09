// Requirements
const express = require("express");
const morgan = require("morgan");
// const path = require("path");
// const exphbs = require("express-handlebars");
// const flash = require("connect-flash");
const bodyParser = require('body-parser');
const cors = require('cors');

const apiRouter = require('./routes/api');
// const viewsRouter = require('./routes/views');

const config = require("./config/config");

// Initializations
const app = express();
require('./config/database');

// Settings
app.set("port", process.env.PORT || 3333); //Toma el puerto del SO sino lo estable a 33333
// app.set("views", path.join(__dirname, "views"));
// app.engine(
//   ".hbs",
//   exphbs.engine({
//     defaultLayout: "main",
//     layoutsDir: path.join(app.get("views"), "layouts"),
//     partialsDir: path.join(app.get("views"), "partials"),
//     extname: ".hbs",
//     helpers: require("./lib/handlebars"),
//   })
// );
// app.set("view engine", ".hbs");


// Middlewares
app.use(bodyParser.json()); // Se asegura que la info que recibimos es json
app.use(bodyParser.urlencoded({ extended: true })); // Deja aceptar los datos que vienen de los formularios por URL
app.use(morgan("dev")); // Muestra informacion de las peticiones en la consola del servidor
app.use(cors());

// Global Variables

// Routes
// app.use(require("./routes/views/index"));
// app.use(require("./routes/views/users"));
app.use("/api", apiRouter);
// app.use("/", viewsRouter);


// Start Server
console.log("----------------------------------------");
console.log("process.env.PORT: ", process.env.PORT);
console.log("process.env.TIPO: ", process.env.TIPO);
console.log("----------------------------------------")

app.listen(app.get("port"), () => {
  console.log(`SERVER STATUS: RUNNING`);  
  console.log(`SERVER PORT  : ${app.get("port")}`);
});
