import * as exampleObjects from './exampleObjects';
import * as itemtypes from './itemTypeDefinition';

const _RESOURCE = {
    id: itemtypes.TYPE.RESOURCE.PHB,
    name: 'Player\'s Handbook'
};
const _ID_NAME_OBJECT = {
    id: 0,
    name: ''
};
const _DICE = {
    id: 0,
    dieCount: 0,
    dieType: 0,
    modifier: 0,
    multiplier: 1,
    divisor: 1,
    rendered: ''
};
export const examples = exampleObjects;

export const ASSIGNED_EQUIPMENT = {
    id: 0,
    name: '',
    category: {id: itemtypes.TYPE.EQUIPMENT_CATEGORY.TRINKET},
    count: 1,
    unit: '',
    assigned: 1,
    cost: 0,
    weight: 0
};
export const BACKGROUND = {
    id: 0,
    name: '',
    resource: _RESOURCE,
    description: '',
    charts: [],
    equipment: {
        startingGold: 0,
        assigned: [],
        variant: {
            gain: [],
            lose: []
        }
    },
    feature: {
        id: 0,
        name: '',
        description: ''
    },
    isVariant: false,
    parent: {
        id: 0,
        proficiencies: {
            assigned: [],
            select: {
                category: [],
                list: []
            }
        },
        equipment: {
            assigned: []
        }
    },
    proficiencies: {
        assigned: [],
        select: {
            category: [],
            list: []
        },
        variant: {
            gain: {
                assigned: [],
                select: {
                    category: [],
                    list: []
                }
            },
            lose: {
                assigned: [],
                select: {
                    category: [],
                    list: []
                }
            }
        }
    },
    suggestedCharacteristics: '',
    variants: []
};
export const BACKGROUND_VARIANT = {
    id: 0,
    name: '',
    resource: _RESOURCE,
    description: '',
    parentId: 0,
    feature: {
        id: 0,
        name: '',
        description: ''
    },
    proficiencies: {
        gain: {
            assigned: [],
            select: {
                category: [],
                list: []
            }
        },
        lose: {
            assigned: [],
            select: {
                category: [],
                list: []
            }
        }
    },
    equipment: {
        gain: [],
        lose: []
    }
};
export const CHART = {
    id: 0,
    title: '',
    description: '',
    columnCount: 0,
    columns: [],
    dice: _DICE,
    entries: [],
    isNewType: false,
    orderIndex: 0,
    picklist: _ID_NAME_OBJECT,
    rowCount: 0,
    rows: [],
    type: {id: 0}
};
export const CHART_COLUMN = {
    id: 0,
    text: '',
    columnIndex: 0,
    dataType: {id: itemtypes.TYPE.DATA_TYPE.STRING},
    picklist: _ID_NAME_OBJECT
};
export const CHART_ENTRY = {
    id: 0,
    boolValue: null,
    columnIndex: 0,
    dice: _DICE,
    numberValue: 0,
    picklistItem: _ID_NAME_OBJECT,
    rowIndex: 0,
    text: ''
};
export const CHART_ROW = {
    id: 0,
    text: '',
    diceRange: {
        maximum: 0,
        minimum: 0
    },
    picklistItem: _ID_NAME_OBJECT,
    rowIndex: 0
};
export const DAMAGE = {
    dice: _DICE,
    type: _ID_NAME_OBJECT
};
export const DAMAGE_IMPROVEMENT = {
    dice: _DICE,
    atCharacterLevel: 0,
    everySpellSlotLevel: 0
};
export const DICE = _DICE;
export const EQUIPMENT = {
    id: 0,
    name: '',
    resource: _RESOURCE,
    description: '',
    ammunition: _ID_NAME_OBJECT,
    armor: {
        armorClass: {
            applyDexterity: true,
            base: 11,
            isCumulative: false,
            hasMaximumDexterity: false,
            maximumDexterity: 0
        },
        hasMinimumStrength: false,
        minimumStrength: 0,
        stealthDisadvantage: false
    },
    assignedEquipment: [],
    carryCapacity: 0,
    category: _ID_NAME_OBJECT,
    cost: 0,
    count: 1,
    isImprovisedWeapon: false,
    isMagicItem: false,
    proficiency: _ID_NAME_OBJECT,
    speed: 0,
    unit: '',
    weapon: {
        class: _ID_NAME_OBJECT,
        damage: {
            dice: _DICE,
            type: _ID_NAME_OBJECT,
            versatile: {
                dice: _DICE
            }
        },
        properties: [],
        range: {
            maximum: 0,
            normal: 0
        },
        special: ''
    },
    weight: 0
};
export const ITEM = {id: 0, name: '', description: ''};
export const ITEMTYPE = {
    id: 0,
    name: '',
    isPicklist: false,
    applySupplementalPicklist: false
};
export const MECHANIC = {
    id: 0,
    bonus: {
        abilityScore: _ID_NAME_OBJECT,
        advancement: {
            type: {id: itemtypes.TYPE.DEFAULT.ADVANCEMENT_TYPE},
            levelCount: 1,
            atLevels: []
        },
        dice: _DICE,
        type: _ID_NAME_OBJECT,
        value: 0
    },
    conditionalText: '',
    specialText: '',
    target: _ID_NAME_OBJECT,
    type: _ID_NAME_OBJECT
};
export const PICKLIST = {
    id: 0,
    name: '',
    applySupplementalPicklist: false,
    items: []
};
export const PROFICIENCY = {
    id: 0,
    name: '',
    resource: _RESOURCE,
    abilityScore: _ID_NAME_OBJECT,
    category: _ID_NAME_OBJECT,
    language: {
        dialects: [],
        rarity: _ID_NAME_OBJECT,
        script: _ID_NAME_OBJECT
    }
};
export const SELECT = {
    PROFICIENCY: {
        CATEGORY: {
            id: 0,
            name: '',
            count: 1
        },
        LIST: {
            id: 0,
            count: 1,
            category: {id: 0},
            proficiencies: []
        }
    }
};
export const _SPELL = {
    id: 0,
    name: '',
    description: '',
    atHigherLevels: '',
    castingTime: {
        text: '',
        unit: {id: itemtypes.TYPE.DEFAULT.UNIT.CASTING_TIME},
        value: 1
    },
    charts: [],
    components: [],
    damage: {
        advancement: {
            atLevels: [],
            dice: _DICE,
            levelCount: 1,
            projectileCount: 1,
            type: {id: itemtypes.TYPE.DEFAULT.ADVANCEMENT_TYPE}
        },
        areaOfEffect: {
            shape: _ID_NAME_OBJECT,
            unit: {id: itemtypes.TYPE.DEFAULT.UNIT.LENGTH},
            value: 0
        },
        attack: {
            type: _ID_NAME_OBJECT,
            addedToAttack: false
        },
        condition: _ID_NAME_OBJECT,
        conditionList: {
            isInclusive: false,
            count: 1,
            list: []
        },
        dice: _DICE,
        projectileCount: 0,
        savingThrow: {
            abilityScore: _ID_NAME_OBJECT,
            effect: _ID_NAME_OBJECT,
            isRepeating: false,
            countToAvoid: 1
        },
        supplemental: [],
        type: _ID_NAME_OBJECT,
        typeList: {
            isInclusive: false,
            count: 1,
            list: []
        }
    },
    duration: {
        concentration: {
            unit: _ID_NAME_OBJECT,
            value: 0
        },
        unit: _ID_NAME_OBJECT,
        value: 0
    },
    isRitual: false,
    level: 0,
    materialComponentText: '',
    mechanics: [],
    range: {
        areaOfEffect: {
            shape: _ID_NAME_OBJECT,
            unit: {id: itemtypes.TYPE.DEFAULT.UNIT.LENGTH},
            value: 0
        },
        unit: _ID_NAME_OBJECT,
        value: 0
    },
    resource: _RESOURCE,
    school: _ID_NAME_OBJECT,
    supplementalDescriptions: []
};
const _EMPTY_BONUS = {abilityScore: {id: 0, name: '', type: {id: -1}}, advancement: {atLevels: [], levelCount: 1, type: {id: 2927}}, dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''}, type: {id: 0, name: '', type: {id: -1}}, value: 0};
export const SPELL = {
    id: 0,
    name: '--test spell 4',
    description: '--test spell description',
    atHigherLevels: '--test spell at higher levels',
    castingTime: {
        text: '',
        unit: {name: 'Action', id: 214},
        value: 1
    },
    charts: [],
    components: [
        {name: 'Somatic', id: 96, requireFlavorText: false}
    ],
    damage: {
        advancement: {
            atLevels: [],
            dice: {modifier: 0, multiplier: 1, divisor: 1, dieCount: 1, dieType: 4, rendered: '1d4'},
            levelCount: 1,
            projectileCount: 1,
            type: {id: 2911, name: 'Every X Levels'}
        },
        areaOfEffect: {
            shape: {name: 'Sphere', id: 2901},
            unit: {id: itemtypes.TYPE.DEFAULT.UNIT.LENGTH},
            value: 10
        },
        attack: {
            type: {name: 'Ranged', id: 233},
            addedToAttack: false
        },
        condition: {name: 'Select From List', id: 2929},
        conditionList: {
            isInclusive: false,
            count: 1,
            list: [
                {name: 'Blinded', id: 44},
                {name: 'Deafened', id: 46}
            ]
        },
        dice: {modifier: 0, multiplier: 1, divisor: 1, dieCount: 1, dieType: 4, rendered: '1d4'},
        projectileCount: 2,
        savingThrow: {
            abilityScore: {name: 'Charisma', id: 60},
            effect: {name: 'Avoid Condition and Half Damage', id: 2931},
            isRepeating: false,
            countToAvoid: 1
        },
        supplemental: [
            {
                dice: {modifier: 0, multiplier: 1, divisor: 1, dieCount: 2, dieType: 6, rendered: '2d6'},
                type: {name: 'Force', id: 39}
            },
            {
                dice: {modifier: 0, multiplier: 1, divisor: 1, dieCount: 1, dieType: 8, rendered: '1d8'},
                type: {name: 'Lightning', id: 33}
            }
        ],
        type: {name: 'Select From List', id: 2929},
        typeList: {
            isInclusive: false,
            count: 1,
            list: [
                {name: 'Acid', id: 35},
                {name: 'Cold', id: 37},
                {name: 'Lightning', id: 33},
                {name: 'Fire', id: 36}
            ]
        }
    },
    duration: {
        concentration: {
            unit: {id: 0},
            value: 1
        },
        unit: {name: 'Day', id: 266},
        value: 1
    },
    isRitual: true,
    level: 2,
    materialComponentText: '',
    mechanics: [
        {
            bonus: _EMPTY_BONUS,
            conditionalText: '',
            id: -1,
            specialText: '',
            target: {id: '383', name: 'Acrobatics', abilityScore: {id: 62, name: 'Dexterity'}, category: {id: 132, name: 'Skill'}, type: {id: 323}},
            type: {name: 'Advantage', id: 12, type: {id: '9'}}
        },
        {
            bonus: _EMPTY_BONUS,
            conditionalText: '',
            id: -2,
            specialText: '',
            target: {name: 'Acid', id: 35, type: {id: '29'}},
            type: {id: 2906, name: 'Immunity', type: {id: '9'}}
        },
        {
            bonus: _EMPTY_BONUS,
            conditionalText: '',
            id: -3,
            specialText: '--Special Text',
            target: {id: 0, name: '', type: {id: -1}},
            type: {name: 'Special Text', id: 2928, type: {id: '9'}}
        },
        {
            bonus: {
                abilityScore: {
                    id: 0,
                    name: '',
                    type: {id: -1}
                },
                advancement: {
                    atLevels: [],
                    levelCount: 1,
                    type: {id: 2927}
                },
                dice: _DICE,
                type: {name: 'Apply Modifier (+/-)', id: 2916, type: {id: '2912'}},
                value: '1'
            },
            conditionalText: '',
            id: -4,
            specialText: '',
            target: {id: '383', name: 'Acrobatics', category: {id: 132, name: 'Skill'}, abilityScore: {id: 62, name: 'Dexterity'}, type: {id: 323}},
            type: {name: 'Bonus to Roll', id: 2903, type: {id: '9'}}
        },
        {
            bonus: {abilityScore: {id: 0, name: '', type: {id: -1}}, advancement: {atLevels: [], levelCount: 1, type: {id: 2927}}, dice: _DICE, type: {name: 'Apply Proficiency Bonus (with multiplier)', id: 2918, type: {id: '2912'}}, value: 1},
            conditionalText: '',
            id: -5,
            specialText: '',
            target: {name: 'Wisdom Check', id: 2926, type: {id: '2920'}},
            type: {name: 'Bonus to Roll', id: 2903, type: {id: '9'}}
        },
        {
            bonus: {abilityScore: {id: 0, name: '', type: {id: -1}}, advancement: {atLevels: [], levelCount: 1, type: {id: 2927}}, dice: {dieCount: 2, dieType: 10, divisor: 1, modifier: 0, multiplier: 1, rendered: '2d10'}, type: {name: 'Apply Proficiency Bonus (with multiplier)', id: 2918, type: {id: '2912'}}, value: 2},
            conditionalText: '',
            id: -6,
            specialText: '',
            target: {name: 'Maximum Hit Points', id: 245, type: {id: '242'}},
            type: {name: 'Bonus to Stat', id: 13, type: {id: '9'}}
        },
        {
            bonus: {abilityScore: {name: 'Charisma', id: 60}, advancement: {atLevels: [], levelCount: 1, type: {id: 2927}}, dice: _DICE, type: {name: 'Apply Ability Score Modifier (with multiplier)', id: 2913, type: {id: '2912'}}, value: 1},
            conditionalText: '',
            id: -7,
            specialText: '',
            target: {name: 'Initiative', id: 250, type: {id: '248'}},
            type: {name: 'Bonus to Roll', id: 2903, type: {id: '9'}}
        },
        {
            bonus: {abilityScore: {id: 0, name: '', type: {id: -1}}, advancement: {atLevels: [5, 10], levelCount: 1, type: {name: 'At Level', id: 2910, type: {id: '2909'}}}, dice: _DICE, type: {name: 'Apply Modifier (+/-)', id: 2916, type: {id: '2912'}}, value: 1},
            conditionalText: '',
            id: -8,
            specialText: '',
            target: {id: '404', name: 'Wisdom Save', category: {id: 131, name: 'Saving Throw'}, abilityScore: {id: 65, name: 'Wisdom'}, type: {id: 323}},
            type: {name: 'Bonus to Roll', id: 2903, type: {id: '9'}}
        },
        {
            bonus: {abilityScore: {id: 0, name: '', type: {id: -1}}, advancement: {atLevels: [], levelCount: '2', type: {name: 'Every X Levels', id: 2911, type: {id: '2909'}}}, dice: _DICE, type: {name: 'Apply Modifier (+/-)', id: 2916, type: {id: '2912'}}, value: '10'},
            conditionalText: '',
            id: -9,
            specialText: '',
            target: {name: 'Maximum Hit Points', id: 245, type: {id: '242'}},
            type: {name: 'Bonus to Stat', id: 13, type: {id: '9'}}
        },
        {
            bonus: {abilityScore: {id: 0, name: '', type: {id: -1}}, advancement: {atLevels: [4, 8, 12, 16, 20], levelCount: 1, type: {name: 'At Level', id: 2910, type: {id: '2909'}}}, dice: _DICE, type: {name: 'Apply Modifier (+/-)', id: 2916, type: {id: '2912'}}, value: 1},
            conditionalText: '',
            id: -8,
            specialText: '',
            target: {id: '60', name: 'Charisma', type: {id: '59'}},
            type: {name: 'Bonus to Stat', id: 13, type: {id: '9'}}
        },
        {
            bonus: {abilityScore: {id: 0, name: '', type: {id: -1}}, advancement: {atLevels: [], levelCount: 1, type: {id: 2927}}, dice: {modifier: 0, multiplier: 1, divisor: 1, dieCount: 1, dieType: 4, rendered: '1d4'}, type: {name: 'Apply Die Roll result as bonus', id: 2914, type: {id: '2912'}}, value: 0},
            conditionalText: '',
            id: -10,
            specialText: '',
            target: {id: '385', name: 'Stealth', category: {id: 132, name: 'Skill'}, abilityScore: {id: 62, name: 'Dexterity'}, type: {id: 323}},
            type: {name: 'Bonus to Roll', id: 2903, type: {id: '9'}}
        }
    ],
    range: {
        areaOfEffect: {
            shape: {id: 0},
            unit: {id: itemtypes.TYPE.DEFAULT.UNIT.LENGTH},
            value: 0
        },
        unit: {name: 'Foot', id: 275},
        value: 120
    },
    resource: _RESOURCE,
    school: {name: 'Abjuration', id: 86},
    supplementalDescriptions: []
};
export const SPELL_COMPONENT = {
    id: 0,
    name: '',
    text: ''
};
export const SUPPLEMENTAL_DESCRIPTION = {
    id: 0,
    title: '',
    description: '',
    orderIndex: 0
};
export const TRINKET = {
    id: 0,
    name: '',
    resource: _RESOURCE,
    category: {id: itemtypes.TYPE.EQUIPMENT_CATEGORY.TRINKET, name: 'Trinket'},
    cost: 0,
    weight: 0
};