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
    app.delete('/api/adm/spell/:id', function(req, res) {
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
                    console.log('delete-spell-01');
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
                function spellTable(resObj, callback) {
                    console.log('delete-spell-02');
                    results = [];
                    vals = [];
                    sql = 'DELETE FROM adm_def_spell';
                    sql += ' WHERE "spellId" = $1';
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
                    console.log('delete-spell-03');
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
                    console.log('delete-spell-04');
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
    app.put('/api/adm/spell/:id', function(req, res) {
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
                    
                    if (resObj.spell.description && resObj.spell.description.length != 0) {
                        resObj.permissions.need.description = true;
                    }
                    cb(null, resObj);
                },
                function itemTable(resObj, callback) {
                    console.log('update-spell-01');
                    results = [];
                    vals = [];
                    sql = 'UPDATE adm_core_item';
                    sql += ' SET "itemName" = $2';
                    sql += ' WHERE id = $1';
                    vals = [
                        resObj.spell.id,
                        resObj.spell.name
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
                    console.log('update-spell-02');
                    results = [];
                    vals = [];
                    sql = 'SELECT i.id';
                    sql += ', desclnk."targetId" AS "descriptionId"';
                    sql += ' FROM adm_core_item i';
                    sql += ' LEFT OUTER JOIN adm_link desclnk ON desclnk."referenceId" = i.id AND desclnk."typeId" = $2';
                    sql += ' WHERE i.id = $1';
                    vals = [
                        resObj.spell.id,
                        itemtypes.TYPE.DESCRIPTION.GENERAL
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        if (results.length != 0) {
                            resObj.permissions.has.description = (results[0].descriptionId === null);
                            resObj.spell.results[0].descriptionId = results[0].descriptionId;
                        }
                        return callback(null, resObj);
                    });
                },
                function spellTable(resObj, callback) {
                    console.log('update-spell-03');
                    results = [];
                    vals = [];
                    sql = 'UPDATE adm_def_spell';
                    sql += ' SET "" = $2';
                    sql += ' WHERE "spellId" = $1';
                    vals = [
                        resObj.spell.id
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
                    console.log('update-spell-04');
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
                            vals.push(resObj.spell.descriptionId);
                            vals.push(resObj.spell.description);
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
                    console.log('update-spell-05');
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
                            vals.push(resObj.spell.description);
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
                                    resObj.spell.descriptionId = results[q].id;
                                }
                            }
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function deleteDescriptionTable(resObj, callback) {
                    console.log('update-spell-06');
                    results = [];
                    vals = [];
                    if ((resObj.permissions.has.description && !resObj.permissions.need.description)) {
                        sql = 'DELETE FROM adm_core_description';
                        addComma = false;
                        counter = 0;
                        if (!resObj.permissions.need.description) {
                            sql += addComma ? ' OR ' : ' WHERE ';
                            sql += ' id = $' + (counter + 1).toString();
                            vals.push(resObj.spell.descriptionId);
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
                    console.log('update-spell-07');
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
                            vals.push(resObj.spell.id);
                            vals.push(resObj.spell.descriptionId);
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
                    console.log('update-spell-08');
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
                            vals.push(resObj.spell.id);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma2 = false;
                            if (resObj.permissions.has.description && !resObj.permissions.need.description) {
                                sql += addComma2 ? ', ' : '';
                                sql += '$' + (counter + 3).toString();
                                vals.push(resObj.spell.descriptionId);
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
    app.post('/api/adm/spell', function(req, res){
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
                    
                    resObj.permissions.need.description = false;
                    resObj.permissions.need.atHigherLevels = false;
                    resObj.permissions.need.supplementalDescriptions = false;
                    resObj.permissions.need.materialComponent = false;
                    resObj.permissions.need.reactionText = false;
                    
                    resObj.permissions.need.spellComponents = false;
                    
                    resObj.permissions.need.charts = false;
                    resObj.permissions.need.mechanics = false;
                    resObj.permissions.need.dice = false;
                    resObj.permissions.need.damage = false;
                    resObj.permissions.need.damageAdvancement = false;
                    resObj.permissions.need.supplementalDamage = false;
                    resObj.permissions.need.list = false;
                    resObj.permissions.need.advancementLevelList = false;
                    resObj.permissions.need.damageTypeList = false;
                    resObj.permissions.need.conditionList = false;
                    let checkForAdvancement = false;
                    if (resObj.spell.description && resObj.spell.description.length != 0) {
                        resObj.permissions.need.description = true;
                    }
                    if (resObj.spell.atHigherLevels && resObj.spell.atHigherLevels.length != 0) {
                        resObj.permissions.need.atHigherLevels = true;
                    }
                    if (resObj.spell.castingTime && resObj.spell.castingTime.text && resObj.spell.castingTime.text.length != 0) {
                        resObj.permissions.need.reactionText = true;
                    }
                    if (resObj.spell.supplementalDescriptions && resObj.spell.supplementalDescriptions.length != 0) {
                        resObj.permissions.need.supplementalDescriptions = true;
                    }
                    if (resObj.spell.materialComponentText && resObj.spell.materialComponentText.length != 0) {
                        resObj.permissions.need.materialComponent = true;
                    }
                    if (resObj.spell.components && resObj.spell.components.length != 0) {
                        resObj.permissions.need.spellComponents = true;
                    }
                    if (resObj.spell.charts && resObj.spell.charts.length != 0) {
                        resObj.permissions.need.charts = true;
                    }
                    if (resObj.spell.mechanics && resObj.spell.mechanics.length != 0) {
                        resObj.permissions.need.mechanics = true;
                    }
                    if (resObj.spell.damage) {
                        if (resObj.spell.damage.type && resObj.spell.damage.type.id != 0) {
                            resObj.permissions.need.damage = true;
                            resObj.permissions.need.dice = true;
                            checkForAdvancement = true;
                        }
                        if (resObj.spell.damage.condition && resObj.spell.damage.condition.id != 0) {
                            resObj.permissions.need.damage = true;
                        }
                        if (resObj.spell.damage.savingThrow && resObj.spell.damage.savingThrow.effect && resObj.spell.damage.savingThrow.effect.id != 0) {
                            resObj.permissions.need.damage = true;
                        }
                        if (resObj.spell.damage.supplemental && resObj.spell.damage.supplemental.length != 0) {
                            resObj.permissions.need.supplementalDamage = true;
                        }
                        if (resObj.spell.damage.advancement && resObj.spell.damage.advancement.type && resObj.spell.damage.advancement.type.id != 0
                           && resObj.spell.damage.advancement.dice && resObj.spell.damage.advancement.dice.dieType != 0) {
                            if (checkForAdvancement) {
                                resObj.permissions.need.damageAdvancement = true;
                                if (resObj.spell.damage.advancement.type.id == itemtypes.TYPE.ADVANCEMENT_TYPE.AT_LEVEL) {
                                    resObj.permissions.need.list = true;
                                    resObj.permissions.need.advancementLevelList = true;
                                }
                            }
                        }
                        if (resObj.spell.damage.type.id == itemtypes.TYPE.SUPPLEMENTAL_PICKLIST.SELECT_FROM_LIST) {
                            resObj.permissions.need.list = true;
                            resObj.permissions.need.damageTypeList = true;
                        }
                        if (resObj.spell.damage.condition.id == itemtypes.TYPE.SUPPLEMENTAL_PICKLIST.SELECT_FROM_LIST) {
                            resObj.permissions.need.list = true;
                            resObj.permissions.need.conditionList = true;
                        }
                    }
                    if (resObj.spell.description && resObj.spell.description.length != 0) {
                        resObj.permissions.need.description = true;
                    }
                    cb(null, resObj);
                },
                function itemTable(resObj, callback) {
                    console.log('insert-spell-01');
                    results = [];
                    vals = [];
                    sql = 'INSERT INTO adm_core_item';
                    sql += '("itemName", "typeId", "resourceId")';
                    sql += 'VALUES ($1, $2, $3) RETURNING id;';
                    vals = [
                        resObj.spell.name,
                        itemtypes.TYPE.ITEM.SPELL,
                        resObj.spell.resource.id
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        resObj.spell.id = parseInt(results[0].id);
                        return callback(null, resObj);
                    });
                },
                function manageDice(resObj, callback) {
                    console.log('insert-spell-02');
                    results = [];
                    if (resObj.permissions.need.dice) {
                        let diceArr = [resObj.spell.damage.dice];
                        if (resObj.permissions.need.damageAdvancement) {
                            diceArr.push(resObj.spell.damage.advancement.dice);
                        }
                        if (resObj.permissions.need.supplementalDamage) {
                            for (let q = 0; q < resObj.spell.damage.supplemental.length; q++) {
                                diceArr.push(resObj.spell.damage.supplemental[q].dice);
                            }
                        }
                        common.manage.dice(diceArr, function(results) {
                            resObj.spell.damage.dice = common.datatypes.dice.getObject(results, resObj.spell.damage.dice);
                            if (resObj.permissions.need.damageAdvancement) {
                                resObj.spell.damage.advancement.dice = common.datatypes.dice.getObject(results, resObj.spell.damage.advancement.dice);
                            }
                            if (resObj.permissions.need.supplementalDamage) {
                                for (let q = 0; q < resObj.spell.damage.supplemental.length; q++) {
                                    resObj.spell.damage.supplemental[q].dice = common.datatypes.dice.getObject(results, resObj.spell.damage.supplemental[q].dice);
                                }
                            }
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function spellTable(resObj, callback) {
                    console.log('insert-spell-03');
                    results = [];
                    vals = [];
                    sql = 'INSERT INTO adm_def_spell';
                    sql += '("spellId", "spellLevel", "schoolId", "isRitual", "castingTimeUnitId"';
                    sql += ', "castingTimeValue", "durationUnitId", "durationValue", "rangeUnitId", "rangeValue"';
                    sql += ', "concentrationUnitId", "concentrationValue", "rangeAreaOfEffectShapeId", "rangeAreaOfEffectUnitId", "rangeAreaOfEffectValue")';
                    sql += 'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)';
                    vals = [
                        resObj.spell.id,
                        resObj.spell.level,
                        resObj.spell.school.id,
                        resObj.spell.isRitual,
                        resObj.spell.castingTime.unit.id,
                        resObj.spell.castingTime.value,
                        resObj.spell.duration.unit.id,
                        resObj.spell.duration.value,
                        resObj.spell.range.unit.id,
                        resObj.spell.range.value,
                        resObj.spell.duration.concentration.unit.id,
                        resObj.spell.duration.concentration.value,
                        resObj.spell.range.areaOfEffect.shape.id,
                        resObj.spell.range.areaOfEffect.unit.id,
                        resObj.spell.range.areaOfEffect.value
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function spellDamageTable(resObj, callback) {
                    console.log('insert-spell-04');
                    results = [];
                    vals = [];
                    if (resObj.permissions.need.damage) {
                        sql = 'INSERT INTO adm_def_spell_damage';
                        sql += '("spellId", "diceId", "damageTypeId", "conditionId", "saveAbilityScoreId"';
                        sql += ', "saveEffectId", "attackTypeId", "areaOfEffectShapeId", "areaOfEffectUnitId", "areaOfEffectValue"';
                        sql += ', "projectileCount", "applyAbilityScoreModifier", "abilityScoreId")';
                        sql += ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
                        vals = [
                            resObj.spell.id,
                            resObj.spell.damage.dice.id,
                            resObj.spell.damage.type.id,
                            resObj.spell.damage.condition.id,
                            resObj.spell.damage.savingThrow.abilityScore.id,
                            resObj.spell.damage.savingThrow.effect.id,
                            resObj.spell.damage.attack.type.id,
                            resObj.spell.damage.areaOfEffect.shape.id,
                            resObj.spell.damage.areaOfEffect.unit.id,
                            resObj.spell.damage.areaOfEffect.value,
                            resObj.spell.damage.projectileCount,
                            resObj.spell.damage.applyAbilityScoreModifier,
                            resObj.spell.damage.abilityScore.id ? resObj.spell.damage.abilityScore.id : 0
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
                function lists(resObj, callback) {
                    console.log('insert-spell-05');
                    results = [];
                    vals = [];
                    addComma = false;
                    counter = 0;
                    let advancementIndex = -1;
                    let damageTypeIndex = -1;
                    let conditionIndex = -1;
                    if (resObj.permissions.need.advancementLevelList || resObj.permissions.need.damageTypeList || resObj.permissions.need.conditionList) {
                        sql = 'INSERT INTO adm_core_list';
                        sql += ' ("id")';
                        sql += ' VALUES ';
                        if (resObj.permissions.need.advancementLevelList) {
                            sql += addComma ? ', ' : '';
                            sql += '(nextval(\'adm_seq_core\'))';
                            addComma = true;
                            advancementIndex = counter;
                            counter++;
                        }
                        if (resObj.permissions.need.damageTypeList) {
                            sql += addComma ? ', ' : '';
                            sql += '(nextval(\'adm_seq_core\'))';
                            addComma = true;
                            damageTypeIndex = counter;
                            counter++;
                        }
                        if (resObj.permissions.need.conditionList) {
                            sql += addComma ? ', ' : '';
                            sql += '(nextval(\'adm_seq_core\'))';
                            addComma = true;
                            conditionIndex = counter;
                            counter++;
                        }
                        sql += ' RETURNING id';
                        query = client.query(new pg.Query(sql));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            if (resObj.permissions.need.advancementLevelList) {
                                resObj.spell.damage.advancement.atLevelsListId = results[advancementIndex].id;
                            }
                            if (resObj.permissions.need.damageTypeList) {
                                resObj.spell.damage.damageTypeListId = results[damageTypeIndex].id;
                            }
                            if (resObj.permissions.need.conditionList) {
                                resObj.spell.damage.conditionListId = results[conditionIndex].id;
                            }
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function spellDamageAdvancement(resObj, callback) {
                    console.log('insert-spell-06');
                    results = [];
                    vals = [];
                    if (resObj.permissions.need.damageAdvancement) {
                        sql = 'INSERT INTO adm_def_spell_damage_advancement';
                        sql += '("spellId", "addDiceId", "addProjectileCount", "advancementTypeId", "levelListId", "levelCount")';
                        sql += ' VALUES ($1, $2, $3, $4, $5, $6)';
                        vals = [
                            resObj.spell.id,
                            resObj.spell.damage.advancement.dice.id,
                            resObj.spell.damage.advancement.projectileCount,
                            resObj.spell.damage.advancement.type.id,
                            (resObj.spell.damage.advancement.atLevelsListId) ? resObj.spell.damage.advancement.atLevelsListId : 0,
                            (resObj.spell.damage.advancement.levelCount) ? resObj.spell.damage.advancement.levelCount : 0
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
                function descriptionTable(resObj, callback) {
                    console.log('insert-spell-07');
                    if (resObj.permissions.need.description || resObj.permissions.need.atHigherLevels
                        || resObj.permissions.need.materialComponent || resObj.permissions.need.reactionText) {
                        results = [];
                        vals = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_core_description';
                        sql += ' ("description", "typeId")';
                        sql += ' VALUES ';
                        if (resObj.permissions.need.description) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 2);
                            vals.push(resObj.spell.description);
                            vals.push(itemtypes.TYPE.DESCRIPTION.GENERAL);
                            addComma = true;
                            counter++;
                        }
                        if (resObj.permissions.need.atHigherLevels) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 2);
                            vals.push(resObj.spell.atHigherLevels);
                            vals.push(itemtypes.TYPE.DESCRIPTION.AT_HIGHER_LEVELS);
                            addComma = true;
                            counter++;
                        }
                        if (resObj.permissions.need.materialComponent) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 2);
                            vals.push(resObj.spell.materialComponentText);
                            vals.push(itemtypes.TYPE.DESCRIPTION.SPELL_COMPONENT_TEXT);
                            addComma = true;
                            counter++;
                        }
                        if (resObj.permissions.need.reactionText) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 2);
                            vals.push(resObj.spell.castingTime.text);
                            vals.push(itemtypes.TYPE.DESCRIPTION.REACTION_CASTING_TIME_TEXT);
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
                                    resObj.spell.descriptionId = results[q].id;
                                }
                                if (results[q].typeId == itemtypes.TYPE.DESCRIPTION.AT_HIGHER_LEVELS) {
                                    resObj.spell.atHigherLevelsId = results[q].id;
                                }
                                if (results[q].typeId == itemtypes.TYPE.DESCRIPTION.SPELL_COMPONENT_TEXT) {
                                    resObj.spell.materialComponentTextId = results[q].id;
                                }
                                if (results[q].typeId == itemtypes.TYPE.DESCRIPTION.REACTION_CASTING_TIME_TEXT) {
                                    resObj.spell.reactionCastingTimeTextId = results[q].id;
                                }
                            }
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function linkTable(resObj, callback) {
                    console.log('insert-spell-08');
                    if (resObj.permissions.need.description || resObj.permissions.need.atHigherLevels
                        || resObj.permissions.need.materialComponent || resObj.permissions.need.reactionText
                        || resObj.permissions.need.advancementLevelList || resObj.permissions.need.damageTypeList
                        || resObj.permissions.need.conditionList) {
                        results = [];
                        vals = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_link';
                        sql += ' ("referenceId", "targetId", "typeId")';
                        sql += ' VALUES ';
                        if (resObj.permissions.need.description) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 3);
                            vals.push(resObj.spell.id);
                            vals.push(resObj.spell.descriptionId);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma = true;
                            counter++;
                        }
                        if (resObj.permissions.need.atHigherLevels) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 3);
                            vals.push(resObj.spell.id);
                            vals.push(resObj.spell.atHigherLevelsId);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma = true;
                            counter++;
                        }
                        if (resObj.permissions.need.materialComponent) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 3);
                            vals.push(resObj.spell.id);
                            vals.push(resObj.spell.materialComponentTextId);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma = true;
                            counter++;
                        }
                        if (resObj.permissions.need.reactionText) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 3);
                            vals.push(resObj.spell.id);
                            vals.push(resObj.spell.reactionCastingTimeTextId);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma = true;
                            counter++;
                        }
                        if (resObj.permissions.need.advancementLevelList) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 3);
                            vals.push(resObj.spell.id);
                            vals.push(resObj.spell.damage.advancement.atLevelsListId);
                            vals.push(itemtypes.TYPE.LINK.LIST.ADVANCEMENT_LEVEL);
                            addComma = true;
                            counter++;
                            for (let q = 0; q < resObj.spell.damage.advancement.atLevels.length; q++) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 3);
                                vals.push(resObj.spell.damage.advancement.atLevelsListId);
                                vals.push(resObj.spell.damage.advancement.atLevels[q]);
                                vals.push(itemtypes.TYPE.LINK.LIST.ITEM_ASSIGNMENT);
                                addComma = true;
                                counter++;
                            }
                        }
                        if (resObj.permissions.need.damageTypeList) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 3);
                            vals.push(resObj.spell.id);
                            vals.push(resObj.spell.damage.damageTypeListId);
                            vals.push(itemtypes.TYPE.LINK.LIST.DAMAGE_TYPE);
                            addComma = true;
                            counter++;
                            for (let q = 0; q < resObj.spell.damage.typeList.list.length; q++) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 3);
                                vals.push(resObj.spell.damage.damageTypeListId);
                                vals.push(resObj.spell.damage.typeList.list[q].id);
                                vals.push(itemtypes.TYPE.LINK.LIST.ITEM_ASSIGNMENT);
                                addComma = true;
                                counter++;
                            }
                        }
                        if (resObj.permissions.need.conditionList) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 3);
                            vals.push(resObj.spell.id);
                            vals.push(resObj.spell.damage.conditionListId);
                            vals.push(itemtypes.TYPE.LINK.LIST.CONDITION);
                            addComma = true;
                            counter++;
                            for (let q = 0; q < resObj.spell.damage.conditionList.list.length; q++) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 3);
                                vals.push(resObj.spell.damage.conditionListId);
                                vals.push(resObj.spell.damage.conditionList.list[q].id);
                                vals.push(itemtypes.TYPE.LINK.LIST.ITEM_ASSIGNMENT);
                                addComma = true;
                                counter++;
                            }
                        }
                        if (resObj.permissions.need.spellComponents) {
                            for (let q = 0; q < resObj.spell.components.length; q++) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 3);
                                vals.push(resObj.spell.id);
                                vals.push(resObj.spell.components[q].id);
                                vals.push(itemtypes.TYPE.LINK.SPELL_COMPONENT);
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
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function listCountTable(resObj, callback) {
                    console.log('insert-spell-09');
                    if (resObj.permissions.need.damageTypeList || resObj.permissions.need.conditionList) {
                        results = [];
                        vals = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_def_list_select_count';
                        sql += ' ("listId", "selectCount")';
                        sql += ' VALUES ';
                        if (resObj.permissions.need.damageTypeList) {
                            if (!resObj.spell.damage.typeList.isInclusive) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 2);
                                vals.push(resObj.spell.damage.damageTypeListId);
                                vals.push(resObj.spell.damage.typeList.count);
                                addComma = true;
                                counter++;
                            }
                        }
                        if (resObj.permissions.need.conditionList) {
                            if (!resObj.spell.damage.conditionList.isInclusive) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 2);
                                vals.push(resObj.spell.damage.conditionListId);
                                vals.push(resObj.spell.damage.conditionList.count);
                                addComma = true;
                                counter++;
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
                    } else {
                       return callback(null, resObj);
                    }
                },
                function manageCharts(resObj, callback) {
                    console.log('insert-spell-10');
                    if (resObj.permissions.need.charts) {
                        common.insert.charts(resObj.spell.charts, resObj.spell, function(results) {
                            resObj.spell.charts = results.charts;
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function manageMechanics(resObj, callback) {
                    console.log('insert-spell-11');
                    if (resObj.permissions.need.mechanics) {
                        common.insert.mechanics(resObj.spell.mechanics, resObj.spell, function(results) {
                            resObj.spell.mechanics = results.mechanics;
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function manageSupplementalDescriptions(resObj, callback) {
                    console.log('insert-spell-12');
                    if (resObj.permissions.need.supplementalDescriptions) {
                        common.insert.supplementalDescriptions(resObj.spell.supplementalDescriptions, resObj.spell, function(results) {
                            resObj.spell.supplementalDescriptions = results.supplementalDescriptions;
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function spellDamageSupplemental(resObj, callback) {
                    console.log('insert-spell-13');
                    results = [];
                    vals = [];
                    addComma = false;
                    counter = 0;
                    if (resObj.permissions.need.supplementalDamage) {
                        sql = 'INSERT INTO adm_def_spell_damage_supplemental';
                        sql += ' ("spellId", "diceId", "typeId")';
                        sql += ' VALUES ';
                        for (let q = 0; q < resObj.spell.damage.supplemental.length; q++) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 3);
                            vals.push(resObj.spell.id);
                            vals.push(resObj.spell.damage.supplemental[q].dice.id);
                            vals.push(resObj.spell.damage.supplemental[q].type.id);
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
    app.get('/api/adm/spells', function(req, res) {
        results = [];
        pool.connect(function(err, client, done) {
            if (err) {
                done();
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            sql = 'SELECT i."id", i."itemName" AS "name"';
            sql += ', get_item(i."resourceId") AS "resource"';
            sql += ', spell."isRitual"';
            sql += ', spell."spellLevel" AS "level"';
            sql += ', get_item(spell."schoolId") AS "school"';
            sql += ', get_description(i.id, $2) AS "description"';
            sql += ', CASE WHEN get_description(i.id, $3) IS NULL THEN \'\' ELSE get_description(i.id, $3) END AS "atHigherLevels"';
            sql += ', CASE WHEN get_description(i.id, $4) IS NULL THEN \'\' ELSE get_description(i.id, $4) END AS "materialComponentText"';
            sql += ', json_build_object(';
            sql += '    \'text\', get_description(i.id, $5)';
            sql += '    , \'unit\', get_item(spell."castingTimeUnitId")';
            sql += '    , \'value\', spell."castingTimeValue"';
            sql += ') AS "castingTime"';
            sql += ', json_build_object(';
            sql += '    \'concentration\', json_build_object(';
            sql += '        \'unit\', get_item(spell."concentrationUnitId")';
            sql += '        , \'value\', spell."concentrationValue"';
            sql += '    )';
            sql += '    , \'unit\', get_item(spell."durationUnitId")';
            sql += '    , \'value\', spell."durationValue"';
            sql += ') AS "duration"';
            sql += ', json_build_object(';
            sql += '    \'areaOfEffect\', json_build_object(';
            sql += '        \'shape\', CASE WHEN get_item(spell."rangeAreaOfEffectShapeId") IS NULL THEN get_empty_item() ELSE get_item(spell."rangeAreaOfEffectShapeId") END';
            sql += '        , \'unit\', CASE WHEN get_item(spell."rangeAreaOfEffectUnitId") IS NULL THEN get_empty_item() ELSE get_item(spell."rangeAreaOfEffectUnitId") END';
            sql += '        , \'value\', spell."rangeAreaOfEffectValue"';
            sql += '    )';
            sql += '   , \'unit\', get_item(spell."rangeUnitId")';
            sql += '    , \'value\', spell."rangeValue"';
            sql += ') AS "range"';
            sql += ', CASE WHEN get_charts(i.id) IS NULL THEN \'[]\' ELSE get_charts(i.id) END AS "charts"';
            sql += ', get_array_of_items(i.id, $6) AS "components"';
            sql += ', CASE WHEN get_mechanics(i.id) IS NULL THEN \'[]\' ELSE get_mechanics(i.id) END AS "mechanics"';
            sql += ', CASE WHEN get_supplemental_descriptions(i.id) IS NULL THEN \'[]\' ELSE get_supplemental_descriptions(i.id) END AS "supplementalDescriptions"';
            sql += ', json_build_object(';
            sql += '    \'dice\', CASE WHEN get_dice(dmg."diceId") IS NULL THEN get_empty_dice() ELSE get_dice(dmg."diceId") END';
            sql += '    , \'type\', CASE WHEN get_item(dmg."damageTypeId") IS NULL THEN get_empty_item() ELSE get_item(dmg."damageTypeId") END';
            sql += '    , \'condition\', CASE WHEN get_item(dmg."conditionId") IS NULL THEN get_empty_item() ELSE get_item(dmg."conditionId") END';
            sql += '    , \'projectileCount\', CASE WHEN dmg."projectileCount" IS NULL THEN 0 ELSE dmg."projectileCount" END';
            sql += '    , \'areaOfEffect\', json_build_object(';
            sql += '        \'shape\', CASE WHEN get_item(dmg."areaOfEffectShapeId") IS NULL THEN get_empty_item() ELSE get_item(dmg."areaOfEffectShapeId") END';
            sql += '        , \'unit\', CASE WHEN get_item(dmg."areaOfEffectUnitId") IS NULL THEN get_empty_item() ELSE get_item(dmg."areaOfEffectUnitId") END';
            sql += '        , \'value\', CASE WHEN dmg."areaOfEffectValue" IS NULL THEN 0 ELSE dmg."areaOfEffectValue" END';
            sql += '    )';
            sql += '    , \'attack\', json_build_object(';
            sql += '        \'type\', CASE WHEN get_item(dmg."attackTypeId") IS NULL THEN get_empty_item() ELSE get_item(dmg."attackTypeId") END';
            //sql += '        , \'addedToAttack\', false';
            sql += '    )';
            sql += '    , \'savingThrow\', json_build_object(';
            sql += '        \'abilityScore\', CASE WHEN get_item(dmg."saveAbilityScoreId") IS NULL THEN get_empty_item() ELSE get_item(dmg."saveAbilityScoreId") END';
            sql += '        , \'effect\', CASE WHEN get_item(dmg."saveEffectId") IS NULL THEN get_empty_item() ELSE get_item(dmg."saveEffectId") END';
            //sql += '        , \'isReapeating\', false';
            //sql += '        , \'countToAvoid\', 1';
            sql += '    )';
            sql += '    , \'advancement\', json_build_object(';
            sql += '        \'atLevels\', CASE WHEN get_at_levels_list(i.id) IS NULL THEN \'[]\' ELSE get_at_levels_list(i.id) END';
            sql += '        , \'dice\', CASE WHEN get_dice(dmgadv."addDiceId") IS NULL THEN get_empty_dice() ELSE get_dice(dmgadv."addDiceId") END';
            sql += '        , \'levelCount\', dmgadv."levelCount"';
            sql += '        , \'projectileCount\', CASE WHEN dmgadv."addProjectileCount" IS NULL THEN 0 ELSE dmgadv."addProjectileCount" END';
            sql += '        , \'type\', CASE WHEN get_item(dmgadv."advancementTypeId") IS NULL THEN get_empty_item() ELSE get_item(dmgadv."advancementTypeId") END';
            sql += '    )';
            sql += '    , \'conditionList\',  CASE WHEN get_list_object(i.id, $7) IS NULL THEN json_build_object(\'count\', 1, \'list\', \'[]\', \'isInclusive\', false) ELSE get_list_object(i.id, $7) END';
            sql += '    , \'typeList\', CASE WHEN get_list_object(i.id, $8) IS NULL THEN json_build_object(\'count\', 1, \'list\', \'[]\', \'isInclusive\', false) ELSE get_list_object(i.id, $8) END';
            sql += '    , \'supplemental\', CASE WHEN get_supplemental_damage(i.id) IS NULL THEN \'[]\' ELSE get_supplemental_damage(i.id) END';
            sql += '    , \'applyAbilityScoreModifier\', dmg."applyAbilityScoreModifier"';
            sql += '    , \'abilityScore\', CASE WHEN get_item(dmg."abilityScoreId") IS NULL THEN get_empty_item() ELSE get_item(dmg."abilityScoreId") END';
            sql += ') AS "damage"';
            sql += ' FROM adm_core_item i';
            sql += ' INNER JOIN adm_def_spell spell ON spell."spellId" = i.id';
            sql += ' LEFT OUTER JOIN adm_def_spell_damage dmg ON dmg."spellId" = i.id';
            sql += ' LEFT OUTER JOIN adm_def_spell_damage_advancement dmgadv ON dmgadv."spellId" = i.id';
            sql += ' WHERE i."typeId" = $1';
            sql += ' ORDER BY i."itemName"';
            vals = [
                itemtypes.TYPE.ITEM.SPELL,
                itemtypes.TYPE.DESCRIPTION.GENERAL,
                itemtypes.TYPE.DESCRIPTION.AT_HIGHER_LEVELS,
                itemtypes.TYPE.DESCRIPTION.SPELL_COMPONENT_TEXT,
                itemtypes.TYPE.DESCRIPTION.REACTION_CASTING_TIME_TEXT,
                itemtypes.TYPE.LINK.SPELL_COMPONENT,
                itemtypes.TYPE.LINK.LIST.CONDITION,
                itemtypes.TYPE.LINK.LIST.DAMAGE_TYPE
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