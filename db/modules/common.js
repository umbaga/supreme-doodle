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
        },
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
                        console.log('manage-dice-01');
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
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            return callback(null, resObj);
                        });
                    },
                    function assignDiceIds(resObj, callback) {
                        console.log('manage-dice-02');
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
        }
    },
    insert: {
        assignedEquipment: function (referenceObj, cb) {
            pool.connect(function(err, client, done) {
                async.waterfall([
                    function init(callback) {
                        let resObj = {};
                        resObj.refId = referenceObj.id;
                        resObj.resourceId = 0;
                        resObj.assignedEquipment = referenceObj.assigned;
                        resObj.permissions = {};
                        resObj.permissions.has = {};
                        resObj.permissions.has.trinkets = false;
                        if (resObj.assignedEquipment && resObj.assignedEquipment.length != 0) {
                            for (let q = 0; q < resObj.assignedEquipment.length; q++) {
                                if (resObj.assignedEquipment[q].id <= 0 || resObj.assignedEquipment[q].category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.TRINKET) {
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
                        console.log('insert-assignedEquipment-01');
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
                            let query = client.query(new pg.Query(sql, vals));
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
                        console.log('insert-assignedEquipment-02');
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
                            let query = client.query(new pg.Query(sql, vals));
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
                        console.log('insert-assignedEquipment-03');
                        if (resObj.permissions.has.assigned || resObj.permissions.has.category || resObj.permissions.has.list) {
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
                                vals.push(resObj.refId);
                                vals.push(resObj.assignedEquipment[q].id);
                                vals.push(itemtypes.TYPE.LINK.ASSIGNED_EQUIPMENT);
                                addComma = true;
                                counter++;
                            }
                            sql += ' RETURNING id, "targetId", "typeId"';
                            let query = client.query(new pg.Query(sql, vals));
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
                        } else {
                            return callback(null, resObj);
                        }
                        
                    },
                    function insertLinkCountTable(resObj, callback) {
                        console.log('insert-assignedEquipment-04');
                        if (resObj.permissions.has.category || resObj.permissions.has.list) {
                            vals = [];
                            results = [];
                            addComma = false;
                            counter = 0;
                            sql = 'INSERT INTO adm_link_count';
                            sql += ' ("linkId", "count")';
                            sql += ' VALUES ';
                            for (let q = 0; q < resObj.assignedEquipment.length; q++) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 2);
                                vals.push(resObj.assignedEquipment[q].linkId);
                                vals.push(resObj.assignedEquipment[q].assigned);
                                addComma = true;
                                counter++;
                            }
                            let query = client.query(new pg.Query(sql, vals));
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
        feature: function(referenceObj, cb) {
            pool.connect(function(err, client, done) {
                async.waterfall([
                    function init(callback) {
                        stepInt = 0;
                        let resObj = {};
                        resObj.refId = referenceObj.id;
                        resObj.resourceId = referenceObj.resource.id;
                        resObj.feature = referenceObj.feature;
                        resObj.permissions = {};
                        resObj.permissions.has = {};
                        return callback(null, resObj);
                    },
                    function itemTable(resObj, callback) {
                        console.log('insert-feature-01');
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
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            resObj.feature.id = results[0].id;
                            return callback(null, resObj);
                        });
                    },
                    function descriptionTable(resObj, callback) {
                        console.log('insert-feature-02');
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
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            resObj.feature.descriptionId = results[0].id;
                            return callback(null, resObj);
                        });
                    },
                    function linkTable(resObj, callback) {
                        console.log('insert-feature-03');
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
                        vals.push(resObj.refId);
                        vals.push(resObj.feature.id);
                        vals.push(itemtypes.TYPE.LINK.FEATURE);
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
        },
        proficiencies: function (referenceObj, cb) {
            pool.connect(function(err, client, done) {
                async.waterfall([
                    function init(callback) {
                        let resObj = {};
                        resObj.refId = referenceObj.id;
                        resObj.proficiencies = referenceObj.proficiencies;
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
                        console.log('insert-proficiencies-01');
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
                            let query = client.query(new pg.Query(sql, vals));
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
                        console.log('insert-proficiencies-02');
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
                                    vals.push(resObj.refId);
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
                                    vals.push(resObj.refId);
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
                                    vals.push(resObj.refId);
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
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                for (let q = 0; q < results.length; q++) {
                                    if (resObj.proficiencies.select.category.length != 0) {
                                        for (let w = 0; w < resObj.proficiencies.select.category.length; w++) {
                                            if (results[q].typeId == itemtypes.TYPE.LINK.PROFICIENCY.SELECT.CATEGORY) {
                                                resObj.proficiencies.select.category[w].linkId = results[q].id;
                                            }
                                        }
                                    }
                                    if (resObj.proficiencies.select.list.length != 0) {
                                        for (let w = 0; w < resObj.proficiencies.select.list.length; w++) {
                                            if (results[q].typeId == itemtypes.TYPE.LINK.PROFICIENCY.SELECT.LIST) {
                                                resObj.proficiencies.select.list[w].linkId = results[q].id;
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
                        console.log('insert-proficiencies-03');
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
                            let query = client.query(new pg.Query(sql, vals));
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