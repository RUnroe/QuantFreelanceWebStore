const express = require('express');
const path = require('path');
const session = require("express-session");
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
const cors = require('cors');
require('dotenv').config();

const upload = require('multer')({ dest: __dirname + '/public/api/icons' });


const app = express();
const dal = require('./db/dal');



app.set("trust proxy", 1);
app.use(express.static(path.join(__dirname + "/public")));

app.use(bodyParser.urlencoded({
        extended: true
}));
app.use(bodyParser.json());

app.use(cors());


app.use(session({
        store: MongoStore.create({
                mongoUrl: process.env.MONGO_CONNECTION,
                dbName: 'QuantFreelance'
        }),
        secret: process.env.SESSION_SECRET,
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




app.listen(process.env.PORT, () => {
        console.log(`App running on port ${process.env.PORT}`)
});