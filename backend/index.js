const express = require('express');
const path = require('path');
const session = require("express-session");
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
const upload = require('multer')({ dest: __dirname + '../icon/public' });



const app = express();
const dal = require('./db/dal');


// app.set("view engine", "pug");
// app.set("views", __dirname + "/views");
app.set("trust proxy", 1);
app.use(express.static(path.join(__dirname + "/public")));

app.use(bodyParser.urlencoded({
        extended: true
}));
app.use(bodyParser.json());


//app.use(require('cookie-parser')(require('./secrets').session.secret));

app.use(session({
        store: MongoStore.create({
                mongoUrl: require('./secrets').mongo.connectionString,
                dbName: 'QuantFreelance'
        }),
        secret: require('./secrets').session.secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                sameSite: 'lax',
                secure: 'auto',
                httpOnly: false
        }
}));

let routeFiles = ['api/orders', 'api/users', 'api/products', 'api/icons'];
const routeManager = require('./routes/manager');
routeFiles.forEach((file) => {
        let component = require(`./routes/${file}`);
        if (component.configure) component.configure({
                dal, upload
        });
        routeManager.apply(app, component);
});




app.listen(3005, "localhost");