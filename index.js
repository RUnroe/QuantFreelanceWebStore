const express = require('express');
const path = require('path');
const session = require("express-session");

const app = express();
const snowmachine = new (require('snowflake-generator'))(1420070400000);

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname + "/public")));

let routeFiles = ['frontend'];
const routeManager = require('./routes/manager');
routeFiles.forEach((file) => {
        let component = require(`./routes/${file}`);
        if(component.configure) component.configure({app});
        routeManager.apply(app, component);
});

app.listen(3000);