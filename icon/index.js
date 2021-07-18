const express = require('express');
const path = require('path');



const app = express();


app.set("trust proxy", 1);
app.use(express.static(path.join(__dirname + "/public")));


app.listen(3010, "localhost");