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
    app.delete('/api/adm/background/:id', function(req, res) {
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
                    console.log('delete-background-01');
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
                function backgroundTable(resObj, callback) {
                    console.log('delete-background-02');
                    results = [];
                    vals = [];
                    sql = 'DELETE FROM adm_def_background';
                    sql += ' WHERE "backgroundId" = $1';
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
                    console.log('delete-background-03');
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
                    console.log('delete-background-04');
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
                },
                function proficiencies(resObj, callback) {
                    console.log('delete-background-05');
                    return callback(null, resObj);
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
    app.put('/api/adm/background/:id', function(req, res) {
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
                    
                    resObj.permissions.need.anyDescription = false;
                    resObj.permissions.need.anyLink = false;
                    resObj.permissions.need.description = false;
                    resObj.permissions.need.suggestedCharacteristics = false;
                    resObj.permissions.need.proficiencies = false;
                    
                    resObj.permissions.has.anyDescription = false;
                    resObj.permissions.has.anyLink = false;
                    resObj.permissions.has.description = false;
                    resObj.permissions.has.suggestedCharacteristics = false;
                    resObj.permissions.has.proficiencies = false;
                    
                    if (resObj.background.description && resObj.background.description.length != 0) {
                        resObj.permissions.need.anyDescription = true;
                        resObj.permissions.need.anyLink = true;
                        resObj.permissions.need.description = true;
                    }
                    if (resObj.background.suggestedCharacteristics && resObj.background.suggestedCharacteristics.length != 0) {
                        resObj.permissions.need.anyDescription = true;
                        resObj.permissions.need.anyLink = true;
                        resObj.permissions.need.suggestedCharacteristics = true;
                    }
                    if (resObj.background.proficiencies) {
                        if (resObj.background.proficiencies.assigned && resObj.background.proficiencies.assigned.length != 0) {
                            resObj.permissions.need.proficiencies = true;
                        }
                        if (resObj.background.proficiencies.select) {
                            if ((resObj.background.proficiencies.select.category && resObj.background.proficiencies.select.category.length != 0)
                               || (resObj.background.proficiencies.select.list && resObj.background.proficiencies.select.category.list != 0)) {
                                resObj.permissions.need.proficiencies = true;
                            }
                        }
                    }
                    cb(null, resObj);
                },
                function itemTable(resObj, callback) {
                    console.log('update-background-01');
                    results = [];
                    vals = [];
                    sql = 'UPDATE adm_core_item';
                    sql += ' SET "itemName" = $2';
                    sql += ' WHERE id = $1';
                    vals = [
                        resObj.background.id,
                        resObj.background.name
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
                    console.log('update-background-02');
                    results = [];
                    vals = [];
                    sql = 'SELECT i.id';
                    sql += ', desclnk."targetId" AS "descriptionId"';
                    sql += ', suggcharlnk."targetId" AS "suggestedCharacteristicsId"';
                    sql += ' FROM adm_core_item i';
                    sql += ' LEFT OUTER JOIN adm_link desclnk ON desclnk."referenceId" = i.id AND desclnk."typeId" = $2';
                    sql += ' LEFT OUTER JOIN adm_link suggcharlnk ON suggcharlnk."referenceId" = i.id AND desclnk."typeId" = $3';
                    sql += ' WHERE i.id = $1';
                    vals = [
                        resObj.background.id,
                        itemtypes.TYPE.DESCRIPTION.GENERAL,
                        itemtypes.TYPE.DESCRIPTION.SUGGESTED_CHARACTERISTICS
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        if (results.length != 0) {
                            resObj.permissions.has.description = (results[0].descriptionId === null);
                            resObj.background.results[0].descriptionId = results[0].descriptionId;
                            resObj.permissions.has.suggestedCharacteristics = (results[0].suggestedCharacteristicsId === null);
                            resObj.background.results[0].suggestedCharacteristicsId = results[0].suggestedCharacteristicsId;
                            if (results[0].descriptionId !== null || results[0].suggestedCharacteristicsId !== null) {
                                resObj.permissions.has.anyDescription = true;
                            }
                            if (results[0].descriptionId !== null || results[0].suggestedCharacteristicsId !== null) {
                                resObj.permissions.has.anyLink = true;
                            }
                        }
                        return callback(null, resObj);
                    });
                },
                function backgroundTable(resObj, callback) {
                    console.log('update-background-03');
                    results = [];
                    vals = [];
                    sql = 'UPDATE adm_def_background';
                    sql += ' SET "startingGold" = $2';
                    sql += ' WHERE "backgroundId" = $1';
                    vals = [
                        resObj.background.id,
                        resObj.background.equipment.startingGold
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
                    console.log('update-background-04');
                    results = [];
                    vals = [];
                    if ((resObj.permissions.need.description && resObj.permissions.has.description)
                        || (resObj.permissions.need.suggestedCharacteristics && !resObj.permissions.has.suggestedCharacteristics)) {
                        sql = 'UPDATE adm_core_description AS i';
                        sql += ' SET "description" = c."description"';
                        sql += ' FROM (VALUES';
                        addComma = false;
                        counter = 0;
                        if (resObj.permissions.need.description && resObj.permissions.has.description) {
                            sql += addComma ? ', ' : '';
                            sql += '($' + ((counter * 2) + 1).toString() + ', $' + ((counter * 2) + 2).toString() + ')';
                            vals.push(resObj.background.descriptionId);
                            vals.push(resObj.background.description);
                            counter++;
                            addComma = true;
                        }
                        if (resObj.permissions.need.suggestedCharacteristics && resObj.permissions.has.suggestedCharacteristics) {
                            sql += addComma ? ', ' : '';
                            sql += '($' + ((counter * 2) + 1).toString() + ', $' + ((counter * 2) + 2).toString() + ')';
                            vals.push(resObj.background.suggestedCharacteristicsId);
                            vals.push(resObj.background.suggestedCharacteristics);
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
                    console.log('update-background-05');
                    results = [];
                    vals = [];
                    if ((resObj.permissions.need.description && !resObj.permissions.has.description)
                        || (resObj.permissions.need.suggestedCharacteristics && !resObj.permissions.has.suggestedCharacteristics)) {
                        sql = 'INSERT INTO adm_core_description';
                        sql += ' ("description", "typeId")';
                        sql += ' VALUES ';
                        addComma = false;
                        counter = 0;
                        if (resObj.permissions.need.description && !resObj.permissions.has.description) {
                            sql += addComma ? ', ' : '';
                            sql += '($' + ((counter * 2) + 1).toString() + ', $' + ((counter * 2) + 2).toString() + ')';
                            vals.push(resObj.background.description);
                            vals.push(itemtypes.TYPE.DESCRIPTION.GENERAL);
                            addComma = true;
                            counter++;
                        }
                        if (resObj.permissions.need.suggestedCharacteristics && !resObj.permissions.has.suggestedCharacteristics) {
                            sql += addComma ? ', ' : '';
                            sql += '($' + ((counter * 2) + 1).toString() + ', $' + ((counter * 2) + 2).toString() + ')';
                            vals.push(resObj.background.suggestedCharacteristics);
                            vals.push(itemtypes.TYPE.DESCRIPTION.SUGGESTED_CHARACTERISTICS);
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
                                    resObj.background.descriptionId = results[q].id;
                                }
                                if (results[q].typeId == itemtypes.TYPE.DESCRIPTION.WEAPON_SPECIAL) {
                                    resObj.background.specialDescriptionId = results[q].id;
                                }
                            }
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function deleteDescriptionTable(resObj, callback) {
                    console.log('update-background-06');
                    results = [];
                    vals = [];
                    if ((resObj.permissions.has.description && !resObj.permissions.need.description)
                        || (resObj.permissions.has.suggestedCharacteristics && !resObj.permissions.need.suggestedCharacteristics)) {
                        sql = 'DELETE FROM adm_core_description';
                        addComma = false;
                        counter = 0;
                        if (!resObj.permissions.need.description) {
                            sql += addComma ? ' OR ' : ' WHERE ';
                            sql += ' id = $' + (counter + 1).toString();
                            vals.push(resObj.background.descriptionId);
                            addComma = true;
                            conuter++;
                        }
                        if (!resObj.permissions.need.suggestedCharacteristics) {
                            sql += addComma ? ' OR ' : ' WHERE ';
                            sql += ' id = $' + (counter + 1).toString();
                            vals.push(resObj.background.specialDescriptionId);
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
                    console.log('update-background-07');
                    stepInt++;
                    results = [];
                    vals = [];
                    if (resObj.permissions.need.description || resObj.permissions.need.suggestedCharacteristics) {
                        sql = 'with vals as (';
                        addComma = false;
                        counter = 0;
                        if (resObj.permissions.need.description) {
                            sql += addComma ? ' UNION ' : '';
                            sql += 'SELECT $' + ((counter * 3) + 1).toString() + ' :: bigint as "referenceId"';
                            sql += ', $' + ((counter * 3) + 2).toString() + ' :: bigint as "targetId"';
                            sql += ', $' + ((counter * 3) + 3).toString() + ' :: bigint as "typeId"';
                            vals.push(resObj.background.id);
                            vals.push(resObj.background.descriptionId);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma = true;
                            counter++;
                        }
                        if (resObj.permissions.need.suggestedCharacteristics) {
                            sql += addComma ? ' UNION ' : '';
                            sql += 'SELECT $' + ((counter * 3) + 1).toString() + ' :: bigint as "referenceId"';
                            sql += ', $' + ((counter * 3) + 2).toString() + ' :: bigint as "targetId"';
                            sql += ', $' + ((counter * 3) + 3).toString() + ' :: bigint as "typeId"';
                            vals.push(resObj.background.id);
                            vals.push(resObj.background.suggestedCharacteristicsId);
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
                    console.log('update-background-08');
                    results = [];
                    vals = [];
                    if ((resObj.permissions.has.description && !resObj.permissions.need.description)
                        || (resObj.permissions.has.suggestedCharacteristics && !resObj.permissions.need.suggestedCharacteristics)) {
                        sql = 'DELETE FROM adm_link';
                        addComma = false;
                        counter = 0;
                        let addComma2 = false;
                        if ((resObj.permissions.has.description && !resObj.permissions.need.description)
                           || (resObj.permissions.has.suggestedCharacteristics && !resObj.permissions.need.suggestedCharacteristics)) {
                            sql += addComma ? ' OR ' : ' WHERE ';
                            sql += '(';
                            sql += '"referenceId" = $' + (counter + 1).toString();
                            sql += ' AND "typeId" = $' + (counter + 2).toString();
                            sql += ' AND "targetId" IN (';
                            vals.push(resObj.background.id);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma2 = false;
                            if (resObj.permissions.has.description && !resObj.permissions.need.description) {
                                sql += addComma2 ? ', ' : '';
                                sql += '$' + (counter + 3).toString();
                                vals.push(resObj.background.descriptionId);
                                counter++
                                addComma2 = true;
                            }
                            if (resObj.permissions.has.suggestedCharacteristics && !resObj.permissions.need.suggestedCharacteristics) {
                                sql += addComma2 ? ', ' : '';
                                sql += '$' + (counter + 3).toString();
                                vals.push(resObj.background.suggestedCharacteristicsId);
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
                },
                function manageProficiencies(resObj, callback) {
                    if (resObj.permissions.need.proficiencies) {
                        
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
    app.post('/api/adm/background', function(req, res){
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
                    
                    resObj.permissions.need.anyDescription = false;
                    resObj.permissions.need.anyLink = false;
                    resObj.permissions.need.description = false;
                    resObj.permissions.need.suggestedCharacteristics = false;
                    resObj.permissions.need.proficiencies = false;
                    resObj.permissions.need.assignedEquipment = false;
                    resObj.permissions.need.feature = false;
                    
                    if (resObj.background.description && resObj.background.description.length != 0) {
                        resObj.permissions.need.anyDescription = true;
                        resObj.permissions.need.anyLink = true;
                        resObj.permissions.need.description = true;
                    }
                    if (resObj.background.suggestedCharacteristics && resObj.background.suggestedCharacteristics.length != 0) {
                        resObj.permissions.need.anyDescription = true;
                        resObj.permissions.need.anyLink = true;
                        resObj.permissions.need.suggestedCharacteristics = true;
                    }
                    if (resObj.background.proficiencies) {
                        if (resObj.background.proficiencies.assigned && resObj.background.proficiencies.assigned.length != 0) {
                            resObj.permissions.need.proficiencies = true;
                        }
                        if (resObj.background.proficiencies.select) {
                            if ((resObj.background.proficiencies.select.category && resObj.background.proficiencies.select.category.length != 0)
                               || (resObj.background.proficiencies.select.list && resObj.background.proficiencies.select.category.list != 0)) {
                                resObj.permissions.need.proficiencies = true;
                            }
                        }
                    }
                    if (resObj.background.equipment && resObj.background.equipment.assigned && resObj.background.equipment.assigned.length != 0) {
                        resObj.permissions.need.assignedEquipment = true;
                    }
                    if (resObj.background.feature && resObj.background.feature.name && resObj.background.feature.name.length != 0
                       && resObj.background.feature.description && resObj.background.feature.description.length != 0) {
                        resObj.permissions.need.feature = true;
                    }
                    cb(null, resObj);
                },
                function itemTable(resObj, callback) {
                    console.log('insert-background-01');
                    results = [];
                    vals = [];
                    vals = [
                        resObj.background.name,
                        itemtypes.TYPE.ITEM.BACKGROUND,
                        resObj.background.resource.id
                    ];
                    sql = 'INSERT INTO adm_core_item';
                    sql += '("itemName", "typeId", "resourceId")';
                    sql += ' VALUES ($1, $2, $3)';
                    sql += ' RETURNING id;';
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        resObj.background.id = parseInt(results[0].id);
                        return callback(null, resObj);
                    });
                },
                function backgroundTable(resObj, callback) {
                    console.log('insert-background-02');
                    results = [];
                    vals = [];
                    sql = 'INSERT INTO adm_def_background';
                    sql += '("backgroundId", "startingGold")';
                    sql += 'VALUES ($1, $2)';
                    vals = [
                        resObj.background.id,
                        resObj.background.equipment.startingGold
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
                    console.log('insert-background-03');
                    if (resObj.permissions.need.anyDescription) {
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
                            vals.push(resObj.background.description);
                            vals.push(itemtypes.TYPE.DESCRIPTION.GENERAL);
                            addComma = true;
                            counter++;
                        }
                        if (resObj.permissions.need.suggestedCharacteristics) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 2);
                            vals.push(resObj.background.suggestedCharacteristics);
                            vals.push(itemtypes.TYPE.DESCRIPTION.SUGGESTED_CHARACTERISTICS);
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
                                    resObj.background.descriptionId = results[q].id;
                                }
                                if (results[q].typeId == itemtypes.TYPE.DESCRIPTION.SUGGESTED_CHARACTERISTICS) {
                                    resObj.background.suggestedCharacteristicsId = results[q].id;
                                }
                            }
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function linkTable(resObj, callback) {
                    console.log('insert-background-04');
                    if (resObj.permissions.need.anyLink) {
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
                            vals.push(resObj.background.id);
                            vals.push(resObj.background.descriptionId);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma = true;
                            counter++;
                        }
                        if (resObj.permissions.need.suggestedCharacteristics) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 3);
                            vals.push(resObj.background.id);
                            vals.push(resObj.background.suggestedCharacteristicsId);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma = true;
                            counter++;
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
                function manageProficiencies(resObj, callback) {
                    console.log('insert-background-05');
                    if (resObj.permissions.need.proficiencies) {
                        common.insert.proficiencies(resObj.background, function(results) {
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function manageAssignedEquipment(resObj, callback) {
                    console.log('insert-background-06');
                    if (resObj.permissions.need.assignedEquipment) {
                        common.insert.assignedEquipment(resObj.background.equipment, function(results) {
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function manageFeature(resObj, callback) {
                    console.log('insert-background-07');
                    if (resObj.permissions.need.feature) {
                        common.insert.feature(resObj.background, function(results) {
                            resObj.background.feature = results.feature;
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
    app.get('/api/adm/backgrounds', function(req, res) {
        results = [];
        pool.connect(function(err, client, done) {
            if (err) {
                done();
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            sql = 'SELECT i."id", i."itemName" AS "name"';
            sql += ', get_item(i."resourceId") AS "resource"';
            sql += ', get_description(i.id, $2) AS "description"';
            sql += ', get_description(i.id, $3) AS "suggestedCharacteristics"';
            sql += ', json_build_object (';
            sql += '    \'startingGold\', bg."startingGold"';
            sql += '    , \'assignedEquipment\', \'[]\'';
            sql += ') AS "equipment"';
            sql += ', CASE WHEN get_feature(i.id) IS NULL THEN \'{}\' ELSE get_feature(i.id) AS "feature"';
            sql += ', \'[]\' AS "charts"';
            sql += ', \'{}\' AS "proficiencies"';
            sql += ' FROM adm_core_item i';
            sql += ' INNER JOIN adm_def_background bg ON bg."backgroundId" = i.id'
            sql += ' WHERE i."typeId" = $1';
            sql += ' ORDER BY i."itemName"';
            vals = [
                itemtypes.TYPE.ITEM.BACKGROUND,
                itemtypes.TYPE.DESCRIPTION.GENERAL,
                itemtypes.TYPE.DESCRIPTION.SUGGESTED_CHARACTERISTICS
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