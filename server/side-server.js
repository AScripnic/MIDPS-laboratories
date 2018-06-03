'use strict';

let subdomain = require('express-subdomain');
let express = require('express');
let app = express();
let router = express.Router();

app.use(subdomain('i', router));
app.listen(3030);