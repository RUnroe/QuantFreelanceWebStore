const express = require('express');
const path = require('path');
const session = require("express-session");




const app = express();
const { db } = require('./db/db-connect');
const snowmachine = new (require('snowflake-generator'))(1420070400000);
const dal = require('./db/dal')({db, snowmachine});


app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname + "/public")));

let routeFiles = ['frontend', 'api/orders', 'api/users', 'api/products'];
const routeManager = require('./routes/manager');
routeFiles.forEach((file) => {
        let component = require(`./routes/${file}`);
        if(component.configure) component.configure({ dal, snowmachine});
        routeManager.apply(app, component);
});

app.listen(3005, "localhost");