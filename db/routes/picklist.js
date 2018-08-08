module.exports = function(app, pg, async, pool, itemtypes, common) {
    let results = [];
    let sql = '';
    let vals = [];
    let query = null;
    let resObj = null;
    let parameterArray = null;
    let addComma = false;
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
                done();
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
                        done();
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
                done();
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
                        sql = 'INSERT INTO adm_core_item';
                        sql += ' ("itemName", "typeId")';
                        sql += ' VALUES ';
                        parameterArray = common.parameterArray.resetValues(2);
                        for (let e = 0; e < resObj.picklist.items.length; e++) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.picklist.items[e].name);
                            vals.push(resObj.picklist.id);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
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