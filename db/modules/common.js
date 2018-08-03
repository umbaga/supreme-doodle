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
        }
    },
    getObjects: {
        dice: function(referenceArray, cb) {
            pool.connect(function(err, client, done) {
                /*if (err) {
                    done();
                    console.error(err);
                    return cb.status(500).json({ success: false, data: err});
                }*/
                async.waterfall([
                    function init(callback) {
                        let resObj = {};
                        resObj.objectArray = referenceArray;
                        resObj.permissions = {};
                        return callback(null, resObj);
                    },
                    function insertDiceTable(resObj, callback) {
                        console.log('dice-01');
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
                            done();
                            return callback(null, resObj);
                        });
                    },
                    function assignDiceIds(resObj, callback) {
                        console.log('dice-02');
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
                            done();
                            for (let w = 0; w < resObj.objectArray.length; w++) {
                                resObj.objectArray[w] = common.datatypes.dice.getObject(results, resObj.objectArray[w]);
                            }
                            return callback(null, resObj.objectArray);
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
        empty: {
            dice: {
                id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 0, rendered: ''
            },
            item: {
                id: 0, name: ''
            }
        }
    },
    insert: {
        breathWeapons: function(referenceArray, referenceId, cb) {
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
                        resObj.permissions.hasChargeImprovement = false;
                        resObj.permissions.hasDamageImprovement = false;
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (resObj.objectArray[e].charges && resObj.objectArray[e].charges.improvement && resObj.objectArray[e].charges.improvement.length != 0) {
                                resObj.permissions.hasChargeImprovement = true;
                            }
                        }
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (resObj.objectArray[e].damage && resObj.objectArray[e].damage.improvement && resObj.objectArray[e].damage.improvement.length != 0) {
                                resObj.permissions.hasDamageImprovement = true;
                            }
                        }
                        return callback(null, resObj);
                    },
                    function manageDice(resObj, callback) {
                        console.log('breath-00');
                        let referenceArray = [];
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            referenceArray.push(resObj.objectArray[e].damage.dice);
                            if (resObj.objectArray[e].damage.improvement && resObj.objectArray[e].damage.improvement.length != 0) {
                                for (let w = 0; w < resObj.objectArray[e].damage.improvement.length; w++) {
                                    referenceArray.push(resObj.objectArray[e].damage.improvement[w].dice);
                                }
                            }
                        }
                        common.getObjects.dice(referenceArray, function(dice) {
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                resObj.objectArray[e].damage.dice = common.datatypes.dice.getObject(dice, resObj.objectArray[e].damage.dice);
                                if (resObj.objectArray[e].damage.improvement && resObj.objectArray[e].damage.improvement.length != 0) {
                                    for (let w = 0; w < resObj.objectArray[e].damage.improvement.length; w++) {
                                        resObj.objectArray[e].damage.improvement[w].dice = common.datatypes.dice.getObject(dice, resObj.objectArray[e].damage.improvement[w].dice);
                                    }
                                }
                            }
                            return callback(null, resObj);
                        });
                    },
                    function insertBreathWeaponTable(resObj, callback) {
                        console.log('breath-01');
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'INSERT INTO adm_link_breath_weapon';
                        sql += ' ("referenceId", "damageTypeId", "baseDamageDiceId", "range", "areaOfEffectId", "saveDCAbilityScoreId", "saveAbilityScoreId"';
                        sql += ', "orderIndex", "baseSaveDC", "saveDCProficiencyBonus", "chargeCount", "rechargeTypeId", "savingThrowEffectId")';
                        sql += ' VALUES ';
                        parameterArray = common.parameterArray.resetValues(13);
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (addComma) {
                                sql += ', ';
                            }
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.referenceId);
                            vals.push(resObj.objectArray[e].damage.type.id);
                            vals.push(resObj.objectArray[e].damage.dice.id);
                            vals.push(resObj.objectArray[e].range);
                            vals.push(resObj.objectArray[e].areaOfEffect.shape.id);
                            vals.push(resObj.objectArray[e].savingThrow.dc.abilityScore.id);
                            vals.push(resObj.objectArray[e].savingThrow.abilityScore.id);
                            vals.push(e);
                            vals.push(resObj.objectArray[e].savingThrow.dc.base);
                            vals.push(resObj.objectArray[e].savingThrow.dc.applyProficiencyBonus);
                            vals.push(resObj.objectArray[e].charges.count);
                            vals.push(resObj.objectArray[e].charges.rechargeType.id);
                            vals.push(resObj.objectArray[e].savingThrow.effect.id);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        sql += ' returning id, "orderIndex"';
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            for (let e = 0; e < results.length; e++) {
                                for (let w = 0; w < resObj.objectArray.length; w++) {
                                    if (resObj.objectArray[w].orderIndex == results[e].orderIndex) {
                                        resObj.objectArray[w].id = results[e].id;
                                    }
                                }
                            }
                            return callback(null, resObj);
                        });
                    },
                    function insertChargeIMprovement(resObj, callback) {
                        console.log('breath-02');
                        if (resObj.permissions.hasChargeImprovement) {
                            vals = [];
                            results = [];
                            addComma = false;
                            sql = 'INSERT INTO adm_link_breath_weapon_charges';
                            sql += ' ("referenceId", "orderIndex", "characterLevel", "chargeCount")';
                            sql += ' VALUES ';
                            parameterArray = common.parameterArray.resetValues(4);
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                for (let w = 0; w < resObj.objectArray[e].charges.improvement.length; w++) {
                                    if (addComma) {
                                        sql += ', ';
                                    }
                                    sql += common.parameterArray.sql(parameterArray);
                                    vals.push(resObj.referenceId);
                                    vals.push(e);
                                    vals.push(resObj.objectArray[e].charges.improvement[w].characterLevel);
                                    vals.push(resObj.objectArray[e].charges.improvement[w].count);
                                    addComma = true;
                                    parameterArray = common.parameterArray.incrementValues(parameterArray);
                                }
                            }
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                done();
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertDamageImprovement(resObj, callback) {
                        console.log('breath-03');
                        if (resObj.permissions.hasDamageImprovement) {
                            vals = [];
                            results = [];
                            addComma = false;
                            sql = 'INSERT INTO adm_link_breath_weapon_damage';
                            sql += ' ("referenceId", "orderIndex", "characterLevel", "damageDiceId")';
                            sql += ' VALUES ';
                            parameterArray = common.parameterArray.resetValues(4);
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                for (let w = 0; w < resObj.objectArray[e].damage.improvement.length; w++) {
                                    if (addComma) {
                                        sql += ', ';
                                    }
                                    sql += common.parameterArray.sql(parameterArray);
                                    vals.push(resObj.referenceId);
                                    vals.push(e);
                                    vals.push(resObj.objectArray[e].damage.improvement[w].characterLevel);
                                    vals.push(resObj.objectArray[e].damage.improvement[w].dice.id);
                                    addComma = true;
                                    parameterArray = common.parameterArray.incrementValues(parameterArray);
                                }
                            }
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                done();
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    }
                ], function(error, result) {
                    if (error) {
                        console.error(error);
                    }
                    return cb(result);
                });
            });
        },
        charts: function(referenceArray, referenceId, cb) {
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
                        resObj.permissions = {};
                        resObj.permissions.hasDieChart = false;
                        resObj.permissions.hasSelectionChart = false;
                        resObj.permissions.hasStandardChart = false;
                        resObj.permissions.hasMissingSelectionType = false;
                        resObj.permissions.hasDescriptions = false;
                        resObj.permissions.hasRowTitles = false;
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (resObj.objectArray[e].type.id == itemtypes.CHART.DIE_ROLL) {
                                resObj.permissions.hasDieChart = true;
                            }
                            if (resObj.objectArray[e].type.id == itemtypes.CHART.SELECTION) {
                                resObj.permissions.hasSelectionChart = true;
                                if (resObj.objectArray[e].selectionItemType.id <= 0) {
                                    resObj.permissions.hasMissingSelectionType = true;
                                }
                                for (let r = 0; r < resObj.objectArray[e].rows.length; r++) {
                                    if (resObj.objectArray[e].rows[r].title && resObj.objectArray[e].rows[r].title.length != 0) {
                                        resObj.permissions.hasRowTitles = true;
                                    } else if (resObj.objectArray[e].rows[r].selectionItem.id && resObj.objectArray[e].rows[r].selectionItem.id != 0) {
                                        resObj.permissions.hasRowTitles = true;
                                    }
                                }
                            }
                            if (resObj.objectArray[e].type.id == itemtypes.CHART.STANDARD) {
                                resObj.permissions.hasStandardChart = true;
                                for (let r = 0; r < resObj.objectArray[e].rows.length; r++) {
                                    if (resObj.objectArray[e].rows[r].title && resObj.objectArray[e].rows[r].title.length != 0) {
                                        resObj.permissions.hasRowTitles = true;
                                    } else if (resObj.objectArray[e].rows[r].selectionItem.id && resObj.objectArray[e].rows[r].selectionItem.id != 0) {
                                        resObj.permissions.hasRowTitles = true;
                                    }
                                }
                            }
                            if (resObj.objectArray[e].description && resObj.objectArray[e].description.length != 0) {
                                resObj.permissions.hasDescriptions = true;
                            }
                        }
                        return callback(null, resObj);
                    },
                    function insertCoreTable(resObj, callback) {
                        console.log('chart-01');
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'INSERT INTO adm_core_chart';
                        sql += ' ("title", "typeId")';
                        sql += ' VALUES ';
                        parameterArray = common.parameterArray.resetValues(2);
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (addComma) {
                                sql += ', ';
                            }
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.objectArray[e].title);
                            vals.push(resObj.objectArray[e].type.id);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        sql += ' returning id AS "chartId", title;';
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
                    },
                    function insertChartDescriptions(resObj, callback) {
                        console.log('chart-02');
                        if (resObj.permissions.hasDescriptions) {
                            vals = [];
                            results = [];
                            addComma = false;
                            parameterArray = common.parameterArray.resetValues(3);
                            sql = 'INSERT INTO adm_core_description';
                            sql += ' ("itemId", "description", "descriptionTypeId")';
                            sql += ' VALUES ';
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                if (resObj.objectArray[e].description && resObj.objectArray[e].description.length != 0) {
                                    if (addComma) {
                                        sql += ', ';
                                    }
                                    sql += common.parameterArray.sql(parameterArray);
                                    vals.push(resObj.objectArray[e].id);
                                    vals.push(resObj.objectArray[e].description);
                                    vals.push(itemtypes.DESCRIPTION.CHART);
                                    parameterArray = common.parameterArray.incrementValues(parameterArray);
                                    addComma = true;
                                }
                            }
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                done();
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertSelectionMissingTypes(resObj, callback) {
                        console.log('chart-03');
                        if (resObj.permissions.hasMissingSelectionType) {
                            vals = [];
                            results = [];
                            addComma = false;
                            parameterArray = common.parameterArray.resetValues(1);
                            sql = 'INSERT INTO adm_core_type';
                            sql += ' ("typeName")';
                            sql += ' VALUES ';
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                if (resObj.objectArray[e].type.id == itemtypes.CHART.SELECTION) {
                                    if (resObj.objectArray[e].selectionItemType.id <= 0) {
                                        if (addComma) {
                                            sql += ', ';
                                        }
                                        sql += common.parameterArray.sql(parameterArray);
                                        vals.push(resObj.objectArray[e].selectionItemType.name);
                                        parameterArray = common.parameterArray.incrementValues(parameterArray);
                                        addComma = true;
                                    }
                                }
                            }
                            sql += ' returning "typeName" AS "name", "id" AS "typeId"';
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                done();
                                for (let e = 0; e < results.length; e++) {
                                    for (let f = 0; f < resObj.objectArray.length; f++) {
                                        if (resObj.objectArray[f].type.id == itemtypes.CHART.SELECTION) {
                                            if (resObj.objectArray[f].selectionItemType.name == results[e].name) {
                                                resObj.objectArray[f].selectionItemType.id = results[e].typeId;
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
                    function insertSelectionMissingTypeItems(resObj, callback) {
                        console.log('chart-04');
                        if (resObj.permissions.hasMissingSelectionType) {
                            vals = [];
                            results = [];
                            addComma = false;
                            parameterArray = common.parameterArray.resetValues(3);
                            sql = 'INSERT INTO adm_core_item';
                            sql += ' ("itemName", "itemTypeId", "resourceId")';
                            sql += ' VALUES ';
                            for (let c = 0; c < resObj.objectArray.length; c++) {
                                if (resObj.objectArray[c].type.id == itemtypes.CHART.SELECTION) {
                                    for (let r = 0; r < resObj.objectArray[c].rows.length; r++) {
                                        if (resObj.objectArray[c].rows[r].selectionItem && resObj.objectArray[c].rows[r].selectionItem.id && resObj.objectArray[c].rows[r].selectionItem.id == 0) {
                                            if (addComma) {
                                                sql += ', ';
                                            }
                                            sql += common.parameterArray.sql(parameterArray);
                                            vals.push(resObj.objectArray[c].rows[r].selectionItem.name);
                                            vals.push(resObj.objectArray[c].selectionItemType.id);
                                            vals.push(resObj.spell.resource.id);
                                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                                            addComma = true;
                                        }
                                    }
                                }
                            }
                            sql += ' returning "itemName", "id" AS "itemId"';
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                done();
                                for (let e = 0; e < results.length; e++) {
                                    for (let f = 0; f < resObj.objectArray.length; f++) {
                                        if (resObj.objectArray[f].type.id == itemtypes.CHART.SELECTION) {
                                            for (let r = 0; r < resObj.objectArray[f].rows.length; r++) {
                                                if (results[e].itemName == resObj.objectArray[f].rows[r].selectionItem.name) {
                                                    resObj.objectArray[f].rows[r].selectionItem.id = results[e].itemId;
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
                    function insertChartDef_selection(resObj, callback) {
                        console.log('chart-05');
                        if (resObj.permissions.hasSelectionChart) {
                            vals = [];
                            results = [];
                            addComma = false;
                            parameterArray = common.parameterArray.resetValues(2);
                            sql = 'INSERT INTO adm_def_chart_selection';
                            sql += ' ("chartId", "selectTypeId")';
                            sql += ' VALUES ';
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                if (resObj.objectArray[e].type.id == itemtypes.CHART.SELECTION) {
                                    if (addComma) {
                                        sql += ', ';
                                    }
                                    sql += common.parameterArray.sql(parameterArray);
                                    vals.push(resObj.objectArray[e].id);
                                    vals.push(resObj.objectArray[e].selectionItemType.id);
                                    parameterArray = common.parameterArray.incrementValues(parameterArray);
                                    addComma = true;
                                }
                            }
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                done();
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertChartDef_standard(resObj, callback) {
                        console.log('chart-06');
                        if (resObj.permissions.hasStandardChart) {
                            vals = [];
                            results = [];
                            addComma = false;
                            parameterArray = common.parameterArray.resetValues(3);
                            sql = 'INSERT INTO adm_def_chart';
                            sql += ' ("chartId", "columnCount", "rowCount")';
                            sql += ' VALUES ';
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                if (addComma) {
                                    sql += ', ';
                                }
                                sql += common.parameterArray.sql(parameterArray);
                                vals.push(resObj.objectArray[e].id);
                                vals.push(resObj.objectArray[e].columnCount);
                                vals.push(resObj.objectArray[e].rowCount);
                                parameterArray = common.parameterArray.incrementValues(parameterArray);
                                addComma = true;
                            }
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                done();
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function manageDice(resObj, callback) {
                        console.log('chart-07');
                        if (resObj.permissions.hasDieChart) {
                            let referenceArray = [];
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                if (resObj.objectArray[e].type.id == itemtypes.CHART.DIE_ROLL) {
                                    referenceArray.push(resObj.objectArray[e].dice);
                                }
                            }
                            common.getObjects.dice(referenceArray, function(dice) {
                                for (let e = 0; e < resObj.objectArray.length; e++) {
                                    if (resObj.objectArray[e].type.id == itemtypes.CHART.DIE_ROLL) {
                                        resObj.objectArray[e].dice = common.datatypes.dice.getObject(dice, resObj.objectArray[e].dice);
                                    }
                                }
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertChartDice(resObj, callback) {
                        console.log('chart-08');
                        if (resObj.permissions.hasDieChart) {
                            vals = [];
                            results = [];
                            addComma = false;
                            parameterArray = common.parameterArray.resetValues(2);
                            sql = 'INSERT INTO adm_def_chart_dice';
                            sql += ' ("chartId", "diceId")';
                            sql += ' VALUES ';
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                if (resObj.objectArray[e].type.id == itemtypes.CHART.DIE_ROLL) {
                                    if (addComma) {
                                        sql += ', ';
                                    }
                                    sql += common.parameterArray.sql(parameterArray);
                                    vals.push(resObj.objectArray[e].id);
                                    vals.push(resObj.objectArray[e].dice.id);
                                    parameterArray = common.parameterArray.incrementValues(parameterArray);
                                    addComma = true;
                                }
                            }
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                done();
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertChartEntry_dice(resObj, callback) {
                        console.log('chart-09');
                        if (resObj.permissions.hasDieChart) {
                            vals = [];
                            results = [];
                            addComma = false;
                            parameterArray = common.parameterArray.resetValues(4);
                            sql = 'INSERT INTO adm_def_chart_dice_entry';
                            sql += ' ("chartId", "minimum", "maximum", "description")';
                            sql += ' VALUES ';
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                if (resObj.objectArray[e].type.id == itemtypes.CHART.DIE_ROLL) {
                                    for (let j = 0; j < resObj.objectArray[e].entries.length; j++) {
                                        if (addComma) {
                                            sql += ', ';
                                        }
                                        sql += common.parameterArray.sql(parameterArray);
                                        vals.push(resObj.objectArray[e].id);
                                        vals.push(resObj.objectArray[e].entries[j].minimum);
                                        vals.push(resObj.objectArray[e].entries[j].maximum);
                                        vals.push(resObj.objectArray[e].entries[j].description);
                                        parameterArray = common.parameterArray.incrementValues(parameterArray);
                                        addComma = true;
                                    }
                                }
                            }
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                done();
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertChartEntry_standard_selection(resObj, callback) {
                        console.log('chart-10');
                        if (resObj.permissions.hasStandardChart || resObj.permissions.hasSelectionChart) {
                            vals = [];
                            results = [];
                            addComma = false;
                            parameterArray = common.parameterArray.resetValues(5);
                            sql = 'INSERT INTO adm_def_chart_entry';
                            sql += ' ("chartId", "columnIndex", "rowIndex", "description", "selectionItemId")';
                            sql += ' VALUES ';
                            for (let c = 0; c < resObj.objectArray.length; c++) {
                                if (resObj.objectArray[c].type.id == itemtypes.CHART.SELECTION || resObj.objectArray[c].type.id == itemtypes.CHART.STANDARD) {
                                    for (let e = 0; e < resObj.objectArray[c].entries.length; e++) {
                                        if (addComma) {
                                            sql += ', ';
                                        }
                                        sql += common.parameterArray.sql(parameterArray);
                                        vals.push(resObj.objectArray[c].id);
                                        vals.push(resObj.objectArray[c].entries[e].columnIndex);
                                        vals.push(resObj.objectArray[c].entries[e].rowIndex);
                                        vals.push(resObj.objectArray[c].entries[e].description);
                                        vals.push(resObj.objectArray[c].entries[e].selectionItem.id);
                                        parameterArray = common.parameterArray.incrementValues(parameterArray);
                                        addComma = true;
                                    }
                                }
                            }
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                done();
                                for (let r = 0; r < results.length; r++) {
                                    for (let c = 0; c < resObj.objectArray.length; c++) {
                                        for (let e = 0; e < resObj.objectArray[c].entries.length; e++) {
                                            if (results[r].chartId == resObj.objectArray[c].id) {
                                                if (results[r].rowIndex == resObj.objectArray[c].entries[e].rowIndex && results[r].columnIndex == resObj.objectArray[c].entries[e].columnIndex) {
                                                    resObj.objectArray[c].entries[e].id = results[r].entryId;
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
                    function insertChartColumns_standard_selection(resObj, callback) {
                        console.log('chart-11');
                        if (resObj.permissions.hasSelectionChart || resObj.permissions.hasStandardChart) {
                            vals = [];
                            results = [];
                            addComma = false;
                            parameterArray = common.parameterArray.resetValues(4);
                            sql = 'INSERT INTO adm_def_chart_column';
                            sql += ' ("chartId", "columnIndex", "title", "selectionItemId")';
                            sql += ' VALUES ';
                            for (let c = 0; c < resObj.objectArray.length; c++) {
                                if (resObj.objectArray[c].type.id == itemtypes.CHART.SELECTION || resObj.objectArray[c].type.id == itemtypes.CHART.STANDARD) {
                                    for (let e = 0; e < resObj.objectArray[c].columns.length; e++) {
                                        if (addComma) {
                                            sql += ', ';
                                        }
                                        sql += common.parameterArray.sql(parameterArray);
                                        vals.push(resObj.objectArray[c].id);
                                        vals.push(resObj.objectArray[c].columns[e].orderIndex);
                                        vals.push(resObj.objectArray[c].columns[e].title);
                                        vals.push(resObj.objectArray[c].columns[e].selectionItemType.id);
                                        parameterArray = common.parameterArray.incrementValues(parameterArray);
                                        addComma = true;
                                    }
                                }
                            }
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                done();
                                for (let r = 0; r < results.length; r++) {
                                    for (let c = 0; c < resObj.objectArray.length; c++) {
                                        for (let e = 0; e < resObj.objectArray[c].columns.length; e++) {
                                            if (results[r].chartId == resObj.objectArray[c].id) {
                                                if (results[r].orderIndex == resObj.objectArray[c].columns[e].orderIndex) {
                                                    resObj.objectArray[c].columns[e].id = results[r].columnId;
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
                    function insertChartRows_standard_selection(resObj, callback) {
                        console.log('chart-12');
                        if ((resObj.permissions.hasSelectionChart || resObj.permissions.hasStandardChart) && resObj.permissions.hasRowTitles) {
                            vals = [];
                            results = [];
                            addComma = false;
                            parameterArray = common.parameterArray.resetValues(4);
                            sql = 'INSERT INTO adm_def_chart_row';
                            sql += ' ("chartId", "rowIndex", "title", "selectionItemId")';
                            sql += ' VALUES ';
                            for (let c = 0; c < resObj.objectArray.length; c++) {
                                for (let r = 0; r < resObj.objectArray[c].rows.length; r++) {
                                    if ((resObj.objectArray[c].rows[r].title && resObj.objectArray[c].rows[r].title.length != 0) || (resObj.objectArray[c].rows[r].selectionItem
                                                   && resObj.objectArray[c].rows[r].selectionItem.name
                                                   && resObj.objectArray[c].rows[r].selectionItem.name.length != 0)){
                                        if (addComma) {
                                            sql += ', ';
                                        }
                                        sql += common.parameterArray.sql(parameterArray);
                                        vals.push(resObj.objectArray[c].id);
                                        vals.push(resObj.objectArray[c].rows[r].orderIndex);
                                        if (resObj.objectArray[c].type.id == itemtypes.CHART.STANDARD
                                            && resObj.objectArray[c].rows[r].title
                                            && resObj.objectArray[c].rows[r].title.length != 0) {
                                            vals.push(resObj.objectArray[c].rows[r].title);
                                        } else if (resObj.objectArray[c].type.id == itemtypes.CHART.SELECTION
                                                   && resObj.objectArray[c].rows[r].selectionItem
                                                   && resObj.objectArray[c].rows[r].selectionItem.name
                                                   && resObj.objectArray[c].rows[r].selectionItem.name.length != 0) {
                                            vals.push(resObj.objectArray[c].rows[r].selectionItem.name);
                                        } else {
                                            vals.push('');
                                        }
                                        vals.push(resObj.objectArray[c].rows[r].selectionItem.id);
                                        parameterArray = common.parameterArray.incrementValues(parameterArray);
                                        addComma = true;
                                    }
                                }
                            }
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                done();
                                for (let r = 0; r < results.length; r++) {
                                    for (let c = 0; c < resObj.objectArray.length; c++) {
                                        for (let e = 0; e < resObj.objectArray[c].rows.length; e++) {
                                            if (results[r].chartId == resObj.objectArray[c].id) {
                                                if (results[r].orderIndex == resObj.objectArray[c].rows[e].orderIndex) {
                                                    resObj.objectArray[c].rows[e].id = results[r].rowId;
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
                    function insertChartLinks(resObj, callback) {
                        console.log('chart-13');
                        vals = [];
                        results = [];
                        addComma = false;
                        parameterArray = common.parameterArray.resetValues(4);
                        sql = 'INSERT INTO adm_link_generic';
                        sql += ' ("referenceId", "targetId", "otherValue", "typeId")';
                        sql += ' VALUES ';
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (addComma) {
                                sql += ', ';
                            }
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(referenceId);
                            vals.push(resObj.objectArray[e].id);
                            vals.push(resObj.objectArray[e].orderIndex);
                            vals.push(itemtypes.LINK.CHART);
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                            addComma = true;
                        }
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
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
        links: function(referenceArray, referenceId, itemTypeId, linkTypeId, linkOtherValueKey, resourceId, cb) {
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
                        resObj.permissions = {};
                        resObj.permissions.hasLinks = false;
                        resObj.permission.hasNewItems = false;
                        resObj.permission.doItemInsert = false;
                        if (resObj.objectArray && resObj.objectsArray.length != 0) {
                            resObj.permissions.hasLinks = true;
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                if (resObj.objectArray[e].id != 0) {
                                    resObj.permission.hasNewItems = true;
                                }
                            }
                        }
                        if (linkTypeId == itemtypes.LINK.LANGUAGE_DIALECT) {
                            resObj.permission.doItemInsert = true;
                        }
                        return callback(null, resObj);
                    },
                    function insertNewLinkedItems(resObj, callback) {
                        if (resObj.permissions.hasNewItems && resObj.permission.doItemInsert) {
                            vals = [];
                            results = [];
                            addComma = false;
                            sql = 'INSERT INTO adm_core_item';
                            sql += ' ("itemName", "itemTypeId", "resourceId")';
                            sql += ' VALUES ';
                            parameterArray = common.parameterArray.resetValues(3);
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                if (resObj.objectArray[e].id == 0) {
                                    if (addComma) {
                                        sql += ', ';
                                    }
                                    sql += common.parameterArray.sql(parameterArray);
                                    vals.push(resObj.objectArray[e].name);
                                    vals.push(itemTypeId);
                                    vals.push(resourceId);
                                    addComma = true;
                                    parameterArray = common.parameterArray.incrementValues(parameterArray);
                                }
                            }
                            sql += ' returning id, "itemName"';
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                done();
                                for (let q = 0; q < resObj.objectArray.length; q++) {
                                    if (resObj.objectArray[q].id == 0) {
                                        for (let w = 0; w < results.length; w++) {
                                            if (resObj.objectArray[q].name == results[w].itemName) {
                                                resObj.objectArray[q].id = results[w].id;
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
                        if (resObj.permissions.hasLinks) {
                            vals = [];
                            results = [];
                            addComma = false;
                            sql = 'INSERT INTO adm_link_generic';
                            sql += ' ("referenceId", "targetId", "typeId", "otherValue")';
                            sql += ' VALUES ';
                            parameterArray = common.parameterArray.resetValues(4);
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                if (resObj.objectArray[e].id == 0) {
                                    if (addComma) {
                                        sql += ', ';
                                    }
                                    sql += common.parameterArray.sql(parameterArray);
                                    vals.push(referenceId);
                                    vals.push(resObj.objectArray[e].id);
                                    vals.push(linkTypeId);
                                    if (linkOtherValueKey && linkOtherValueKey.length != 0) {
                                        vals.push(resObj.objectArray[linkOtherValueKey]);
                                    } else {
                                        vals.push(0);
                                    }
                                    
                                    addComma = true;
                                    parameterArray = common.parameterArray.incrementValues(parameterArray);
                                }
                            }
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                done();
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    }
                ], function(error, result) {
                    if (error) {
                        console.error(error);
                    }
                    return cb(result);
                });
            });
        },
        mechanics: function(referenceArray, referenceId, cb) {
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
                        resObj.permissions = {};
                        resObj.permissions.hasSpecialText = false;
                        resObj.permissions.hasTitleText = false;
                        
                        if (resObj.objectArray && resObj.objectArray.length != 0) {
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                resObj.objectArray[e].specialTextId = 0;
                                resObj.objectArray[e].titleId = 0;
                                if (resObj.objectArray[e].title && resObj.objectArray[e].title.length != 0) {
                                    resObj.permissions.hasTitleText = true;
                                }
                                if (resObj.objectArray[e].specialText && resObj.objectArray[e].specialText.length != 0) {
                                    resObj.permissions.hasSpecialText = true;
                                }
                            }
                        }
                        return callback(null, resObj);
                    },
                    function insertSpecialText(resObj, callback) {
                        console.log('mechanic-01');
                        if (resObj.permissions.hasSpecialText) {
                            vals = [];
                            results = [];
                            addComma = false;
                            sql = 'INSERT INTO adm_core_item';
                            sql += ' ("itemTypeId", "resourceId", "itemName")';
                            sql += ' VALUES ';
                            parameterArray = common.parameterArray.resetValues(3);
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                if (resObj.objectArray[e].specialText && resObj.objectArray[e].specialText.length != 0) {
                                    if (addComma) {
                                        sql += ', ';
                                    }
                                    sql += common.parameterArray.sql(parameterArray);
                                    vals.push(itemtypes.TYPE.SPECIAL_TEXT);
                                    vals.push(0);
                                    vals.push(resObj.objectArray[e].specialText);
                                    addComma = true;
                                    parameterArray = common.parameterArray.incrementValues(parameterArray);
                                }
                            }
                            sql += ' returning id AS "specialTextId", "itemName" AS "specialText";';
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                done();
                                if (results && results.length != 0) {
                                    for (let e = 0; e < results.length; e++) {
                                        for (let m = 0; m < resObj.objectArray.length; m++) {
                                            if (results[e].specialText == resObj.objectArray[m].specialText) {
                                                resObj.objectArray[m].specialTextId = results[e].specialTextId;
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
                    function insertTitleText(resObj, callback) {
                        console.log('mechanic-02');
                        if (resObj.permissions.hasTitleText) {
                            vals = [];
                            results = [];
                            addComma = false;
                            sql = 'INSERT INTO adm_core_item';
                            sql += ' ("itemName", "itemTypeId", "resourceId")';
                            sql += ' VALUES ';
                            parameterArray = common.parameterArray.resetValues(3);
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                if (resObj.objectArray[e].title && resObj.objectArray[e].title.length != 0) {
                                    if (addComma) {
                                        sql += ', ';
                                    }
                                    sql += common.parameterArray.sql(parameterArray);
                                    vals.push(resObj.objectArray[e].title);
                                    vals.push(itemtypes.DESCRIPTION.MECHANIC_TITLE);
                                    vals.push(0);
                                    addComma = true;
                                    parameterArray = common.parameterArray.incrementValues(parameterArray);
                                }
                            }
                            sql += ' returning "itemName" AS "title", id AS "titleId"';
                            let query = client.query(new pg.Query(sql, vals));
                            query.on('row', function(row) {
                                results.push(row);
                            });
                            query.on('end', function() {
                                done();
                                for (let m = 0; m < resObj.objectArray.length; m++) {
                                    if (resObj.objectArray[m].title && resObj.objectArray[m].title.length != 0) {
                                        for (let e = 0; e < results.length; e++) {
                                            if (resObj.objectArray[m].title == results[e].title) {
                                                resObj.objectArray[m].titleId = results[e].titleId;
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
                    function manageDice(resObj, callback) {
                        console.log('mechanic-03');
                        let referenceArray = [];
                        let hasDice = false;
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (resObj.objectArray[e].dice.dieType != 0) {
                                referenceArray.push(resObj.objectArray[e].dice);
                                hasDice = true;
                            }
                        }
                        if (hasDice) {
                            common.getObjects.dice(referenceArray, function(dice) {
                                for (let e = 0; e < resObj.objectArray.length; e++) {
                                    if (resObj.objectArray[e].dice.dieType != 0) {
                                        resObj.objectArray[e].dice = common.datatypes.dice.getObject(dice, resObj.objectArray[e].dice);
                                    }
                                    if (resObj.objectArray[e].dice.id == undefined) {
                                        resObj.objectArray[e].dice.id = 0;
                                    }
                                }
                                return callback(null, resObj);
                            });
                        } else {
                            return callback(null, resObj);
                        }
                    },
                    function insertLinkTable(resObj, callback) {
                        console.log('mechanic-04');
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'INSERT INTO adm_link_mechanic';
                        sql += ' ("referenceId", "targetId", "typeId", "value", "diceId", "valueObjectId", "specialTextId", "titleId", "assignmentTypeId")';
                        sql += ' VALUES ';
                        parameterArray = common.parameterArray.resetValues(9);
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (addComma) {
                                sql += ', ';
                            }
                            console.log(resObj.objectArray[e].dice.id);
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(referenceId);
                            vals.push(resObj.objectArray[e].target.id);
                            vals.push(resObj.objectArray[e].type.id);
                            vals.push(resObj.objectArray[e].value);
                            vals.push(resObj.objectArray[e].dice.id);
                            vals.push(resObj.objectArray[e].valueObject.id);
                            vals.push(resObj.objectArray[e].specialTextId);
                            vals.push(resObj.objectArray[e].titleId);
                            vals.push(resObj.objectArray[e].assignmentType.id);
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
        naturalWeapons: function(referenceArray, referenceId, cb) {
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
                    function manageDice(resObj, callback) {
                        let referenceArray = [];
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            referenceArray.push(resObj.objectArray[e].damage.dice);
                        }
                        common.getObjects.dice(referenceArray, function(dice) {
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                resObj.objectArray[e].damage.dice = common.datatypes.dice.getObject(dice, resObj.objectArray[e].damage.dice);
                            }
                            return callback(null, resObj);
                        });
                    },
                    function insertCoreTable(resObj, callback) {
                        console.log('natural weapons-01');
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'INSERT INTO adm_link_natural_weapon';
                        sql += ' ("referenceId", "naturalWeaponTypeId", "damageTypeId", "damageDiceId", "damageAbilityScoreId", "hitAbilityScoreId", "attackCount")';
                        sql += ' VALUES ';
                        parameterArray = common.parameterArray.resetValues(7);
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (addComma) {
                                sql += ', ';
                            }
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.referenceId);
                            vals.push(resObj.objectArray[e].type.id);
                            vals.push(resObj.objectArray[e].damage.type.id);
                            vals.push(resObj.objectArray[e].damage.dice.id);
                            vals.push(resObj.objectArray[e].damage.abilityScore.id);
                            vals.push(resObj.objectArray[e].attack.abilityScore.id);
                            vals.push(resObj.objectArray[e].attack.count);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        sql += ' returning "id", "naturalWeaponTypeId"';
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            for (let e = 0; e < results.length; e++) {
                                for (let w = 0; w < resObj.objectArray.length; w++) {
                                    if (resObj.objectArray[w].type.id == results[e].naturalWeaponTypeId) {
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
        prerequisites: function(referenceArray, referenceId, cb) {
            pool.connect(function(err, client, done) {
                /*if (err) {
                    done();
                    console.error(err);
                    return res.status(500).json({ success: false, data: err});
                }*/
                async.waterfall([
                    function init(callback) {
                        console.log('prerequisite-00');
                        let resObj = {};
                        resObj.objectArray = referenceArray;
                        resObj.permissions = {};
                        if (resObj.objectArray && resObj.objectArray.length != 0) {
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                resObj.objectArray[e].newItemName = 'Prerequisite: ' + referenceId + ' - ' + e.toString();
                                if (!resObj.objectArray[e].filterObject) {
                                    resObj.objectArray[e].filterObject = {};
                                }
                                if (!resObj.objectArray[e].filterObject.id) {
                                    resObj.objectArray[e].filterObject.id = 0;
                                }
                            }
                        }
                        return callback(null, resObj);
                    },
                    function insertItemTable(resObj, callback) {
                        console.log('prerequisite-01');
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'INSERT INTO adm_core_item';
                        sql += ' ("itemName", "itemTypeId", "resourceId")';
                        sql += ' VALUES ';
                        parameterArray = common.parameterArray.resetValues(3);
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.objectArray[e].newItemName);
                            vals.push(itemtypes.TYPE.PREREQUISITE);
                            vals.push(0);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        sql += ' returning id, "itemName"';
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            for (let e = 0; e < resObj.objectArray.length; e++) {
                                for (let w = 0; w < results.length; w++) {
                                    if (resObj.objectArray[e].newItemName == results[w].itemName) {
                                        resObj.objectArray[e].id = results[w].id;
                                    }
                                }
                            }
                            return callback(null, resObj);
                        });
                    },
                    function insertDefTable(resObj, callback) {
                        console.log('prerequisite-02');
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'INSERT INTO adm_def_prerequisite';
                        sql += ' ("prerequisiteId", "filterObjectId", "typeId", "isInclusive")';
                        sql += ' VALUES ';
                        parameterArray = common.parameterArray.resetValues(4);
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.objectArray[e].id);
                            vals.push(resObj.objectArray[e].filterObject.id);
                            vals.push(resObj.objectArray[e].type.id);
                            vals.push(resObj.objectArray[e].isInclusive);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, resObj);
                        });
                    },
                    function insertLinkTable(resObj, callback) {
                        console.log('prerequisite-03');
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'INSERT INTO adm_link_generic';
                        sql += ' ("referenceId", "targetId", "typeId", "otherValue")';
                        sql += ' VALUES ';
                        parameterArray = common.parameterArray.resetValues(4);
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(referenceId);
                            vals.push(resObj.objectArray[e].id);
                            vals.push(itemtypes.LINK.PREREQUISITE);
                            vals.push(resObj.objectArray[e].value);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                            for (let w = 0; w < resObj.objectArray[e].targets.length; w++) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.sql(parameterArray);
                                vals.push(resObj.objectArray[e].id);
                                vals.push(resObj.objectArray[e].targets[w].id);
                                vals.push(itemtypes.LINK.PREREQUISITE_TARGET);
                                vals.push(0);
                                addComma = true;
                                parameterArray = common.parameterArray.incrementValues(parameterArray);
                            }
                        }
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, resObj);
                        });
                    },
                    function insertLinkTable(resObj, callback) {
                        return callback(null, resObj);
                    }
                ], function(error, result) {
                    if (error) {
                        console.error(error);
                    }
                    return cb(result);
                });
            });
        },
        proficiencyGroups: function(referenceArray, referenceId, cb) {
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
                    function insertItemTable(resObj, callback) {
                        console.log('proficiency-01');
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'INSERT INTO adm_core_item';
                        sql += ' ("itemTypeId", "itemName", "resourceId")';
                        sql += ' VALUES ';
                        parameterArray = common.parameterArray.resetValues(3);
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (addComma) {
                                sql += ', ';
                            }
                            sql += common.parameterArray.sql(parameterArray);
                            resObj.objectArray[e].itemName = referenceId.toString() + ' proficiency groups ' + e.toString();
                            vals.push(itemtypes.TYPE.ITEM_GROUP);
                            vals.push(resObj.objectArray[e].itemName);
                            vals.push(0);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        sql += ' returning "id", "itemName";';
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            for (let e = 0; e < results.length; e++) {
                                for (let w = 0; w < resObj.objectArray.length; w++) {
                                    if (results[e].itemName == resObj.objectArray[w].itemName) {
                                        resObj.objectArray[w].id = results[e].id;
                                    }
                                }
                            }
                            return callback(null, resObj);
                        });
                    },
                    function insertGroupTable(resObj, callback) {
                        console.log('proficiency-02');
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'INSERT INTO adm_def_item_group';
                        sql += ' ("itemGroupId", "mechanicTypeId", "selectCount", "conditionalText")';
                        sql += ' VALUES';
                        parameterArray = common.parameterArray.resetValues(4);
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (addComma) {
                                sql += ', ';
                            }
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.objectArray[e].id);
                            vals.push(resObj.objectArray[e].mechanic.id);
                            vals.push(resObj.objectArray[e].selectCount);
                            vals.push(resObj.objectArray[e].conditionalText);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, resObj);
                        });
                    },
                    function insertProficiencies(resObj, callback) {
                        console.log('proficiency-03');
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'INSERT INTO adm_link_generic';
                        sql += ' ("referenceId", "targetId", "typeId")';
                        sql += ' VALUES';
                        parameterArray = common.parameterArray.resetValues(3);
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (resObj.objectArray[e].proficiencies.length != 0) {
                                for (let w = 0; w < resObj.objectArray[e].proficiencies.length; w++) {
                                    if (addComma) {
                                        sql += ', ';
                                    }
                                    sql += common.parameterArray.sql(parameterArray);
                                    vals.push(resObj.objectArray[e].id);
                                    vals.push(resObj.objectArray[e].proficiencies[w].id);
                                    vals.push(itemtypes.LINK.ITEM_GROUP_ASSIGNMENT);
                                    addComma = true;
                                    parameterArray = common.parameterArray.incrementValues(parameterArray);
                                }
                            } else {
                                if (addComma) {
                                    sql += ', ';
                                }
                                sql += common.parameterArray.sql(parameterArray);
                                vals.push(resObj.objectArray[e].id);
                                vals.push(resObj.objectArray[e].category.id);
                                vals.push(itemtypes.LINK.ITEM_GROUP_ASSIGNMENT);
                                addComma = true;
                                parameterArray = common.parameterArray.incrementValues(parameterArray);
                            }
                        }
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, resObj);
                        });
                    },
                    function insertLinkTable(resObj, callback) {
                        console.log('proficiency-04');
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'INSERT INTO adm_link_generic';
                        sql += ' ("referenceId", "targetId", "typeId")';
                        sql += ' VALUES ';
                        parameterArray = common.parameterArray.resetValues(3);
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (addComma) {
                                sql += ', ';
                            }
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.referenceId);
                            vals.push(resObj.objectArray[e].id);
                            vals.push(itemtypes.LINK.ITEM_GROUP);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
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
        spellcasting: function(referenceObject, referenceId, cb) {
            pool.connect(function(err, client, done) {
                /*if (err) {
                    done();
                    console.error(err);
                    return res.status(500).json({ success: false, data: err});
                }*/
                async.waterfall([
                    function init(callback) {
                        let resObj = {};
                        resObj.referenceObject = referenceObject;
                        resObj.referenceId = referenceId;
                        resObj.permissions = {};
                        return callback(null, resObj);
                    },
                    function insertSpellcastingTable(resObj, callback) {
                        console.log('spellcasting-01');
                        results = [];
                        vals = [resObj.referenceId, resObj.referenceObject.abilityScore.id];
                        sql = 'INSERT INTO adm_def_spellcasting';
                        sql += ' ("referenceId", "abilityScoreId")';
                        sql += ' VALUES ($1, $2)';
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, resObj);
                        });
                    },
                    function insertSpellcastingSelections(resObj, callback) {
                        console.log('spellcasting-02');
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'INSERT INTO adm_link_spell_selection';
                        sql += ' ("referenceId", "selectCount", "schoolId", "characterLevel", "rechargeTypeId"';
                        sql += ', "castingCount", "spellId", "selectionTypeId", "spellLevel", "spelllistId")';
                        sql += ' VALUES ';
                        parameterArray = common.parameterArray.resetValues(10);
                        for (let e = 0; e < resObj.referenceObject.spellSelections.length; e++) {
                            if (addComma) {
                                sql += ', ';
                            }
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.referenceId);
                            vals.push(resObj.referenceObject.spellSelections[e].selectCount);
                            vals.push(resObj.referenceObject.spellSelections[e].school.id);
                            vals.push(resObj.referenceObject.spellSelections[e].characterLevel);
                            vals.push(resObj.referenceObject.spellSelections[e].rechargeType.id);
                            vals.push(resObj.referenceObject.spellSelections[e].castingCount);
                            vals.push(resObj.referenceObject.spellSelections[e].spell.id);
                            vals.push(resObj.referenceObject.spellSelections[e].selectionType.id);
                            vals.push(resObj.referenceObject.spellSelections[e].spellLevel);
                            vals.push(resObj.referenceObject.spellSelections[e].spelllist.id);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
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
        supplementalDescriptions: function(referenceArray, referenceId, cb) {
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
                        resObj.permissions = {};

                        return callback(null, resObj);
                    },
                    function insertCoreTable(resObj, callback) {
                        console.log('supp desc-01');
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'INSERT INTO adm_core_description';
                        sql += ' ("itemId", "description", "descriptionTypeId")';
                        sql += ' VALUES ';
                        parameterArray = common.parameterArray.resetValues(3);
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (addComma) {
                                sql += ', ';
                            }
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(referenceId);
                            vals.push(resObj.objectArray[e].description);
                            vals.push(itemtypes.DESCRIPTION.SUPPLEMENTAL_DESCRIPTION);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        sql += ' returning "description", id AS "descriptionId"';
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            for (let r = 0; r < results.length; r++) {
                                for (let d = 0; d < resObj.objectArray.length; d++) {
                                    if (results[r].description == resObj.objectArray[d].description) {
                                        resObj.objectArray[d].id = results[r].descriptionId;
                                    }
                                }
                            }
                            return callback(null, resObj);
                        });
                    },
                    function insertDefTable(resObj, callback) {
                        console.log('supp desc-02');
                        vals = [];
                        results = [];
                        addComma = false;
                        sql = 'INSERT INTO adm_def_supplemental_description';
                        sql += ' ("descriptionId", "title", "orderIndex")';
                        sql += ' VALUES ';
                        parameterArray = common.parameterArray.resetValues(3);
                        for (let e = 0; e < resObj.objectArray.length; e++) {
                            if (addComma) {
                                sql += ', ';
                            }
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.objectArray[e].id);
                            vals.push(resObj.objectArray[e].title);
                            vals.push(resObj.objectArray[e].orderIndex);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
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
        }
    },
    remove: {
        breathWeapons: function(referenceId, cb) {
            pool.connect(function(err, client, done) {
                /*if (err) {
                    done();
                    console.error(err);
                    return res.status(500).json({ success: false, data: err});
                }*/
                async.waterfall([
                    function init(callback) {
                        let refId = [referenceId];

                        return callback(null, refId);
                    },
                    function deleteLinkTable(refId, callback) {
                        sql = 'DELETE FROM adm_link_breath_weapon';
                        sql += ' WHERE "referenceId" = $1';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    function deleteChargesLinkTable(refId, callback) {
                        sql = 'DELETE FROM adm_link_breath_weapon_charges';
                        sql += ' WHERE "referenceId" = $1';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    function deleteDamageLinkTable(refId, callback) {
                        sql = 'DELETE FROM adm_link_breath_weapon_damage';
                        sql += ' WHERE "referenceId" = $1';
                        vals = refId;
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
        },
        charts: function(referenceId, cb) {
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
                    function deleteCoreTable(refId, callback) {
                        sql = 'DELETE FROM adm_core_chart WHERE id IN (SELECT "targetId" FROM adm_link_generic WHERE "referenceId" = $1)';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    function deleteDescriptionsTable(refId, callback) {
                        sql = 'DELETE FROM adm_core_description WHERE "itemId" IN (SELECT "targetId" FROM adm_link_generic WHERE "referenceId" = $1)';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    function deleteSelectionDefTable(refId, callback) {
                        sql = 'DELETE FROM adm_def_chart_selection WHERE "chartId" IN (SELECT "targetId" FROM adm_link_generic WHERE "referenceId" = $1)';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    function deleteStandardDefTable(refId, callback) {
                        sql = 'DELETE FROM adm_def_chart WHERE "chartId" IN (SELECT "targetId" FROM adm_link_generic WHERE "referenceId" = $1)';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    function deleteDiceTable(refId, callback) {
                        sql = 'DELETE FROM adm_def_chart_dice WHERE "chartId" IN (SELECT "targetId" FROM adm_link_generic WHERE "referenceId" = $1)';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    function deleteDiceEntryTable(refId, callback) {
                        sql = 'DELETE FROM adm_def_chart_dice_entry WHERE "chartId" IN (SELECT "targetId" FROM adm_link_generic WHERE "referenceId" = $1)';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    function deleteEntryTable(refId, callback) {
                        sql = 'DELETE FROM adm_def_chart_entry WHERE "chartId" IN (SELECT "targetId" FROM adm_link_generic WHERE "referenceId" = $1)';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    function deleteColumnTable(refId, callback) {
                        sql = 'DELETE FROM adm_def_chart_column WHERE "chartId" IN (SELECT "targetId" FROM adm_link_generic WHERE "referenceId" = $1)';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    function deleteRowTable(refId, callback) {
                        sql = 'DELETE FROM adm_def_chart_row WHERE "chartId" IN (SELECT "targetId" FROM adm_link_generic WHERE "referenceId" = $1)';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    function deleteLinkTable(refId, callback) {
                        sql = 'DELETE FROM adm_link_generic WHERE "referenceId" = $1';
                        vals = refId;
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
        },
        mechanics: function(referenceId, cb) {
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
                    function deleteSpecialTextAndTitle(refId, callback) {
                        sql = 'DELETE FROM adm_core_item';
                        sql += ' WHERE "id" IN (SELECT "specialTextId" FROM adm_link_mechanic WHERE "referenceId" = $1)';
                        sql += ' OR "id" IN (SELECT "titleId" FROM adm_link_mechanic WHERE "referenceId" = $1)';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    function deleteLinkTable(refId, callback) {
                        sql = 'DELETE FROM adm_link_mechanic';
                        sql += ' WHERE "referenceId" = $1';
                        vals = refId;
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
        },
        naturalWeapons: function(referenceId, cb) {
            pool.connect(function(err, client, done) {
                /*if (err) {
                    done();
                    console.error(err);
                    return res.status(500).json({ success: false, data: err});
                }*/
                async.waterfall([
                    function init(callback) {
                        let refId = [referenceId];

                        return callback(null, refId);
                    },
                    function deleteLinkTable(refId, callback) {
                        sql = 'DELETE FROM adm_link_natural_weapon';
                        sql += ' WHERE "referenceId" = $1';
                        vals = refId;
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
        },
        proficiencyGroups: function(referenceId, cb) {
            pool.connect(function(err, client, done) {
                /*if (err) {
                    done();
                    console.error(err);
                    return res.status(500).json({ success: false, data: err});
                }*/
                async.waterfall([
                    function init(callback) {
                        let refId = [referenceId];

                        return callback(null, refId);
                    },
                    function deleteCoreTable(refId, callback) {
                        sql = 'DELETE FROM adm_core_item';
                        sql += ' WHERE "id" IN (SELECT "targetId" FROM adm_link_generic WHERE "referenceId" = $1)';
                        //sql += ' WHERE "id" IN (SELECT "itemGroupId" FROM adm_link_item_group WHERE "referenceId" = $1)';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    function deleteGroupTable(refId, callback) {
                        sql = 'DELETE FROM adm_def_item_group';
                        sql += ' WHERE "itemGroupId" IN (SELECT "targetId" FROM adm_link_generic WHERE "referenceId" = $1)';
                        //sql += ' WHERE "itemGroupId" IN (SELECT "itemGroupId" FROM adm_link_item_group WHERE "referenceId" = $1)';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    /*function deleteProficiencyTable(refId, callback) {
                        sql = 'DELETE FROM adm_link_item_group_assignment';
                        sql += ' WHERE "itemGroupId" IN (SELECT "itemGroupId" FROM adm_link_item_group WHERE "referenceId" = $1)';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    function deleteLinkTable(refId, callback) {
                        sql = 'DELETE FROM adm_link_item_group';
                        sql += ' WHERE "referenceId" = $1';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },*/
                    function deleteLinkTable(refId, callback) {
                        sql = 'DELETE FROM adm_link_generic';
                        sql += ' WHERE "referenceId" = $1';
                        vals = refId;
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
        },
        spellcasting: function(referenceId, cb) {
            pool.connect(function(err, client, done) {
                /*if (err) {
                    done();
                    console.error(err);
                    return res.status(500).json({ success: false, data: err});
                }*/
                async.waterfall([
                    function init(callback) {
                        let refId = [referenceId];

                        return callback(null, refId);
                    },
                    function deleteLinkTable(refId, callback) {
                        sql = 'DELETE FROM adm_def_spellcasting';
                        sql += ' WHERE "referenceId" = $1';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    function deleteChargesLinkTable(refId, callback) {
                        sql = 'DELETE FROM adm_link_spell_selection';
                        sql += ' WHERE "referenceId" = $1';
                        vals = refId;
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
        },
        supplementalDescriptions: function(referenceId, cb) {
            pool.connect(function(err, client, done) {
                /*if (err) {
                    done();
                    console.error(err);
                    return res.status(500).json({ success: false, data: err});
                }*/
                async.waterfall([
                    function init(callback) {
                        let refId = [referenceId];

                        return callback(null, refId);
                    },
                    function deleteDefTable(refId, callback) {
                        sql = 'DELETE FROM adm_def_supplemental_description';
                        sql += ' WHERE "descriptionId" IN (SELECT id FROM adm_core_description WHERE "itemId" = $1)';
                        vals = refId;
                        let query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            done();
                            return callback(null, refId);
                        });
                    },
                    function deleteCoreTable(refId, callback) {
                        sql = 'DELETE FROM adm_core_description';
                        sql += ' WHERE "itemId" = $1';
                        vals = refId;
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
    },
    _templates: {
        _insert: function(referenceArray, referenceId, cb) {
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