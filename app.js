require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware"); // <== IMPORT


const app = express();
require("./config")(app);


// 👇 MIDDLEWARE MISSING
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const authRouter = require("./routes/auth.routes");
app.use("/api/auth", authRouter);

const mainRouter = require("./routes/main.routes");
app.use("/api", isAuthenticated, mainRouter);            // <== UPDATE

const taskRouter = require("./routes/task.routes");
app.use("/api",isAuthenticated, taskRouter);

const characterRouter = require("./routes/character.routes");
app.use("/api",isAuthenticated, characterRouter);






// app.use((req, res, next) => {
//     // If no routes match, send them the React HTML.
//     res.sendFile(__dirname + "/public/index.html");
//   });

require("./error-handling")(app);

module.exports = app;
