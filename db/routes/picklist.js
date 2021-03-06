module.exports = function(app, pg, async, pool, itemtypes, common) {
    let results = [];
    let sql = '';
    let vals = [];
    let query = null;
    let resObj = null;
    let parameterArray = null;
    let addComma = false;
    let counter = 0;
    app.put('/api/adm/picklist/item/:id', function(req, res) {
        results = [];
        vals = [];
        sql = '';
        query = null;
        pool.connect(function(err, client, done) {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            async.waterfall([
                function init(cb) {
                    resObj = req.body;
                    resObj.permissions = {};
                    resObj.permissions.hasDescription = false;
                    resObj.permissions.descriptionExists = false;
                    if (resObj.item.description && resObj.item.description.lenth != 0) {
                        resObj.permissions.hasDescription = true;
                    }
                    resObj.item.descriptionId = 0;
                    cb(null, resObj);
                },
                function checkForExistingDescription(resObj, callback) {
                    //console.log('item-01');
                    results = [];
                    sql = 'SELECT id, description';
                    sql += ' FROM adm_core_description';
                    sql += ' WHERE id IN (SELECT "targetId" FROM adm_link lnk WHERE lnk."referenceId" = $1 AND lnk."typeId" = $2)';
                    sql += ' AND "typeId" = $3';
                    vals = [
                        resObj.item.id,
                        itemtypes.TYPE.LINK.DESCRIPTION,
                        itemtypes.TYPE.DESCRIPTION.GENERAL
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        if (results.length != 0) {
                            resObj.permissions.descriptionExists = true;
                            resObj.item.descriptionId = results[0].id;
                        }
                        return callback(null, resObj);
                    });
                },
                function descriptionTable(resObj, callback) {
                    //console.log('item-02');
                    results = [];
                    if (resObj.permissions.hasDescription && resObj.permissions.descriptionExists) {
                        //update description
                        sql = 'UPDATE adm_core_description';
                        sql += ' SET description = $1';
                        sql += ' WHERE id = $2';
                        vals = [
                            resObj.item.description,
                            resObj.item.descriptionId
                        ];
                    } else if (resObj.permissions.hasDescription && !resObj.permissions.descriptionExists) {
                        //insert description
                        sql = 'INSERT INTO adm_core_description';
                        sql += ' ("description", "typeId")';
                        sql += ' VALUES ($1, $2) RETURNING id';
                        vals = [
                            resObj.item.description,
                            itemtypes.TYPE.DESCRIPTION.GENERAL
                        ];
                    } else {
                        //delete description
                        sql = 'DELETE FROM adm_core_description';
                        sql += ' WHERE id = $1';
                        vals = [
                            resObj.item.descriptionId
                        ]
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        if (results.length != 0) {
                            if (results[0] && results[0].id && results[0].id != 0) {
                                resObj.item.descriptionId = results[0].id;
                            }
                        }
                        return callback(null, resObj);
                    });
                },
                function linkTable(resObj, callback) {
                    //console.log('item-03');
                    results = [];
                    if (resObj.permissions.hasDescription && resObj.permissions.descriptionExists) {
                        //update description
                        return callback(null, resObj);
                    } else if (resObj.permissions.hasDescription && !resObj.permissions.descriptionExists) {
                        //insert description
                        sql = 'INSERT INTO adm_link';
                        sql += ' ("referenceId", "targetId", "typeId")';
                        sql += ' VALUES ($1, $2, $3) RETURNING id';
                        vals = [
                            resObj.item.id,
                            resObj.item.descriptionId,
                            itemtypes.TYPE.LINK.DESCRIPTION
                        ];
                    } else {
                        //delete description
                        sql = 'DELETE FROM adm_link';
                        sql += ' WHERE "referenceId" = $1';
                        sql += ' AND "typeId" = $2';
                        vals = [
                            resObj.item.id,
                            itemtypes.TYPE.LINK.DESCRIPTION
                        ]
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
                return res.json(result);
            });
        });
        
    });
    app.delete('/api/adm/picklist/:id', function(req, res) {
        results = [];
        vals = [];
        sql = '';
        query = null;
        pool.connect(function(err, client, done) {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            async.waterfall([
                function init(cb) {
                    resObj = req.body;
                    cb(null, resObj);
                },
                function typeTable(resObj, callback) {
                    //console.log('picklist-01');
                    results = [];
                    vals = [];
                    sql = 'DELETE FROM adm_core_type';
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
                function itemTable(resObj, callback) {
                    //console.log('picklist-02');
                    results = [];
                    vals = [];
                    sql = 'DELETE FROM adm_core_type';
                    sql += ' WHERE "typeId" = $1';
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
    app.put('/api/adm/picklist/:id', function(req, res) {
        results = [];
        vals = [];
        sql = '';
        query = null;
        pool.connect(function(err, client, done) {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            async.waterfall([
                function init(cb) {
                    resObj = req.body;
                    cb(null, resObj);
                },
                function itemTable(resObj, callback) {
                    //console.log('picklist-01');
                    results = [];
                    vals = [];
                    sql = 'UPDATE adm_core_type';
                    sql += ' SET "typeName" = $2';
                    sql += ', "applySupplementalPicklist" = $3';
                    sql += ' WHERE id = $1';
                    vals = [
                        resObj.picklist.id,
                        resObj.picklist.name,
                        resObj.picklist.applySupplementalPicklist
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function insertNewItems(resObj, callback) {
                    //console.log('picklist-02');
                    results = [];
                    vals = [];
                    sql = 'WITH vals AS (';
                    addComma = false;
                    for (let q = 0; q < resObj.picklist.items.length; q++) {
                        sql += addComma ? ' UNION ' : '';
                        sql += ' SELECT $' + ((q * 2) + 1).toString() + ' :: bigint AS "typeId", $' + ((q * 2) + 2).toString() + ' :: varchar AS "itemName"';
                        vals.push(resObj.picklist.id);
                        vals.push(resObj.picklist.items[q].name);
                        addComma = true;
                    }
                    sql += ')';
                    sql += ' INSERT INTO adm_core_item ("typeId", "itemName")';
                    sql += ' SELECT v."typeId", v."itemName"';
                    sql += ' FROM vals AS v';
                    sql += ' WHERE NOT EXISTS (';
                    sql += ' SELECT * FROM adm_core_item AS t';
                    sql += ' WHERE t."typeId" = v."typeId"';
                    sql += ' AND t."itemName" = v."itemName"';
                    sql += ')';
                    sql += ' RETURNING id, "typeId", "itemName" AS "name"';
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        for (let q = 0; q < results.length; q++) {
                            for (let w = 0; w < resObj.picklist.items.length; w++) {
                                if (!resObj.picklist.items[w].id || resObj.picklist.items[w].id <= 0) {
                                    if (resObj.picklist.items[w].name == results[q].name) {
                                        resObj.picklist.items[w].id = results[q].id;
                                    }
                                }
                            }
                        }
                        return callback(null, resObj);
                    });
                },
                function removeUnassignedItems(resObj, callback) {
                    //console.log('picklist-03');
                    results = [];
                    addComma = false;
                    sql = 'DELETE FROM adm_core_item';
                    sql += ' WHERE "typeId" = $1';
                    sql += ' AND "id" NOT IN (';
                    vals = [resObj.picklist.id];
                    for (let q = 0; q < resObj.picklist.items.length; q++) {
                        sql += addComma ? ', ' : '';
                        sql += '$' + (q + 2).toString();
                        vals.push(resObj.picklist.items[q].id);
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
    app.post('/api/adm/picklist', function(req, res){
        results = [];
        vals = [];
        sql = '';
        query = null;
        pool.connect(function(err, client, done) {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            async.waterfall([
                function init(cb) {
                    resObj = req.body;
                    //console.log(resObj);
                    resObj.permissions = {};
                    resObj.permissions.hasItems = false;
                    if (resObj.picklist.items && resObj.picklist.items.length != 0) {
                        resObj.permissions.hasItems = true;
                    }
                    cb(null, resObj);
                },
                function typeTable(resObj, callback) {
                    //console.log('picklist-01');
                    results = [];
                    vals = [];
                    sql = 'INSERT INTO adm_core_type';
                    sql += ' ("typeName", "isPicklist", "applySupplementalPicklist")';
                    sql += ' VALUES ($1, $2, $3) RETURNING id;';
                    vals = [
                        resObj.picklist.name,
                        true,
                        resObj.picklist.applySupplementalPicklist
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        resObj.picklist.id = parseInt(results[0].id);
                        return callback(null, resObj);
                    });
                },
                function itemTable(resObj, callback) {
                    //console.log('picklist-02');
                    if (resObj.permissions.hasItems) {
                        results = [];
                        vals = [];
                        addComma = false;
                        counter = 0;
                        sql = 'INSERT INTO adm_core_item';
                        sql += ' ("itemName", "typeId")';
                        sql += ' VALUES ';
                        for (let e = 0; e < resObj.picklist.items.length; e++) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 2);
                            vals.push(resObj.picklist.items[e].name);
                            vals.push(resObj.picklist.id);
                            addComma = true;
                            counter++;
                        }
                        sql += ' returning id, "itemName"';
                        query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            for (let q = 0; q < resObj.picklist.items.length; q++) {
                                for (let w = 0; w < results.length; w++) {
                                    if (resObj.picklist.items[q].name == results[w].itemName) {
                                        resObj.picklist.items[q].id = results[w].id;
                                    }
                                }
                            }
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                }
            ], function(error, result) {
                //console.log('picklist-done');
                done();
                if (error) {
                    console.error(error);
                }
                return res.json(result);
            });
        });
    });
    app.get('/api/adm/picklists', async function(req, res) {
        results = [];
        pool.connect(function(err, client, done) {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            async.waterfall([
                function basePicklists(callback) {
                    sql = 'SELECT t."id", t."typeName" AS "name", t."applySupplementalPicklist"';
                    sql += ', json_agg((SELECT x FROM (SELECT ';
                    sql += '    i."itemName" AS "name"';
                    sql += '    , i."id"';
                    sql += '    , get_link_text(i.id, $2) AS "abbreviation"';
                    sql += '    , get_description(i.id, $4) AS "description"';
                    sql += '    , dmgtyp."isEnergy", dmgtyp."isWeapon"';
                    sql += '    , ability."isMental", ability."isPhysical", ability."isPrimary"';
                    sql += '    , wpnprop."requireAmmunition", wpnprop."requireRange", wpnprop."requireSpecialDescription", wpnprop."requireVersatileDamage"';
                    sql += '    , spcomp."requireFlavorText"';
                    sql += '    , ordidx."orderIndex"';
                    sql += '    , profcat."requireAbilityScore", profcat."requireLanguage"';
                    sql += '    , get_parent_id(i.id, $3) AS "parentId"';
                    sql += ') x ORDER BY i."itemName")) AS items';
                    sql += ' FROM adm_core_type t';
                    sql += ' LEFT OUTER JOIN adm_core_item i ON i."typeId" = t.id';
                    sql += ' LEFT OUTER JOIN adm_def_picklist_item_damage_type dmgtyp ON dmgtyp."itemId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_picklist_item_ability_score ability ON ability."itemId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_picklist_item_weapon_property wpnprop ON wpnprop."itemId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_picklist_item_spell_component spcomp ON spcomp."itemId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_picklist_item_order ordidx ON ordidx."itemId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_picklist_item_proficiency_category profcat ON profcat."itemId" = i.id';
                    sql += ' WHERE t."isPicklist" = $1';
                    sql += ' GROUP BY t.id';
                    sql += ' ORDER BY t."typeName"';
                    vals = [
                        true,
                        itemtypes.TYPE.LINK.ABBREVIATION,
                        itemtypes.TYPE.LINK.PARENT_CHILD,
                        itemtypes.TYPE.DESCRIPTION.GENERAL
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        let newRow = row;
                        newRow.items.sort(function(a, b) {
                            if (a.orderIndex == null) {
                                if (a.name < b.name) {
                                    return -1;
                                } else if (a.name > b.name) {
                                    return 1;
                                }
                            } else {
                                return a.orderIndex - b.orderIndex;
                            }
                            return 0;
                        });
                        if (!newRow.items || (newRow.items.length != 0 && !newRow.items[0].id)) {
                            newRow.items = [];
                        }
                        for (let x = 0; x < newRow.items.length; x++) {
                            for (let key in newRow.items[x]) {
                                if (newRow.items[x].hasOwnProperty(key)) {
                                    if (newRow.items[x][key] === null) {
                                        delete newRow.items[x][key];
                                    }
                                }
                            }
                        }
                        if (newRow.id == itemtypes.TYPE.ITEM.EQUIPMENT_CATEGORY) {
                            for (let q = 0; q < newRow.items.length; q++) {
                                newRow.items[q].category = {};
                                newRow.items[q].category.id = newRow.items[q].id;
                            }
                        }
                        results.push(newRow);
                    });
                    query.on('end', function() {
                        let finalResults = results;
                        let supplementalPicklist = null;
                        for (let q = 0; q < results.length; q++) {
                            if (results[q].id == itemtypes.TYPE.ITEM.SUPPLEMENTAL_PICKLIST) {
                                supplementalPicklist = results[q];
                            }
                        }
                        for (let w = 0; w < supplementalPicklist.items.length; w++) {
                            supplementalPicklist.items[w].isSupplemental = true;
                        }
                        for (let q = 0; q < finalResults.length; q++) {
                            if (finalResults[q].applySupplementalPicklist) {
                                finalResults[q].items = finalResults[q].items.concat(supplementalPicklist.items).sort(function(a, b) {
                                    if (a.name > b.name) {
                                        return 1;
                                    } else if (a.name < b.name) {
                                        return -1;
                                    } else {
                                        return 0;
                                    }
                                });
                            }
                        }
                        let picklistPicklist = {};
                        picklistPicklist.applySupplementalPicklist = false;
                        picklistPicklist.id = 0;
                        picklistPicklist.name = 'Picklist';
                        picklistPicklist.items = [];
                        let newPicklistItem = {};
                        for (let q = 0; q < results.length; q++) {
                            newPicklistItem = {};
                            newPicklistItem.id = results[q].id;
                            newPicklistItem.name = results[q].name;
                            picklistPicklist.items.push(newPicklistItem);
                        }
                        finalResults.push(picklistPicklist);
                        return callback(err, finalResults);
                    });
                },
                function proficiencies(resObj, callback) {
                    results = [];
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
                        for (let q = 0; q < results.length; q++) {
                            if (results[q].category.id == itemtypes.TYPE.PROFICIENCY_CATEGORY.LANGUAGE) {
                                if (results[q].language.dialects && results[q].language.dialects.length != 0) {
                                    for (let w = 0; w < results[q].language.dialects.length; w++) {
                                        let newProficiencyItem = {};
                                        newProficiencyItem.language = {};
                                        newProficiencyItem.language.rarity = results[q].language.rarity;
                                        newProficiencyItem.language.script = results[q].language.script;
                                        newProficiencyItem.category = results[q].category;
                                        newProficiencyItem.resource = results[q].resource;
                                        newProficiencyItem.abilityScore = results[q].abilityScore;
                                        newProficiencyItem.id = results[q].language.dialects[w].id;
                                        newProficiencyItem.name = results[q].language.dialects[w].name;
                                        newProficiencyItem.parentId = results[q].id;
                                        results.push(newProficiencyItem);
                                    }
                                }
                            }
                        }
                        let newPicklist = {};
                        newPicklist.id = itemtypes.TYPE.ITEM.PROFICIENCY;
                        newPicklist.name = 'Proficiency';
                        newPicklist.isPicklist = true;
                        newPicklist.applySupplementalPicklist = false;
                        newPicklist.items = results;
                        resObj.push(newPicklist);
                        return callback(err, resObj);
                    });
                },
                function equipment(resObj, callback) {
                    results = [];
                    sql = 'SELECT i."id", i."itemName" AS "name"';
                    sql += ', get_item(i."resourceId") AS "resource"';
                    sql += ', get_description(i.id, $2) AS "description"';
                    sql += ', eq."cost", eq."weight", eq."isMagicItem"';
                    sql += ', get_item(eq."categoryId") AS "category"';
                    sql += ', CASE WHEN cntunit."count" IS NULL THEN 1 ELSE cntunit."count" END AS "count"';
                    sql += ', CASE WHEN cntunit."unit" IS NULL THEN \'\' ELSE cntunit."unit" END AS "unit"';
                    sql += ', CASE WHEN get_item(ammo."ammunitionId") IS NULL THEN \'{}\' ELSE get_item(ammo."ammunitionId") END AS "ammunition"';
                    sql += ', CASE WHEN armor."baseArmorClass" IS NULL THEN \'{}\' ELSE ';
                    sql += '    json_build_object(';
                    sql += '        \'armorClass\', json_build_object(';
                    sql += '            \'applyDexterity\', armor."applyDexterityModifier",';
                    sql += '            \'base\', armor."baseArmorClass",';
                    sql += '            \'isCumulative\', armor."isCumulative",';
                    sql += '            \'maximumDexterity\', armor."maximumDexterityModifier",';
                    sql += '            \'hasMaximumDexterity\', armor."hasMaximumDexterityModifier"';
                    sql += '        ),';
                    sql += '        \'minimumStrength\', armor."minimumStrength",';
                    sql += '        \'hasMinimumStrength\', armor."hasMinimumStrength",';
                    sql += '        \'stealthDisadvantage\', armor."stealthDisadvantage"';
                    sql += '    ) END AS "armor"';
                    sql += ', CASE WHEN carrycap."carryCapacity" IS NULL THEN 0 ELSE carrycap."carryCapacity" END AS "carryCapacity"';
                    sql += ', CASE WHEN spd."speed" IS NULL THEN 0 ELSE spd."speed" END AS "speed"';
                    sql += ', CASE WHEN get_item(prof."proficiencyId") IS NULL THEN \'{}\' ELSE get_item(prof."proficiencyId") END AS "proficiency"';
                    sql += ', CASE WHEN prof."proficiencyId" IN ($3) THEN true ELSE false END AS "isImprovisedWeapon"';
                    sql += ', CASE WHEN prof."proficiencyId" IN ($3, $4, $5) THEN ';
                    sql += '    json_build_object(';
                    sql += '        \'special\', CASE WHEN get_description(i.id, $6) IS NULL THEN \'\' ELSE get_description(i.id, $6) END,';
                    sql += '        \'properties\', CASE WHEN get_weapon_properties(i.id, $7) IS NULL THEN \'[]\' ELSE get_weapon_properties(i.id, $7) END,';
                    sql += '        \'class\', CASE WHEN get_item(wpn."classId") IS NULL THEN \'{}\' ELSE get_item(wpn."classId") END,';
                    sql += '        \'range\', CASE WHEN rng."maximumRange" IS NULL THEN \'{}\' ELSE';
                    sql += '            json_build_object(';
                    sql += '                \'maximum\', rng."maximumRange",';
                    sql += '                \'normal\', rng."normalRange"';
                    sql += '            )';
                    sql += '        END,';
                    sql += '        \'damage\', CASE WHEN get_dice(dmg."diceId") IS NULL THEN \'{}\' ELSE ';
                    sql += '            json_build_object(';
                    sql += '                \'dice\', get_dice(dmg."diceId"),';
                    sql += '                \'type\', get_item(dmg."typeId"),';
                    sql += '                \'versatile\', CASE WHEN vdmg."diceId" IS NULL THEN \'{}\' ELSE ';
                    sql += '                    json_build_object(';
                    sql += '                        \'dice\', get_dice(vdmg."diceId")';
                    sql += '                    )';
                    sql += '                END ';
                    sql += '            )';
                    sql += '        END';
                    sql += '    )';
                    sql += ' ELSE \'{}\' END AS "weapon"';
                    sql += ', \'[]\' AS "assignedEquipment"';
                    sql += ' FROM adm_core_item i';
                    sql += ' INNER JOIN adm_def_equipment eq ON eq."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_ammunition ammo ON ammo."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_armor armor ON armor."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_carry_capacity carrycap ON carrycap."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_proficiency prof ON prof."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_speed spd ON spd."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_unit cntunit ON cntunit."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_weapon wpn ON wpn."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_damage dmg ON dmg."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_range rng ON rng."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_damage_versatile vdmg ON vdmg."equipmentId" = i.id';
                    sql += ' WHERE i."typeId" = $1';
                    sql += ' ORDER BY i."itemName"';
                    vals = [
                        itemtypes.TYPE.ITEM.EQUIPMENT,
                        itemtypes.TYPE.DESCRIPTION.GENERAL,
                        itemtypes.TYPE.PROFICIENCY.WEAPON.IMPROVISED,
                        itemtypes.TYPE.PROFICIENCY.WEAPON.MARTIAL,
                        itemtypes.TYPE.PROFICIENCY.WEAPON.SIMPLE,
                        itemtypes.TYPE.DESCRIPTION.SPECIAL_WEAPON,
                        itemtypes.TYPE.LINK.WEAPON_PROPERTY
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        let newPicklist = {};
                        newPicklist.id = itemtypes.TYPE.ITEM.EQUIPMENT;
                        newPicklist.name = 'Equipment';
                        newPicklist.isPicklist = true;
                        newPicklist.applySupplementalPicklist = false;
                        newPicklist.items = results;
                        resObj.push(newPicklist);
                        return callback(err, resObj);
                    });
                },
                function backgrounds(resObj, callback) {
                    results = [];
                    sql = 'SELECT i."id", i."itemName" AS "name"';
                    sql += ', get_item(i."resourceId") AS "resource"';
                    sql += ', get_description(i.id, $2) AS "description"';
                    sql += ', get_description(i.id, $3) AS "suggestedCharacteristics"';
                    sql += ', json_build_object (';
                    sql += '    \'startingGold\', bg."startingGold"';
                    sql += '    , \'assigned\', CASE WHEN get_assigned_equipment(i.id, $4) IS NULL THEN \'[]\' ELSE get_assigned_equipment(i.id, $4) END';
                    sql += ') AS "equipment"';
                    sql += ', CASE WHEN get_feature(i.id) IS NULL THEN \'{}\' ELSE get_feature(i.id) END AS "feature"';
                    sql += ', get_proficiencies(i.id) AS "proficiencies"';
                    sql += ', CASE WHEN get_charts(i.id) IS NULL THEN \'[]\' ELSE get_charts(i.id) END AS "charts"';
                    sql += ', CASE WHEN var."parentId" IS NULL THEN \'{}\' ELSE get_item(var."parentId") END AS "parent"';
                    sql += ', CASE WHEN var."parentId" IS NULL THEN false ELSE true END AS "isVariant"';
                    sql += ' FROM adm_core_item i';
                    sql += ' LEFT OUTER JOIN adm_def_background bg ON bg."backgroundId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_background_variant var ON var."backgroundId" = i.id';
                    sql += ' WHERE i."typeId" IN ($1, $5)';
                    sql += ' ORDER BY i."itemName"';
                    vals = [
                        itemtypes.TYPE.ITEM.BACKGROUND,
                        itemtypes.TYPE.DESCRIPTION.GENERAL,
                        itemtypes.TYPE.DESCRIPTION.SUGGESTED_CHARACTERISTICS,
                        itemtypes.TYPE.LINK.ASSIGNED_EQUIPMENT,
                        itemtypes.TYPE.ITEM.BACKGROUND_VARIANT
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        let finalResults = results;
                        for (let q = 0; q < finalResults.length; q++) {
                            if (!finalResults[q].isVariant) {
                                finalResults[q].parent = {};
                                finalResults[q].parent.id = 0;
                            }
                        }
                        let newPicklist = {};
                        newPicklist.id = itemtypes.TYPE.ITEM.BACKGROUND;
                        newPicklist.name = 'Background';
                        newPicklist.isPicklist = true;
                        newPicklist.applySupplementalPicklist = false;
                        newPicklist.items = finalResults;
                        resObj.push(newPicklist);
                        return callback(err, resObj);
                    });
                },
                function spells(resObj, callback) {
                    results = [];
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
                        let finalResults = results;
                        let newPicklist = {};
                        newPicklist.id = itemtypes.TYPE.ITEM.SPELL;
                        newPicklist.name = 'Spell';
                        newPicklist.isPicklist = true;
                        newPicklist.applySupplementalPicklist = false;
                        newPicklist.items = finalResults;
                        resObj.push(newPicklist);
                        return callback(err, resObj);
                    });
                },
                function spellLists(resObj, callback) {
                    results = [];
                    sql = 'SELECT i."id", i."itemName" AS "name"';
                    sql += ', get_item(i."resourceId") AS "resource"';
                    sql += ', CASE WHEN get_spell_list(i.id) IS NULL THEN \'[]\' ELSE get_spell_list(i.id) END AS "spells"';
                    sql += ' FROM adm_core_item i';
                    sql += ' WHERE i."typeId" = $1';
                    sql += ' ORDER BY i."itemName"';
                    vals = [
                        itemtypes.TYPE.ITEM.SPELLLIST
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        let finalResults = results;
                        let newPicklist = {};
                        newPicklist.id = itemtypes.TYPE.ITEM.SPELLLIST;
                        newPicklist.name = 'Spell List';
                        newPicklist.isPicklist = true;
                        newPicklist.applySupplementalPicklist = false;
                        newPicklist.items = finalResults;
                        resObj.push(newPicklist);
                        return callback(err, resObj);
                    });
                },
                function addHardcodedPicklists(resObj, callback) {
                    let spellLevelPicklist = {};
                    spellLevelPicklist.id = itemtypes.TYPE.ITEM.LEVEL.SPELL;
                    spellLevelPicklist.name = 'Spell Level';
                    spellLevelPicklist.items = [
                        {id: -1, name: 'All'},
                        {id: 0, name: 'Cantrip'},
                        {id: 1, name: '1st'},
                        {id: 2, name: '2nd'},
                        {id: 3, name: '3rd'},
                        {id: 4, name: '4th'},
                        {id: 5, name: '5th'},
                        {id: 6, name: '6th'},
                        {id: 7, name: '7th'},
                        {id: 8, name: '8th'},
                        {id: 9, name: '9th'}
                    ];
                    spellLevelPicklist.items = spellLevelPicklist.items.sort(function(a, b) {
                        return a.id - b.id;
                    });
                    resObj.push(spellLevelPicklist);
                    let characterLevelPicklist = {};
                    characterLevelPicklist.id = itemtypes.TYPE.ITEM.LEVEL.CHARACTER;
                    characterLevelPicklist.name = 'Character Level';
                    characterLevelPicklist.items = [
                        {id: 1, name: '1st'},
                        {id: 2, name: '2nd'},
                        {id: 3, name: '3rd'},
                        {id: 4, name: '4th'},
                        {id: 5, name: '5th'},
                        {id: 6, name: '6th'},
                        {id: 7, name: '7th'},
                        {id: 8, name: '8th'},
                        {id: 9, name: '9th'},
                        {id: 10, name: '10th'},
                        {id: 11, name: '11th'},
                        {id: 12, name: '12th'},
                        {id: 13, name: '13th'},
                        {id: 14, name: '14th'},
                        {id: 15, name: '15th'},
                        {id: 16, name: '16th'},
                        {id: 17, name: '17th'},
                        {id: 18, name: '18th'},
                        {id: 19, name: '19th'},
                        {id: 20, name: '20th'}
                    ];
                    characterLevelPicklist.items = characterLevelPicklist.items.sort(function(a, b) {
                        return a.id - b.id;
                    });
                    resObj.push(characterLevelPicklist);
                    
                    return callback(err, resObj);
                }
            ], function(error, results) {
                done();
                if (error) {
                    console.error(error);
                }
                return res.json(results);
            });
        });
    });
};