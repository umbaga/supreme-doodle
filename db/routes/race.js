module.exports = function(app, pg, async, pool, itemtypes, common) {
    let results = [];
    let sql = '';
    let vals = [];
    let query = null;
    let tmp = null;
    let resObj = null;
    let parameterArray = null;
    let addComma = false;
    let counter = 0;
    app.delete('/api/adm/race/:id', function(req, res) {
        results = [];
        vals = [];
        sql = '';
        query = null;
        pool.connect(function(err, client, done) {
            if (err) {
                done();
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            async.waterfall([
                function init(cb) {
                    resObj = req.body;
                    cb(null, resObj);
                },
                function itemTable(resObj, callback) {
                    console.log('delete-race-01');
                    results = [];
                    vals = [];
                    sql = 'DELETE FROM adm_core_item';
                    sql += ' WHERE id = $1';
                    vals = [
                        req.params.id
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function raceTable(resObj, callback) {
                    console.log('delete-race-02');
                    results = [];
                    vals = [];
                    sql = 'DELETE FROM adm_def_race';
                    sql += ' WHERE "raceId" = $1';
                    vals = [
                        req.params.id
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function descriptionTable(resObj, callback) {
                    console.log('delete-race-03');
                    results = [];
                    vals = [];
                    sql = 'DELETE FROM adm_core_description';
                    sql += ' WHERE "id" IN (SELECT "targetId" FROM adm_link WHERE "referenceId" = $1)';
                    vals = [
                        req.params.id
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function linkTable(resObj, callback) {
                    console.log('delete-race-04');
                    results = [];
                    vals = [];
                    sql = 'DELETE FROM adm_link';
                    sql += ' WHERE "referenceId" = $1';
                    sql += ' OR "targetId" = $1';
                    vals = [
                        req.params.id
                    ];
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
                return res.json(result);
            });
        });
    });
    app.put('/api/adm/race/:id', function(req, res) {
        results = [];
        vals = [];
        sql = '';
        query = null;
        pool.connect(function(err, client, done) {
            if (err) {
                done();
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            async.waterfall([
                function init(cb) {
                    resObj = req.body;
                    resObj.permissions = {};
                    resObj.permissions.need = {};
                    resObj.permissions.has = {};
                    
                    resObj.permissions.need.description = false;
                    
                    resObj.permissions.has.description = false;
                    
                    if (resObj.race.description && resObj.race.description.length != 0) {
                        resObj.permissions.need.description = true;
                    }
                    cb(null, resObj);
                },
                function itemTable(resObj, callback) {
                    console.log('update-race-01');
                    results = [];
                    vals = [];
                    sql = 'UPDATE adm_core_item';
                    sql += ' SET "itemName" = $2';
                    sql += ' WHERE id = $1';
                    vals = [
                        resObj.race.id,
                        resObj.race.name
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function checkExistingStuff(resObj, callback) {
                    console.log('update-race-02');
                    results = [];
                    vals = [];
                    sql = 'SELECT i.id';
                    sql += ', desclnk."targetId" AS "descriptionId"';
                    sql += ' FROM adm_core_item i';
                    sql += ' LEFT OUTER JOIN adm_link desclnk ON desclnk."referenceId" = i.id AND desclnk."typeId" = $2';
                    sql += ' WHERE i.id = $1';
                    vals = [
                        resObj.race.id,
                        itemtypes.TYPE.DESCRIPTION.GENERAL
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        if (results.length != 0) {
                            resObj.permissions.has.description = (results[0].descriptionId === null);
                            resObj.race.results[0].descriptionId = results[0].descriptionId;
                        }
                        return callback(null, resObj);
                    });
                },
                function raceTable(resObj, callback) {
                    console.log('update-race-03');
                    results = [];
                    vals = [];
                    sql = 'UPDATE adm_def_race';
                    sql += ' SET "" = $2';
                    sql += ' WHERE "raceId" = $1';
                    vals = [
                        resObj.race.id
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function updateDescriptionTable(resObj, callback) {
                    console.log('update-race-04');
                    results = [];
                    vals = [];
                    if ((resObj.permissions.need.description && resObj.permissions.has.description)) {
                        sql = 'UPDATE adm_core_description AS i';
                        sql += ' SET "description" = c."description"';
                        sql += ' FROM (VALUES';
                        addComma = false;
                        counter = 0;
                        if (resObj.permissions.need.description && resObj.permissions.has.description) {
                            sql += addComma ? ', ' : '';
                            sql += '($' + ((counter * 2) + 1).toString() + ', $' + ((counter * 2) + 2).toString() + ')';
                            vals.push(resObj.race.descriptionId);
                            vals.push(resObj.race.description);
                            counter++;
                            addComma = true;
                        }
                        sql += ') as c(id, "description") ';
                        sql += 'WHERE c.id = i.id';
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
                function insertDescriptionTable(resObj, callback) {
                    console.log('update-race-05');
                    results = [];
                    vals = [];
                    if ((resObj.permissions.need.description && !resObj.permissions.has.description)) {
                        sql = 'INSERT INTO adm_core_description';
                        sql += ' ("description", "typeId")';
                        sql += ' VALUES ';
                        addComma = false;
                        counter = 0;
                        if (resObj.permissions.need.description && !resObj.permissions.has.description) {
                            sql += addComma ? ', ' : '';
                            sql += '($' + ((counter * 2) + 1).toString() + ', $' + ((counter * 2) + 2).toString() + ')';
                            vals.push(resObj.race.description);
                            vals.push(itemtypes.TYPE.DESCRIPTION.GENERAL);
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
                                if (results[q].typeId == itemtypes.TYPE.DESCRIPTION.GENERAL) {
                                    resObj.race.descriptionId = results[q].id;
                                }
                            }
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function deleteDescriptionTable(resObj, callback) {
                    console.log('update-race-06');
                    results = [];
                    vals = [];
                    if ((resObj.permissions.has.description && !resObj.permissions.need.description)) {
                        sql = 'DELETE FROM adm_core_description';
                        addComma = false;
                        counter = 0;
                        if (!resObj.permissions.need.description) {
                            sql += addComma ? ' OR ' : ' WHERE ';
                            sql += ' id = $' + (counter + 1).toString();
                            vals.push(resObj.race.descriptionId);
                            addComma = true;
                            conuter++;
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
                },
                function insertNewLinks(resObj, callback) {
                    console.log('update-race-07');
                    results = [];
                    vals = [];
                    if (resObj.permissions.need.description) {
                        sql = 'with vals as (';
                        addComma = false;
                        counter = 0;
                        if (resObj.permissions.need.description) {
                            sql += addComma ? ' UNION ' : '';
                            sql += 'SELECT $' + ((counter * 3) + 1).toString() + ' :: bigint as "referenceId"';
                            sql += ', $' + ((counter * 3) + 2).toString() + ' :: bigint as "targetId"';
                            sql += ', $' + ((counter * 3) + 3).toString() + ' :: bigint as "typeId"';
                            vals.push(resObj.race.id);
                            vals.push(resObj.race.descriptionId);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma = true;
                            counter++;
                        }
                        sql += ' )';
                        sql += ' insert into adm_link ("referenceId", "targetId", "typeId")';
                        sql += ' select v."referenceId", v."targetId", v."typeId"';
                        sql += ' from vals as v';
                        sql += ' where not exists (';
                        sql += ' select * from adm_core_dice as t';
                        sql += ' where t."referenceId" = v."referenceId"';
                        sql += ' and t."targetId" = v."targetId"';
                        sql += ' and t."typeId" = v."typeId")';
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
                function deleteUnneededLinks(resObj, callback) {
                    console.log('update-race-08');
                    results = [];
                    vals = [];
                    if ((resObj.permissions.has.description && !resObj.permissions.need.description)) {
                        sql = 'DELETE FROM adm_link';
                        addComma = false;
                        counter = 0;
                        let addComma2 = false;
                        if ((resObj.permissions.has.description && !resObj.permissions.need.description)) {
                            sql += addComma ? ' OR ' : ' WHERE ';
                            sql += '(';
                            sql += '"referenceId" = $' + (counter + 1).toString();
                            sql += ' AND "typeId" = $' + (counter + 2).toString();
                            sql += ' AND "targetId" IN (';
                            vals.push(resObj.race.id);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma2 = false;
                            if (resObj.permissions.has.description && !resObj.permissions.need.description) {
                                sql += addComma2 ? ', ' : '';
                                sql += '$' + (counter + 3).toString();
                                vals.push(resObj.race.descriptionId);
                                counter++
                                addComma2 = true;
                            }
                            sql += ')';
                            sql += ')';
                            counter++;
                            addComma = true;
                        }
                        sql += ')';
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
                return res.json(result);
            });
        });
    });
    app.post('/api/adm/race', function(req, res){
        results = [];
        vals = [];
        sql = '';
        query = null;
        pool.connect(function(err, client, done) {
            if (err) {
                done();
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            async.waterfall([
                function init(cb) {
                    resObj = req.body;
                    resObj.permissions = {};
                    resObj.permissions.need = {};
                    
                    resObj.permissions.need.dice = false;
                    resObj.permissions.need.vitals = false;
                    resObj.permissions.need.mechanics = false;
                    resObj.permissions.need.charts = false;
                    resObj.permissions.need.supplementalDescriptions = false;
                    resObj.permissions.need.proficiencies = false;
                    resObj.permissions.need.spellcasting = false;
                    resObj.permissions.need.movement = false;
                    resObj.permissions.need.senses = false;
                    resObj.permissions.need.naturalWeapons = false;
                    resObj.permissions.need.breathWeapons = false;
                    
                    if (resObj.race.vitals && resObj.race.vitals.height && resObj.race.vitals.height.base && resObj.race.vitals.height.base != 0) {
                        resObj.permissions.need.dice = true;
                        resObj.permissions.need.vitals = true;
                    }
                    if (resObj.race.mechanics && resObj.race.mechanics.length != 0) {
                        resObj.permissions.need.mechanics = true;
                    }
                    if (resObj.race.mechanics && resObj.race.mechanics.length != 0) {
                        resObj.permissions.need.mechanics = true;
                    }
                    if (resObj.race.charts && resObj.race.charts.length != 0) {
                        resObj.permissions.need.charts = true;
                    }
                    if (resObj.race.supplementalDescriptions && resObj.race.supplementalDescriptions.length != 0) {
                        resObj.permissions.need.supplementalDescriptions = true;
                    }
                    if (resObj.race.spellcasting
                        && ((resObj.race.spellcasting.abilityScore && resObj.race.spellcasting.abilityScore.id != 0)
                           || (resObj.race.spellcasting.groups && resObj.race.spellcasting.groups.length != 0))) {
                        resObj.permissions.need.spellcasting = true;
                    }
                    if (resObj.race.proficiencies) {
                        if (resObj.race.proficiencies.assigned && resObj.race.proficiencies.assigned.length != 0) {
                            resObj.permissions.need.proficiencies = true;
                        }
                        if (resObj.race.proficiencies.select) {
                            if ((resObj.race.proficiencies.select.category && resObj.race.proficiencies.select.category.length != 0)
                               || (resObj.race.proficiencies.select.list && resObj.race.proficiencies.select.category.list != 0)) {
                                resObj.permissions.need.proficiencies = true;
                            }
                        }
                    }
                    if (resObj.race.movement && resObj.race.movement.length != 0) {
                        resObj.permissions.need.movement = true;
                    }
                    if (resObj.race.senses && resObj.race.senses.length != 0) {
                        resObj.permissions.need.senses = true;
                    }
                    if (resObj.race.naturalWeapons && resObj.race.naturalWeapons.length != 0) {
                        resObj.permissions.need.naturalWeapons = true;
                    }
                    if (resObj.race.breathWeapons && resObj.race.breathWeapons.length != 0) {
                        resObj.permissions.need.breathWeapons = true;
                    }
                    cb(null, resObj);
                },
                function manageDice(resObj, callback) {
                    console.log('x-insert-race-01');
                    if (resObj.permissions.need.dice) {
                        let diceArr = [
                            resObj.race.vitals.height.dice,
                            resObj.race.vitals.weight.dice
                        ];
                        common.manage.dice(diceArr, function(results) {
                            resObj.race.vitals.height.dice = common.datatypes.dice.getObject(results, resObj.race.vitals.height.dice);
                            resObj.race.vitals.weight.dice = common.datatypes.dice.getObject(results, resObj.race.vitals.weight.dice);
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function itemTable(resObj, callback) {
                    console.log('x-insert-race-02');
                    results = [];
                    vals = [];
                    sql = 'INSERT INTO adm_core_item';
                    sql += '("itemName", "typeId", "resourceId")';
                    sql += 'VALUES ($1, $2, $3) RETURNING id;';
                    vals = [
                        resObj.race.name,
                        itemtypes.TYPE.ITEM.RACE,
                        resObj.race.resource.id
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        resObj.race.id = parseInt(results[0].id);
                        return callback(null, resObj);
                    });
                },
                function raceTable(resObj, callback) {
                    console.log('x-insert-race-03');
                    results = [];
                    vals = [];
                    sql = 'INSERT INTO adm_def_race';
                    sql += '("raceId", "strMod", "dexMod", "conMod", "intMod", "wisMod", "chaMod", "abilitySelectCount", "abilitySelectValue",';
                    sql += ', "monsterTypeId", "sizeId", "parentId", "isVariant")';
                    sql += 'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
                    vals = [
                        resObj.race.id,
                        resObj.race.abilityScore.stengthModifier,
                        resObj.race.abilityScore.dexterityModifier,
                        resObj.race.abilityScore.constitutionModifier,
                        resObj.race.abilityScore.intelligenceModifier,
                        resObj.race.abilityScore.wisdomModifier,
                        resObj.race.abilityScore.charismaModifier,
                        resObj.race.abilityScore.selectCount,
                        resObj.race.abilityScore.selectValue,
                        resObj.race.monsterType.id,
                        resObj.race.size.id,
                        resObj.race.parent.id,
                        resObj.race.isVariant
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function raceVitals(resObj, callback) {
                    console.log('x-insert-race-04');
                    if (resObj.permissions.need.vitals) {
                        results = [];
                        vals = [];
                        sql = 'INSERT INTO adm_def_race_vitals';
                        sql += '("raceId", "baseHeight", "heightDiceId", "baseWeight", "weightDiceId")';
                        sql += 'VALUES ($1, $2, $3, $4, $5)';
                        vals = [
                            resObj.race.id,
                            resObj.race.vitals.height.base,
                            resObj.race.vitals.height.dice.id,
                            resObj.race.vitals.weight.base,
                            resObj.race.vitals.weight.dice.id
                        ];
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
                function raceSpellcasting(resObj, callback) {
                    console.log('x-insert-race-05');
                    if (resObj.permissions.need.spellcasting) {
                        results = [];
                        vals = [];
                        sql = 'INSERT INTO adm_def_race_spellcasting';
                        sql += '("raceId", "abilityScoreId")';
                        sql += 'VALUES ($1, $2)';
                        vals = [
                            resObj.race.id,
                            resObj.race.spellcasting.abilityScore.id
                        ];
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
                function manageProficiencies(resObj, callback) {
                    console.log('x-insert-race-06');
                    if (resObj.permissions.need.proficiencies) {
                        common.insert.proficiencies(resObj.race.proficiencies, resObj.race, function(results) {
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function manageCharts(resObj, callback) {
                    console.log('x-insert-race-07');
                    if (resObj.permissions.need.charts) {
                        common.insert.charts(resObj.race.charts, resObj.race, function(results) {
                            resObj.race.charts = results.charts;
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function manageSupplementalDescriptions(resObj, callback) {
                    console.log('x-insert-race-08');
                    if (resObj.permissions.need.supplementalDescriptions) {
                        common.insert.supplementalDescriptions(resObj.race.supplementalDescriptions, resObj.race, function(results) {
                            resObj.race.supplementalDescriptions = results.supplementalDescriptions;
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function manageMechanics(resObj, callback) {
                    console.log('x-insert-race-09');
                    if (resObj.permissions.need.mechanics) {
                        common.insert.mechanics(resObj.race.mechanics, resObj.race, function(results) {
                            resObj.race.mechanics = results.mechanics;
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function manageSpellcastingGroups(resObj, callback) {
                    console.log('x-insert-race-10');
                    if (resObj.permissions.need.spellcasting) {
                        common.insert.spellcastingGroups(resObj.race.spellcasting.groups, resObj.race, function(results) {
                            resObj.race.spellcasting.groups = results.spellcastingGroups;
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function manageNaturalWeapons(resObj, callback) {
                    console.log('x-insert-race-11');
                    if (resObj.permissions.need.naturalWeapons) {
                        common.insert.naturalWeapons(resObj.race.naturalWeapons, resObj.race, function(results) {
                            resObj.race.naturalWeapons = results.naturalWeapons;
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function manageBreathWeapons(resObj, callback) {
                    console.log('x-insert-race-12');
                    if (resObj.permissions.need.breathWeapons) {
                        
                    } else {
                        return callback(null, resObj);
                    }
                },
                function linkTable(resObj, callback) {
                    console.log('x-insert-race-13');
                    if (resObj.permissions.need.movement || resObj.permissions.need.senses) {
                        results = [];
                        vals = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_link';
                        sql += ' ("referenceId", "targetId", "typeId")';
                        sql += ' VALUES ';
                        if (resObj.permissions.need.movement) {
                            for (let q = 0; q < resObj.race.movement.length; q++) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 3);
                                vals.push(resObj.spell.id);
                                vals.push(resObj.spell.movement[q].id);
                                vals.push(itemtypes.TYPE.LINK.MOVEMENT);
                                addComma = true;
                                counter++;
                            }
                        }
                        if (resObj.permissions.need.senses) {
                            for (let q = 0; q < resObj.race.senses.length; q++) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 3);
                                vals.push(resObj.spell.id);
                                vals.push(resObj.spell.senses[q].id);
                                vals.push(itemtypes.TYPE.LINK.ADVANCED_SENSE);
                                addComma = true;
                                counter++;
                            }
                        }
                        sql += ' RETURNING id, "targetId", "typeId"';
                        query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            for (let q = 0; q < results.length; q++) {
                                if (resObj.permissions.need.movement) {
                                    for (let w = 0; w < resObj.race.movement.length; w++) {
                                        if (results[q].targetId == resObj.race.movement[w].id) {
                                            resObj.race.movement[w].linkId = results[q].id;
                                        }
                                    }
                                }
                                if (resObj.permissions.need.senses) {
                                    for (let w = 0; w < resObj.race.senses.length; w++) {
                                        if (results[q].targetId == resObj.race.senses[w].id) {
                                            resObj.race.senses[w].linkId = results[q].id;
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
                function linkValueNumber(resObj, callback) {
                    console.log('x-insert-race-14');
                    if (resObj.permissions.need.movement || resObj.permissions.need.senses) {
                        results = [];
                        vals = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_link_value_number';
                        sql += ' ("linkId", "numberValue")';
                        sql += ' VALUES ';
                        if (resObj.permissions.need.movement) {
                            for (let q = 0; q < resObj.race.movement.length; q++) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 2);
                                vals.push(resObj.spell.movement[q].linkId);
                                vals.push(resObj.spell.movement[q].value);
                                addComma = true;
                                counter++;
                            }
                        }
                        if (resObj.permissions.need.senses) {
                            for (let q = 0; q < resObj.race.senses.length; q++) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 2);
                                vals.push(resObj.spell.senses[q].linkId);
                                vals.push(resObj.spell.senses[q].value);
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
                return res.json(result);
            });
        });
    });
    app.get('/api/adm/races', function(req, res) {
        results = [];
        pool.connect(function(err, client, done) {
            if (err) {
                done();
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            sql = 'SELECT i."id", i."itemName" AS "name"';
            sql += ', get_item(i."resourceId") AS "resource"';
            sql += ', json_build_object(';
            sql += '    \'strength\', race."strMod"';
            sql += '    , \'dexterity\', race."dexMod"';
            sql += '    , \'constitution\', race."conMod"';
            sql += '    , \'intelligence\', race."intMod"';
            sql += '    , \'wisdom\', race."wisMod"';
            sql += '    , \'charisma\', race."chaMod"';
            sql += '    , \'selectCount\', race."abilitySelectCount"';
            sql += '    , \'selectValue\', race."abilitySelectValue"';
            sql += ') AS "abilityScores"';
            sql += ', get_item(race."sizeId") AS "size"';
            sql += ', get_item(race."monsterTypeId") AS "monsterType"';
            sql += ', get_item(race."parentId") AS "parent"';
            sql += ', race."isVariant"';
            sql += ', json_build_object(';
            sql += '    \'abilityScore\', get_item(spellcasting."abilityScoreId")';
            sql += '    , \'groups\', \'[]\'';
            sql += ') AS "spellcasting"';
            sql += ', json_build_object(';
            sql += '    \'height\', json_build_object(';
            sql += '        \'base\', vitals."baseHeight"';
            sql += '        , \'dice\', get_dice(vitals."heightDiceId")';
            sql += '    )';
            sql += '    , \'weight\', json_build_object(';
            sql += '        \'base\', vitals."baseWeight"';
            sql += '        , \'dice\', get_dice(vitals."weightDiceId")';
            sql += '    )';
            sql += ') AS "vitals"';
            sql += ', CASE WHEN get_natural_weapons(i.id) IS NULL THEN \'[]\' ELSE get_natural_weapons(i.id) END AS "naturalWeapons"';
            sql += ', \'[]\' AS "breathWeapons"';
            sql += ', CASE WHEN get_charts(i.id) IS NULL THEN \'[]\' ELSE get_charts(i.id) END AS "charts"';
            sql += ', CASE WHEN get_mechanics(i.id) IS NULL THEN \'[]\' ELSE get_mechanics(i.id) END AS "mechanics"';
            sql += ', CASE WHEN get_supplemental_descriptions(i.id) IS NULL THEN \'[]\' ELSE get_supplemental_descriptions(i.id) END AS "supplementalDescriptions"';
            sql += ', get_array_of_items(i.id, $2) AS "monsterTags"';
            sql += ', get_array_of_items_with_number(i.id, $3) AS "movement"';
            sql += ', get_array_of_items_with_number(i.id, $4) AS "senses"';
            sql += ' FROM adm_core_item i';
            sql += ' INNER JOIN adm_def_race race ON race."raceId" = i.id';
            sql += ' LEFT OUTER JOIN adm_def_race_vitals vitals ON vitals."raceId" = i.id';
            sql += ' LEFT OUTER JOIN adm_def_race_spellcasting spellcasting ON spellcasting."raceId" = i.id';
            sql += ' WHERE i."typeId" = $1';
            sql += ' ORDER BY i."itemName"';
            vals = [
                itemtypes.TYPE.ITEM.RACE,
                itemtypes.TYPE.LINK.MONSTER_TAG,
                itemtypes.TYPE.LINK.MOVEMENT,
                itemtypes.TYPE.LINK.ADVANCED_SENSE
            ];
            query = client.query(new pg.Query(sql, vals));
            query.on('row', function(row) {
                results.push(row);
            });
            query.on('end', function() {
                done();
                return res.json(results);
            });
        });
    });
};