module.exports = function(app, pg, async, pool, itemtypes, common) {
    let results = [];
    let sql = '';
    let vals = [];
    let query = null;
    let tmp = null;
    let resObj = null;
    let parameterArray = null;
    let addComma = false;
    app.delete('/api/adm/equipment/:id', function(req, res) {
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
    app.post('/api/adm/equipment', function(req, res){
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
                    console.log('equipment-init');
                    resObj = req.body;
                    resObj.permissions = {};
                    resObj.permissions.needDice = false;
                    resObj.permissions.needAmmunition = false;
                    resObj.permissions.needArmor = false;
                    resObj.permissions.needCarryCapacity = false;
                    resObj.permissions.needDamage = false;
                    resObj.permissions.needDamageVersatile = false;
                    resObj.permissions.needDescription = false;
                    resObj.permissions.needProficiency = false;
                    resObj.permissions.needRange = false;
                    resObj.permissions.needSpeed = false;
                    resObj.permissions.needSpecialDescription = false;
                    resObj.permissions.needUnit = false;
                    resObj.permissions.needWeapon = false;
                    resObj.permissions.needWeaponProperty = false;
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON
                       || resObj.equipment.isImprovisedWeapon) {
                        resObj.permissions.needDice = true;
                        resObj.permissions.needDamage = true;
                        for (let q = 0; q < resObj.equipment.weapon.properties.length; q++) {
                            if (resObj.equipment.weapon.properties[q].id == itemtypes.TYPE.WEAPON_PROPERTY.VERSATILE) {
                                resObj.permissions.needDamageVersatile = true;
                            }
                            if (resObj.equipment.weapon.properties[q].id == itemtypes.TYPE.WEAPON_PROPERTY.AMMUNITION
                               || resObj.equipment.weapon.properties[q].id == itemtypes.TYPE.WEAPON_PROPERTY.THROWN) {
                                resObj.permissions.needRange = true;
                            }
                        }
                        if (resObj.equipment.isImprovisedWeapon) {
                            resObj.permissions.needRange = true;
                        }
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.AMMUNITION) {
                        resObj.permissions.needAmmunition = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
                        for (let q = 0; q < resObj.equipment.weapon.properties.length; q++) {
                            if (resObj.equipment.weapon.properties[q].id == itemtypes.TYPE.WEAPON_PROPERTY.AMMUNITION) {
                                resObj.permissions.needAmmunition = true;
                            }
                        }
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.ARMOR) {
                        resObj.permissions.needArmor = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.MOUNT) {
                        resObj.permissions.needCarryCapacity = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.ARMOR
                       || resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.LAND_VEHICLE
                       || resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WATER_VEHICLE
                       || resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
                        resObj.permissions.needProficiency = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.MOUNT
                       || resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WATER_VEHICLE) {
                        resObj.permissions.needSpeed = true;
                    }
                    if (resObj.equipment.count > 1 || (resObj.equipment.unit && resObj.equipment.unit.length != 0)) {
                        resObj.permissions.needUnit = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
                        resObj.permissions.needWeapon = true;
                        if (resObj.equipment.weapon.properties.length != 0) {
                            resObj.permissions.needWeaponProperty = true;
                        }
                    }
                    if (resObj.equipment.description && resObj.equipment.description.length != 0) {
                        resObj.permissions.needDescription = true;
                    }
                    if (resObj.equipment.category.id == itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
                        for (let q = 0; q < resObj.equipment.weapon.properties.length; q++) {
                            if (resObj.equipment.weapon.properties[q].id == itemtypes.TYPE.WEAPON_PROPERTY.SPECIAL) {
                                resObj.permissions.needSpecialDescription = true;
                            }
                        }
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
                        //done();
                        resObj.equipment.id = parseInt(results[0].id);
                        return callback(null, resObj);
                    });
                },
                function equipmentTable(resObj, callback) {
                    console.log('equipment-02');
                    results = [];
                    sql = 'INSERT INTO adm_def_equipment';
                    sql += ' ("equipmentId", "cost", "weight", "categoryId")';
                    sql += ' VALUES ($1, $2, $3, $4)';
                    vals = [
                        resObj.equipment.id,
                        resObj.equipment.cost,
                        resObj.equipment.weight,
                        resObj.equipment.category.id
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
                function manageDice(resObj, callback) {
                    console.log('equipment-03');
                    results = [];
                    if (resObj.permissions.needDice) {
                        let diceArr = [resObj.equipment.weapon.damage.dice];
                        if (resObj.permissions.needDamageVersatile) {
                            diceArr.push(resObj.equipment.weapon.damage.versatile.dice);
                        }
                        common.getObjects.dice(diceArr, function(results) {
                            resObj.equipment.weapon.damage.dice = common.datatypes.dice.getObject(results, resObj.equipment.weapon.damage.dice);
                            if (resObj.permissions.needDamageVersatile) {
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
                            //done();
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
                            //done();
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function ammunitionTable(resObj, callback) {
                    console.log('equipment-07');
                    results = [];
                    if (resObj.permissions.needAmmunition) {
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
                            //done();
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function armorTable(resObj, callback) {
                    console.log('equipment-08');
                    results = [];
                    if (resObj.permissions.needArmor) {
                        sql = 'INSERT INTO adm_def_equipment_armor';
                        sql += ' ("equipmentId", "baseArmorClass", "applyDexterityModifier", "maximumDexterityModifier", "isCumulative", "minimumStrength", "stealthDisadvantage")';
                        sql += ' VALUES ($1, $2, $3, $4, $5, $6, $7)';
                        vals = [
                            resObj.equipment.id,
                            resObj.equipment.armor.armorClass.base,
                            resObj.equipment.armor.armorClass.applyDexterity,
                            resObj.equipment.armor.armorClass.maximumDexterity,
                            resObj.equipment.armor.armorClass.isCumulative,
                            resObj.equipment.armor.minimumStrength,
                            resObj.equipment.armor.stealthDisadvantage
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
                function carryCapacityTable(resObj, callback) {
                    console.log('equipment-09');
                    results = [];
                    if (resObj.permissions.needCarryCapacity) {
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
                            //done();
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function damageTable(resObj, callback) {
                    console.log('equipment-10');
                    results = [];
                    if (resObj.permissions.needDamage) {
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
                            //done();
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function damageVersatileTable(resObj, callback) {
                    console.log('equipment-11');
                    results = [];
                    if (resObj.permissions.needDamageVersatile) {
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
                            //done();
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function proficiencyTable(resObj, callback) {
                    console.log('equipment-12');
                    results = [];
                    if (resObj.permissions.needProficiency || resObj.equipment.isImprovisedWeapon) {
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
                            //done();
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function rangeTable(resObj, callback) {
                    console.log('equipment-13');
                    results = [];
                    if (resObj.permissions.needRange) {
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
                            //done();
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function speedTable(resObj, callback) {
                    console.log('equipment-14');
                    results = [];
                    if (resObj.permissions.needSpeed) {
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
                            //done();
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function unitTable(resObj, callback) {
                    console.log('equipment-15');
                    results = [];
                    if (resObj.permissions.needUnit) {
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
                            //done();
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function weaponTable(resObj, callback) {
                    console.log('equipment-16');
                    results = [];
                    if (resObj.permissions.needWeapon) {
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
                            //done();
                            return callback(null, resObj);
                        });
                    } else {
                        return callback(null, resObj);
                    }
                },
                function insertDescriptions(resObj, callback) {
                    console.log('equipment-17');
                    results = [];
                    if (resObj.permissions.needDescription || resObj.permissions.needSpecialDescription) {
                        sql = 'INSERT INTO adm_core_item';
                        sql += ' ("description", "typeId")';
                        sql += ' VALUES ';
                        vals = [];
                        addComma = false;
                        parameterArray = common.parameterArray.resetValues(2);
                        if (resObj.permissions.needDescription) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.equipment.description);
                            vals.push(itemtypes.TYPE.DESCRIPTION.GENERAL);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        if (resObj.permissions.needSpecialDescription) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.equipment.weapon.special);
                            vals.push(itemtypes.TYPE.DESCRIPTION.SPECIAL_WEAPON);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        sql += ' Returning id, description, "typeId"';
                        query = client.query(new pg.Query(sql, vals));
                        query.on('row', function(row) {
                            results.push(row);
                        });
                        query.on('end', function() {
                            //done();
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
                function weaponPropertyLink(resObj, callback) {
                    console.log('equipment-18');
                    results = [];
                    if (resObj.permissions.needWeaponProperty || resObj.equipment.description || resObj.permissions.needSpecialDescription) {
                        sql = 'INSERT INTO adm_link';
                        sql += ' ("referenceId", "targetId", "typeId")';
                        sql += ' VALUES ';
                        vals = [];
                        addComma = false;
                        parameterArray = common.parameterArray.resetValues(3);
                        if (resObj.permissions.needWeaponProperty) {
                            for (let e = 0; e < resObj.equipment.weapon.properties.length; e++) {
                                sql += addComma ? ', ' : '';
                                sql += common.parameterArray.sql(parameterArray);
                                vals.push(resObj.equipment.id);
                                vals.push(resObj.equipment.weapon.properties[e].id);
                                vals.push(itemtypes.TYPE.LINK.WEAPON_PROPERTY);
                                addComma = true;
                                parameterArray = common.parameterArray.incrementValues(parameterArray);
                            }
                        }
                        if (resObj.permissions.needDescription) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.equipment.id);
                            vals.push(resObj.equipment.descriptionId);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
                        if (resObj.permissions.needSpecialDescription) {
                            sql += addComma ? ', ' : '';
                            sql += common.parameterArray.sql(parameterArray);
                            vals.push(resObj.equipment.id);
                            vals.push(resObj.equipment.weapon.specialDescriptionId);
                            vals.push(itemtypes.TYPE.LINK.DESCRIPTION);
                            addComma = true;
                            parameterArray = common.parameterArray.incrementValues(parameterArray);
                        }
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
            sql += ', eq."cost", eq."weight"';
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
            sql += '            \'maximumDexterity\', armor."maximumDexterityModifier"';
            sql += '        ),';
            sql += '        \'minimumStrength\', armor."minimumStrength",';
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
            //sql += ' GROUP BY i.id, eq."cost", eq."weight"';
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
                done();
                return res.json(results);
            });
        });
    });
};