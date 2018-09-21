import util from './util';

export const isReadyToSave = {
    chart: function(val) {
        if (!val.title || val.title.length == 0) {
            return false;
        }
        if (val.rows.length == 0 || val.columns.length == 0 || val.entries.length == 0 || val.columnCount <= 0 || val.rowCount <= 0) {
            return false;
        }
        if (val.type.id == util.itemtypes.TYPE.CHART.DICE) {
            if (!util.datatypes.compareDataType(val.dice.rendered, util.datatypes.SPECIAL.DICE)) {
                return false;
            }
        } else if (val.type.id == util.itemtypes.TYPE.CHART.SELECT) {
            if (val.isNewType) {
                if (!val.picklist || !val.picklist.name) {
                    return false;
                }
                for (let q = 0; q < val.rows.length; q++) {
                    if (!val.rows[q].text || val.rows[q].text.length == 0) {
                        return false;
                    }
                }
            } else {
                if (!val.picklist || val.picklist.id <= 0) {
                    return false;
                }
                for (let q = 0; q < val.rows.length; q++) {
                    if (!val.rows[q].picklistItem || val.rows[q].picklistItem.id <= 0) {
                        return false;
                    }
                }
            }
        }
        for (let q = 0; q < val.entries.length; q++) {
            switch (val.columns[parseInt(val.entries[q].columnIndex)].dataType.id) {
                case util.itemtypes.TYPE.DATA_TYPE.BOOL:
                    if (val.entries[q].boolValue === undefined || val.entries[q].boolValue === null) {
                        return false;
                    }
                    break;
                case util.itemtypes.TYPE.DATA_TYPE.DICE:
                    if (!util.datatypes.compareDataType(val.entries[q].diceValue.rendered, util.datatypes.SPECIAL.DICE)) {
                        return false;
                    }
                    break;
                case util.itemtypes.TYPE.DATA_TYPE.NUMBER:
                    if (Number.isNaN(parseFloat(val.entries[q].numberValue))) {
                        return false;
                    }
                    break;
                case util.itemtypes.TYPE.DATA_TYPE.PICKLIST:
                    if (!val.entries[q].picklistItem || val.entries[q].picklistItem.id == 0) {
                        return false;
                    }
                    break;
                case util.itemtypes.TYPE.DATA_TYPE.STRING:
                    if (!val.entries[q].text || val.entries[q].text.length == 0) {
                        return false;
                    }
                    break;
                default:
            }
        }
        return true;
    },
    mechanic: function(val) {
        if (!val) {
            return false;
        } else {
            if (!val.type || val.type.id <= 0) {
                return false;
            }
            if (val.type.id == util.itemtypes.TYPE.MECHANIC.SPECIAL_TEXT) {
                if (!val.specialText || val.specialText.length == 0) {
                    return false;
                }
            } else {
                if (!val.target || val.target.id <= 0) {
                    return false;
                }
            }
            if (val.type.id == util.itemtypes.TYPE.MECHANIC.BONUS.ROLL || val.type.id == util.itemtypes.TYPE.MECHANIC.BONUS.STAT) {
                if (!val.bonus) {
                    return false;
                } else {
                    if (val.bonus.type.id == util.itemtypes.TYPE.BONUS_TYPE.ABILITY_SCORE) {
                        if (!val.bonus.abilityScore || val.bonus.abilityScore.id == 0) {
                            return false;
                        }
                    } else if (val.bonus.type.id == util.itemtypes.TYPE.BONUS_TYPE.DICE) {
                        if (!util.datatypes.compareDataType(val.bonus.dice, util.datatypes.SPECIAL.DICE)) {
                            return false;
                        }
                    } else if (val.bonus.type.id == util.itemtypes.TYPE.BONUS_TYPE.MODIFIER) {
                        if (val.bonus.value == 0) {
                            return false;
                        }
                    } else if (val.bonus.type.id == util.itemtypes.TYPE.BONUS_TYPE.DIVISOR || val.bonus.type.id == util.itemtypes.TYPE.BONUS_TYPE.MULTIPLIER) {
                        if (val.bonus.value <= 1) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    },
    naturalWeapon: function(val) {
        if (!val.type || !val.type.id || val.type.id == 0) {
            return false;
        }
        if (!val.damage || !val.damage.type || !val.damage.type.id || val.damage.type.id == 0) {
            return false;
        }
        if (val.attack.count <= 0) {
            return false;
        }
        return true;
    },
    spellcastingGroup: function(val) {
        switch (val.type.id) {
            case util.itemtypes.TYPE.SPELLCASTING_GROUP.BY_SCHOOL:
                if (!val.school || (val.school.id == 0)) {
                    return false;
                }
                if (val.selectCount <= 0) {
                    return false;
                }
                break;
            case util.itemtypes.TYPE.SPELLCASTING_GROUP.BY_SPELL:
                if (!val.spell || (val.spell.id == 0)) {
                    return false;
                }
                break;
            case util.itemtypes.TYPE.SPELLCASTING_GROUP.BY_SPELL_LEVEL:
                if (val.spellLevel < 0) {
                    return false;
                }
                if (val.selectCount <= 0) {
                    return false;
                }
                break;
            case util.itemtypes.TYPE.SPELLCASTING_GROUP.BY_SPELLLIST:
                if (!val.spelllist || (val.spelllist.id == 0)) {
                    return false;
                }
                if (val.selectCount == 0) {
                    return false;
                }
                if (val.spellLevel < 0) {
                    return false;
                }
                break;
            default:
        }
        if (val.chargeCount > 0 && val.spellLevel > 0) {
            if (!val.rechargeType || val.rechargeType.id == 0) {
                return false;
            }
        }
        return true;
    },
    supplementalDescription: function(val) {
        if (!val.title || val.title.length == 0) {
            return false;
        }
        if (!val.description || val.title.description == 0) {
            return false;
        }
        return true;
    }
};
export const isReadyToShow = {
    chart: function(val) {
        if (val.columnCount == 0) {
            return false;
        }
        if (val.rowCount == 0) {
            return false;
        }
        if (val.type.id == util.itemtypes.TYPE.CHART.SELECT) {
            if (!val.isNewType) {
                if (!val.picklist || val.picklist.id == 0) {
                    return false;
                }
            }
        } else if (val.type.id == util.itemtypes.TYPE.CHART.DICE) {
            if (!util.datatypes.compareDataType(val.dice.rendered, util.datatypes.SPECIAL.DICE, [0, 1, 2])) {
                return true;
            }
        }
        return true;
    }
};