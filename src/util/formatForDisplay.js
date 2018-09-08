import util from './util';

let array = {};
array.commaDelimitedList = function(arr) {
    let retVal = '';
    if (arr && arr.length != 0) {
        for (let q = 0; q < arr.length; q++) {
            if (arr[q] && arr[q].name && arr[q].name.length != 0) {
                retVal += arr[q].name;
            }
            if (q < arr.length - 1) {
                retVal += ', ';
            }
        }
    }
    return retVal;
};
array.commaDelimietdListWithConjunction = function(arr, isInclusive) {
    let retVal = '';
    if (arr && arr.length != 0) {
        for (let q = 0; q < arr.length; q++) {
            if (arr[q] && arr[q].name && arr[q].name.length != 0) {
                retVal += arr[q].name;
            }
            if (q < arr.length - 2) {
                retVal += ', ';
            } else if (q < arr.length - 1) {
                retVal += isInclusive ? ' and ' : ' or ';
            }
        }
    }
    return retVal;
};
array.equipmentPackItems = function(arr) {
    let retVal = util.unicode.punctuation.longDash;
    if (arr.length != 0) {
        retVal = '';
        for (let a = 0; a < arr.length; a++) {
            retVal += util.format.forDisplay.string.reorderCommaSeparatedString(arr[a].name);
            let tmpCount = arr[a].assigned;
            if (arr[a].count != 0) {
                tmpCount = tmpCount * arr[a].count;
            }
            if (tmpCount != 1 && arr[a].unit.length != 0) {
                retVal += ' (' + tmpCount.toString() + ' ' + arr[a].unit + ')';
            } else if (tmpCount != 1 && arr[a].unit.length == 0) {
                retVal += ' (' + tmpCount.toString() + ')';
            } else if (tmpCount == 1 && arr[a].unit.length != 0) {
                retVal += ' (' + arr[a].unit + ')';
            }
            if (a < arr.length - 1) {
                retVal += ', ';
            }
        }
    }
    return retVal;
};
array.enclosedCommaDelimtedList = function(arr, openString, closeString) {
    let retVal = '';
    if (arr && arr.length != 0) {
        if (openString && openString.length != 0) {
            retVal += openString;
        }
        retVal += util.format.forDisplay.array.commaDelimitedList(arr);
        if (closeString && closeString.length != 0) {
            retVal += closeString;
        } else if (openString && openString.length != 0) {
            retVal += openString;
        }
    }
    return retVal;
};
array.weaponProperties = function(arr) {
    let retVal = util.unicode.punctuation.longDash;
    if (arr) {
        if (arr.properties && arr.properties.length > 0) {
            retVal = '';
            for (let x = 0; x < arr.properties.length; x++) {
                retVal += arr.properties[x].name;
                if (arr.properties[x].requireVersatileDamage) {
                    retVal += ' (' + util.format.forDisplay.string.dieRoll(arr.damage.versatile.dice) + ')';
                }
                if (arr.properties[x].requireRange) {
                    retVal += ' (range ' + arr.range.normal + '/' + arr.range.maximum + ')';
                }
                retVal += x < arr.properties.length - 1 ? ', ' : '';
            }
        }
    }
    return retVal;
};

let bool = {};
bool.asCheckBlank = function(val) {
    if (val) {
        return util.unicode.punctuation.checkMark;
    }
    return '';
};
bool.asCheckX = function(val) {
    if (val) {
        return util.unicode.punctuation.checkMark;
    }
    return util.unicode.punctuation.xMark;
};
bool.asYesNo = function(val) {
    if (val) {
        return 'Yes';
    }
    return 'No';
};
bool.asTrueFalse = function(val) {
    if (val) {
        return 'True';
    }
    return 'False';
};
bool.hasDisadvantage = function(val) {
    if (val) {
        return 'Disadvantage';
    }
    return util.unicode.punctuation.longDash;
};

let number = {};
number.abilityScoreMinimum = function(val, ability) {
    if (val == 0) {
        return util.unicode.punctuation.longDash;
    } else {
        return ability + ' ' + val.toString();
    }
};
number.addCommas = function(val) {
    let retVal = '';
    if (val) {
        let commaRefIndex = 0;
        for (let i = val.toString().length - 1; i >= 0; i--) {
            if (commaRefIndex % 3 == 0 && commaRefIndex != 0) {
                retVal = ',' + retVal;
            }
            retVal = val.toString().charAt(i) + retVal;
            commaRefIndex++;
        }
    }
    return retVal;
};
number.coin = function(val, fullNames) {
    let retVal = util.unicode.punctuation.longDash;
    let coinTypes = ['gp', 'sp', 'cp'];
    if (fullNames) {
        coinTypes = ['gold piece', 'silver piece', 'copper piece'];
    }
    if (val && val != 0) {
        retVal = '';
        let goldVal = Math.floor(val);
        let silverVal = Math.floor((val - goldVal) * 10 + 0.1);
        let copperVal = Math.round((val - goldVal - (silverVal / 10)) * 100);
        if (goldVal != 0) {
            retVal += util.format.forDisplay.number.addCommas(goldVal) + ' ';
            if (fullNames) {
                retVal += util.format.forDisplay.string.renderSingularPlural(coinTypes[0], goldVal);
            } else {
                retVal += coinTypes[0];
            }
            if (goldVal != 0) {
                if (silverVal != 0 || copperVal != 0) {
                    if (silverVal != 0 && copperVal != 0) {
                        retVal += ', ';
                    } else {
                        retVal += ' and ';
                    }
                }
            }
        }
        if (silverVal != 0) {
            retVal += silverVal + ' ';
            if (fullNames) {
                retVal += util.format.forDisplay.string.renderSingularPlural(coinTypes[1], silverVal);
            } else {
                retVal += coinTypes[1];
            }
            if (copperVal != 0) {
                retVal += ' and ';
            }
        }
        if (copperVal != 0) {
            retVal += copperVal + ' ';
            if (fullNames) {
                retVal += util.format.forDisplay.string.renderSingularPlural(coinTypes[2], copperVal);
            } else {
                retVal += coinTypes[2];
            }
        }
    }
    return retVal;
};
number.ordinal = function(val) {
    let retVal = '';
    let lastDigit = val.toString().slice(-1);
    switch (lastDigit) {
        case '1':
            if (val == 11) {
                retVal = val.toString() + 'th';
            } else {
                retVal = val.toString() + 'st';
            }
            break;
        case '2':
            if (val == 12) {
                retVal = val.toString() + 'th';
            } else {
                retVal = val.toString() + 'nd';
            }
            break;
        case '3':
            retVal = val.toString() + 'rd';
            break;
        default:
            retVal = val.toString() + 'th';
    }
    return retVal;
};
number.renderAsWord = function(val) {
    let retVal = '';
    switch (val) {
        case 1:
            retVal = 'one';
            break;
        case 2:
            retVal = 'two';
            break;
        case 3:
            retVal = 'three';
            break;
        case 4:
            retVal = 'four';
            break;
        case 5:
            retVal = 'five';
            break;
        case 6:
            retVal = 'six';
            break;
        case 7:
            retVal = 'seven';
            break;
        case 8:
            retVal = 'eight';
            break;
        case 9:
            retVal = 'nine';
            break;
        case 10:
            retVal = 'ten';
            break;
        case 11:
            retVal = 'eleven';
            break;
        case 12:
            retVal = 'twelve';
            break;
        default:
            retVal = val.toString();
    }
    return retVal;
};
number.speed = function(val) {
    let retVal = util.unicode.punctuation.longDash;
    if (val && val != 0) {
        retVal = val + ' ft.';
    }
    return retVal;
};
number.weight = function(val) {
    let retVal = util.unicode.punctuation.longDash;
    if (val && val != 0) {
        retVal = util.unicode.vulgarFractions.calculateFractionalValue(val);
        if (val > 1) {
            retVal += ' lbs.';
        } else {
            retVal += ' lb.';
        }
    }
    return retVal;
};
number.vehicleSpeed = function(val) {
    let retVal = util.unicode.punctuation.longDash;
    if (val && val != 0) {
        retVal = util.unicode.vulgarFractions.calculateFractionalValue(val) + ' mph';
    }
    return retVal;
};

let obj = {};
obj.armorClass = function(val) {
    let retVal = '';
    if (val.isCumulative) {
        retVal += '+';
    }
    retVal += val.base.toString();
    if (val.applyDexterity) {
        retVal += ' + Dex Modifier';
        if (val.hasMaximumDexterity) {
            retVal += ' (max ' + val.maximumDexterity.toString() + ')';
        }
    }
    return retVal;
};
obj.damage = function(val) {
    let retVal = '';
    //<td>{util.format.forDisplay.string.dieRoll(this.props.weapon.damage.dice) + ' ' + (this.props.weapon.damage.dice.dieCount == 0 ? '' : this.props.weapon.damage.type.name)}</td>
    retVal = util.format.forDisplay.string.dieRoll(val.dice);
    if (val.type && val.type.name && val.type.name != 'None') {
        retVal += ' ' + val.type.name;
    }
    return retVal;
};
obj.equipmentList = function(val) {
    let retVal = '';
    for (let y = 0; y < val.assignedEquipment.length; y++) {
        retVal += val.assignedEquipment[y].name + ', ';
    }
    retVal += ' and a pouch containing ' + util.format.forDisplay.number.coin(val.startingGold, true) + '.';
    return retVal;
};
obj.equipmentName = function(val) {
    let retVal = val.name;
    if (val.count) {
        if (val.count != 1 && val.unit.length != 0) {
            retVal += ' (' + val.count.toString() + ' ' + val.unit + ')';
        } else if (val.count != 1 && val.unit.length == 0) {
            retVal += ' (' + val.count.toString() + ')';
        } else if (val.count == 1 && val.unit.length != 0) {
            retVal += ' (' + val.unit + ')';
        }
    }
    if (val.isMagicItem) {
        retVal = retVal + '';
    }
    return retVal;
};
obj.mechanic = function(val) {
    let retVal = '';
    switch (val.type.id) {
        case 0:
            retVal = '';
            break;
        case util.itemtypes.TYPE.MECHANIC.ADVANTAGE:
        case util.itemtypes.TYPE.MECHANIC.DISADVANTAGE:
            if (val.type.id == util.itemtypes.TYPE.MECHANIC.ADVANTAGE) {
                retVal += 'Advantage to ';
            } else {
                retVal += 'Disadvantage to ';
            }
            retVal += util.format.forDisplay.obj.mechanicTarget(val);
            break;
        case util.itemtypes.TYPE.MECHANIC.IMMUNITY:
        case util.itemtypes.TYPE.MECHANIC.RESISTANCE:
        case util.itemtypes.TYPE.MECHANIC.VULNERABILITY:
            if (val.type.id == util.itemtypes.TYPE.MECHANIC.IMMUNITY) {
                retVal += 'Immunity to ';
            } else if (val.type.id == util.itemtypes.TYPE.MECHANIC.RESISTANCE) {
                retVal += 'Resistance to ';
            } else {
                retVal += 'Vulnerability to ';
            }
            if (val.target.type.id == util.itemtypes.TYPE.ITEM.DAMAGE_TYPE) {
                retVal += val.target.name + ' damage.';
            } else if (val.target.type.id == util.itemtypes.TYPE.ITEM.DAMAGE_SOURCE) {
                retVal += 'damage from ' + val.target.name + '.';
            } else if (val.target.type.id == util.itemtypes.TYPE.ITEM.CONDITION) {
                retVal += 'becoming ' + val.target.name + '.';
            } else {
                retVal += val.target.name;
            }
            break;
        case util.itemtypes.TYPE.MECHANIC.BONUS.ROLL:
        case util.itemtypes.TYPE.MECHANIC.BONUS.STAT:
            retVal = util.format.forDisplay.obj.mechanicBonus(val);
            break;
        case util.itemtypes.TYPE.MECHANIC.SPECIAL_TEXT:
            retVal = val.specialText;
            break;
        default:
            retVal = 'need to add to switch in format.forDisplay.obj.mechanic';
    }
    if (val.conditionalText && val.conditionalText.length != 0) {
        retVal += ' (' + val.conditionalText + ')';
    }
    return retVal;
};
obj.mechanicBonus = function(val) {
    let retVal = '';
    switch (val.bonus.type.id) {
        case util.itemtypes.TYPE.BONUS_TYPE.ABILITY_SCORE:
            retVal = 'Apply ' + val.bonus.abilityScore.name + ' modifier to ' + util.format.forDisplay.obj.mechanicTarget(val);
            //retVal = 'Apply ' + val.bonus.abilityScore.name + ' modifier to ' + val.target.name + '.';
            break;
        case util.itemtypes.TYPE.BONUS_TYPE.DICE:
            retVal = 'Add ' + val.bonus.dice.rendered + ' to ' + util.format.forDisplay.obj.mechanicTarget(val);
            break;
        case util.itemtypes.TYPE.BONUS_TYPE.DIVISOR:
            retVal = 'Divide ' + util.format.forDisplay.obj.mechanicTarget(val) + ' by ' + val.bonus.value;
            break;
        case util.itemtypes.TYPE.BONUS_TYPE.MODIFIER:
            retVal = ((val.bonus.value >= 0) ? '+' : '') + val.bonus.value;
            retVal += ' to ' + util.format.forDisplay.obj.mechanicTarget(val);
            if (val.bonus.advancement.type.id == util.itemtypes.TYPE.ADVANCEMENT_TYPE.AT_LEVEL) {
                if (val.bonus.advancement.atLevels.length == 1) {
                    retVal += ' at level ' + val.bonus.advancement.atLevels;
                } else {
                    retVal += ' at levels ' + val.bonus.advancement.atLevels;
                }
            } else if (val.bonus.advancement.type.id == util.itemtypes.TYPE.ADVANCEMENT_TYPE.EVERY_X_LEVELS) {
                if (val.bonus.advancement.levelCount == 1) {
                    retVal += ' every level';
                } else {
                    retVal += ' every ' + val.bonus.advancement.levelCount + ' levels';
                }
            }
            break;
        case util.itemtypes.TYPE.BONUS_TYPE.MULTIPLIER:
            if (val.bonus.value == 2) {
                retVal = 'Double';
            } else if (val.bonus.value == 3) {
                retVal = 'Triple';
            } else if (val.bonus.value == 4) {
                retVal = 'Quadruple';
            } else {
                retVal = 'Multiply by ' + val.bonus.value;
            }
            break;
        case util.itemtypes.TYPE.BONUS_TYPE.PROFICIENCY_BONUS:
            retVal = 'Apply Proficiency Bonus';
            if (val.bonus.value > 1) {
                retVal += ' x' + val.bonus.value;
            }
            break;
        default:
    }
    return retVal;
};
obj.mechanicTarget = function(val) {
    let retVal = '';
    switch (parseInt(val.target.type.id)) {
        case util.itemtypes.TYPE.ITEM.DAMAGE_TYPE:
            retVal = 'Saving Throws against ' + val.target.name + ' damage';
            break;
        case util.itemtypes.TYPE.ITEM.DAMAGE_SOURCE:
            retVal = 'Saving throws against damage from ' + val.target.name;
            break;
        case util.itemtypes.TYPE.ITEM.OTHER_EFFECT:
            retVal = 'Saving throws to avoid ' + val.target.name;
            break;
        case util.itemtypes.TYPE.ITEM.CHECK:
            retVal = val.target.name + 's';
            break;
        case util.itemtypes.TYPE.ITEM.CONDITION:
            retVal = 'Saving throws to avoid becoming ' + val.target.name;
            break;
        case util.itemtypes.TYPE.ITEM.PROFICIENCY:
            if (val.target.category.id == util.itemtypes.TYPE.PROFICIENCY_CATEGORY.SAVING_THROW) {
                retVal = val.target.name + 's';
            } else if (val.target.category.id == util.itemtypes.TYPE.PROFICIENCY_CATEGORY.SKILL) {
                retVal = val.target.abilityScore.name + ' (' + val.target.name + ') Checks';
            }
            break;
        default:
            retVal += val.target.name;
    }
    return retVal;
};
obj.monsterTypeSizeBlock = function(val) {
    let retVal = '';
    if (val.size && val.size.name && val.size.name.length != 0) {
        retVal += val.size.name;
    }
    if (val.type && val.type.name && val.type.name.length != 0) {
        if (retVal.length != 0) {
            retVal += ' ';
        }
        retVal += val.type.name;
    }
    if (val.tags && val.tags.length != 0) {
        retVal += ' (';
        for (let t = 0; t < val.tags.length; t++) {
            if (t != 0) {
                retVal += ', ';
            }
            retVal += val.tags[t].name;
        }
        retVal += ')';
    }
    return retVal;
};
obj.proficiency = {
    savingThrow: function(val) {
        let retVal = val.name + ' saving throws';
        return retVal;
    },
    skill: function(val) {
        let retVal = val.abilityScore.name + ' (' + val.name + ')';
        return retVal;
    }
};
obj.proficiencyBlock = {
    selectFrom: {
        list: function(profBlock, catIds) {
            let retVal = '';
            let filteredProfBlock = profBlock.select.list.filter(function(blk) {
                for (let q = 0; q < catIds.length; q++) {
                    if (catIds[q] == blk.category.id) {
                        return true;
                    }
                }
                return false;
            });
            for (let q = 0; q < filteredProfBlock.length; q++) {
                retVal += util.format.forDisplay.obj.proficiencyList(filteredProfBlock[q]);
            }
            return retVal;
        },
        category: function(profBlock, catIds) {
            let retVal = '';
            let filteredProfBlock = profBlock.select.category.filter(function(blk) {
                for (let q = 0; q < catIds.length; q++) {
                    if (catIds[q] == blk.id) {
                        return true;
                    }
                }
                return false;
            });
            if (filteredProfBlock.length != 0) {
                for (let q = 0; q < filteredProfBlock.length; q++) {
                    retVal += q == 0 ? 'Select ' : ' and ';
                    retVal += filteredProfBlock[q].count + ' ';
                    retVal += util.format.forDisplay.string.renderSingularPlural(filteredProfBlock[q].name, filteredProfBlock[q].count);
                }
            }
            return retVal;
        }
    },
    assigned: function(profBlock, catIds) {
        let retVal = '';
        let filteredProfBlock = profBlock.assigned.filter(function(blk) {
            for (let q = 0; q < catIds.length; q++) {
                if (catIds[q] == blk.category.id) {
                    return true;
                }
            }
            return false;
        });
        if (filteredProfBlock.length != 0) {
            retVal = 'Proficient with the following: ';
            for (let q = 0; q < filteredProfBlock.length; q++) {
                retVal += q != 0 && q != filteredProfBlock.length - 1 ? ', ' : '';
                retVal += (q == filteredProfBlock.length - 1 && q != 0) ? ' and ' : '';
                retVal += filteredProfBlock[q].name;
            }
        }
        return retVal;
    }
};
obj.proficiencyCategory = function(val) {
    return 'Select ' + util.format.forDisplay.number.renderAsWord(val.count) + ' ' + util.format.forDisplay.string.renderSingularPlural(val.name, val.count);
};
obj.proficiencyList = function(val) {
    let retVal = 'Select ' + util.format.forDisplay.number.renderAsWord(val.count) + ' ' + util.format.forDisplay.string.renderSingularPlural(val.category.name, val.count) + ' from the following: ';
    for (let q = 0; q < val.proficiencies.length; q++) {
        retVal += (q != 0) ? ', ' : '';
        retVal += (q == val.proficiencies.length - 1) ? ' or ' : '';
        retVal += val.proficiencies[q].name;
    }
    return retVal;
};
obj.spellComponents = function(val) {
    let retVal = '';
    if (val.components.length != 0) {
        if (val.components[0].id) {
            for (let e = 0; e < val.components.length; e++) {
                if (retVal.length != 0) {
                    retVal += ', ';
                }
                retVal += val.components[e].name.substring(0, 1).toUpperCase();
                if (val.components[e].id == util.itemtypes.SPELL_COMPONENT.MATERIAL) {
                    retVal += ' (' + val.components[e].description + ')';
                }
            }
        }
    }
    return retVal;
};
obj.spellLevelAndSchool = function(val) {
    let isRitualText = val.isRitual ? ' (ritual)' : '';
    if (val.level == 0) {
        return val.school.name + ' Cantrip' + isRitualText;
    } else {
        return util.format.forDisplay.number.ordinal(val.level) + '-level ' + val.school.name + isRitualText;
    }
};
obj.spellSelection = function(val) {
    let retVal = '';
    switch (val.selectionType.id) {
        case util.itemtypes.SPELL_SELECTION.BY_LEVEL:
            if (val.characterLevel != 1) {
                retVal += ' At ' + util.format.forDisplay.number.ordinal(val.characterLevel) + ' level, select';
            } else {
                retVal += 'Select';
            }
            retVal += ' ' + val.selectCount.toString() + ' ';
            if (val.spellLevel == 0) {
                retVal += ' cantrip.';
            } else {
                retVal += util.format.forDisplay.number.ordinal(val.spellLevel) + ' level ' + util.format.forDisplay.string.renderSingularPlural('spell', val.selectCount);
            }
            //retVal += ' ' + (val.spellLevel != 0) ? util.format.forDisplay.number.ordinal(val.spellLevel) + ' level ' + util.format.forDisplay.string.renderSingularPlural('spell', val.selectCount) : ' cantrips';
            if (val.spellLevel != 0) {
                retVal += ' You can cast ' + util.format.forDisplay.string.renderSingularPlural('this', val.selectCount) + ' ' + util.format.forDisplay.string.renderSingularPlural('spell', val.selectCount);
                retVal += ' ' + val.castingCount.toString() + ' ' + util.format.forDisplay.string.renderSingularPlural('time', val.castingCount);
                retVal += ' per ' + val.rechargeType.name + '.';
            }
            break;
        case util.itemtypes.SPELL_SELECTION.BY_SCHOOL:
            if (val.characterLevel != 1) {
                retVal += ' At ' + util.format.forDisplay.number.ordinal(val.characterLevel) + ' level, select';
            } else {
                retVal += 'Select';
            }
            retVal += ' ' + util.format.forDisplay.number.renderAsWord(val.selectCount) + ' ';
            if (val.spellLevel != 0) {
                retVal += util.format.forDisplay.number.ordinal(val.spellLevel) + ' level ' + util.format.forDisplay.string.renderSingularPlural('spell', val.selectCount);
            } else {
                retVal += util.format.forDisplay.string.renderSingularPlural('cantrip', val.selectCount);
            }
            //retVal += ' ' + (val.spellLevel != 0) ? util.format.forDisplay.number.ordinal(val.spellLevel) + ' level ' + util.format.forDisplay.string.renderSingularPlural('spell', val.selectCount) : ' cantrips';
            retVal += ' from the school of ' + val.school.name + '.';
            if (val.spellLevel != 0) {
                retVal += ' You can cast ' + util.format.forDisplay.string.renderSingularPlural('this', val.selectCount) + ' ' + util.format.forDisplay.string.renderSingularPlural('spell', val.selectCount);
                retVal += ' ' + val.castingCount.toString() + ' ' + util.format.forDisplay.string.renderSingularPlural('time', val.castingCount);
                retVal += ' per ' + val.rechargeType.name + '.';
            }
            break;
        case util.itemtypes.SPELL_SELECTION.BY_SPELL:
            if (val.characterLevel != 1) {
                retVal += ' At ' + util.format.forDisplay.number.ordinal(val.characterLevel) + ' level, you';
            } else {
                retVal += 'You';
            }
            retVal += ' can cast the ' + ((val.spellLevel == 0) ? 'cantrip' : 'spell');
            retVal += ' ' + val.spell.name + '.';
            if (val.spellLevel != 0) {
                retVal += ' You can cast this spell';
                retVal += ' ' + val.castingCount.toString() + ' ' + util.format.forDisplay.string.renderSingularPlural('time', val.castingCount);
                retVal += ' per ' + val.rechargeType.name + '.';
            }
            break;
        case util.itemtypes.SPELL_SELECTION.BY_SPELL_LIST:
            if (val.characterLevel != 1) {
                retVal += ' At ' + util.format.forDisplay.number.ordinal(val.characterLevel) + ' level, select';
            } else {
                retVal += 'Select';
            }
            retVal += ' ' + val.selectCount.toString() + ' ';
            retVal += ' ' + (val.spellLevel != 0) ? util.format.forDisplay.number.ordinal(val.spellLevel) + ' level ' + util.format.forDisplay.string.renderSingularPlural('spell', val.selectCount) : ' cantrips';
            retVal += ' from the ' + val.spelllist.name + ' Spell List.';
            if (val.spellLevel != 0) {
                retVal += ' You can cast ' + util.format.forDisplay.string.renderSingularPlural('this', val.selectCount) + ' ' + util.format.forDisplay.string.renderSingularPlural('spell', val.selectCount);
                retVal += ' ' + val.castingCount.toString() + ' ' + util.format.forDisplay.string.renderSingularPlural('time', val.castingCount);
                retVal += ' per ' + val.rechargeType.name + '.';
            }
            break;
        default:
    }
    return retVal;
};

let string = {};
string.dieRoll = function(val, omitOnes) {
    let retVal = '';
    if (val) {
        if (val.dieCount == 0 || val.dieType == 0) {
            retVal = util.unicode.punctuation.longDash;
        } else if (val.dieType == 1) {
            retVal = val.dieCount.toString();
        } else {
            if (omitOnes) {
                if (val.dieCount != 1) {
                    retVal = val.dieCount.toString();
                }
                retVal += 'd' + val.dieType.toString();
            } else {
                retVal = val.dieCount.toString() + 'd' + val.dieType.toString();
                if (val.modifier != 0) {
                    if (val.modifier > 0) {
                        retVal += '+' + val.modifier.toString();
                    } else {
                        retVal += val.modifier.toString();
                    }
                } else if (val.multiplier != 1) {
                    retVal += 'x' + val.multiplier.toString();
                } else if (val.divisor != 1) {
                    retVal += '/' + val.divisor.toString();
                }
            }
        }
    }
    return retVal.toString();
};
string.dieRollValueRange = function(val) {
    if (val.minimum == val.maximum) {
        return val.minimum.toString();
    }
    return val.minimum + '-' + val.maximum;
};
string.reorderCommaSeparatedString = function(val) {
    let retVal = val;
    if (val.split(', ').length != 1) {
        let tmpArr = val.split(', ');
        retVal = tmpArr[1] + ' ' + tmpArr[0];
    }
    return retVal;
};
string.renderSingularPlural = function(val, count) {
    if (count == 1) {
        return val;
    } else {
        if (val == 'this') {
            return 'these';
        } else {
            if (val.charAt(val.length - 1).toLowerCase() == 'y') {
                return val.toString().substring(0, val.length - 1) + 'ies';
            } else {
                return val + 's';
            }
        }
    }
};
export {bool, string, number, array, obj};