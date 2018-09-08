module.exports = function(app, pg, async, pool, itemtypes, common) {
    let results = [];
    let sql = '';
    let vals = [];
    let query = null;
    let tmp = null;
    let resObj = null;
    let addComma = false;
    let counter = 0;
    app.delete('/api/adm/equipment/:id', function(req, res) {
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
                function descriptionTable(resObj, callback) {
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
                function equipmentTable(resObj, callback) {
                    sql = 'DELETE FROM adm_def_equipment';
                    sql += ' WHERE "equipmentId" = $1';
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
                function equipmentTable(resObj, callback) {
                    sql = 'DELETE FROM adm_def_equipment_ammunition';
                    sql += ' WHERE "equipmentId" = $1';
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
                function equipmentTable(resObj, callback) {
                    sql = 'DELETE FROM adm_def_equipment_armor';
                    sql += ' WHERE "equipmentId" = $1';
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
                function equipmentTable(resObj, callback) {
                    sql = 'DELETE FROM adm_def_equipment_carry_capacity';
                    sql += ' WHERE "equipmentId" = $1';
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
                function equipmentTable(resObj, callback) {
                    sql = 'DELETE FROM adm_def_equipment_damage';
                    sql += ' WHERE "equipmentId" = $1';
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
                function equipmentTable(resObj, callback) {
                    sql = 'DELETE FROM adm_def_equipment_damage_versatile';
                    sql += ' WHERE "equipmentId" = $1';
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
                function equipmentTable(resObj, callback) {
                    sql = 'DELETE FROM adm_def_equipment_proficiency';
                    sql += ' WHERE "equipmentId" = $1';
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
                function equipmentTable(resObj, callback) {
                    sql = 'DELETE FROM adm_def_equipment_range';
                    sql += ' WHERE "equipmentId" = $1';
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
                function equipmentTable(resObj, callback) {
                    sql = 'DELETE FROM adm_def_equipment_speed';
                    sql += ' WHERE "equipmentId" = $1';
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
                function equipmentTable(resObj, callback) {
                    sql = 'DELETE FROM adm_def_equipment_unit';
                    sql += ' WHERE "equipmentId" = $1';
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
                function equipmentTable(resObj, callback) {
                    sql = 'DELETE FROM adm_def_equipment_weapon';
                    sql += ' WHERE "equipmentId" = $1';
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
                function equipmentTable(resObj, callback) {
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
    app.put('/api/adm/equipment/:id', function(req, res) {
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
                    resObj.permissions.need = {};
                    resObj.permissions.need.dice = false;
                    resObj.permissions.need.ammunition = false;
                    resObj.permissions.need.armor = false;
                    resObj.permissions.need.carryCapacity = false;
                    resObj.permissions.need.damage = false;
                    resObj.permissions.need.damageVersatile = false;
                    resObj.permissions.need.proficiency = false;
                    resObj.permissions.need.range = false;
                    resObj.permissions.need.speed = false;
                    resObj.permissions.need.unit = false;
                    resObj.permissions.need.weapon = false;
                    resObj.permissions.has = {};
                    resObj.permissions.has.ammunition = false;
                    resObj.permissions.has.armor = false;
                    resObj.permissions.has.carryCapacity = false;
                    resObj.permissions.has.damage = false;
                    resObj.permissions.has.damageVersatile = false;
                    resObj.permissions.has.proficiency = false;
                    resObj.permissions.has.range = false;
                    resObj.permissions.has.speed = false;
                    resObj.permissions.has.unit = false;
                    resObj.permissions.has.weapon = false;
                    
                    resObj.permissions.need.description = false;
                    resObj.permissions.need.specialDescription = false;
                    resObj.permissions.has.description = false;
                    resObj.permissions.has.specialDescription = false;
                    
                    resObj.permissions.need.weaponProperty = false;
                    resObj.permissions.has.weaponProperty = false;
                    
                    resObj.permissions.need.proficiencyItem = false;
                    resObj.permissions.has.proficiencyItem = false;
                    
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON
                       || resObj.equipment.isImprovisedWeapon) {
                        resObj.permissions.need.dice = true;
                        resObj.permissions.need.damage = true;
                        for (let q = 0; q < resObj.equipment.weapon.properties.length; q++) {
                            if (resObj.equipment.weapon.properties[q].id == itemtypes.TYPE.WEAPON_PROPERTY.VERSATILE) {
                                resObj.permissions.need.damageVersatile = true;
                            }
                            if (resObj.equipment.weapon.properties[q].id == itemtypes.TYPE.WEAPON_PROPERTY.AMMUNITION
                               || resObj.equipment.weapon.properties[q].id == itemtypes.TYPE.WEAPON_PROPERTY.THROWN) {
                                resObj.permissions.need.range = true;
                            }
                        }
                        if (resObj.equipment.isImprovisedWeapon) {
                            resObj.permissions.need.range = true;
                        }
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.AMMUNITION) {
                        resObj.permissions.need.ammunition = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
                        for (let q = 0; q < resObj.equipment.weapon.properties.length; q++) {
                            if (resObj.equipment.weapon.properties[q].id == itemtypes.TYPE.WEAPON_PROPERTY.AMMUNITION) {
                                resObj.permissions.need.ammunition = true;
                            }
                        }
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.ARMOR) {
                        resObj.permissions.need.armor = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.MOUNT) {
                        resObj.permissions.need.carryCapacity = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.ARMOR
                       || resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.LAND_VEHICLE
                       || resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WATER_VEHICLE
                       || resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
                        resObj.permissions.need.proficiency = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.MOUNT
                       || resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WATER_VEHICLE) {
                        resObj.permissions.need.speed = true;
                    }
                    if (resObj.equipment.count > 1 || (resObj.equipment.unit && resObj.equipment.unit.length != 0)) {
                        resObj.permissions.need.unit = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
                        resObj.permissions.need.weapon = true;
                        if (resObj.equipment.weapon.properties.length != 0) {
                            resObj.permissions.need.weaponProperty = true;
                        }
                    }
                    if (resObj.equipment.description && resObj.equipment.description.length != 0) {
                        resObj.permissions.need.description = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
                        if (resObj.equipment.weapon.properties.length != 0) {
                            resObj.permissions.need.weaponProperty = true;
                        }
                        for (let q = 0; q < resObj.equipment.weapon.properties.length; q++) {
                            if (resObj.equipment.weapon.properties[q].id == itemtypes.TYPE.WEAPON_PROPERTY.SPECIAL) {
                                resObj.permissions.need.specialDescription = true;
                            }
                        }
                    }
                    cb(null, resObj);
                },
                function itemTable(resObj, callback) {
                    console.log('equipment-01');
                    results = [];
                    vals = [];
                    sql = 'UPDATE adm_core_item';
                    sql += ' SET "itemName" = $2';
                    sql += ' WHERE id = $1';
                    vals = [
                        resObj.equipment.id,
                        resObj.equipment.name
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
                    console.log('equipment-02');
                    results = [];
                    sql = 'SELECT i.id';
                    sql += ', profitm.id AS "proficiencyItemId"';
                    sql += ', ammo."ammunitionId"';
                    sql += ', armor."baseArmorClass"';
                    sql += ', carry."carryCapacity"';
                    sql += ', dmg."diceId"';
                    sql += ', vdmg."diceId" AS "versatileDiceId"';
                    sql += ', dsc."description" AS "description"';
                    sql += ', dsc."id" AS "descriptionId"';
                    sql += ', prof."proficiencyId"';
                    sql += ', rng."normalRange"';
                    sql += ', spd."speed"';
                    sql += ', spcdsc."description" AS "specialDescription"';
                    sql += ', spcdsc."id" AS "specialDescriptionId"';
                    sql += ', unit."count"';
                    sql += ', wpn."classId"';
                    sql += ', lnkprop."targetId" AS "propertyId"';
                    sql += ' FROM adm_core_item i';
                    sql += ' LEFT OUTER JOIN adm_def_equipment equip ON equip."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_ammunition ammo ON ammo."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_armor armor ON armor."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_carry_capacity carry ON carry."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_damage dmg ON dmg."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_damage_versatile vdmg ON vdmg."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_proficiency prof ON prof."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_range rng ON rng."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_speed spd ON spd."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_unit unit ON unit."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_def_equipment_weapon wpn ON wpn."equipmentId" = i.id';
                    sql += ' LEFT OUTER JOIN adm_link lnk ON lnk."referenceId" = i.id AND lnk."typeId" = $2';
                    sql += ' LEFT OUTER JOIN adm_core_description dsc ON dsc.id = lnk."targetId" AND dsc."typeId" = $3';
                    sql += ' LEFT OUTER JOIN adm_core_description spcdsc ON spcdsc.id = lnk."targetId" AND spcdsc."typeId" = $4';
                    sql += ' LEFT OUTER JOIN adm_core_item profitm ON profitm."itemName" = i."itemName" AND profitm.id != i.id';
                    sql += ' LEFT OUTER JOIN adm_link lnkprop ON lnkprop."referenceId" = i.id AND lnkprop."typeId" = $5';
                    sql += ' WHERE i.id = $1';
                    vals = [
                        resObj.equipment.id,
                        itemtypes.TYPE.LINK.DESCRIPTION,
                        itemtypes.TYPE.DESCRIPTION.GENERAL,
                        itemtypes.TYPE.DESCRIPTION.SPECIAL_WEAPON,
                        itemtypes.TYPE.LINK.WEAPON_PROPERTY
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        resObj.permissions.has.proficiencyItem = (results[0].proficiencyItemId === null);
                        resObj.equipment.oldProficiencyItemId = (results[0].proficiencyItemId === null) ? 0 : results[0].proficiencyItemId;
                        resObj.permissions.has.ammunition = (results[0].ammunitionId === null);
                        resObj.permissions.has.armor = (results[0].baseArmorClass === null);
                        resObj.permissions.has.carryCapacity = (results[0].carryCapacity === null);
                        resObj.permissions.has.damage = (results[0].diceId === null);
                        resObj.permissions.has.damageVersatile = (results[0].versatileDiceId === null);
                        resObj.permissions.has.description = (results[0].description === null);
                        resObj.permissions.has.proficiency = (results[0].proficiencyId === null);
                        resObj.permissions.has.range = (results[0].normalRange === null);
                        resObj.permissions.has.speed = (results[0].speed === null);
                        resObj.permissions.has.specialDescription = (results[0].specialDescription === null);
                        resObj.permissions.has.unit = (results[0].count === null);
                        resObj.permissions.has.weapon = (results[0].classId === null);
                        resObj.permissions.has.weaponProperty = (results[0].propertyId === null);
                        resObj.equipment.descriptionId = results[0].descriptionId;
                        resObj.equipment.specialDescriptionId = results[0].specialDescriptionId;
                        return callback(null, resObj);
                    });
                },
                function manageDice(resObj, callback) {
                    console.log('equipment-02-A');
                    results = [];
                    if (resObj.permissions.need.dice) {
                        let diceArr = [resObj.equipment.weapon.damage.dice];
                        if (resObj.permissions.need.damageVersatile) {
                            diceArr.push(resObj.equipment.weapon.damage.versatile.dice);
                        }
                        common.manage.dice(diceArr, function(results) {
                            resObj.equipment.weapon.damage.dice = common.datatypes.dice.getObject(results, resObj.equipment.weapon.damage.dice);
                            if (resObj.permissions.need.damageVersatile) {
                                resObj.equipment.weapon.damage.versatile.dice = common.datatypes.dice.getObject(results, resObj.equipment.weapon.damage.versatile.dice);
                            }
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function getMappedProficiencyCategory(resObj, callback) {
                    console.log('equipment-03');
                    results = [];
                    sql = 'SELECT "targetId"';
                    sql += ' FROM adm_link';
                    sql += ' WHERE "referenceId" = $1';
                    sql += ' AND "typeId" = $2';
                    vals = [
                        resObj.equipment.category.id,
                        itemtypes.TYPE.LINK.MAP.EQUIPMENT_CATEGORY_TO_PROFICIENCY_CATEGORY
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        if (results.length != 0) {
                            resObj.permissions.need.proficiencyItem = true;
                            resObj.equipment.proficiencyCategoryId = results[0].targetId;
                        } else {
                            resObj.equipment.proficiencyCategoryId = 0;
                        }
                        return callback(null, resObj);
                    });
                },
                function equipmentTable(resObj, callback) {
                    console.log('equipment-04');
                    results = [];
                    sql = 'UPDATE adm_def_equipment';
                    sql += ' SET "cost" = $2';
                    sql += ', "weight" = $3';
                    sql += ', "categoryId" = $4';
                    sql += ', "isMagicItem" = $5';
                    sql += ' WHERE "equipmentId" = $1';
                    vals = [
                        resObj.equipment.id,
                        resObj.equipment.cost,
                        resObj.equipment.weight,
                        resObj.equipment.category.id,
                        resObj.equipment.isMagicItem
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function mappedProficiencyItem(resObj, callback) {
                    console.log('equipment-05');
                    results = [];
                    if (resObj.permissions.need.proficiencyItem && resObj.permissions.has.proficiencyItem) {
                        //update
                        sql = 'UPDATE adm_core_item';
                        sql += ' SET "itemName" = $2';
                        sql += ' WHERE id = $1';
                        vals = [
                            resObj.equipment.oldProficiencyItemId,
                            resObj.equipment.name
                        ];
                    } else if (resObj.permissions.need.proficiencyItem && !resObj.permissions.has.proficiencyItem) {
                        //insert
                        sql = 'INSERT INTO adm_core_item';
                        sql += ' ("itemName", "typeId", "resourceId")';
                        sql += ' ($1, $2, $3) RETURNING id';
                        vals = [
                            resObj.equipment.name,
                            itemtypes.TYPE.ITEM.PROFICIENCY,
                            resObj.equipment.resource.id
                        ];
                    } else {
                        //delete
                        sql = 'DELETE FROM adm_core_item';
                        sql += ' WHERE id = $1';
                        vals = [
                            resObj.equipment.oldProficiencyItemId
                        ];
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        if (resObj.permissions.need.proficiencyItem && !resObj.permissions.has.proficiencyItem) {
                            resObj.equipment.oldProficiencyItemId = results[0].id;
                        }
                        return callback(null, resObj);
                    });
                },
                function mappedProficiencyDef(resObj, callback) {
                    console.log('equipment-06');
                    results = [];
                    if (resObj.permissions.need.proficiencyItem && resObj.permissions.has.proficiencyItem) {
                        //update
                        sql = 'UPDATE adm_def_proficiency';
                        sql += ' SET "categoryId" = $2';
                        sql += ' WHERE "proficiencyId" = $1';
                        vals = [
                            resObj.equipment.oldProficiencyItemId,
                            resObj.equipment.proficiencyCategoryId
                        ];
                    } else if (resObj.permissions.need.proficiencyItem && !resObj.permissions.has.proficiencyItem) {
                        //insert
                        sql = 'INSERT INTO adm_def_proficiency';
                        sql += ' ("proficiencyId", "categoryId")';
                        sql += ' VALUES ($1, $2)';
                        vals = [
                            resObj.equipment.oldProficiencyItemId,
                            resObj.equipment.proficiencyCategoryId
                        ];
                    } else {
                        //delete
                        sql = 'DELETE FROM adm_def_proficiency';
                        sql += ' WHERE "proficiencyId" = $1';
                        vals = [
                            resObj.equipment.oldProficiencyItemId
                        ];
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function ammunitionTable(resObj, callback) {
                    console.log('equipment-07');
                    results = [];
                    if (resObj.permissions.need.ammunition && resObj.permissions.has.ammunition) {
                        //update
                        sql = 'UPDATE adm_def_equipment_ammunition';
                        sql += ' SET "ammunitionId" = $2';
                        sql += ' WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.ammunition.id
                        ];
                    } else if (resObj.permissions.need.ammunition && !resObj.permissions.has.ammunition) {
                        //insert
                        sql = 'INSERT INTO adm_def_equipment_ammunition';
                        sql += ' ("equipmentId", "ammunitionId")';
                        sql += ' VALUES ($1, $2)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.ammunition.id
                        ];
                    } else {
                        //delete
                        sql = 'DELETE FROM adm_def_equipment_ammunition';
                        sql += 'WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id
                        ];
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function armorTable(resObj, callback) {
                    console.log('equipment-08');
                    results = [];
                    if (resObj.permissions.need.armor && resObj.permissions.has.armor) {
                        //update
                        sql = 'UPDATE adm_def_equipment_armor';
                        sql += ' SET "baseArmorClass" = $2';
                        sql += ', "applyDexterityModifier" = $3';
                        sql += ', "maximumDexterityModifier" = $4';
                        sql += ', "isCumulative" = $5';
                        sql += ', "minimumStrength" = $6';
                        sql += ', "stealthDisadvantage" = $7';
                        sql += ', "hasMinimumStrength" = $8';
                        sql += ', "hasMaximumDexterityModifier = $9"';
                        sql += ' WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.armor.armorClass.base,
                            resObj.equipment.armor.armorClass.applyDexterity,
                            resObj.equipment.armor.armorClass.maximumDexterity,
                            resObj.equipment.armor.armorClass.isCumulative,
                            resObj.equipment.armor.minimumStrength,
                            resObj.equipment.armor.stealthDisadvantage,
                            resObj.equipment.armor.hasMinimumStrength,
                            resObj.equipment.armor.armorClass.hasMaximumDexterity
                        ];
                    } else if (resObj.permissions.need.armor && !resObj.permissions.has.armor) {
                        //insert
                        sql = 'INSERT INTO adm_def_equipment_armor';
                        sql += ' ("equipmentId", "baseArmorClass", "applyDexterityModifier", "maximumDexterityModifier"';
                        sql += ', "isCumulative", "minimumStrength", "stealthDisadvantage", "hasMinimumStrength", "hasMaximumDexterityModifier")';
                        sql += ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.armor.armorClass.base,
                            resObj.equipment.armor.armorClass.applyDexterity,
                            resObj.equipment.armor.armorClass.maximumDexterity,
                            resObj.equipment.armor.armorClass.isCumulative,
                            resObj.equipment.armor.minimumStrength,
                            resObj.equipment.armor.stealthDisadvantage,
                            resObj.equipment.armor.hasMinimumStrength,
                            resObj.equipment.armor.armorClass.hasMaximumDexterity
                        ];
                    } else {
                        //delete
                        sql = 'DELETE FROM adm_def_equipment_armor';
                        sql += 'WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id
                        ];
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function carryCapacityTable(resObj, callback) {
                    console.log('equipment-09');
                    results = [];
                    if (resObj.permissions.need.carryCapacity && resObj.permissions.has.carryCapacity) {
                        //update
                        sql = 'UPDATE adm_def_equipment_carry_capacity';
                        sql += ' SET "carryCapacity" = $2';
                        sql += ' WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.carryCapacity
                        ];
                    } else if (resObj.permissions.need.carryCapacity && !resObj.permissions.has.carryCapacity) {
                        //insert
                        sql = 'INSERT INTO adm_def_equipment_carry_capacity';
                        sql += ' ("equipmentId", "carryCapacity")';
                        sql += ' VALUES ($1, $2)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.carryCapacity
                        ];
                    } else {
                        //delete
                        sql = 'DELETE FROM adm_def_equipment_carry_capacity';
                        sql += 'WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id
                        ];
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function damageTable(resObj, callback) {
                    console.log('equipment-10');
                    results = [];
                    if (resObj.permissions.need.damage && resObj.permissions.has.damage) {
                        //update
                        sql = 'UPDATE adm_def_equipment_damage';
                        sql += ' SET "diceId" = $2';
                        sql += ', "typeId" = $3';
                        sql += ' WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.weapon.damage.dice.id,
                            resObj.equipment.weapon.damage.type.id
                        ];
                    } else if (resObj.permissions.need.damage && !resObj.permissions.has.damage) {
                        //insert
                        sql = 'INSERT INTO adm_def_equipment_damage';
                        sql += ' ("equipmentId", "diceId", "typeId")';
                        sql += ' VALUES ($1, $2, $3)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.weapon.damage.dice.id,
                            resObj.equipment.weapon.damage.type.id
                        ];
                    } else {
                        //delete
                        sql = 'DELETE FROM adm_def_equipment_damage';
                        sql += 'WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id
                        ];
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function damageVersatileTable(resObj, callback) {
                    console.log('equipment-11');
                    results = [];
                    if (resObj.permissions.need.damageVersatile && resObj.permissions.has.damageVersatile) {
                        //update
                        sql = 'UPDATE adm_def_equipment_damage_versatile';
                        sql += ' SET "diceId" = $2';
                        sql += ' WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.weapon.damage.versatile.dice.id
                        ];
                    } else if (resObj.permissions.need.damageVersatile && !resObj.permissions.has.damageVersatile) {
                        //insert
                        sql = 'INSERT INTO adm_def_equipment_damage_versatile';
                        sql += ' ("equipmentId", "diceId")';
                        sql += ' VALUES ($1, $2)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.weapon.damage.versatile.dice.id
                        ];
                    } else {
                        //delete
                        sql = 'DELETE FROM adm_def_equipment_damage_versatile';
                        sql += 'WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id
                        ];
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function proficiencyTable(resObj, callback) {
                    console.log('equipment-12');
                    results = [];
                    if (resObj.permissions.need.proficiency && resObj.permissions.has.proficiency) {
                        //update
                        sql = 'UPDATE adm_def_equipment_proficiency';
                        sql += ' SET "proficiencyId" = $2';
                        sql += ' WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.isImprovisedWeapon ? itemtypes.TYPE.PROFICIENCY.WEAPON.IMPROVISED : resObj.equipment.proficiency.id
                        ];
                    } else if (resObj.permissions.need.proficiency && !resObj.permissions.has.proficiency) {
                        //insert
                        sql = 'INSERT INTO adm_def_equipment_proficiency';
                        sql += ' ("equipmentId", "proficiencyId")';
                        sql += ' VALUES ($1, $2)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.isImprovisedWeapon ? itemtypes.TYPE.PROFICIENCY.WEAPON.IMPROVISED : resObj.equipment.proficiency.id
                        ];
                    } else {
                        //delete
                        sql = 'DELETE FROM adm_def_equipment_proficiency';
                        sql += 'WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id
                        ];
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function rangeTable(resObj, callback) {
                    console.log('equipment-13');
                    results = [];
                    if (resObj.permissions.need.range && resObj.permissions.has.range) {
                        //update
                        sql = 'UPDATE adm_def_equipment_range';
                        sql += ' SET "normalRange" = $2';
                        sql += ', "maximumRange" = $3';
                        sql += ' WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.weapon.range.normal,
                            resObj.equipment.weapon.range.maximum
                        ];
                    } else if (resObj.permissions.need.range && !resObj.permissions.has.range) {
                        //insert
                        sql = 'INSERT INTO adm_def_equipment_range';
                        sql += ' ("equipmentId", "normalRange", "maximumRange")';
                        sql += ' VALUES ($1, $2, $3)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.weapon.range.normal,
                            resObj.equipment.weapon.range.maximum
                        ];
                    } else {
                        //delete
                        sql = 'DELETE FROM adm_def_equipment_range';
                        sql += 'WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id
                        ];
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function speedTable(resObj, callback) {
                    console.log('equipment-14');
                    results = [];
                    if (resObj.permissions.need.speed && resObj.permissions.has.speed) {
                        //update
                        sql = 'UPDATE adm_def_equipment_speed';
                        sql += ' SET "speed" = $2';
                        sql += ' WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.speed
                        ];
                    } else if (resObj.permissions.need.speed && !resObj.permissions.has.speed) {
                        //insert
                        sql = 'INSERT INTO adm_def_equipment_speed';
                        sql += ' ("equipmentId", "speed")';
                        sql += ' VALUES ($1, $2)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.speed
                        ];
                    } else {
                        //delete
                        sql = 'DELETE FROM adm_def_equipment_speed';
                        sql += 'WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id
                        ];
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function unitTable(resObj, callback) {
                    console.log('equipment-15');
                    results = [];
                    if (resObj.permissions.need.unit && resObj.permissions.has.unit) {
                        //update
                        sql = 'UPDATE adm_def_equipment_unit';
                        sql += ' SET "count" = $2';
                        sql += ', "unit" = $3';
                        sql += ' WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.count,
                            resObj.equipment.unit
                        ];
                    } else if (resObj.permissions.need.unit && !resObj.permissions.has.unit) {
                        //insert
                        sql = 'INSERT INTO adm_def_equipment_unit';
                        sql += ' ("equipmentId", "count", "unit")';
                        sql += ' VALUES ($1, $2, $3)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.count,
                            resObj.equipment.unit
                        ];
                    } else {
                        //delete
                        sql = 'DELETE FROM adm_def_equipment_unit';
                        sql += 'WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id
                        ];
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function weaponTable(resObj, callback) {
                    console.log('equipment-16');
                    results = [];
                    if (resObj.permissions.need.weapon && resObj.permissions.has.weapon) {
                        //update
                        sql = 'UPDATE adm_def_equipment_weapon';
                        sql += ' SET "classId" = $2';
                        sql += ' WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.weapon.class.id
                        ];
                    } else if (resObj.permissions.need.weapon && !resObj.permissions.has.weapon) {
                        //insert
                        sql = 'INSERT INTO adm_def_equipment_weapon';
                        sql += ' ("equipmentId", "classId")';
                        sql += ' VALUES ($1, $2)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.weapon.class.id
                        ];
                    } else {
                        //delete
                        sql = 'DELETE FROM adm_def_equipment_weapon';
                        sql += 'WHERE "equipmentId" = $1';
                        vals = [
                            resObj.equipment.id
                        ];
                    }
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function updateDescriptionTable(resObj, callback) {
                    console.log('equipment-17');
                    results = [];
                    vals = [];
                    if ((resObj.permissions.need.description && resObj.permissions.has.description) || (resObj.permissions.need.specialDescription && resObj.permissions.has.specialDescription)) {
                        sql = 'UPDATE adm_core_description AS i';
                        sql += ' SET "description" = c."description"';
                        sql += ' FROM (VALUES';
                        addComma = false;
                        counter = 0;
                        if (resObj.permissions.need.description && resObj.permissions.has.description) {
                            sql += addComma ? ', ' : '';
                            sql += '($' + ((counter * 2) + 1).toString() + ', $' + ((counter * 2) + 2).toString() + ')';
                            vals.push(resObj.equipment.descriptionId);
                            vals.push(resObj.equipment.description);
                            counter++;
                            addComma = true;
                        }
                        if (resObj.permissions.need.specialDescription && resObj.permissions.has.specialDescription) {
                            sql += addComma ? ', ' : '';
                            sql += '($' + ((counter * 2) + 1).toString() + ', $' + ((counter * 2) + 2).toString() + ')';
                            vals.push(resObj.equipment.specialDescriptionId);
                            vals.push(resObj.equipment.weapon.special);
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
                    console.log('equipment-18');
                    results = [];
                    vals = [];
                    if ((resObj.permissions.need.description && !resObj.permissions.has.description) || (resObj.permissions.need.specialDescription && !resObj.permissions.has.specialDescription)) {
                        sql = 'INSERT INTO adm_core_description';
                        sql += ' ("description", "typeId")';
                        sql += ' VALUES ';
                        addComma = false;
                        counter = 0;
                        if (resObj.permissions.need.description && !resObj.permissions.has.description) {
                            sql += addComma ? ', ' : '';
                            sql += '($' + ((counter * 2) + 1).toString() + ', $' + ((counter * 2) + 2).toString() + ')';
                            vals.push(resObj.equipment.description);
                            vals.push(itemtypes.TYPE.DESCRIPTION.GENERAL);
                            addComma = true;
                            counter++;
                        }
                        if (resObj.permissions.need.specialDescription && !resObj.permissions.has.specialDescription) {
                            sql += addComma ? ', ' : '';
                            sql += '($' + ((counter * 2) + 1).toString() + ', $' + ((counter * 2) + 2).toString() + ')';
                            vals.push(resObj.equipment.weapon.special);
                            vals.push(itemtypes.TYPE.DESCRIPTION.SPECIAL_WEAPON);
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
                                    resObj.equipment.descriptionId = results[q].id;
                                }
                                if (results[q].typeId == itemtypes.TYPE.DESCRIPTION.WEAPON_SPECIAL) {
                                    resObj.equipment.specialDescriptionId = results[q].id;
                                }
                            }
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function deleteDescriptionTable(resObj, callback) {
                    console.log('equipment-19');
                    results = [];
                    vals = [];
                    if ((resObj.permissions.has.description && !resObj.permissions.need.description) || (resObj.permissions.has.specialDescription && !resObj.permissions.need.specialDescription)) {
                        sql = 'DELETE FROM adm_core_description';
                        addComma = false;
                        counter = 0;
                        if (!resObj.permissions.need.description) {
                            sql += addComma ? ' OR ' : ' WHERE ';
                            sql += ' id = $' + (counter + 1).toString();
                            vals.push(resObj.equipment.descriptionId);
                            addComma = true;
                            conuter++;
                        }
                        if (!resObj.permissions.need.specialDescription) {
                            sql += addComma ? ' OR ' : ' WHERE ';
                            sql += ' id = $' + (counter + 1).toString();
                            vals.push(resObj.equipment.specialDescriptionId);
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
                    console.log('equipment-20');
                    results = [];
                    vals = [];
                    if (resObj.permissions.need.description || resObj.permissions.need.specialDescription || resObj.permissions.need.weaponProperty) {
                        sql = 'with vals as (';
                        addComma = false;
                        counter = 0;
                        if (resObj.permissions.need.description) {
                            sql += addComma ? ' UNION ' : '';
                            sql += 'SELECT $' + ((counter * 3) + 1).toString() + ' :: bigint as "referenceId"';
                            sql += ', $' + ((counter * 3) + 2).toString() + ' :: bigint as "targetId"';
                            sql += ', $' + ((counter * 3) + 3).toString() + ' :: bigint as "typeId"';
                            vals.push(resObj.equipment.id);
                            vals.push(resObj.equipment.descriptionId);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma = true;
                            counter++;
                        }
                        if (resObj.permissions.need.specialDescription) {
                            sql += addComma ? ' UNION ' : '';
                            sql += 'SELECT $' + ((counter * 3) + 1).toString() + ' :: bigint as "referenceId"';
                            sql += ', $' + ((counter * 3) + 2).toString() + ' :: bigint as "targetId"';
                            sql += ', $' + ((counter * 3) + 3).toString() + ' :: bigint as "typeId"';
                            vals.push(resObj.equipment.id);
                            vals.push(resObj.equipment.specialDescriptionId);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma = true;
                            counter++;
                        }
                        if (resObj.permissions.need.weaponProperty) {
                            for (let q = 0; q < resObj.equipment.weapon.properties.length; q++) {
                                sql += addComma ? ' UNION ' : '';
                                sql += 'SELECT $' + ((counter * 3) + 1).toString() + ' :: bigint as "referenceId"';
                                sql += ', $' + ((counter * 3) + 2).toString() + ' :: bigint as "targetId"';
                                sql += ', $' + ((counter * 3) + 3).toString() + ' :: bigint as "typeId"';
                                vals.push(resObj.equipment.id);
                                vals.push(resObj.equipment.weapon.properties[q].id);
                                vals.push(itemtypes.TYPE.LINK.WEAPON_PROPERTY);
                                addComma = true;
                                counter++;
                            }
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
                    console.log('equipment-21');
                    results = [];
                    vals = [];
                    if ((resObj.permissions.has.description && !resObj.permissions.need.description)
                        || (resObj.permissions.has.specialDescription && !resObj.permissions.need.specialDescription)
                        || (resObj.permissions.has.weaponProperty && !resObj.permissions.need.weaponProperty)) {
                        sql = 'DELETE FROM adm_link';
                        addComma = false;
                        counter = 0;
                        let addComma2 = false;
                        if ((resObj.permissions.has.description && !resObj.permissions.need.description)
                           || (resObj.permissions.has.specialDescription && !resObj.permissions.need.specialDescription)) {
                            sql += addComma ? ' OR ' : ' WHERE ';
                            sql += '(';
                            sql += '"referenceId" = $' + (counter + 1).toString();
                            sql += ' AND "typeId" = $' + (counter + 2).toString();
                            sql += ' AND "targetId" IN (';
                            vals.push(resObj.equipment.id);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma2 = false;
                            if (resObj.permissions.has.description && !resObj.permissions.need.description) {
                                sql += addComma2 ? ', ' : '';
                                sql += '$' + (counter + 3).toString();
                                vals.push(resObj.equipment.descriptionId);
                                counter++
                                addComma2 = true;
                            }
                            if (resObj.permissions.has.specialDescription && !resObj.permissions.need.specialDescription) {
                                sql += addComma2 ? ', ' : '';
                                sql += '$' + (counter + 3).toString();
                                vals.push(resObj.equipment.specialDescriptionId);
                                counter++
                                addComma2 = true;
                            }
                            sql += ')';
                            sql += ')';
                            counter++;
                            addComma = true;
                        }
                        sql += addComma ? ' OR ' : ' WHERE ';
                        sql += '(';
                        sql += '"referenceId" = $' + (counter + 3).toString();
                        sql += ' AND "typeId" = $' + (counter + 4).toString();
                        sql += ' AND "targetId" NOT IN (';
                        vals.push(resObj.equipment.id);
                        vals.push(itemtypes.TYPE.LINK.WEAPON_PROPERTY);
                        addComma2 = false;
                        for (let q = 0; q < resObj.equipment.weapon.properties.length; q++) {
                            sql += addComma2 ? ', ' : '';
                            sql += '$' + (counter + 5).toString();
                            vals.push(resObj.equipment.weapon.properties[q].id);
                            addComma2 = true;
                            counter++;
                        }
                        sql += ')';
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
    app.post('/api/adm/equipment', function(req, res){
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
                    console.log('equipment-init');
                    resObj = req.body;
                    resObj.permissions = {};
                    resObj.permissions.need = {};
                    resObj.permissions.need.assignedEquipment = false;
                    resObj.permissions.need.dice = false;
                    resObj.permissions.need.ammunition = false;
                    resObj.permissions.need.armor = false;
                    resObj.permissions.need.carryCapacity = false;
                    resObj.permissions.need.damage = false;
                    resObj.permissions.need.damageVersatile = false;
                    resObj.permissions.need.description = false;
                    resObj.permissions.need.proficiency = false;
                    resObj.permissions.need.range = false;
                    resObj.permissions.need.speed = false;
                    resObj.permissions.need.specialDescription = false;
                    resObj.permissions.need.unit = false;
                    resObj.permissions.need.weapon = false;
                    resObj.permissions.need.weaponProperty = false;
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON
                       || resObj.equipment.isImprovisedWeapon) {
                        resObj.permissions.need.dice = true;
                        resObj.permissions.need.damage = true;
                        for (let q = 0; q < resObj.equipment.weapon.properties.length; q++) {
                            if (resObj.equipment.weapon.properties[q].id == itemtypes.TYPE.WEAPON_PROPERTY.VERSATILE) {
                                resObj.permissions.need.damageVersatile = true;
                            }
                            if (resObj.equipment.weapon.properties[q].id == itemtypes.TYPE.WEAPON_PROPERTY.AMMUNITION
                               || resObj.equipment.weapon.properties[q].id == itemtypes.TYPE.WEAPON_PROPERTY.THROWN) {
                                resObj.permissions.need.range = true;
                            }
                        }
                        if (resObj.equipment.isImprovisedWeapon) {
                            resObj.permissions.need.range = true;
                        }
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.AMMUNITION) {
                        resObj.permissions.need.ammunition = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
                        for (let q = 0; q < resObj.equipment.weapon.properties.length; q++) {
                            if (resObj.equipment.weapon.properties[q].id == itemtypes.TYPE.WEAPON_PROPERTY.AMMUNITION) {
                                resObj.permissions.need.ammunition = true;
                            }
                        }
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.ARMOR) {
                        resObj.permissions.need.armor = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.MOUNT) {
                        resObj.permissions.need.carryCapacity = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.ARMOR
                       || resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.LAND_VEHICLE
                       || resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WATER_VEHICLE
                       || resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
                        resObj.permissions.need.proficiency = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.MOUNT
                       || resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WATER_VEHICLE) {
                        resObj.permissions.need.speed = true;
                    }
                    if (resObj.equipment.count > 1 || (resObj.equipment.unit && resObj.equipment.unit.length != 0)) {
                        resObj.permissions.need.unit = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
                        resObj.permissions.need.weapon = true;
                        if (resObj.equipment.weapon.properties.length != 0) {
                            resObj.permissions.need.weaponProperty = true;
                        }
                    }
                    if (resObj.equipment.description && resObj.equipment.description.length != 0) {
                        resObj.permissions.need.description = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
                        for (let q = 0; q < resObj.equipment.weapon.properties.length; q++) {
                            if (resObj.equipment.weapon.properties[q].id == itemtypes.TYPE.WEAPON_PROPERTY.SPECIAL) {
                                resObj.permissions.need.specialDescription = true;
                            }
                        }
                    }
                    if (resObj.equipment.assignedEquipment && resObj.equipment.assignedEquipment.length != 0) {
                        resObj.permissions.need.assignedEquipment = true;
                    }
                    cb(null, resObj);
                },
                function itemTable(resObj, callback) {
                    console.log('equipment-01');
                    results = [];
                    vals = [];
                    sql = 'INSERT INTO adm_core_item';
                    sql += '("itemName", "typeId", "resourceId")';
                    sql += 'VALUES ($1, $2, $3) RETURNING id;';
                    vals = [
                        resObj.equipment.name,
                        itemtypes.TYPE.ITEM.EQUIPMENT,
                        resObj.equipment.resource.id
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        resObj.equipment.id = parseInt(results[0].id);
                        return callback(null, resObj);
                    });
                },
                function equipmentTable(resObj, callback) {
                    console.log('equipment-02');
                    results = [];
                    sql = 'INSERT INTO adm_def_equipment';
                    sql += ' ("equipmentId", "cost", "weight", "categoryId", "isMagicItem")';
                    sql += ' VALUES ($1, $2, $3, $4, $5)';
                    vals = [
                        resObj.equipment.id,
                        resObj.equipment.cost,
                        resObj.equipment.weight,
                        resObj.equipment.category.id,
                        resObj.equipment.isMagicItem
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        return callback(null, resObj);
                    });
                },
                function manageDice(resObj, callback) {
                    console.log('equipment-03');
                    results = [];
                    if (resObj.permissions.need.dice) {
                        let diceArr = [resObj.equipment.weapon.damage.dice];
                        if (resObj.permissions.need.damageVersatile) {
                            diceArr.push(resObj.equipment.weapon.damage.versatile.dice);
                        }
                        common.manage.dice(diceArr, function(results) {
                            resObj.equipment.weapon.damage.dice = common.datatypes.dice.getObject(results, resObj.equipment.weapon.damage.dice);
                            if (resObj.permissions.need.damageVersatile) {
                                resObj.equipment.weapon.damage.versatile.dice = common.datatypes.dice.getObject(results, resObj.equipment.weapon.damage.versatile.dice);
                            }
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function getMappedProficiencyCategoryId(resObj, callback) {
                    console.log('equipment-04');
                    results = [];
                    sql = 'SELECT "targetId"';
                    sql += ' FROM adm_link';
                    sql += ' WHERE "referenceId" = $1';
                    sql += ' AND "typeId" = $2';
                    vals = [
                        resObj.equipment.category.id,
                        itemtypes.TYPE.LINK.MAP.EQUIPMENT_CATEGORY_TO_PROFICIENCY_CATEGORY
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        if (results.length != 0) {
                            resObj.equipment.proficiencyCategoryId = results[0].targetId;
                        } else {
                            resObj.equipment.proficiencyCategoryId = 0;
                        }
                        return callback(null, resObj);
                    });
                },
                function mappedProficiencyItem(resObj, callback) {
                    console.log('equipment-05');
                    results = [];
                    if (resObj.equipment.proficiencyCategoryId && resObj.equipment.proficiencyCategoryId != 0) {
                        sql = 'INSERT INTO adm_core_item';
                        sql += ' ("itemName", "typeId", "resourceId")';
                        sql += ' VALUES ($1, $2, $3)';
                        sql += ' RETURNING id';
                        vals = [
                            resObj.equipment.name,
                            itemtypes.TYPE.ITEM.PROFICIENCY,
                            resObj.equipment.resource.id
                        ];
                        query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            if (results.length != 0) {
                                resObj.equipment.newProficiencyId = results[0].id;
                            } else {
                                resObj.equipment.newProficiencyId = 0;
                            }
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function mappedProficiencyDef(resObj, callback) {
                    console.log('equipment-06');
                    results = [];
                    if (resObj.equipment.proficiencyCategoryId && resObj.equipment.proficiencyCategoryId != 0) {
                        sql = 'INSERT INTO adm_def_proficiency';
                        sql += ' ("proficiencyId", "categoryId")';
                        sql += ' VALUES ($1, $2)';
                        vals = [
                            resObj.equipment.newProficiencyId,
                            resObj.equipment.proficiencyCategoryId
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
                function ammunitionTable(resObj, callback) {
                    console.log('equipment-07');
                    results = [];
                    if (resObj.permissions.need.ammunition) {
                        sql = 'INSERT INTO adm_def_equipment_ammunition';
                        sql += ' ("equipmentId", "ammunitionId")';
                        sql += ' VALUES ($1, $2)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.ammunition.id
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
                function armorTable(resObj, callback) {
                    console.log('equipment-08');
                    results = [];
                    if (resObj.permissions.need.armor) {
                        sql = 'INSERT INTO adm_def_equipment_armor';
                        sql += ' ("equipmentId", "baseArmorClass", "applyDexterityModifier", "maximumDexterityModifier"';
                        sql += ', "isCumulative", "minimumStrength", "stealthDisadvantage", "hasMinimumStrength", "hasMaximumDexterityModifier")';
                        sql += ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.armor.armorClass.base,
                            resObj.equipment.armor.armorClass.applyDexterity,
                            resObj.equipment.armor.armorClass.maximumDexterity,
                            resObj.equipment.armor.armorClass.isCumulative,
                            resObj.equipment.armor.minimumStrength,
                            resObj.equipment.armor.stealthDisadvantage,
                            resObj.equipment.armor.hasMinimumStrength,
                            resObj.equipment.armor.armorClass.hasMaximumDexterity
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
                function carryCapacityTable(resObj, callback) {
                    console.log('equipment-09');
                    results = [];
                    if (resObj.permissions.need.carryCapacity) {
                        sql = 'INSERT INTO adm_def_equipment_carry_capacity';
                        sql += ' ("equipmentId", "carryCapacity")';
                        sql += ' VALUES ($1, $2)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.carryCapacity
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
                function damageTable(resObj, callback) {
                    console.log('equipment-10');
                    results = [];
                    if (resObj.permissions.need.damage) {
                        sql = 'INSERT INTO adm_def_equipment_damage';
                        sql += ' ("equipmentId", "diceId", "typeId")';
                        sql += ' VALUES ($1, $2, $3)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.weapon.damage.dice.id,
                            resObj.equipment.weapon.damage.type.id
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
                function damageVersatileTable(resObj, callback) {
                    console.log('equipment-11');
                    results = [];
                    if (resObj.permissions.need.damageVersatile) {
                        sql = 'INSERT INTO adm_def_equipment_damage_versatile';
                        sql += ' ("equipmentId", "diceId")';
                        sql += ' VALUES ($1, $2)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.weapon.damage.versatile.dice.id
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
                function proficiencyTable(resObj, callback) {
                    console.log('equipment-12');
                    results = [];
                    if (resObj.permissions.need.proficiency || resObj.equipment.isImprovisedWeapon) {
                        sql = 'INSERT INTO adm_def_equipment_proficiency';
                        sql += ' ("equipmentId", "proficiencyId")';
                        sql += ' VALUES ($1, $2)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.isImprovisedWeapon ? itemtypes.TYPE.PROFICIENCY.WEAPON.IMPROVISED : resObj.equipment.proficiency.id
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
                function rangeTable(resObj, callback) {
                    console.log('equipment-13');
                    results = [];
                    if (resObj.permissions.need.range) {
                        sql = 'INSERT INTO adm_def_equipment_range';
                        sql += ' ("equipmentId", "normalRange", "maximumRange")';
                        sql += ' VALUES ($1, $2, $3)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.weapon.range.normal,
                            resObj.equipment.weapon.range.maximum
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
                function speedTable(resObj, callback) {
                    console.log('equipment-14');
                    results = [];
                    if (resObj.permissions.need.speed) {
                        sql = 'INSERT INTO adm_def_equipment_speed';
                        sql += ' ("equipmentId", "speed")';
                        sql += ' VALUES ($1, $2)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.speed
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
                function unitTable(resObj, callback) {
                    console.log('equipment-15');
                    results = [];
                    if (resObj.permissions.need.unit) {
                        sql = 'INSERT INTO adm_def_equipment_unit';
                        sql += ' ("equipmentId", "count", "unit")';
                        sql += ' VALUES ($1, $2, $3)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.count,
                            resObj.equipment.unit
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
                function weaponTable(resObj, callback) {
                    console.log('equipment-16');
                    results = [];
                    if (resObj.permissions.need.weapon) {
                        sql = 'INSERT INTO adm_def_equipment_weapon';
                        sql += ' ("equipmentId", "classId")';
                        sql += ' VALUES ($1, $2)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.weapon.class.id
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
                function insertDescriptions(resObj, callback) {
                    console.log('equipment-17');
                    results = [];
                    vals = [];
                    addComma = false;
                    counter = 0;
                    if (resObj.permissions.need.description || resObj.permissions.need.specialDescription) {
                        sql = 'INSERT INTO adm_core_description';
                        sql += ' ("description", "typeId")';
                        sql += ' VALUES ';
                        if (resObj.permissions.need.description) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 2);
                            vals.push(resObj.equipment.description);
                            vals.push(itemtypes.TYPE.DESCRIPTION.GENERAL);
                            addComma = true;
                            counter++;
                        }
                        if (resObj.permissions.need.specialDescription) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 2);
                            vals.push(resObj.equipment.weapon.special);
                            vals.push(itemtypes.TYPE.DESCRIPTION.SPECIAL_WEAPON);
                            addComma = true;
                            counter++;
                        }
                        sql += ' Returning id, description, "typeId"';
                        query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            for (let q = 0; q < results.length; q++) {
                                if (results[q].typeId == itemtypes.TYPE.DESCRIPTION.GENERAL) {
                                    resObj.equipment.descriptionId = results[q].id;
                                }
                                if (results[q].typeId == itemtypes.TYPE.DESCRIPTION.SPECIAL_WEAPON) {
                                    resObj.equipment.weapon.specialDescriptionId = results[q].id;
                                }
                            }
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function link(resObj, callback) {
                    console.log('equipment-18');
                    results = [];
                    vals = [];
                    addComma = false;
                    counter = 0;
                    if (resObj.permissions.need.weaponProperty || resObj.permissions.need.description
                        || resObj.permissions.need.specialDescription || resObj.permissions.need.assignedEquipment) {
                        sql = 'INSERT INTO adm_link';
                        sql += ' ("referenceId", "targetId", "typeId")';
                        sql += ' VALUES ';
                        if (resObj.permissions.need.weaponProperty) {
                            for (let e = 0; e < resObj.equipment.weapon.properties.length; e++) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 3);
                                vals.push(resObj.equipment.id);
                                vals.push(resObj.equipment.weapon.properties[e].id);
                                vals.push(itemtypes.TYPE.LINK.WEAPON_PROPERTY);
                                addComma = true;
                                counter++;
                            }
                        }
                        if (resObj.permissions.need.assignedEquipment) {
                            for (let e = 0; e < resObj.equipment.assignedEquipment.length; e++) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.getParameterString(counter, 3);
                                vals.push(resObj.equipment.id);
                                vals.push(resObj.equipment.assignedEquipment[e].id);
                                vals.push(itemtypes.TYPE.LINK.ASSIGNED_EQUIPMENT);
                                addComma = true;
                                counter++;
                            }
                        }
                        if (resObj.permissions.need.description) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 3);
                            vals.push(resObj.equipment.id);
                            vals.push(resObj.equipment.descriptionId);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma = true;
                            counter++;
                        }
                        if (resObj.permissions.need.specialDescription) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 3);
                            vals.push(resObj.equipment.id);
                            vals.push(resObj.equipment.weapon.specialDescriptionId);
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
                            if (resObj.permissions.need.assignedEquipment) {
                                for (let q = 0; q < results.length; q++) {
                                    if (results[q].typeId == itemtypes.TYPE.LINK.ASSIGNED_EQUIPMENT) {
                                        for (let w = 0; w < resObj.equipment.assignedEquipment.length; w++) {
                                            if (results[q].targetId == resObj.equipment.assignedEquipment[w].id) {
                                                resObj.equipment.assignedEquipment[w].linkId = results[q].id;
                                                break;
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
                function linkCount(resObj, callback) {
                    console.log('equipment-19');
                    results = [];
                    vals = [];
                    addComma = false;
                    counter = 0;
                    if (resObj.permissions.need.assignedEquipment) {
                        sql = 'INSERT INTO adm_link_count';
                        sql += ' ("linkId", "count")';
                        sql += ' VALUES ';
                        for (let q = 0; q < resObj.equipment.assignedEquipment.length; q++) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.getParameterString(counter, 2);
                            vals.push(resObj.equipment.assignedEquipment[q].linkId);
                            vals.push(resObj.equipment.assignedEquipment[q].assigned);
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
    app.get('/api/adm/equipments', function(req, res) {
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
            sql += ', CASE WHEN get_assigned_equipment(i.id, $8) IS NULL THEN \'[]\' ELSE get_assigned_equipment(i.id, $8) END AS "assignedEquipment"';
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
            //sql += ' GROUP BY i.id, eq."cost", eq."weight"';
            sql += ' ORDER BY i."itemName"';
            vals = [
                itemtypes.TYPE.ITEM.EQUIPMENT,
                itemtypes.TYPE.DESCRIPTION.GENERAL,
                itemtypes.TYPE.PROFICIENCY.WEAPON.IMPROVISED,
                itemtypes.TYPE.PROFICIENCY.WEAPON.MARTIAL,
                itemtypes.TYPE.PROFICIENCY.WEAPON.SIMPLE,
                itemtypes.TYPE.DESCRIPTION.SPECIAL_WEAPON,
                itemtypes.TYPE.LINK.WEAPON_PROPERTY,
                itemtypes.TYPE.LINK.ASSIGNED_EQUIPMENT
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