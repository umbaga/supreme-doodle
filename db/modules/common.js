/* eslint no-console: 0 */

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
let counter = 0;
let query = null;

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
    get: {
        entryDatatypeFromColumn: function(entry, columns) {
            for (let a = 0; a < columns.length; a++) {
                if (entry.columnIndex == columns[a].columnIndex) {
                    return columns[a].dataType.id;
                }
            }
            return 0;
        }
    },
    parameterArray: {
        getParameterString(startingValue, parameterCount) {
            let retVal = '(';
            for (let q = 1; q <= parameterCount; q++) {
                retVal += (q != 1) ? ', ' : '';
                retVal += '$' + ((startingValue * parameterCount) + q).toString();
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
                        console.log('x-manage-dice-01');
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
                        sql += ' returning id AS "diceId"';
                        query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            return callback(null, resObj);
                        });
                    },
                    function assignDiceIds(resObj, callback) {
                        console.log('x-manage-dice-02');
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
                        query = client.query(new pg.Query(sql, vals));
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
        }
    },
    insert: {
        assignedEquipment: function (referenceObj, parentObj, cb) {
            pool.connect(function(err, client, done) {
                async.waterfall([
                    function init(callback) {
                        let resObj = {};
                        resObj.referenceId = parentObj.id;
                        resObj.resourceId = (parentObj.resource && parentObj.resource.id) ? parentObj.resource.id : 0;
                        resObj.assignedEquipment = referenceObj;
                        resObj.permissions = {};
                        resObj.permissions.has = {};
                        resObj.permissions.has.trinkets = false;
                        if (resObj.assignedEquipment && resObj.assignedEquipment.length != 0) {
                            for (let q = 0; q < resObj.assignedEquipment.length; q++) {
                                if (resObj.assignedEquipment[q].id <= 0 && resObj.assignedEquipment[q].category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.TRINKET) {
                                    resObj.assignedEquipment[q].isNewTrinket = true;
                                    resObj.permissions.has.trinkets = true;
                                } else {
                                    resObj.assignedEquipment[q].isNewTrinket = false;
                                }
                            }
                        }
                        return callback(null, resObj);
                    },
                    function insertItemTableForTrinkets(resObj, callback) {
                        console.log('x-insert-assignedEquipment-01');
                        if (resObj.permissions.has.trinkets) {
                            vals = [];
                            results = [];
                            addComma = false;
                            counter = 0;
                            sql = 'INSERT INTO adm_core_item';
                            sql += ' ("itemName", "typeId", "resourceId")';
                            sql += ' VALUES ';
                            for (let q = 0; q < resObj.assignedEquipment.length; q++) {
                                if (resObj.assignedEquipment[q].isNewTrinket) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 3);
                                    vals.push(resObj.assignedEquipment[q].name);
                                    vals.push(itemtypes.TYPE.ITEM.EQUIPMENT);
                                    vals.push(resObj.resourceId);
                                    addComma = true;
                                    counter++;
                                }
                            }
                            sql += ' RETURNING id, "itemName" AS "name"';
                            query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                for (let q = 0; q < results.length; q++) {
                                    for (let w = 0; w < resObj.assignedEquipment.length; w++) {
                                        if (results[q].name == resObj.assignedEquipment[w].name) {
                                            resObj.assignedEquipment[w].id = results[q].id;
                                        }
                                    }
                                }
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertEquipmentTableForTrinkets(resObj, callback) {
                        console.log('x-insert-assignedEquipment-02');
                        if (resObj.permissions.has.trinkets) {
                            vals = [];
                            results = [];
                            addComma = false;
                            counter = 0;
                            sql = 'INSERT INTO adm_def_equipment';
                            sql += ' ("equipmentId", "cost", "weight", "categoryId", "isMagicItem")';
                            sql += ' VALUES ';
                            for (let q = 0; q < resObj.assignedEquipment.length; q++) {
                                if (resObj.assignedEquipment[q].isNewTrinket) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 5);
                                    vals.push(resObj.assignedEquipment[q].id);
                                    vals.push(0);
                                    vals.push(0);
                                    vals.push(itemtypes.TYPE.EQUIPMENT_CATEGORY.TRINKET);
                                    vals.push(false);
                                    addComma = true;
                                    counter++;
                                }
                            }
                            query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                for (let q = 0; q < results.length; q++) {
                                    for (let w = 0; w < resObj.assignedEquipment.length; w++) {
                                        if (results[q].name == resObj.assignedEquipment[w].name) {
                                            resObj.assignedEquipment[w].id = results[q].id;
                                        }
                                    }
                                }
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertLinkTable(resObj, callback) {
                        console.log('x-insert-assignedEquipment-03');
                        vals = [];
                        results = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_link';
                        sql += ' ("referenceId", "targetId", "typeId")';
                        sql += ' VALUES ';
                        for (let q = 0; q < resObj.assignedEquipment.length; q++) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 3);
                            vals.push(resObj.referenceId);
                            vals.push(resObj.assignedEquipment[q].id);
                            vals.push(itemtypes.TYPE.LINK.ASSIGNED_EQUIPMENT);
                            addComma = true;
                            counter++;
                        }
                        sql += ' RETURNING id, "targetId", "typeId"';
                        query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            for (let q = 0; q < results.length; q++) {
                                for (let w = 0; w < resObj.assignedEquipment.length; w++) {
                                    if (results[q].targetId == resObj.assignedEquipment[w].id) {
                                        resObj.assignedEquipment[w].linkId = results[q].id;
                                    }
                                }
                            }
                            return callback(null, resObj);
                        });
                    },
                    function insertLinkCountTable(resObj, callback) {
                        console.log('x-insert-assignedEquipment-04');
                        vals = [];
                        results = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_link_count';
                        sql += ' ("linkId", "count")';
                        sql += ' VALUES ';
                        for (let q = 0; q < resObj.assignedEquipment.length; q++) {
                            console.log(resObj.assignedEquipment[q]);
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 2);
                            vals.push(resObj.assignedEquipment[q].linkId);
                            vals.push((resObj.assignedEquipment[q].assigned && resObj.assignedEquipment[q].assigned != 0) ? resObj.assignedEquipment[q].assigned : 1);
                            addComma = true;
                            counter++;
                        }
                        query = client.query(new pg.Query(sql, vals));
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
        },
        charts: function (referenceObj, parentObj, cb) {
            pool.connect(function(err, client, done) {
                async.waterfall([
                    function init(callback) {
                        let resObj = {};
                        resObj.referenceId = parentObj.id;
                        resObj.resourceId = (parentObj.resource && parentObj.resource.id) ? parentObj.resource.id : 0;
                        resObj.charts = referenceObj;
                        resObj.permissions = {};
                        resObj.permissions.need = {};
                        resObj.permissions.need.dice = false;
                        for (let q = 0; q < resObj.charts.length; q++) {
                            if (resObj.charts[q].type.id == itemtypes.TYPE.CHART.DICE) {
                                resObj.permissions.need.dice = true;
                            }
                        }
                        return callback(null, resObj);
                    },
                    function insertCoreTable(resObj, callback) {
                        console.log('x-insert-charts-01');
                        vals = [];
                        results = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_core_chart';
                        sql += ' ("typeId", "columnCount", "rowCount")';
                        sql += ' VALUES ';
                        for (let q = 0; q < resObj.charts.length; q++) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 3);
                            vals.push(resObj.charts[q].type.id);
                            vals.push(resObj.charts[q].columnCount);
                            vals.push(resObj.charts[q].rowCount);
                            addComma = true;
                            counter++;
                        }
                        sql += ' RETURNING id, "typeId"';
                        query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            for (let q = 0; q < results.length; q++) {
                                for (let w = 0; w < resObj.charts.length; w++) {
                                    if (results[q].typeId == resObj.charts[w].type.id) {
                                        if (!resObj.charts[w].id || resObj.charts[w].id <= 0) {
                                            resObj.charts[w].id = results[q].id;
                                            break;
                                        }
                                    }
                                }
                            }
                            return callback(null, resObj);
                        });
                    },
                    function manageDice(resObj, callback) {
                        console.log('x-insert-charts-02');
                        results = [];
                        if (resObj.permissions.need.dice) {
                            let diceArr = [];
                            for (let q = 0; q < resObj.charts.length; q++) {
                                if (resObj.charts[q].type.id == itemtypes.TYPE.CHART.DICE) {
                                    diceArr.push(resObj.charts[q].dice);
                                }
                            }
                            common.manage.dice(diceArr, function(results) {
                                for (let q = 0; q < resObj.charts.length; q++) {
                                    if (resObj.charts[q].type.id == itemtypes.TYPE.CHART.DICE) {
                                        resObj.charts[q].dice = common.datatypes.dice.getObject(results, resObj.charts[q].dice);
                                    }
                                }
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertDescriptionTable(resObj, callback) {
                        console.log('x-insert-charts-03');
                        vals = [];
                        results = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_core_description';
                        sql += ' ("description", "typeId")';
                        sql += ' VALUES ';
                        for (let q = 0; q < resObj.charts.length; q++) {
                            if (resObj.charts[q].description && resObj.charts[q].description.length != 0) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 2);
                                vals.push(resObj.charts[q].description);
                                vals.push(itemtypes.TYPE.DESCRIPTION.GENERAL);
                                addComma = true;
                                counter++;
                            }
                            if (resObj.charts[q].title && resObj.charts[q].title.length != 0) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 2);
                                vals.push(resObj.charts[q].title);
                                vals.push(itemtypes.TYPE.DESCRIPTION.CHART_TEXT);
                                addComma = true;
                                counter++;
                            }
                            for (let w = 0; w < resObj.charts[q].columns.length; w++) {
                                if (resObj.charts[q].columns[w].text && resObj.charts[q].columns[w].text.length != 0) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 2);
                                    vals.push(resObj.charts[q].columns[w].text);
                                    vals.push(itemtypes.TYPE.DESCRIPTION.CHART_TEXT);
                                    addComma = true;
                                    counter++;
                                }
                            }
                            for (let w = 0; w < resObj.charts[q].entries.length; w++) {
                                if (resObj.charts[q].entries[w].text && resObj.charts[q].entries[w].text.length != 0) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 2);
                                    vals.push(resObj.charts[q].entries[w].text);
                                    vals.push(itemtypes.TYPE.DESCRIPTION.CHART_TEXT);
                                    addComma = true;
                                    counter++;
                                }
                            }
                            for (let w = 0; w < resObj.charts[q].rows.length; w++) {
                                if (resObj.charts[q].rows[w].text && resObj.charts[q].rows[w].text.length != 0) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 2);
                                    vals.push(resObj.charts[q].rows[w].text);
                                    vals.push(itemtypes.TYPE.DESCRIPTION.CHART_TEXT);
                                    addComma = true;
                                    counter++;
                                }
                            }
                        }
                        sql += ' RETURNING id, "description", "typeId"';
                        if (addComma) {
                            query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                for (let q = 0; q < results.length; q++) {
                                    for (let w = 0; w < resObj.charts.length; w++) {
                                        if (results[q].typeId == itemtypes.TYPE.DESCRIPTION.GENERAL) {
                                            if (results[q].description == resObj.charts[w].description) {
                                                resObj.charts[w].descriptionId = results[q].id;
                                            }
                                        } else if (results[q].typeId == itemtypes.TYPE.DESCRIPTION.CHART_TEXT) {
                                            if (results[q].description == resObj.charts[w].title) {
                                                resObj.charts[w].titleId = results[q].id;
                                            }
                                            for (let e = 0; e < resObj.charts[w].columns.length; e++) {
                                                if (results[q].description == resObj.charts[w].columns[e].text) {
                                                    resObj.charts[w].columns[e].textId = results[q].id;
                                                }
                                            }
                                            for (let e = 0; e < resObj.charts[w].entries.length; e++) {
                                                if (results[q].description == resObj.charts[w].entries[e].text) {
                                                    resObj.charts[w].entries[e].textId = results[q].id;
                                                }
                                            }
                                            for (let e = 0; e < resObj.charts[w].rows.length; e++) {
                                                if (results[q].description == resObj.charts[w].rows[e].text) {
                                                    resObj.charts[w].rows[e].textId = results[q].id;
                                                }
                                            }
                                        }
                                    }
                                }
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertColumnTable(resObj, callback) {
                        console.log('x-insert-charts-04');
                        vals = [];
                        results = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_def_chart_column';
                        sql += ' ("chartId", "columnIndex", "dataTypeId")';
                        sql += ' VALUES ';
                        for (let q = 0; q < resObj.charts.length; q++) {
                            for (let w = 0; w < resObj.charts[q].columns.length; w++) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 3);
                                vals.push(resObj.charts[q].id);
                                vals.push(resObj.charts[q].columns[w].columnIndex);
                                vals.push(resObj.charts[q].columns[w].dataType.id);
                                addComma = true;
                                counter++;
                            }
                        }
                        sql += ' RETURNING id, "chartId", "columnIndex"';
                        if (addComma) {
                            query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                for (let q = 0; q < results.length; q++) {
                                    for (let w = 0; w < resObj.charts.length; w++) {
                                        for (let e = 0; e < resObj.charts[w].columns.length; e++) {
                                            if (results[q].chartId == resObj.charts[w].id && results[q].columnIndex == resObj.charts[w].columns[e].columnIndex) {
                                                resObj.charts[w].columns[e].id = results[q].id;
                                            }
                                        }
                                    }
                                }
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertRowTable(resObj, callback) {
                        console.log('x-insert-charts-05');
                        vals = [];
                        results = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_def_chart_row';
                        sql += ' ("chartId", "rowIndex")';
                        sql += ' VALUES ';
                        for (let q = 0; q < resObj.charts.length; q++) {
                            for (let w = 0; w < resObj.charts[q].rows.length; w++) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 2);
                                vals.push(resObj.charts[q].id);
                                vals.push(resObj.charts[q].rows[w].rowIndex);
                                addComma = true;
                                counter++;
                            }
                        }
                        sql += ' RETURNING id, "chartId", "rowIndex"';
                        if (addComma) {
                            query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                for (let q = 0; q < results.length; q++) {
                                    for (let w = 0; w < resObj.charts.length; w++) {
                                        for (let e = 0; e < resObj.charts[w].rows.length; e++) {
                                            if (results[q].chartId == resObj.charts[w].id && results[q].rowIndex == resObj.charts[w].rows[e].rowIndex) {
                                                resObj.charts[w].rows[e].id = results[q].id;
                                            }
                                        }
                                    }
                                }
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertEntryTable(resObj, callback) {
                        console.log('x-insert-charts-06');
                        vals = [];
                        results = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_def_chart_entry';
                        sql += ' ("chartId", "columnIndex", "rowIndex")';
                        sql += ' VALUES ';
                        for (let q = 0; q < resObj.charts.length; q++) {
                            for (let w = 0; w < resObj.charts[q].entries.length; w++) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 3);
                                vals.push(resObj.charts[q].id);
                                vals.push(resObj.charts[q].entries[w].columnIndex);
                                vals.push(resObj.charts[q].entries[w].rowIndex);
                                addComma = true;
                                counter++;
                            }
                        }
                        sql += ' RETURNING id, "chartId", "columnIndex", "rowIndex"';
                        if (addComma) {
                            query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                for (let q = 0; q < results.length; q++) {
                                    for (let w = 0; w < resObj.charts.length; w++) {
                                        for (let e = 0; e < resObj.charts[w].entries.length; e++) {
                                            if (results[q].chartId == resObj.charts[w].id && results[q].columnIndex == resObj.charts[w].entries[e].columnIndex && results[q].rowIndex == resObj.charts[w].entries[e].rowIndex) {
                                                resObj.charts[w].entries[e].id = results[q].id;
                                            }
                                        }
                                    }
                                }
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertLinkTable(resObj, callback) {
                        console.log('x-insert-charts-07');
                        vals = [];
                        results = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_link';
                        sql += ' ("referenceId", "targetId", "typeId")';
                        sql += ' VALUES ';
                        for (let q = 0; q < resObj.charts.length; q++) {
                            if (resObj.charts[q].descriptionId && resObj.charts[q].descriptionId != 0) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 3);
                                vals.push(resObj.charts[q].id);
                                vals.push(resObj.charts[q].descriptionId);
                                vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                                addComma = true;
                                counter++;
                            }
                            if (resObj.charts[q].titleId && resObj.charts[q].titleId != 0) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 3);
                                vals.push(resObj.charts[q].id);
                                vals.push(resObj.charts[q].titleId);
                                vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                                addComma = true;
                                counter++;
                            }
                            if (resObj.charts[q].dice && resObj.charts[q].dice.id && resObj.charts[q].dice.id != 0) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 3);
                                vals.push(resObj.charts[q].id);
                                vals.push(resObj.charts[q].dice.id);
                                vals.push(itemtypes.TYPE.LINK.CHART_RELATIONSHIP.DICE);
                                addComma = true;
                                counter++;
                            }
                            if (resObj.charts[q].picklist && resObj.charts[q].picklist.id && resObj.charts[q].picklist.id != 0) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 3);
                                vals.push(resObj.charts[q].id);
                                vals.push(resObj.charts[q].picklist.id);
                                vals.push(itemtypes.TYPE.LINK.CHART_RELATIONSHIP.PICKLIST);
                                addComma = true;
                                counter++;
                            }
                            for (let w = 0; w < resObj.charts[q].columns.length; w++) {
                                if (resObj.charts[q].columns[w].textId && resObj.charts[q].columns[w].textId != 0) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 3);
                                    vals.push(resObj.charts[q].columns[w].id);
                                    vals.push(resObj.charts[q].columns[w].textId);
                                    vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                                    addComma = true;
                                    counter++;
                                }
                                if (resObj.charts[q].columns[w].picklist && resObj.charts[q].columns[w].picklist.id && resObj.charts[q].columns[w].picklist.id != 0) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 3);
                                    vals.push(resObj.charts[q].columns[w].id);
                                    vals.push(resObj.charts[q].columns[w].picklist.id);
                                    vals.push(itemtypes.TYPE.LINK.CHART_RELATIONSHIP.PICKLIST);
                                    addComma = true;
                                    counter++;
                                }
                            }
                            for (let w = 0; w < resObj.charts[q].rows.length; w++) {
                                if (resObj.charts[q].rows[w].textId && resObj.charts[q].rows[w].textId != 0) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 3);
                                    vals.push(resObj.charts[q].rows[w].id);
                                    vals.push(resObj.charts[q].rows[w].textId);
                                    vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                                    addComma = true;
                                    counter++;
                                }
                                if (resObj.charts[q].rows[w].picklistItem && resObj.charts[q].rows[w].picklistItem.id && resObj.charts[q].rows[w].picklistItem.id != 0) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 3);
                                    vals.push(resObj.charts[q].rows[w].id);
                                    vals.push(resObj.charts[q].rows[w].picklistItem.id);
                                    vals.push(itemtypes.TYPE.LINK.CHART_RELATIONSHIP.PICKLIST_ITEM);
                                    addComma = true;
                                    counter++;
                                }
                                if (resObj.charts[q].rows[w].diceRange && resObj.charts[q].rows[w].diceRange.minimum && resObj.charts[q].rows[w].diceRange.minimum != 0) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 3);
                                    vals.push(resObj.charts[q].rows[w].id);
                                    vals.push(0);
                                    vals.push(itemtypes.TYPE.LINK.CHART_RELATIONSHIP.VALUE.DICE_RANGE);
                                    addComma = true;
                                    counter++;
                                }
                            }
                            for (let w = 0; w < resObj.charts[q].entries.length; w++) {
                                if (resObj.charts[q].entries[w].textId && resObj.charts[q].entries[w].textId != 0) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 3);
                                    vals.push(resObj.charts[q].entries[w].id);
                                    vals.push(resObj.charts[q].entries[w].textId);
                                    vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                                    addComma = true;
                                    counter++;
                                }
                                if (resObj.charts[q].entries[w].dice && resObj.charts[q].entries[w].dice.id && resObj.charts[q].entries[w].dice.id != 0) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 3);
                                    vals.push(resObj.charts[q].entries[w].id);
                                    vals.push(resObj.charts[q].entries[w].dice.id);
                                    vals.push(itemtypes.TYPE.LINK.CHART_RELATIONSHIP.DICE);
                                    addComma = true;
                                    counter++;
                                }
                                if (resObj.charts[q].entries[w].picklistItem && resObj.charts[q].entries[w].picklistItem.id && resObj.charts[q].entries[w].picklistItem.id != 0) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 3);
                                    vals.push(resObj.charts[q].entries[w].id);
                                    vals.push(resObj.charts[q].entries[w].picklistItem.id);
                                    vals.push(itemtypes.TYPE.LINK.CHART_RELATIONSHIP.PICKLIST_ITEM);
                                    addComma = true;
                                    counter++;
                                }
                                if (common.get.entryDatatypeFromColumn(resObj.charts[q].entries[w], resObj.charts[q].columns) == itemtypes.TYPE.DATA_TYPE.BOOL) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 3);
                                    vals.push(resObj.charts[q].entries[w].id);
                                    vals.push(0);
                                    vals.push(itemtypes.TYPE.LINK.CHART_RELATIONSHIP.VALUE.BOOL);
                                    addComma = true;
                                    counter++;
                                } else if (common.get.entryDatatypeFromColumn(resObj.charts[q].entries[w], resObj.charts[q].columns) == itemtypes.TYPE.DATA_TYPE.NUMBER) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 3);
                                    vals.push(resObj.charts[q].entries[w].id);
                                    vals.push(resObj.charts[q].entries[w].numberValue);
                                    vals.push(itemtypes.TYPE.LINK.CHART_RELATIONSHIP.VALUE.NUMBER);
                                    addComma = true;
                                    counter++;
                                }
                            }
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 3);
                            vals.push(resObj.referenceId);
                            vals.push(resObj.charts[q].id);
                            vals.push(itemtypes.TYPE.LINK.CHART);
                            addComma = true;
                            counter++;
                        }
                        sql += ' RETURNING id, "referenceId", "targetId", "typeId"';
                        if (addComma) {
                            query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                for (let q = 0; q < results.length; q++) {
                                    for (let w = 0; w < resObj.charts.length; w++) {
                                        if (results[q].targetId == resObj.charts[w].id) {
                                            resObj.charts[w].linkId = results[q].id;
                                        }
                                        for (let e = 0; e < resObj.charts[w].entries.length; e++) {
                                            if (results[q].referenceId == resObj.charts[w].entries[e].id) {
                                                resObj.charts[w].entries[e].linkId = results[q].id;
                                            }
                                        }
                                        for (let e = 0; e < resObj.charts[w].rows.length; e++) {
                                            if (results[q].referenceId == resObj.charts[w].rows[e].id) {
                                                resObj.charts[w].rows[e].linkId = results[q].id;
                                            }
                                        }
                                    }
                                }
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertLinkValueBoolTable(resObj, callback) {
                        console.log('x-insert-charts-08');
                        vals = [];
                        results = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_link_value_bool';
                        sql += ' ("linkId", "boolValue")';
                        sql += ' VALUES ';
                        for (let q = 0; q < resObj.charts.length; q++) {
                            for (let w = 0; w < resObj.charts[q].entries.length; w++) {
                                if (common.get.entryDatatypeFromColumn(resObj.charts[q].entries[w], resObj.charts[q].columns) == itemtypes.TYPE.DATA_TYPE.BOOL) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 2);
                                    vals.push(resObj.charts[q].entries[w].linkId);
                                    vals.push(resObj.charts[q].entries[w].boolValue);
                                    addComma = true;
                                    counter++;
                                }
                            }
                        }
                        if (addComma) {
                            query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertLinkValueNumberTable(resObj, callback) {
                        console.log('x-insert-charts-09');
                        vals = [];
                        results = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_link_value_number';
                        sql += ' ("linkId", "numberValue")';
                        sql += ' VALUES ';
                        for (let q = 0; q < resObj.charts.length; q++) {
                            for (let w = 0; w < resObj.charts[q].entries.length; w++) {
                                if (common.get.entryDatatypeFromColumn(resObj.charts[q].entries[w], resObj.charts[q].columns) == itemtypes.TYPE.DATA_TYPE.NUMBER) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 2);
                                    vals.push(resObj.charts[q].entries[w].linkId);
                                    vals.push(resObj.charts[q].entries[w].numberValue);
                                    addComma = true;
                                    counter++;
                                }
                            }
                        }
                        if (addComma) {
                            query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertLinkValueNumberRangeTable(resObj, callback) {
                        console.log('x-insert-charts-10');
                        vals = [];
                        results = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_link_value_number_range';
                        sql += ' ("linkId", "minimum", "maximum")';
                        sql += ' VALUES ';
                        for (let q = 0; q < resObj.charts.length; q++) {
                            for (let w = 0; w < resObj.charts[q].rows.length; w++) {
                                if (resObj.charts[q].rows[w].diceRange && resObj.charts[q].rows[w].diceRange.minimum && resObj.charts[q].rows[w].diceRange.minimum != 0) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 3);
                                    vals.push(resObj.charts[q].rows[w].linkId);
                                    vals.push(resObj.charts[q].rows[w].diceRange.minimum);
                                    vals.push(resObj.charts[q].rows[w].diceRange.maximum);
                                    addComma = true;
                                    counter++;
                                }
                            }
                        }
                        if (addComma) {
                            query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertLinkOrderTable(resObj, callback) {
                        console.log('x-insert-charts-11');
                        vals = [];
                        results = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_link_order';
                        sql += ' ("linkId", "orderIndex")';
                        sql += ' VALUES ';
                        for (let q = 0; q < resObj.charts.length; q++) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 2);
                            vals.push(resObj.charts[q].linkId);
                            vals.push(resObj.charts[q].orderIndex);
                            console.log(resObj.charts[q].linkId + ' - ' + resObj.charts[q].orderIndex);
                            addComma = true;
                            counter++;
                        }
                        if (addComma) {
                            query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
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
        feature: function(referenceObj, parentObj, cb) {
            pool.connect(function(err, client, done) {
                async.waterfall([
                    function init(callback) {
                        stepInt = 0;
                        let resObj = {};
                        resObj.referenceId = parentObj.id;
                        resObj.resourceId = (parentObj.resource && parentObj.resource.id) ? parentObj.resource.id : 0;
                        resObj.feature = referenceObj;
                        resObj.permissions = {};
                        resObj.permissions.has = {};
                        return callback(null, resObj);
                    },
                    function itemTable(resObj, callback) {
                        console.log('x-insert-feature-01');
                        vals = [];
                        results = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_core_item';
                        sql += ' ("itemName", "typeId", "resourceId")';
                        sql += ' VALUES ';
                        sql += ' ($1, $2, $3)';
                        sql += ' RETURNING id, "itemName" AS "name"';
                        vals.push(resObj.feature.name);
                        vals.push(itemtypes.TYPE.ITEM.FEATURE);
                        vals.push(resObj.resourceId);
                        query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            resObj.feature.id = results[0].id;
                            return callback(null, resObj);
                        });
                    },
                    function descriptionTable(resObj, callback) {
                        console.log('x-insert-feature-02');
                        vals = [];
                        results = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_core_description';
                        sql += ' ("description", "typeId")';
                        sql += ' VALUES ';
                        sql += ' ($1, $2) ';
                        sql += ' RETURNING id';
                        vals.push(resObj.feature.description);
                        vals.push(itemtypes.TYPE.DESCRIPTION.GENERAL);
                        query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            resObj.feature.descriptionId = results[0].id;
                            return callback(null, resObj);
                        });
                    },
                    function linkTable(resObj, callback) {
                        console.log('x-insert-feature-03');
                        vals = [];
                        results = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_link';
                        sql += ' ("referenceId", "targetId", "typeId")';
                        sql += ' VALUES ';
                        sql += ' ($1, $2, $3) ';
                        sql += ', ($4, $5, $6) ';
                        vals.push(resObj.feature.id);
                        vals.push(resObj.feature.descriptionId);
                        vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                        vals.push(resObj.referenceId);
                        vals.push(resObj.feature.id);
                        vals.push(itemtypes.TYPE.LINK.FEATURE);
                        query = client.query(new pg.Query(sql, vals));
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
        },
        proficiencies: function (referenceObj, parentObj, cb) {
            pool.connect(function(err, client, done) {
                async.waterfall([
                    function init(callback) {
                        let resObj = {};
                        resObj.referenceId = parentObj.id;
                        resObj.proficiencies = referenceObj;
                        resObj.permissions = {};
                        resObj.permissions.has = {};
                        resObj.permissions.has.assigned = false;
                        resObj.permissions.has.category = false;
                        resObj.permissions.has.list = false;
                        if (resObj.proficiencies.assigned && resObj.proficiencies.assigned.length != 0) {
                            resObj.permissions.has.assigned = true;
                        }
                        if (resObj.proficiencies.select) {
                            if (resObj.proficiencies.select.category && resObj.proficiencies.select.category.length != 0) {
                                resObj.permissions.has.category = true;
                            }
                            if (resObj.proficiencies.select.list && resObj.proficiencies.select.list.length != 0) {
                                resObj.permissions.has.list = true;
                            }
                        }
                        return callback(null, resObj);
                    },
                    function insertListTable(resObj, callback) {
                        console.log('x-insert-proficiencies-01');
                        if (resObj.permissions.has.list) {
                            vals = [];
                            results = [];
                            addComma = false;
                            sql = 'INSERT INTO adm_core_list';
                            sql += ' ("id") VALUES ';
                            for (let q = 0; q < resObj.proficiencies.select.list.length; q++) {
                                sql += addComma ? ', ' : '';
                                sql += '(nextval(\'adm_seq_core\'))';
                                addComma = true;
                            }
                            sql += ' RETURNING id';
                            query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                for (let q = 0; q < results.length; q++) {
                                    resObj.proficiencies.select.list[q].listId = results[q].id;
                                }
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertLinkTable(resObj, callback) {
                        console.log('x-insert-proficiencies-02');
                        if (resObj.permissions.has.assigned || resObj.permissions.has.category || resObj.permissions.has.list) {
                            vals = [];
                            results = [];
                            addComma = false;
                            counter = 0;
                            sql = 'INSERT INTO adm_link';
                            sql += ' ("referenceId", "targetId", "typeId")';
                            sql += ' VALUES ';
                            if (resObj.permissions.has.assigned) {
                                for (let q = 0; q < resObj.proficiencies.assigned.length; q++) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 3);
                                    vals.push(resObj.referenceId);
                                    vals.push(resObj.proficiencies.assigned[q].id);
                                    vals.push(itemtypes.TYPE.LINK.PROFICIENCY.ASSIGNED);
                                    addComma = true;
                                    counter++;
                                }
                            }
                            if (resObj.permissions.has.category) {
                                for (let q = 0; q < resObj.proficiencies.select.category.length; q++) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 3);
                                    vals.push(resObj.referenceId);
                                    vals.push(resObj.proficiencies.select.category[q].id);
                                    vals.push(itemtypes.TYPE.LINK.PROFICIENCY.SELECT.CATEGORY);
                                    addComma = true;
                                    counter++;
                                }
                            }
                            if (resObj.permissions.has.list) {
                                for (let q = 0; q < resObj.proficiencies.select.list.length; q++) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 3);
                                    vals.push(resObj.referenceId);
                                    vals.push(resObj.proficiencies.select.list[q].listId);
                                    vals.push(itemtypes.TYPE.LINK.PROFICIENCY.SELECT.LIST);
                                    addComma = true;
                                    counter++;
                                    for (let w = 0; w < resObj.proficiencies.select.list[q].proficiencies.length; w++) {
                                        sql += addComma ? ', ' : '';
                                        sql += common.parameterArray.getParameterString(counter, 3);
                                        vals.push(resObj.proficiencies.select.list[q].listId);
                                        vals.push(resObj.proficiencies.select.list[q].proficiencies[w].id);
                                        vals.push(itemtypes.TYPE.LINK.LIST.PROFICIENCY);
                                        addComma = true;
                                        counter++;
                                    }
                                }
                            }
                            sql += ' RETURNING id, "targetId", "typeId"';
                            query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                for (let q = 0; q < results.length; q++) {
                                    if (resObj.proficiencies.select.category.length != 0) {
                                        for (let w = 0; w < resObj.proficiencies.select.category.length; w++) {
                                            if (results[q].typeId == itemtypes.TYPE.LINK.PROFICIENCY.SELECT.CATEGORY) {
                                                if (results[q].targetId == resObj.proficiencies.select.category[w].id) {
                                                    resObj.proficiencies.select.category[w].linkId = results[q].id;
                                                }
                                            }
                                        }
                                    }
                                    if (resObj.proficiencies.select.list.length != 0) {
                                        for (let w = 0; w < resObj.proficiencies.select.list.length; w++) {
                                            if (results[q].typeId == itemtypes.TYPE.LINK.PROFICIENCY.SELECT.LIST) {
                                                if (results[q].targetId == resObj.proficiencies.select.list[w].listId) {
                                                    resObj.proficiencies.select.list[w].linkId = results[q].id;
                                                }
                                            }
                                        }
                                    }
                                }
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                        
                    },
                    function insertLinkCountTable(resObj, callback) {
                        console.log('x-insert-proficiencies-03');
                        if (resObj.permissions.has.category || resObj.permissions.has.list) {
                            vals = [];
                            results = [];
                            addComma = false;
                            counter = 0;
                            sql = 'INSERT INTO adm_link_count';
                            sql += ' ("linkId", "count")';
                            sql += ' VALUES ';
                            if (resObj.permissions.has.category) {
                                for (let q = 0; q < resObj.proficiencies.select.category.length; q++) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 2);
                                    vals.push(resObj.proficiencies.select.category[q].linkId);
                                    vals.push(resObj.proficiencies.select.category[q].count);
                                    addComma = true;
                                    counter++;
                                }
                            }
                            if (resObj.permissions.has.list) {
                                for (let q = 0; q < resObj.proficiencies.select.list.length; q++) {
                                    sql += addComma ? ', ' : '';
                                    sql += common.parameterArray.getParameterString(counter, 2);
                                    vals.push(resObj.proficiencies.select.list[q].linkId);
                                    vals.push(resObj.proficiencies.select.list[q].count);
                                    addComma = true;
                                    counter++;
                                }
                            }
                            query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                        
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
        
    }
};

module.exports = common;