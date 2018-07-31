var express = require('express');

var itemtypes = require('./modules/itemtypeDefinition');
var modules = require('./modules/common');

var runItemtype = require('./routes/itemtype');

var modules = require('./modules/common');

var pg = require('pg');

var cn = {
    user: 'postgres',
    password: '1qw23er4',
    host: 'localhost',
    port: 5432,
    database: 'dnd5ecg'
};
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '5mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
var pool = new pg.Pool(cn);
app.use(bodyParser.json());         
app.use(bodyParser.urlencoded({ extended: true })); app.use(bodyParser.urlencoded({ extended: true })); 

var async = require('async');

runItemtype(app, pg, async, pool, itemtypes, modules);

app.listen(5000, function() {
    console.log('Started on Port 5000');
});

module.exports = app;