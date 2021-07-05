const express = require('express');
const path = require('path');
const session = require("express-session");
const bodyParser = require('body-parser');




const app = express();
const dal = require('./db/dal');


app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname + "/public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routeFiles = ['frontend', 'api/orders', 'api/users', 'api/products'];
const routeManager = require('./routes/manager');
routeFiles.forEach((file) => {
        let component = require(`./routes/${file}`);
        if(component.configure) component.configure({ dal});
        routeManager.apply(app, component);
});

app.listen(3005, "localhost");