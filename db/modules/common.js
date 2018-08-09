let express = require('express');

let itemtypes = require('./itemtypeDefinition');

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
app.use(bodyParser.urlencoded({ extended: true }));

let async = require('async');

let sql = '';
let results = [];
let vals = [];
let addComma = false;
let parameterArray = [];
let stepInt = 0;

let common = {
    datatypes: {
        dice: {
            compare: function(a, b) {
                if (a.dieCount == b.dieCount
                   && a.dieType == b.dieType
                   && a.modifier == b.modifier
                   && a.multiplier == b.multiplier
                   && a.divisor == b.divisor) {
                    return true;
                }
                return false;
            },
            getId: function(arr, obj) {
                for (let q = 0; q < arr.length; q++) {
                    if (common.datatypes.dice.compare(arr[q], obj)) {
                        return arr[q].id;
                    }
                }
                return 0;
            },
            getObject: function(arr, obj) {
                let retVal = obj;
                retVal.id = common.datatypes.dice.getId(arr, obj);
                return retVal;
            }
        }
    },
    parameterArray: {
        incrementValues: function(arr) {
            let retVal = [];
            for (let e = 0; e < arr.length; e++) {
                retVal.push(arr[e] + arr.length);
            }
            return retVal;
        },
        insertNewRecords: function(objectArray, tableName, columnNames, dataTypes) {
            let retVal = [];
            vals = [];
            let selectUnionClauseString = '';
            let columnNamesString = '';
            let valsColumnNamesString = '';
            let whereClauseString = '';
            let addComma2 = false;
            let valNum = 0;
            addComma = false;
            for (let q = 0; q < columnNames.length; q++) {
                columnNamesString += addComma ? ', ' : '';
                columnNamesString += '"' + columnNames[q] + '"';
                valsColumnNamesString += addComma ? ', ' : '';
                valsColumnNamesString += 'v."' + columnNames[q] + '"';
                whereClauseString += addComma ? ' AND ' : ' WHERE ';
                whereClauseString += 't."' + columnNames[q] + '" = v."' + columnNames[q] + '"';
                addComma = true;
            }
            addComma = false;
            for (let q = 0; q < objectArray.length; q++) {
                selectUnionClauseString += addComma ? ' UNION ' : '';
                selectUnionClauseString += 'SELECT ';
                addComma2 = false;
                for (let w = 0; w < columnNames.length; w++) {
                    selectUnionClauseString += addComma2 ? ', ' : '';
                    valNum = ((q * columnNames.length) + w) + 1;
                    selectUnionClauseString += '$' + valNum.toString() + ' :: ' + dataTypes[w] + ' AS "' + columnNames[w] + '"';
                    addComma2 = true;
                }
                addComma = true;
            }
            retVal = 'WITH vals AS (';
            retVal += selectUnionClauseString;
            retVal += ')';
            retVal += ' INSERT INTO ' + tableName + ' (' + columnNamesString + ')';
            retVal += ' SELECT ' + valsColumnNamesString;
            retVal += ' FROM vals AS v';
            retVal += ' WHERE NOT EXISTS (';
            retVal += ' SELECT * FROM ' + tableName + ' AS t';
            retVal += whereClauseString
            retVal += ')';
            retVal += ' RETURNING id, ' + columnNamesString;
            return retVal;
        },
        resetValues: function(count, startingValue) {
            let finalStartingValue = 0;
            let retVal = [];
            if (startingValue != null && startingValue != undefined) {
                finalStartingValue = startingValue;
            }
            for (let e = finalStartingValue + 1; e <= count + finalStartingValue; e++) {
                retVal.push(e);
            }
            return retVal;
        },
        sql: function(arr, startingValue) {
            let finalStartingValue = 0;
            if (startingValue != null && startingValue != undefined) {
                finalStartingValue = startingValue;
            }
            let addComma = false;
            let retVal = '(';
            if (finalStartingValue != 0) {
                for (let e = 1; e <= finalStartingValue; e++) {
                    if (addComma) {
                        retVal += ', ';
                    }
                    retVal += '$' + e.toString();
                    addComma = true;
                }
            }
            for (let e = 0; e < arr.length; e++) {
                if (addComma) {
                    retVal += ', ';
                }
                retVal += '$' + arr[e];
                addComma = true;
            }
            retVal += ')';
            return retVal;
        }
    },
    manage: {
        dice: function(referenceArray, cb) {
            pool.connect(function(err, client, done) {
                async.waterfall([
                    function init(callback) {
                        stepInt = 0;
                        let resObj = {};
                        resObj.objectArray = referenceArray;
                        resObj.permissions = {};
                        return callback(null, resObj);
                    },
                    function insertDiceTable(resObj, callback) {
                        console.log('manage-dice-' + stepInt.toString());
                        stepInt++;
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'with vals as (';
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (addComma) {
                                sql += ' UNION ';
                            }
                            let baseVal = e * 5;
                            sql += 'select $' + (baseVal + 1).toString() + ' :: bigint as "dieCount"';
                            sql += ', $' + (baseVal + 2).toString() + ' :: bigint as "dieType"';
                            sql += ', $' + (baseVal + 3).toString() + ' :: bigint as "modifier"';
                            sql += ', $' + (baseVal + 4).toString() + ' :: bigint as "multiplier"';
                            sql += ', $' + (baseVal + 5).toString() + ' :: bigint as "divisor"';
                            vals.push(resObj.objectArray[e].dieCount);
                            vals.push(resObj.objectArray[e].dieType);
                            vals.push(resObj.objectArray[e].modifier);
                            vals.push(resObj.objectArray[e].multiplier);
                            vals.push(resObj.objectArray[e].divisor);
                            addComma = true;
                        }
                        sql += ' )';
                        sql += ' insert into adm_core_dice ("dieCount", "dieType", "modifier", "multiplier", "divisor")';
                        sql += ' select v."dieCount", v."dieType", v."modifier", v."multiplier", v."divisor"';
                        sql += ' from vals as v';
                        sql += ' where not exists (';
                        sql += ' select * from adm_core_dice as t';
                        sql += ' where t."dieCount" = v."dieCount"';
                        sql += ' and t."dieType" = v."dieType"';
                        sql += ' and t."modifier" = v."modifier"';
                        sql += ' and t."multiplier" = v."multiplier"';
                        sql += ' and t."divisor" = v."divisor")';
                        sql += ' returning id AS "diceId";';
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            return callback(null, resObj);
                        });
                    },
                    function assignDiceIds(resObj, callback) {
                        console.log('manage-dice-' + stepInt.toString());
                        stepInt++;
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'SELECT dice.id, dice."dieCount", dice."dieType", dice.modifier, dice.multiplier, dice.divisor';
                        sql += ' FROM adm_core_dice dice';
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (addComma) {
                                sql += ' OR ';
                            } else {
                                sql += ' WHERE ';
                            }
                            
                            let baseVal = e * 5;
                            sql += '(dice."dieCount" = $' + (baseVal + 1).toString() + ' AND dice."dieType" = $' + (baseVal + 2).toString();
                            sql += ' AND dice.modifier = $' + (baseVal + 3).toString() + ' AND dice.multiplier = $' + (baseVal + 4).toString();
                            sql += ' AND dice.divisor = $' + (baseVal + 5).toString() + ')';
                            addComma = true;
                            vals.push(resObj.objectArray[e].dieCount);
                            vals.push(resObj.objectArray[e].dieType);
                            vals.push(resObj.objectArray[e].modifier);
                            vals.push(resObj.objectArray[e].multiplier);
                            vals.push(resObj.objectArray[e].divisor);
                        }
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            for (let w = 0; w < resObj.objectArray.length; w++) {
                                resObj.objectArray[w] = common.datatypes.dice.getObject(results, resObj.objectArray[w]);
                            }
                            return callback(null, resObj.objectArray);
                        });
                    }
                ], function(error, result) {
                    done();
                    if (error) {
                        console.error(error);
                    }
                    return cb(result);
                });
            });
        },
        proficiencies: function (referenceObj, cb) {
            pool.connect(function(err, client, done) {
                async.waterfall([
                    function init(callback) {
                        stepInt = 0;
                        let resObj = {};
                        resObj.proficiencies = referenceObj.proficiencies;
                        resObj.permissions = {};
                        return callback(null, resObj);
                    },
                    function insertDiceTable(resObj, callback) {
                        console.log('manage-proficiencies-' + stepInt.toString());
                        stepInt++;
                        vals = [];
                        results = [];
                        addComma = false;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            return callback(null, resObj);
                        });
                    }
                ], function(error, result) {
                    done();
                    if (error) {
                        console.error(error);
                    }
                    return cb(result);
                });
            });
        }
    },
    remove: {
        
    },
    _templates: {
        _manage: function(referenceArray, referenceId, cb) {
            pool.connect(function(err, client, done) {
                /*if (err) {
                    done();
                    console.error(err);
                    return res.status(500).json({ success: false, data: err});
                }*/
                async.waterfall([
                    function init(callback) {
                        let resObj = {};
                        resObj.objectArray = referenceArray;
                        resObj.referenceId = referenceId;
                        resObj.permissions = {};
                        return callback(null, resObj);
                    },
                    function insertCoreTable(resObj, callback) {
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'INSERT INTO table';
                        sql += ' ("col", "col")';
                        sql += ' VALUES ';
                        parameterArray = common.parameterArray.resetValues(2);
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (addComma) {
                                sql += ', ';
                            }
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.objectArray[e]);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        sql += ' returning id';
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            for (let e = 0; e < results.length; e++) {
                                for (let w = 0; w < resObj.objectArray.length; w++) {
                                    if (resObj.objectArray[w].title == results[e].title) {
                                        resObj.objectArray[w].id = results[e].chartId;
                                    }
                                }
                            }
                            return callback(null, resObj);
                        });
                    }
                ], function(error, result) {
                    if (error) {
                        console.error(error);
                    }
                    return cb(result);
                });
            });
        },
        _remove: function(referenceId, cb) {
            pool.connect(function(err, client, done) {
                /*if (err) {
                    done();
                    console.error(err);
                    return res.status(500).json({ success: false, data: err});
                }*/
                async.waterfall([
                    function init(callback) {
                        let refId = [referenceId];

                        callback(null, refId);
                    },
                    function deleteTable(refId, callback) {
                        sql = 'DELETE FROM table';
                        sql += ' WHERE "column" = $1';
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();

                            return callback(null, refId);
                        });
                    }
                ], function(error, result) {
                    if (error) {
                        console.error(error);
                    }
                    return cb(result);
                });
            });
        }
    }
};

module.exports = common;