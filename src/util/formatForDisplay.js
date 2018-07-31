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
            let tmpCount = arr[a].assignedCount;
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
        if (arr.weaponProperties && arr.weaponProperties.length > 0) {
            retVal = '';
            for (let x = 0; x < arr.weaponProperties.length; x++) {
                retVal += arr.weaponProperties[x].name;
                if (arr.weaponProperties[x].requireDamage) {
                    retVal += ' (' + util.format.forDisplay.string.dieRoll(arr.damage.versatile.dice) + ')';
                }
                if (arr.weaponProperties[x].requireRange) {
                    retVal += ' (range ' + arr.range.normal + '/' + arr.range.maximum + ')';
                }
                retVal += x < arr.weaponProperties.length - 1 ? ', ' : '';
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
    retVal += val.baseArmorClass.toString();
    if (val.applyDexModifier) {
        retVal += ' + Dex Modifier';
        if (val.hasMaxDexModifier) {
            retVal += ' (max ' + val.maxDexModifier.toString() + ')';
        }
    }
    return retVal;
};
obj.breathWeapon = function(val) {
    let retVal = '';
    retVal += util.format.forDisplay.string.dieRoll(val.damage.dice);
    retVal += ' ' + val.damage.type.name + ' damage';
    return retVal;
};
obj.breathWeaponImprovement = {};
obj.breathWeaponImprovement.Charges = function(val) {
    let retVal = '';
    retVal = '+' + val.count.toString() + ' uses at ' + util.format.forDisplay.number.ordinal(val.characterLevel) + ' level.';
    return retVal;
};
obj.breathWeaponImprovement.Damage = function(val) {
    let retVal = '';
    retVal = '+' + val.dice.rendered + ' damage at ' + util.format.forDisplay.number.ordinal(val.characterLevel) + ' level.';
    return retVal;
};
obj.breathWeaponDescription = function(val) {
    let retVal = val;
    
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
        retVal = retVal + ' ';
    }
    return retVal;
};
obj.itemGroup = function(val) {
    let retVal = '';
    switch (val.mechanic.id) {
        case util.itemtypes.SELECTION_MECHANIC.ASSIGNMENT:
            for (let x = 0; x < val.proficiencies.length; x++) {
                retVal += val.proficiencies[x].name;
                if (x < val.proficiencies.length - 1) {
                    retVal += ', ';
                }
            }
            break;
        case util.itemtypes.SELECTION_MECHANIC.SELECT_FROM.CATEGORY:
            retVal = util.format.forDisplay.number.renderAsWord(val.selectCount) + ' ' + util.format.forDisplay.string.renderSingularPlural(val.category.name, val.selectCount);
            break;
        case util.itemtypes.SELECTION_MECHANIC.SELECT_FROM.LIST:
            retVal = 'Select ' + util.format.forDisplay.number.renderAsWord(val.selectCount) + ' from the following: ' + util.format.forDisplay.string.renderSingularPlural(val.category.name, val.selectCount) + ': ';
            for (let x = 0; x < val.proficiencies.length; x++) {
                retVal += val.proficiencies[x].name;
                if (x < val.proficiencies.length - 1) {
                    retVal += ', ';
                }
            }
            break;
        case util.itemtypes.SELECTION_MECHANIC.CONDITIONAL:
            retVal = 'You gain proficiency with ' + val.proficiencies[0].name + ' checks ' + val.conditionalText;
            break;
        default:
    }
    return retVal;
};
obj.mechanic = function(val) {
    let retVal = '';
    if (val.title && val.title.length != 0) {
        retVal += val.title + '. ';
    }
    switch (val.type.id) {
        case util.itemtypes.MECHANIC_TYPE.ADVANTAGE:
            retVal += 'Advantage to ' + val.target.name;
            break;
        case util.itemtypes.MECHANIC_TYPE.ADVANTAGE_SAVING_THROW:
            retVal += 'Advantage to Saving Throws vs ' + val.target.name;
            break;
        case util.itemtypes.MECHANIC_TYPE.BONUS:
            if (val.value >= 0) {
                retVal += '+' + val.value.toString() + ' to ' + val.target.name;
            } else {
                retVal += val.value.toString() + ' to ' + val.target.name;
            }
            break;
        case util.itemtypes.MECHANIC_TYPE.BONUS_PER_LEVEL:
            if (val.value >= 0) {
                retVal += '+' + val.value.toString() + ' per character level to ' + val.target.name;
            } else {
                retVal += val.value.toString() + ' per character level to ' + val.target.name;
            }
            break;
        case util.itemtypes.MECHANIC_TYPE.DISADVANTAGE:
            retVal += 'Disadvantage to ' + val.target.name;
            break;
        case util.itemtypes.MECHANIC_TYPE.DISADVANTAGE_SAVING_THROW:
            retVal += 'Disadvantage to Saving Throws vs ' + val.target.name;
            break;
        case util.itemtypes.MECHANIC_TYPE.RESISTANCE:
            retVal += 'Resistance to ' + val.target.name;
            break;
        case util.itemtypes.MECHANIC_TYPE.VULNERABILITY:
            retVal += 'Vulnerability to ' + val.target.name;
            break;
        case util.itemtypes.MECHANIC_TYPE.IMMUNITY:
            retVal += 'Immune to ' + val.target.name;
            break;
        case util.itemtypes.MECHANIC_TYPE.DIE_ROLL_BONUS_TO_STAT:
            retVal += '+' + util.format.forDisplay.string.dieRoll(val.dice) + ' to ' + val.target.name;
            break;
        case util.itemtypes.MECHANIC_TYPE.MULTIPLY_STAT:
            retVal += 'x' + val.value.toString() + ' to ' + val.target.name;
            break;
        case util.itemtypes.MECHANIC_TYPE.DIVIDE_STAT:
            retVal += 'divide ' + val.target.name + ' by ' + val.value.toString();
            break;
        case util.itemtypes.MECHANIC_TYPE.APPLY_ABILITY_SCORE_TO_STAT:
            retVal += '+' + val.valueObject.name + ' modifier to ' + val.target.name;
            break;
        case util.itemtypes.MECHANIC_TYPE.SPECIAL_TEXT:
            retVal += val.specialText;
            break;
        case util.itemtypes.MECHANIC_TYPE.DOUBLE_PROFICIENCY_BONUS:
            retVal += 'Double proficiency bonus with ' + val.target.name + ' checks';
            if (val.specialText && val.specialText.length != 0) {
                retVal += ' ' + val.specialText;
            }
            retVal += '.';
            break;
        case util.itemtypes.MECHANIC_TYPE.SELECT_ITEM:
            retVal += 'Select ' + val.value.toString() + ' ' + val.target.name + '.';
            break;
        case util.itemtypes.MECHANIC_TYPE.SET_STAT_VALUE:
            retVal += 'Set ' + val.target.name + ' to ' + val.value.toString() + '.';
            break;
        case util.itemtypes.MECHANIC_TYPE.OPPONENT_ADVANTAGE:
            retVal += 'Opponents have advantage to ' + val.target.name + ' against you.';
            break;
        case util.itemtypes.MECHANIC_TYPE.OPPONENT_DISADVANTAGE:
            retVal += 'Opponents have disadvantage to ' + val.target.name + ' against you.';
            break;
        case util.itemtypes.MECHANIC_TYPE.SPECIAL_MECHANIC:
            retVal += val.target.name;
            break;
        default:
            retVal += 'need to add to switch in format.forDisplay.obj.mechanic';
            break;
    }
    if (val.type.id != util.itemtypes.MECHANIC_TYPE.SPECIAL_TEXT && val.type.id != util.itemtypes.MECHANIC_TYPE.DOUBLE_PROFICIENCY_BONUS) {
        if (val.specialText && val.specialText.length != 0) {
            retVal += ' (' + val.specialText + ')';
        }
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
obj.naturalWeapon = function(val) {
    let retVal = '';
    retVal += '(' + val.attack.count.toString() + ')';
    retVal += ' ' + val.type.name + ': ';
    retVal += util.format.forDisplay.string.dieRoll(val.damage.dice);
    retVal += ' ' + val.damage.type.name + ' damage.';
    return retVal;
};
obj.prerequisite = function(val) {
    let retVal = '';
    let arrayValue = util.format.forDisplay.array.commaDelimietdListWithConjunction(val.targets, val.isInclusive);
    switch (val.type.id) {
        case util.itemtypes.PREREQUISITE_TYPE.CAST_MINIMUM_SPELL_LEVEL:
            if (val.value == 0) {
                retVal = 'Must be able to cast cantrips';
            } else {
                retVal = 'Must be able to cast spells of at least ' + util.format.forDisplay.number.ordinal(val.value) + ' level';
            }
            break;
        case util.itemtypes.PREREQUISITE_TYPE.MINIMUM_ABILITY_SCORE:
            retVal = arrayValue + ' ' + val.value.toString() + ' or higher';
            break;
        case util.itemtypes.PREREQUISITE_TYPE.PROFICIENCY:
            retVal = 'Proficiency with ' + arrayValue;
            break;
        default:
            retVal = 'Missing format forDisplay for Prerequisites';
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
obj.proficiencyGroup = function(val) {
    let retVal = '';
    switch (val.mechanic.id) {
        case util.itemtypes.SELECTION_MECHANIC.ASSIGNMENT:
            for (let x = 0; x < val.proficiencies.length; x++) {
                retVal += val.proficiencies[x].name;
                if (x < val.proficiencies.length - 1) {
                    retVal += ', ';
                }
            }
            break;
        case util.itemtypes.SELECTION_MECHANIC.SELECT_FROM.CATEGORY:
            retVal = 'You gain proficiency with ' + util.format.forDisplay.number.renderAsWord(val.selectCount) + ' ' + util.format.forDisplay.string.renderSingularPlural(val.category.name, val.selectCount);
            break;
        case util.itemtypes.SELECTION_MECHANIC.SELECT_FROM.LIST:
            retVal = 'Select ' + util.format.forDisplay.number.renderAsWord(val.selectCount) + ' from the following: ' + util.format.forDisplay.string.renderSingularPlural(val.category.name, val.selectCount) + ': ';
            for (let x = 0; x < val.proficiencies.length; x++) {
                retVal += val.proficiencies[x].name;
                if (x < val.proficiencies.length - 1) {
                    retVal += ', ';
                }
            }
            break;
        case util.itemtypes.SELECTION_MECHANIC.CONDITIONAL:
            retVal = 'You gain proficiency with ' + val.proficiencies[0].name + ' (' + val.conditionalText + ')';
            break;
        default:
            retVal = 'Need to add new entry for slection mechanic';
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