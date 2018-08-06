module.exports = function(app, pg, async, pool, itemtypes, common) {
    let results = [];
    let sql = '';
    let vals = [];
    let query = null;
    let tmp = null;
    let resObj = null;
    let parameterArray = null;
    let addComma = false;
    app.delete('/api/adm/proficiency/:id', function(req, res) {
        results = [];
        vals = [];
        sql = '';
        query = null;
        pool.connect(function(err, client, done) {
            if (err) {
                //done();
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            async.waterfall([
                function init(cb) {
                    resObj = req.body;
                    cb(null, resObj);
                },
                function itemTable(resObj, callback) {
                    console.log('proficiency-01');
                    results = [];
                    vals = [];
                    sql = 'DELETE FROM adm_core_item';
                    sql += ' WHERE id = $1';
                    sql += ' OR id IN (SELECT "targetId" FROM adm_link WHERE "referenceId" = $1)';
                    vals = [
                        req.params.id
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        //done();
                        return callback(null, resObj);
                    });
                },
                function proficiencyTable(resObj, callback) {
                    console.log('proficiency-02');
                    results = [];
                    vals = [];
                    sql = 'DELETE FROM adm_def_proficiency';
                    sql += ' WHERE "proficiencyId" = $1';
                    vals = [
                        req.params.id
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        //done();
                        return callback(null, resObj);
                    });
                },
                function proficiencyAbilityScoreTable(resObj, callback) {
                    console.log('proficiency-03');
                    results = [];
                    vals = [];
                    sql = 'DELETE FROM adm_def_proficiency_ability_score';
                    sql += ' WHERE "proficiencyId" = $1';
                    vals = [
                        req.params.id
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        //done();
                        return callback(null, resObj);
                    });
                },
                function proficiencyLanguageTable(resObj, callback) {
                    console.log('proficiency-04');
                    results = [];
                    vals = [];
                    sql = 'DELETE FROM adm_def_proficiency_language';
                    sql += ' WHERE "proficiencyId" = $1';
                    vals = [
                        req.params.id
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        //done();
                        return callback(null, resObj);
                    });
                },
                function linkTable(resObj, callback) {
                    console.log('proficiency-05');
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
                        //done();
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
    app.put('/api/adm/proficiency/:id', function(req, res) {
        results = [];
        vals = [];
        sql = '';
        query = null;
        pool.connect(function(err, client, done) {
            if (err) {
                //done();
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            async.waterfall([
                function init(cb) {
                    resObj = req.body;
                    resObj.perm = {};
                    resObj.perm.needLanguage = false;
                    resObj.perm.needAbility = false;
                    resObj.perm.hasDialects = false;
                    if (resObj.proficiency.abilityScore && resObj.proficiency.abilityScore.id != 0) {
                        resObj.perm.needAbility = true;
                    }
                    if (resObj.proficiency.language && resObj.proficiency.language.script && resObj.proficiency.language.script.id != 0) {
                        resObj.perm.needLanguage = true;
                        if (resObj.proficiency.language.dialects && resObj.proficiency.language.dialects.length != 0) {
                            resObj.perm.hasDialects = true;
                        }
                    }
                    cb(null, resObj);
                },
                function itemTable(resObj, callback) {
                    console.log('proficiency-01');
                    results = [];
                    vals = [];
                    sql = 'UPDATE adm_core_item';
                    sql += ' SET "itemName" = $2';
                    sql += ', "resourceId" = $3';
                    sql += ' WHERE id = $1';
                    vals = [
                        resObj.proficiency.id,
                        resObj.proficiency.name,
                        resObj.proficiency.resource.id
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        //done();
                        return callback(null, resObj);
                    });
                },
                function proficiencyTable(resObj, callback) {
                    console.log('proficiency-02');
                    results = [];
                    vals = [];
                    sql = 'UPDATE adm_def_proficiency';
                    sql += ' SET "categoryId" = $2';
                    sql += ' WHERE "proficiencyId" = $1';
                    vals = [
                        resObj.proficiency.id,
                        resObj.proficiency.category.id
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        //done();
                        return callback(null, resObj);
                    });
                },
                function abilityTable(resObj, callback) {
                    console.log('proficiency-03');
                    results = [];
                    vals = [];
                    if (resObj.perm.needAbility) {
                        sql = 'UPDATE adm_def_proficiency_ability_score';
                        sql += ' SET "abilityScoreId" = $2';
                        sql += ' WHERE "proficiencyId" = $1';
                        vals = [
                            resObj.proficiency.id,
                            resObj.proficiency.abilityScore.id
                        ];
                    } else {
                        sql = 'DELETE FROM adm_def_proficiency_ability_score';
                        sql += ' WHERE "proficiencyId" = $1';
                        vals = [
                            resObj.proficiency.id
                        ];
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        //done();
                        return callback(null, resObj);
                    });
                },
                function languageTable(resObj, callback) {
                    console.log('proficiency-04');
                    results = [];
                    vals = [];
                    if (resObj.perm.needLanguage) {
                        sql = 'UPDATE adm_def_proficiency_language';
                        sql += ' SET "rarityId" = $2';
                        sql += ', "scriptId" = $3';
                        sql += ' WHERE "proficiencyId" = $1';
                        vals = [
                            resObj.proficiency.id,
                            resObj.proficiency.language.rarity.id,
                            resObj.proficiency.language.script.id
                        ];
                    } else {
                        sql = 'DELETE FROM adm_def_proficiency_language';
                        sql += ' WHERE "proficiencyId" = $1';
                        vals = [
                            resObj.proficiency.id
                        ];
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        //done();
                        return callback(null, resObj);
                    });
                },
                function dialects(resObj, callback) {
                    console.log('proficiency-05');
                    results = [];
                    vals = [];
                    if (resObj.perm.hasDialects) {
                        let cols = ['itemName', 'typeId', 'resourceId'];
                        let dats = ['varchar', 'bigint', 'bigint'];
                        sql = common.parameterArray.insertNewRecords(resObj.proficiency.language.dialects, 'adm_core_item', cols, dats);
                        for (let q = 0; q < resObj.proficiency.language.dialects.length; q++) {
                            vals.push(resObj.proficiency.language.dialects[q].name);
                            vals.push(itemtypes.TYPE.ITEM.DIALECT);
                            vals.push(resObj.proficiency.resource.id);
                        }
                    } else {
                        sql = 'DELETE FROM adm_core_item';
                        sql += ' WHERE id IN (SELECT "targetId" FROM adm_link WHERE "referenceId" = $1 AND "typeId" = $2)';
                        vals = [
                            resObj.proficiency.id,
                            itemtypes.TYPE.LINK.DIALECT
                        ];
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        //done();
                        if (resObj.perm.hasDialects) {
                            for (let q = 0; q < resObj.proficiency.language.dialects.length; q++) {
                                for (let w = 0; w < results.length; w++) {
                                    if (resObj.proficiency.language.dialects[q].name == results[w].name) {
                                        resObj.proficiency.language.dialects[q].id = results[w].id;
                                        resObj.proficiency.language.dialects[q].addLink = true;
                                        console.log(resObj.proficiency.language.dialects[q]);
                                    }
                                }
                            }
                        }
                        return callback(null, resObj);
                    });
                },
                function dialectLinks(resObj, callback) {
                    console.log('proficiency-06');
                    results = [];
                    vals = [];
                    if (resObj.perm.hasDialects) {
                        let cols = ['referenceId', 'targetId', 'typeId'];
                        let dats = ['bigint', 'bigint', 'bigint'];
                        sql = common.parameterArray.insertNewRecords(resObj.proficiency.language.dialects, 'adm_link', cols, dats);
                        for (let q = 0; q < resObj.proficiency.language.dialects.length; q++) {
                            vals.push(resObj.proficiency.id);
                            vals.push(resObj.proficiency.language.dialects[q].id);
                            vals.push(itemtypes.TYPE.ITEM.DIALECT);
                        }
                        
                    } else {
                        sql = 'DELETE FROM adm_link';
                        sql += ' WHERE "referenceId" = $1 AND "typeId" = $2';
                        vals = [
                            resObj.proficiency.id,
                            itemtypes.TYPE.LINK.DIALECT
                        ];
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        //done();
                        return callback(null, resObj);
                    });
                },
                function removeUnneededDialectLinks(resObj, callback) {
                    console.log('proficiency-07');
                    results = [];
                    vals = [];
                    if (resObj.perm.hasDialects) {
                        sql = 'DELETE FROM adm_link';
                        sql += ' WHERE "referenceId" = $1';
                        sql += ' AND "typeId" = $2';
                        sql += ' AND "targetId" NOT IN (';
                        vals = [
                            resObj.proficiency.id,
                            itemtypes.TYPE.LINK.DIALECT
                        ];
                        addComma = false;
                        for (let q = 0; q < resObj.proficiency.language.dialects.length; q++) {
                            sql += addComma ? ', ' : '';
                            sql += '$' + (q + 3).toString();
                            vals.push(resObj.proficiency.language.dialects[q].id);
                            addComma = true;
                        }
                        sql += ')';
                        query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            //done();
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function removeUnneededDialectItems(resObj, callback) {
                    console.log('proficiency-08');
                    results = [];
                    vals = [];
                    if (resObj.perm.hasDialects) {
                        sql = 'DELETE FROM adm_core_item';
                        sql += ' WHERE "typeId" = $1';
                        sql += ' AND id NOT IN (SELECT "targetId" FROM adm_link WHERE "typeId" = $2)';
                        vals = [
                            itemtypes.TYPE.ITEM.DIALECT,
                            itemtypes.TYPE.LINK.DIALECT
                        ];
                        query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            //done();
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
    app.post('/api/adm/proficiency', function(req, res){
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
                    resObj.perm = {};
                    resObj.perm.needLanguage = false;
                    resObj.perm.needAbility = false;
                    resObj.perm.hasDialects = false;
                    if (resObj.proficiency.abilityScore && resObj.proficiency.abilityScore.id != 0) {
                        resObj.perm.needAbility = true;
                    }
                    if (resObj.proficiency.language && resObj.proficiency.language.script && resObj.proficiency.language.script.id != 0) {
                        resObj.perm.needLanguage = true;
                        if (resObj.proficiency.language.dialects && resObj.proficiency.language.dialects.length != 0) {
                            resObj.perm.hasDialects = true;
                        }
                    }
                    cb(null, resObj);
                },
                function itemTable(resObj, callback) {
                    console.log('proficiency-01');
                    results = [];
                    vals = [];
                    sql = 'INSERT INTO adm_core_item';
                    sql += '("itemName", "typeId", "resourceId")';
                    sql += 'VALUES ($1, $2, $3) RETURNING id;';
                    vals = [
                        resObj.proficiency.name,
                        itemtypes.TYPE.ITEM.PROFICIENCY,
                        resObj.proficiency.resource.id
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        //done();
                        resObj.proficiency.id = parseInt(results[0].id);
                        return callback(null, resObj);
                    });
                },
                function proficiencyTable(resObj, callback) {
                    console.log('proficiency-02');
                    results = [];
                    vals = [];
                    sql = 'INSERT INTO adm_def_proficiency';
                    sql += '("proficiencyId", "categoryId")';
                    sql += 'VALUES ($1, $2)';
                    vals = [
                        resObj.proficiency.id,
                        resObj.proficiency.category.id
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        //done();
                        return callback(null, resObj);
                    });
                },
                function abilityTable(resObj, callback) {
                    console.log('proficiency-03');
                    if (resObj.perm.needAbility) {
                        results = [];
                        vals = [];
                        sql = 'INSERT INTO adm_def_proficiency_ability_score';
                        sql += '("proficiencyId", "abilityScoreId")';
                        sql += 'VALUES ($1, $2)';
                        vals = [
                            resObj.proficiency.id,
                            resObj.proficiency.abilityScore.id
                        ];
                        query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            //done();
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function languageTable(resObj, callback) {
                    console.log('proficiency-04');
                    if (resObj.perm.needLanguage) {
                        results = [];
                        vals = [];
                        sql = 'INSERT INTO adm_def_proficiency_language';
                        sql += '("proficiencyId", "rarityId", "scriptId")';
                        sql += 'VALUES ($1, $2, $3)';
                        vals = [
                            resObj.proficiency.id,
                            resObj.proficiency.language.rarity.id,
                            resObj.proficiency.language.script.id
                        ];
                        query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            //done();
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function dialects(resObj, callback) {
                    console.log('proficiency-05');
                    if (resObj.perm.hasDialects) {
                        results = [];
                        vals = [];
                        sql = 'INSERT INTO adm_core_item';
                        sql += ' ("itemName", "typeId", "resourceId")';
                        sql += ' VALUES ';
                        needComma = false;
                        parameterArray = common.parameterArray.resetValues(3);
                        for (let q = 0; q < resObj.proficiency.language.dialects.length; q++) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.proficiency.language.dialects[q].name);
                            vals.push(itemtypes.TYPE.ITEM.DIALECT);
                            vals.push(resObj.proficiency.resource.id);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        sql += ' RETURNING id, "itemName" AS "name";';
                        query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            //done();
                            console.log(resObj.proficiency.language.dialects.length);
                            for (let q = 0; q < resObj.proficiency.language.dialects.length; q++) {
                                console.log(resObj.proficiency.language.dialects[q]);
                                for (let w = 0; w < results.length; w++) {
                                    if (resObj.proficiency.language.dialects[q].name == results[w].name) {
                                        console.log('---' + resObj.proficiency.language.dialects[q].name);
                                        resObj.proficiency.language.dialects[q].id = results[w].id;
                                    }
                                }
                            }
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function dialectLinks(resObj, callback) {
                    console.log('proficiency-06');
                    if (resObj.perm.hasDialects) {
                        results = [];
                        vals = [];
                        sql = 'INSERT INTO adm_link';
                        sql += ' ("referenceId", "targetId", "typeId")';
                        sql += ' VALUES ';
                        addComma = false;
                        parameterArray = common.parameterArray.resetValues(3);
                        for (let q = 0; q < resObj.proficiency.language.dialects.length; q++) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.proficiency.id);
                            vals.push(resObj.proficiency.language.dialects[q].id);
                            vals.push(itemtypes.TYPE.LINK.DIALECT);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        console.log(sql);
                        query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            //done();
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
    app.get('/api/adm/proficiencies', function(req, res) {
        results = [];
        pool.connect(function(err, client, done) {
            if (err) {
                //done();
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            sql = 'SELECT i."id", i."itemName" AS "name"';
            sql += ', get_item(i."resourceId") AS "resource"';
            sql += ', get_item(prof."categoryId") AS "category"';
            sql += ', get_item(abscore."abilityScoreId") AS "abilityScore"';
            sql += ', json_build_object(';
            sql += '    \'dialects\', get_link_array(i.id, $2)';
            sql += '    , \'rarity\', get_item(lang."rarityId")';
            sql += '    , \'script\', get_item(lang."scriptId")';
            sql += ') AS "language"';
            sql += ' FROM adm_core_item i';
            sql += ' INNER JOIN adm_def_proficiency prof ON prof."proficiencyId" = i.id';
            sql += ' LEFT OUTER JOIN adm_def_proficiency_ability_score abscore ON abscore."proficiencyId" = i.id';
            sql += ' LEFT OUTER JOIN adm_def_proficiency_language lang ON lang."proficiencyId" = i.id';
            sql += ' WHERE i."typeId" = $1';
            sql += ' ORDER BY i."itemName"';
            vals = [
                itemtypes.TYPE.ITEM.PROFICIENCY,
                itemtypes.TYPE.LINK.DIALECT
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