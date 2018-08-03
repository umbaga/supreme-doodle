/* eslint no-console: 0 */

let express = require('express');

let itemtypes = require('./modules/itemtypeDefinition');
let modules = require('./modules/common');

let runEquipment = require('./routes/equipment');
let runItemtype = require('./routes/itemtype');
let runPicklist = require('./routes/picklist');
let runProficiency = require('./routes/proficiency');

let pg = require('pg');

let cn = {
    user: 'postgres',
    password: '1qw23er4',
    host: 'localhost',
    port: 5432,
    database: 'dnd5ecg'
};
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '5mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
let pool = new pg.Pool(cn);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); app.use(bodyParser.urlencoded({ extended: true }));

let async = require('async');

runEquipment(app, pg, async, pool, itemtypes, modules);
runItemtype(app, pg, async, pool, itemtypes, modules);
runPicklist(app, pg, async, pool, itemtypes, modules);
runProficiency(app, pg, async, pool, itemtypes, modules);

app.listen(5000, function() {
    console.log('Started on Port 5000');
});

module.exports = app;