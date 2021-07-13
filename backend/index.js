const express = require('express');
const path = require('path');
const session = require("express-session");
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');



const app = express();
const dal = require('./db/dal');


app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname + "/public")));

app.use(bodyParser.urlencoded({
        extended: true
}));
app.use(bodyParser.json());



let routeFiles = ['api/orders', 'api/users', 'api/products', 'api/icons'];
const routeManager = require('./routes/manager');
routeFiles.forEach((file) => {
        let component = require(`./routes/${file}`);
        if (component.configure) component.configure({
                dal
        });
        routeManager.apply(app, component);
});


app.use(require('cookie-parser')(require('./secrets').session.secret));

app.use(session({
        // store: MongoStore.create({
        //         mongoUrl: require('./secrets').mongo.connectionString,
        //         dbName: 'QuantFreelance'
        // }),
        // secret: require('./secrets').session.secret,
        // name: 'quant.session',
        // resave: false,
        // saveUninitialized: false,
        // cookie: {
        //         maxAge: 1000 * 60 * 60 * 24 * 30,
        //         sameSite: 'none',
        //         secure: true,
        //         httpOnly: true
        // }
        store: MongoStore.create({
                mongoUrl: require('./secrets').mongo.connectionString,
                dbName: 'QuantFreelance',
                ttl: 14 * 24 * 60 * 60 // = 14 days. Default
              })
}));

app.listen(3005, "localhost");