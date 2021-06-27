const express = require('express');
const path = require('path');
const session = require("express-session");

const app = express();
const snowmachine = new (require('snowflake-generator'))(1420070400000);

app.listen(3000);