// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

const config = require('./config');
config(app);
// require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "populate";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

app.use('/auth', require('./routes/auth.routes'));

app.use('/post', require('./routes/post.routes'));

app.use('/comment', require('./routes/comment.routes'));

require("./error-handling")(app);

module.exports = app;
