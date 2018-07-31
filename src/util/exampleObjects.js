const _RESOURCE = {id: 2, name: 'Player\'s Handbook'};

const _ASSIGNED_EQUIPMENT = {
    SINGLE: {
        NO_UNIT_COUNT: {assignedCount: 1, cost: 2, count: 1, id: 198, name: 'Abacus', unit: '', weight: 2},
        HAS_COUNT: {assignedCount: 1, cost: 1, count: 20, id: 208, name: 'Arrows', unit: '', weight: 1},
        HAS_UNIT: {assignedCount: 1, cost: 25, count: 2, id: 204, name: 'Acid', unit: 'vial', weight: 2},
        HAS_UNIT_COUNT: {assignedCount: 1, cost: 5, count: 10, id: 240, name: 'Chain', unit: 'feet', weight: 10}
    },
    MULTIPLE: {
        NO_UNIT_COUNT: {assignedCount: 5, cost: 2, count: 1, id: 230, name: 'Bottle, Glass', unit: '', weight: 2},
        HAS_COUNT: {assignedCount: 5, cost: 1, count: 50, id: 209, name: 'Blowgun Needles', unit: '', weight: 1},
        HAS_UNIT: {assignedCount: 5, cost: 50, count: 1, id: 206, name: 'Alchemist\'s Fire', unit: 'flask', weight: 1},
        HAS_UNIT_COUNT: {assignedCount: 5, cost: 10, count: 10, id: 317, name: 'Rope, Hempen', unit: 'feet', weight: 10}
    }
};
const _CHART = {
    DICE: {
        columnCount: 1,
        columns: [
            {id: 0, orderIndex: 0, selectionItemDataType: {id: 1, name: ''}, selectionItemType: {id: 0, name: ''}, title: ''}
        ],
        description: '',
        dice: {dieCount: 1, dieType: 4, divisor: 1, modifier: 0, multiplier: 1, rendered: '1d4'},
        entries: [
            {description: 'entry 1', id: -2, maximum: 1, minimum: 1},
            {description: 'entry 2', id: -3, maximum: 2, minimum: 2},
            {description: 'entry 3', id: -4, maximum: 3, minimum: 3},
            {description: 'entry 4', id: -5, maximum: 4, minimum: 4}
        ],
        id: -1,
        isCreateNewItemType: false,
        orderIndex: 0,
        rowCount: 0,
        rows: [],
        selectionItemType: {id: 0, name: ''},
        title: 'die roll chart',
        type: {id: 806, name: 'Die` Roll Chart'}
    },
    SELECTION: {
        columnCount: '1',
        columns: [
            {id: -1, orderIndex: 0, selectionItemDataType: {id: 1, name: ''}, selectionItemType: {id: 6, name: 'Damage Type'}, title: 'Damage Type'}
        ],
        description: '',
        dice: {dieCount: 0, dieType: 0, divisor: 0, id: 0, modifier: 0, multiplier: 1, rendered: ''},
        entries: [
            {columnIndex: 0, description: '', id: -1, rowIndex: 0, selectionItem: {id: 10, name: 'Acid'}},
            {columnIndex: 0, description: '', id: -2, rowIndex: 1, selectionItem: {id: 14, name: 'Lightning'}},
            {columnIndex: 0, description: '', id: -3, rowIndex: 2, selectionItem: {id: 12, name: 'Fire'}},
            {columnIndex: 0, description: '', id: -4, rowIndex: 3, selectionItem: {id: 10, name: 'Acid'}},
            {columnIndex: 0, description: '', id: -5, rowIndex: 4, selectionItem: {id: 14, name: 'Lightning'}},
            {columnIndex: 0, description: '', id: -6, rowIndex: 5, selectionItem: {id: 12, name: 'Fire'}},
            {columnIndex: 0, description: '', id: -7, rowIndex: 6, selectionItem: {id: 16, name: 'Poison'}},
            {columnIndex: 0, description: '', id: -8, rowIndex: 7, selectionItem: {id: 12, name: 'Fire'}},
            {columnIndex: 0, description: '', id: -9, rowIndex: 8, selectionItem: {id: 11, name: 'Cold'}},
            {columnIndex: 0, description: '', id: -10, rowIndex: 9, selectionItem: {id: 11, name: 'Cold'}}
        ],
        id: -2,
        isCreateNewItemType: false,
        orderIndex: 1,
        rowCount: 10,
        rows: [
            {id: -0, orderIndex: 0, selectionItem: {name: 'Black', id: 2368}},
            {id: -1, orderIndex: 1, selectionItem: {name: 'Blue', id: 2366}},
            {id: -2, orderIndex: 2, selectionItem: {name: 'Brass', id: 2363}},
            {id: -3, orderIndex: 3, selectionItem: {name: 'Bronze', id: 2364}},
            {id: -4, orderIndex: 4, selectionItem: {name: 'Copper', id: 2362}},
            {id: -5, orderIndex: 5, selectionItem: {name: 'Gold', id: 2360}},
            {id: -6, orderIndex: 6, selectionItem: {name: 'Green', id: 2367}},
            {id: -7, orderIndex: 7, selectionItem: {name: 'Red', id: 2365}},
            {id: -8, orderIndex: 8, selectionItem: {name: 'Silver', id: 2361}},
            {id: -9, orderIndex: 9, selectionItem: {name: 'White', id: 2369}}
        ],
        selectionItemType: {id: 2357, name: 'Dragon Ancestry'},
        title: 'Selection Chart',
        type: {id: 2371, name: 'Selection Chart'}
    },
    STANDARD: {
        columnCount: '2',
        columns: [
            {id: -1, orderIndex: 0, selectionItemDataType: {id: 1, name: ''}, selectionItemType: {id: 0, name: ''}, title: 'Col 1'},
            {id: -2, orderIndex: 1, selectionItemDataType: {id: 1, name: ''}, selectionItemType: {id: 0, name: ''}, title: 'Col 2'}
        ],
        description: '',
        dice: {dieCount: 0, dieType: 0, divisor: 0, id: 0, modifier: 0, multiplier: 1, rendered: ''},
        entries: [
            {columnIndex: 0, description: 'E 1-1', id: -1, maximum: 0, minimum: 0, rowIndex: 0, selectionItem: {id: 0, name: ''}},
            {columnIndex: 0, description: 'E 2-1', id: -2, maximum: 0, minimum: 0, rowIndex: 1, selectionItem: {id: 0, name: ''}},
            {columnIndex: 1, description: 'E 1-2', id: -3, maximum: 0, minimum: 0, rowIndex: 0, selectionItem: {id: 0, name: ''}},
            {columnIndex: 1, description: 'E 2-2', id: -4, maximum: 0, minimum: 0, rowIndex: 1, selectionItem: {id: 0, name: ''}}
        ],
        id: -3,
        isCreateNewItemType: false,
        orderIndex: 2,
        rowCount: '2',
        rows: [
            {id: -1, orderIndex: 0, selectionItem: {id: 0, name: ''}, title: 'Row 1'},
            {id: -2, orderIndex: 1, selectionItem: {id: 0, name: ''}, title: 'Row 2'}
        ],
        selectionItemType: { id: 0, name: ''},
        title: 'Standard Chart',
        type: { id: 904, name: 'Standard Chart'}
    }
};
const _MECHANIC = {
    ADVANTAGE: {
        assignmentType: {id: 1},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1}, id: -1,
        specialText: '',
        target: {id: 410, name: 'Acrobatics'},
        type: {id: 866, name: 'Advantage'},
        value: 0,
        valueObject: {id: 0, name: ''}
    },
    ADVANTAGE_SAVING_THROW: {
        assignmentType: {id: 1},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1}, id: -2,
        specialText: '',
        target: {id: 853, name: 'Frightened'},
        type: {id: 870, name: 'Advantage on Saving Throw'},
        value: 0,
        valueObject: {id: 0, name: ''}
    },
    ABILITY_SCORE_MOD_STAT: {
        assignmentType: {id: 1},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1}, id: -3,
        specialText: '',
        target: {id: 1615, name: 'AC'},
        type: {id: 2199, name: 'Apply Ability Score Modifier to Stat'},
        value: 0,
        valueObject: {id: 30, name: 'Charisma'}
    },
    BONUS_TO_STAT: {
        assignmentType: {id: 1},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1}, id: -4,
        specialText: '',
        target: {id: 1616, name: 'Action per turn'},
        type: {id: 847, name: 'Bonus/Penalty to Stat'},
        value: '1',
        valueObject: {id: 0, name: ''}
    },
    DIE_ROLL_BONUS_TO_STAT: {
        assignmentType: {id: 1},
        dice: { modifier: 0, multiplier: 1, divisor: 1, dieCount: 1, dieType: 4, id: 0, rendered: '1d4'}, id: -5,
        specialText: '',
        target: {id: 846, name: 'Current Hit Points'},
        type: {id: 1428, name: 'Die roll bonus to Stat'},
        value: 0,
        valueObject: {id: 0, name: ''}
    },
    DISADVANTAGE: {
        assignmentType: {id: 1},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1}, id: -6,
        specialText: '',
        target: {id: 434, name: 'Stealth'},
        type: {id: 867, name: 'Disadvantage'},
        value: 0,
        valueObject: {id: 0, name: ''}
    },
    DISADVANTAGE_SAVING_THROW: {
        assignmentType: {id: 1},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1}, id: -7,
        specialText: '',
        target: {id: 10, name: 'Acid'},
        type: {id: 871, name: 'Disadvantage on Saving Throw'},
        value: 0,
        valueObject: {id: 0, name: ''}
    },
    DIVIDE_STAT: {
        assignmentType: {id: 1},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1}, id: -8,
        specialText: '',
        target: {id: 1614, name: 'Walking Speed'},
        type: {id: 2003, name: 'Divide a Stat'},
        value: '2',
        valueObject: {id: 0, name: ''}
    },
    DOUBLE_PROFICIENCY_BONUS: {
        assignmentType: {id: 1},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1}, id: -9,
        specialText: 'With stonework',
        target: {id: 436, name: 'History'},
        type: {id: 2355, name: 'Double Proficiency Bonus'},
        value: 0,
        valueObject: {id: 0, name: ''}
    },
    IMMUNITY: {
        assignmentType: {id: 1},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1}, id: -10,
        specialText: '',
        target: {id: 11, name: 'Cold'},
        type: {id: 872, name: 'Immunity'},
        value: 0,
        valueObject: {id: 0, name: ''}
    },
    MULTIPLY_STAT: {
        assignmentType: {id: 1},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1}, id: -11,
        specialText: '',
        target: {id: 1732, name: 'Jump Distance'},
        type: {id: 1617, name: 'Multiply a Stat'},
        value: '2',
        valueObject: {id: 0, name: ''}
    },
    RESISTANCE: {
        assignmentType: {id: 1},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1}, id: -12,
        specialText: '',
        target: {id: 15, name: 'Necrotic'},
        type: {id: 868, name: 'Resistance'},
        value: 0,
        valueObject: {id: 0, name: ''}
    },
    SPECIAL_TEXT: {
        assignmentType: {id: 1},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1}, id: -13,
        specialText: 'Special Text mechanic',
        target: {id: 0, name: ''},
        type: {id: 2321, name: 'Special (Text)'},
        value: 0,
        valueObject: {id: 0, name: ''}
    },
    SPECIAL_TEXT_AND_TITLE: {
        assignmentType: {id: 1},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1}, id: -13,
        specialText: 'Special Text mechanic',
        target: {id: 0, name: ''},
        title: 'Mechanic Title',
        type: {id: 2321, name: 'Special (Text)'},
        value: 0,
        valueObject: {id: 0, name: ''}
    },
    VULERABILITY: {
        assignmentType: {id: 1},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1}, id: -14,
        specialText: '',
        target: {id: 7, name: 'Bludgeoning'},
        type: {id: 869, name: 'Vulnerability'},
        value: 0,
        valueObject: {id: 0, name: ''}
    }
};
const _PROFICIENCY_GROUP = {
    ASSIGN: {id: 0, name: '', category: {id: 98, name: 'Skill', parentId: 0}, conditionalText: '', mechanic: {id: 79, name: 'Assign List'}, proficiencies: [{id: 410, name: 'Acrobatics'}, {id: 432, name: 'Athletics'}], selectCount: 1},
    SELECT_FROM: {
        CATEGORY: {id: 0, name: '', category: {id: 95, name: 'Language', parentId: 0}, conditionalText: '', mechanic: {id: 80, name: 'Select from Category'}, proficiencies: [], selectCount: 2},
        LIST: {id: 0, name: '', category: {id: 98, name: 'Skill', parentId: 0}, conditionalText: '', mechanic: {id: 81, name: 'Select from List'}, proficiencies: [{id: 445, name: 'Deception'}, {id: 447, name: 'Persuasion'}, {id: 448, name: 'Intimidation'}], selectCount: 1}
    }
};

const _ONE_OF_EACH = {
    ASSIGNED_EQUIPMENT: [_ASSIGNED_EQUIPMENT.SINGLE.NO_UNIT, _ASSIGNED_EQUIPMENT.SINGLE.HAS_COUNT, _ASSIGNED_EQUIPMENT.SINGLE.NO_UNIT, _ASSIGNED_EQUIPMENT.SINGLE.HAS_UNIT_COUNT, _ASSIGNED_EQUIPMENT.MULTIPLE.NO_UNIT, _ASSIGNED_EQUIPMENT.MULTIPLE.HAS_COUNT, _ASSIGNED_EQUIPMENT.MULTIPLE.NO_UNIT, _ASSIGNED_EQUIPMENT.MULTIPLE.HAS_UNIT_COUNT],
    CHART: [_CHART.DICE, _CHART.SELECTION, _CHART.STANDARD],
    MECHANIC: [_MECHANIC.ADVANTAGE, _MECHANIC.ADVANTAGE_SAVING_THROW, _MECHANIC.ABILITY_SCORE_MOD_STAT, _MECHANIC.BONUS_TO_STAT, _MECHANIC.DIE_ROLL_BONUS_TO_STAT, _MECHANIC.DISADVANTAGE, _MECHANIC.DISADVANTAGE_SAVING_THROW, _MECHANIC.DIVIDE_STAT, _MECHANIC.DOUBLE_PROFICIENCY_BONUS, _MECHANIC.IMMUNITY, _MECHANIC.MULTIPLY_STAT, _MECHANIC.RESISTANCE, _MECHANIC.SPECIAL_TEXT, _MECHANIC.VULERABILITY, _MECHANIC.SPECIAL_TEXT_AND_TITLE],
    PROFICIENCY_GROUP: [_PROFICIENCY_GROUP.ASSIGN, _PROFICIENCY_GROUP.SELECT_FROM.CATEGORY, _PROFICIENCY_GROUP.SELECT_FROM.LIST]
};

export const ARMOR = {
    id: 0,
    name: '`Test Armor',
    applyDexModifier: true,
    baseArmorClass: 13,
    cost: '12',
    description: '`desrjfiuh hf kjghf ghdfl ljkdfsh gfd',
    hasMaxDexModifier: true,
    isCumulative: false,
    maxDexModifier: 2,
    minimumStrength: 0,
    proficiency: {id: 31, name: 'Light Armor'},
    resource: _RESOURCE,
    stealthDisadvantage: true,
    weight: '20'
};
export const BACKGROUND = {
    id: 0,
    name: '`TEST background',
    assignedEquipment: _ONE_OF_EACH.ASSIGNED_EQUIPMENT,
    charts: [_CHART.DICE, _CHART.DICE],
    description: '`TEst dewscr cdrfv sdfv sdfv dsf vfd vfg.',
    feature: {
        id: 0,
        name: '`TEST feature',
        description: '`test test etst etest etst etest etets tetstet test.'
    },
    proficiencyGroups: _ONE_OF_EACH.PROFICIENCY_GROUP,
    resource: _RESOURCE,
    startingGold: '15',
    suggestedCharacteristics: '` SUGGCHAR SUGGCHAR SUGGCHAR SUGGCHAR SUGGCHAR SUGGCHAR'
};
export const PREREQUISITES = [
    {
        filterObject: {},
        id: -1,
        isInclusive: true,
        targets: [],
        type: {id: 2534, name: 'Cast Minimum Spell Level'},
        value: 1
    },
    {
        filterObject: {id: 0},
        id: -2,
        isInclusive: false,
        targets: [
            {id: 57, isPrimary: true, name: 'Intelligence'},
            {id: 58, isPrimary: true, name: 'Wisdom'}
        ],
        type: {id: 2535, name: 'Minimum Ability Score'},
        value: 12
    },
    {
        filterObject: {id: 88, name: 'Armor'},
        id: -3,
        isInclusive: true,
        targets: [
            {
                id: 168,
                name: 'Heavy Armor'
            }
        ],
        type: {id: 2536, name: 'Proficiency'},
        value: 0
    }
];
export const RACE = {
    abilityScores: {
        charisma: '-1',
        constitution: '2',
        dexterity: 0,
        intelligence: 0,
        selection: {count: 0, modifier: 0},
        strength: 0,
        wisdom: 0
    },
    breathWeapons: [
        {
            areaOfEffect: {shape: {id: 1481, name: 'Cone'}},
            charges: {
                count: '1',
                improvement: [
                    {characterLevel: '10', count: 1}
                ],
                rechargeType: {id: 2289, name: 'Long Rest'}
            },
            damage: {
                dice: {dieCount: 2, dieType: 6, divisor: 1, modifier: 0, multiplier: 1, rendered: '2d6'},
                improvement: [
                    {characterLevel: '5', dice: {dieCount: 1, dieType: 6, divisor: 1, modifier: 0, multiplier: 1, rendered: '1d6'}},
                    {characterLevel: '10', dice: {dieCount: 1, dieType: 6, divisor: 1, modifier: 0, multiplier: 1, rendered: '1d6'}},
                    {characterLevel: '15', dice: {dieCount: 1, dieType: 6, divisor: 1, modifier: 0, multiplier: 1, rendered: '1d6'}},
                    {characterLevel: '20', dice: {dieCount: 1, dieType: 6, divisor: 1, modifier: 0, multiplier: 1, rendered: '1d6'}}
                ],
                type: {id: 12, name: 'Fire'}
            },
            range: '15',
            savingThrow: {
                abilityScore: {id: 26, name: 'Dexterity'},
                dc: {
                    abilityScore: {id: 27, name: 'Constitution'},
                    applyProficiencyBonus: true,
                    base: 8
                },
                effect: {id: 1699, name: 'Half damage'}
            }
        }
    ],
    charts: _ONE_OF_EACH.CHART,
    description: '',
    isVariant: false,
    mechanics: _ONE_OF_EACH.MECHANIC,
    movement: [
        {id: 2275, name: 'Walking', speed: 25},
        {id: 2277, name: 'Climbing', speed: 5}
    ],
    name: '`Test Race',
    naturalWeapons: [
        {
            attack: {abilityScore: {id: 25, name: 'Strength'}, count: 1},
            damage: {
                abilityScore: {id: 25, name: 'Strength'},
                dice: {dieCount: 1, dieType: 4, divisor: 1, modifier: 0, multiplier: 1, rendered: '1d4'},
                type: {id: 8, name: 'Piercing'}
            },
            type: {id: 2374, name: 'Bite'}
        }
    ],
    parent: {id: 0},
    proficiencyGroups: [
        {
            category: {id: 95, name: 'Language'},
            conditionalText: '',
            id: -1,
            mechanic: {id: 79, name: 'Assign List'},
            name: '',
            proficiencies: [
                {id: '411', name: 'Common'},
                {id: '412', name: 'Dwarvish'}
            ],
            selectCount: 1
        },
        {
            category: {id: 99, name: 'Tool'},
            conditionalText: '',
            id: -2,
            mechanic: {id: 80, name: 'Select from Category'},
            name: '',
            proficiencies: [],
            selectCount: 1
        },
        {
            category: {id: 93, name: 'Artisan\'s Tool'},
            conditionalText: '',
            id: -3,
            mechanic: {id: 81, name: 'Select from List'},
            name: '',
            proficiencies: [
                {id: '350', name: 'Alchemist\'s Supplies'},
                {id: '351', name: 'Brewer\'s Supplies'},
                {id: '360', name: 'Mason\'s Tools'}
            ],
            selectCount: 1
        },
        {
            category: {id: 98, name: 'Skill'},
            conditionalText: 'Only use for stone work',
            id: -4,
            mechanic: {id: 2343, name: 'Conditional Use Item'},
            name: '',
            proficiencies: [
                {id: 445, name: 'Deception'}
            ],
            selectCount: 1
        }
    ],
    resource: _RESOURCE,
    senses: [
        {id: 2284, name: 'Darkvision', range: 60}
    ],
    size: {id: 133, name: 'Medium'},
    spellcasting: {
        abilityScore: {id: 28, name: 'Intelligence'},
        spellSelections: [
            {
                castingCount: 1,
                characterLevel: 1,
                rechargeType: {id: 0, name: ''},
                school: {id: 0, name: ''},
                selectCount: 1,
                selectionType: {id: 2292, name: 'By Level'},
                spell: {id: 0, name: ''},
                spellLevel: 0,
                spelllist: {id: 0, name: ''}
            },
            {
                castingCount: 1,
                characterLevel: '3',
                rechargeType: {id: 2289, name: 'Long Rest'},
                school: {id: 0, name: ''},
                selectCount: 1,
                selectionType: {id: 2292, name: 'By Level'},
                spell: {id: 0, name: ''},
                spellLevel: '1',
                spelllist: {id: 0, name: ''}
            },
            {
                castingCount: 1,
                characterLevel: 1,
                rechargeType: {id: 0, name: ''},
                school: {id: 109, name: 'Enchantment'},
                selectCount: 1,
                selectionType: {id: 2293, name: 'By School'},
                spell: {id: 0, name: ''},
                spellLevel: 0,
                spelllist: {id: 0, name: ''}
            },
            {
                castingCount: 1,
                characterLevel: '3',
                rechargeType: {id: 2289, name: 'Long Rest'},
                school: {id: 109, name: 'Enchantment'},
                selectCount: 1,
                selectionType: {id: 2293, name: 'By School'},
                spell: {id: 0, name: ''},
                spellLevel: '1',
                spelllist: {id: 0, name: ''}
            },
            {
                castingCount: 1,
                characterLevel: 1,
                rechargeType: {id: 0, name: ''},
                school: {id: 0, name: ''},
                selectCount: 1,
                selectionType: {id: 2294, name: 'By Spell List'},
                spell: {id: 0, name: ''},
                spellLevel: 0,
                spelllist: {id: 2239, name: 'Bard'}
            },
            {
                castingCount: '2',
                characterLevel: '3',
                rechargeType: {id: 2289, name: 'Long Rest'},
                school: {id: 0, name: ''},
                selectCount: 1,
                selectionType: {id: 2294, name: 'By Spell List'},
                spell: {id: 0, name: ''},
                spellLevel: '1',
                spelllist: {id: 2246, name: 'Sorcerer'}
            },
            {
                castingCount: 1,
                characterLevel: 1,
                rechargeType: {id: 0, name: ''},
                school: {id: 0, name: ''},
                selectCount: 1,
                selectionType: {id: 2291, name: 'By Spell'},
                spell: {id: 807, name: 'Acid Splash'},
                spellLevel: 0,
                spelllist: {id: 0, name: ''}
            },
            {
                castingCount: 1,
                characterLevel: '5',
                rechargeType: {id: 2289, name: 'Long Rest'},
                school: {id: 0, name: ''},
                selectCount: 1,
                selectionType: {id: 2291, name: 'By Spell'},
                spell: {id: 900, name: 'Animate Dead'},
                spellLevel: 0,
                spelllist: {id: 0, name: ''}
            }
        ]
    },
    supplementalDescriptions: [
        {
            description: 'jasdf lkjdfh ajlh fkasjdfh lkjsadfh kjlhf lkjsdh lkjsh kjsh klahf kjldsh fjkdfh lkjadsfhkljdfh kjfh kdhlvkjcvb fkjbvhfbvugf reu luvru aelvbreuv uvfbvj dbvharbf lebf jh.', id: -1,
            orderIndex: 0,
            title: 'Test Title 1'},
        {
            description: 'eroewu royoewrt oewirt opwerhurhrhp erhfphuvfhvpeurhf urh puh uhfpeurhf puehf peruhf hufriufh vbhvb erv djk bzhcvhcuxih zvx b nsfb,af,bfrh krhe.', id: -2,
            orderIndex: 1,
            title: 'Test Title 2'}
    ],
    tags: [
        {id: 200, name: 'Dwarf'}
    ],
    type: {id: 185, name: 'Humanoid'},
    vitals: {
        height: {
            base: '50',
            dice: {modifier: 0, multiplier: 1, divisor: 1, dieCount: 2, dieType: 6, id: 0, rendered: '2d6'}
        },
        weight: {
            base: '100',
            dice: {modifier: 0, multiplier: 1, divisor: 1, dieCount: 1, dieType: 4, id: 0, rendered: '1d4'}
        }
    }
};
export const SPELL = {
    atHigherLevels: 'At higher Levels`test test test.',
    castingTime: {id: 462, name: '1 hour'},
    components: [
        {id: '104', name: 'Verbal'},
        {id: '105', name: 'Somatic'}
    ],
    damage: {
        abilityScore: {id: 0, name: ''},
        applyAbilityScoreModifier: false,
        attackRollType: {id: 1384, name: 'Ranged Spell'},
        condition: {id: 858, name: 'Petrified'},
        dice: {modifier: 0, multiplier: 1, divisor: 1, dieCount: 2, dieType: 6, rendered: '2d6'},
        improvement: {dice: {modifier: 0, multiplier: 1, divisor: 1, dieCount: 1, dieType: 6, rendered: ''}, levelCount: '1', projectileCount: 0},
        maximum: {dice: {modifier: 0, multiplier: 1, divisor: 1, dieCount: 6, dieType: 6, rendered: ''}, projectileCount: 0},
        supplemental: [],
        type: {id: 7, name: 'Bludgeoning'},
        projectileCount: 0
    },
    description: 'gdhgfhh h gf hd `fhg d',
    duration: {id: 982, name: '10 days'},
    id: 0,
    isRitual: false,
    level: 2,
    name: '`test spell',
    range: {id: 998, name: 'Self (10-foot-radius)'},
    resource: _RESOURCE,
    savingThrow: {abilityScore: {id: 27, name: 'Constitution'}, effect: {id: 1701, name: 'Cancel Effect'}},
    school: {id: 107, name: 'Conjuration'},
    supplementalDescriptions: [
        {description: 'Test spell desc`ription', id: -1, orderIndex: 0, title: '`TEST SPELL desc'}
    ],
    charts: _ONE_OF_EACH.CHART,
    mechanics: [_MECHANIC.ADVANTAGE, _MECHANIC.ADVANTAGE_SAVING_THROW]
};
export const WEAPON = {
    id: 0,
    name: '`Test Weapon',
    ammunition: {id: 76, name: 'Bolt'},
    cost: '10',
    damage: {
        dice: {id: 124, dieCount: 1, dieType: 4, modifier: 0, multiplier: 1, divisor: 1, rendered: '1d4'},
        type: {
            id: 0,
            name: ''
        },
        versatile: {
            dice: {id: 129, dieCount: 1, dieType: 6, modifier: 0, multiplier: 1, divisor: 1, rendered: '1d6'}
        }
    },
    range: {normal: 10, maximum: 25},
    requireRange: true,
    requireSpecialDescription: true,
    requireVersatileDamage: true,
    resource: _RESOURCE,
    specialDescription: '`Special Description--fhdfk gsh fgfkdjhg kfdhg kdfhg kdfh gkdfhg fk',
    category: {id: 35, name: 'Melee'},
    proficiency: {id: 38, name: 'Simple'},
    weaponProperties: [
        {id: 39, name: 'Ammunition'},
        {id: 48, name: 'Versatile'},
        {id: 45, name: 'Special'},
        {id: 41, name: 'Heavy'}
    ],
    weight: '10'
};

export const ASSIGNED_EQUIPMENT = [
    {
        ammunition: {},
        assignedCount: 1,
        category: {name: 'General', id: 100},
        cost: '2',
        count: 1,
        description: null,
        id: '489',
        improvisedWeapon: {},
        isMagicItem: false,
        name: 'Abacus',
        resource: {name: 'Player\'s Handbook', id: 2},
        unit: '',
        weight: '2'
    },
    {
        ammunition: {},
        assignedCount: 2,
        category: {name: 'General', id: 100},
        cost: '1',
        count: 50,
        description: 'Rope, whether made of hemp or silk, has 2 hit points and can be burst with a DC 17 Strength check.',
        id: '618',
        improvisedWeapon: {},
        isMagicItem: false,
        name: 'Rope, Hempen',
        resource: {name: 'Player\'s Handbook', id: 2},
        unit: 'feet',
        weight: '10'
    }
];
export const _BACKGROUND = {
    id: 0,
    name: '--test',
    assignedEquipment: ASSIGNED_EQUIPMENT,
    charts: CHARTS,
    description: '--test description',
    feature: {
        id: 0,
        name: '--test feature',
        description: '--test feature description'
    },
    proficiencyGroups: PROFICIENCY_GROUPS,
    resource: {id: 2, name: 'Player\'s Handbook'},
    startingGold: '25',
    suggestedCharacteristics: '--test suggested characteristics',
    variants: []
};
export const CHARTS = [
    {
        columnCount: 1,
        columns: [
            {id: 0, title: '', orderIndex: 0, selectionItemDataType: {id: 1, name: ''}, selectionItemType: {id: 0, name: ''}}
        ],
        description: '',
        dice: {dieCount: 1, dieType: 4, divisor: 1, modifier: 0, multiplier: 1, rendered: '1d4'},
        entries: [
            {id: -2, description: '--die roll 01', minimum: 1, maximum: 1},
            {id: -3, description: '--die roll 02', minimum: 2, maximum: 2},
            {id: -4, description: '--die roll 03', minimum: 3, maximum: 3},
            {id: -5, description: '--die roll 04', minimum: 4, maximum: 4}
        ],
        id: -1,
        isCreateNewItemType: false,
        orderIndex: 2,
        rowCount: 0,
        rows: [],
        selectionItemType: {id: 0, name: ''},
        title: '--test die roll chart',
        type: {name: 'Die Roll Chart', id: 125}
    },
    {
        columnCount: '2',
        columns: [
            {id: 0, orderIndex: 0, selectionItemDataType: {id: 1, name: ''}, selectionItemType: {id: 0, name: ''}, title: '--test column title 01'},
            {id: -2, orderIndex: 1, selectionItemDataType: {id: 1, name: ''}, selectionItemType: {id: 0, name: ''}, title: '--test column title 02'}],
        description: '',
        dice: {dieCount: 0, dieType: 0, divisor: 0, id: 0, modifier: 0, multiplier: 1, rendered: ''},
        entries: [
            {columnIndex: 0, description: '--test cell 01', id: -1, maximum: 0, minimum: 0, rowIndex: 0, selectionItem: {id: 0, name: ''}},
            {columnIndex: 0, description: '--test cell 03', id: -2, maximum: 0, minimum: 0, rowIndex: 1, selectionItem: {id: 0, name: ''}},
            {columnIndex: 1, description: '--test cell 02', id: -3, maximum: 0, minimum: 0, rowIndex: 0, selectionItem: {id: 0, name: ''}},
            {columnIndex: 1, description: '--test cell 04', id: -4, maximum: 0, minimum: 0, rowIndex: 1, selectionItem: {id: 0, name: ''}}
        ],
        id: -2,
        isCreateNewItemType: false,
        orderIndex: 1,
        rowCount: '2',
        rows: [
            {id: -1, orderIndex: 0, selectionItem: {id: 0, name: ''}, title: '--test row title 01'},
            {id: -2, orderIndex: 1, selectionItem: {id: 0, name: ''}, title: '--test row title 02'}
        ],
        selectionItemType: {id: 0, name: ''},
        title: '--test standard chart',
        type: {name: 'Standard Chart', id: 127}
    },
    {
        columnCount: 1,
        columns: [
            {id: 0, orderIndex: 0, selectionItemDataType: {id: 0, name: 'SELECT ONE'}, selectionItemType: {id: 15, name: 'Damage Type'}, title: '--Test Col Title 01'}
        ],
        description: '',
        dice: {dieCount: 0, dieType: 0, divisor: 0, id: 0, modifier: 0, multiplier: 1, rendered: ''},
        entries: [
            {columnIndex: 0, description: '', id: -1, rowIndex: 0, selectionItem: {id: 77, name: 'Acid'}},
            {columnIndex: 0, description: '', id: -2, rowIndex: 1, selectionItem: {id: 81, name: 'Lightning'}},
            {columnIndex: 0, description: '', id: -3, rowIndex: 2, selectionItem: {id: 77, name: 'Acid'}},
            {columnIndex: 0, description: '', id: -4, rowIndex: 3, selectionItem: {id: 81, name: 'Lightning'}},
            {columnIndex: 0, description: '', id: -5, rowIndex: 4, selectionItem: {id: 79, name: 'Fire'}},
            {columnIndex: 0, description: '', id: -6, rowIndex: 5, selectionItem: {id: 79, name: 'Fire'}},
            {columnIndex: 0, description: '', id: -7, rowIndex: 6, selectionItem: {id: 83, name: 'Poison'}},
            {columnIndex: 0, description: '', id: -8, rowIndex: 7, selectionItem: {id: 79, name: 'Fire'}},
            {columnIndex: 0, description: '', id: -9, rowIndex: 8, selectionItem: {id: 78, name: 'Cold'}},
            {columnIndex: 0, description: '', id: -10, rowIndex: 9, selectionItem: {id: 78, name: 'Cold'}}
        ],
        id: -3,
        isCreateNewItemType: false,
        orderIndex: 0,
        rowCount: 10,
        rows: [
            {id: -0, orderIndex: 0, selectionItem: {name: 'Black', id: 729}},
            {id: -1, orderIndex: 1, selectionItem: {name: 'Blue', id: 730}},
            {id: -2, orderIndex: 2, selectionItem: {name: 'Brass', id: 738}},
            {id: -3, orderIndex: 3, selectionItem: {name: 'Bronze', id: 737}},
            {id: -4, orderIndex: 4, selectionItem: {name: 'Copper', id: 736}},
            {id: -5, orderIndex: 5, selectionItem: {name: 'Gold', id: 735}},
            {id: -6, orderIndex: 6, selectionItem: {name: 'Green', id: 733}},
            {id: -7, orderIndex: 7, selectionItem: {name: 'Red', id: 731}},
            {id: -8, orderIndex: 8, selectionItem: {name: 'Silver', id: 732}},
            {id: -9, orderIndex: 9, selectionItem: {name: 'White', id: 734}}
        ],
        selectionItemType: {id: 728, name: 'Draconic Ancestry'},
        title: '--test selection chart',
        type: {name: 'Selection Chart', id: 126}
    }
];
export const MECHANICS = [
    {
        assignmentType: {id: 1203, name: 'Base Only'},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1},
        id: -1,
        maximumValue: 0,
        specialText: '',
        target: {id: 332, name: 'History'},
        targetGroup: {
            itemType: {id: 0, name: ''},
            items: [],
            selectCount: 0
        },
        title: '',
        titleId: 0,
        type: {id: 145, name: 'Advantage'},
        value: 0,
        valueObject: {id: 0, name: ''}
    },
    {
        assignmentType: {id: 1203, name: 'Base Only'},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1},
        id: -2,
        maximumValue: 0,
        specialText: '',
        target: {id: 336, name: 'Insight'},
        targetGroup: {
            itemType: {id: 0, name: ''},
            items: [],
            selectCount: 0
        },
        title: '',
        titleId: 0,
        type: {id: 148, name: 'Bonus'},
        value: '2',
        valueObject: {id: 0, name: ''}
    },
    {
        assignmentType: {id: 1203, name: 'Base Only'},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1},
        id: -3,
        maximumValue: 0,
        specialText: '',
        target: {id: 24, name: 'Language'},
        targetGroup: {
            itemType: {id: 0, name: ''},
            items: [],
            selectCount: 0
        },
        title: '',
        titleId: 0,
        type: {id: 160, name: 'Select Item'},
        value: '1',
        valueObject: {id: 0, name: ''}
    },
    {
        assignmentType: {id: 1203, name: 'Base Only'},
        dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1},
        id: -4,
        maximumValue: 0,
        specialText: '',
        target: {id: 75, name: 'Piercing'},
        targetGroup: {
            itemType: {id: 0, name: ''},
            items: [],
            selectCount: 0
        },
        title: '',
        titleId: 0,
        type: {id: 162, name: 'Vulnerability'},
        value: 0,
        valueObject: {id: 0, name: ''}
    },
    {
        assignmentType: {id: 1203, name: 'Base Only'},
        dice: {
            dieCount: 1,
            dieType: 4,
            divisor: 1,
            modifier: 0,
            multiplier: 1,
            rendered: '1d4'
        },
        id: -5,
        maximumValue: 0,
        specialText: '',
        target: {id: 338, name: 'Survival'},
        targetGroup: {
            itemType: {id: 0, name: ''},
            items: [],
            selectCount: 0
        },
        title: '',
        titleId: 0,
        type: {id: 151, name: 'Die Roll Bonus to Stat'},
        value: 0,
        valueObject: {id: 0, name: ''}
    }
];
export const PROFICIENCY_GROUPS = [
    {
        id: 0,
        name: '',
        category: {
            id: 91,
            name: 'Language',
            parentId: 0
        },
        conditionalText: '',
        mechanic: {
            id: 136,
            name: 'Assignment'
        },
        proficiencies: [{id: 305, name: 'Abyssal'}],
        selectCount: 1
    },
    {
        id: 0,
        name: '',
        category: {
            id: 89,
            name: 'Skill',
            parentId: 0
        },
        conditionalText: '',
        mechanic: {
            id: 139,
            name: 'Select From List'
        },
        proficiencies: [{id: 327, name: 'Athletics'}, {id: 330, name: 'Stealth'}, {id: 328, name: 'Acrobatics'}],
        selectCount: 1
    },
    {
        id: 0,
        name: '',
        category: {
            id: 94,
            name: 'Musical Instrument',
            parentId: 0
        },
        conditionalText: '',
        mechanic: {
            id: 138,
            name: 'Select From category'
        },
        proficiencies: [],
        selectCount: 1
    },
    {
        id: 0,
        name: '',
        category: {
            id: 89,
            name: 'Skill',
            parentId: 0
        },
        conditionalText: '--test conditional',
        mechanic: {
            id: 137,
            name: 'Conditional'
        },
        proficiencies: [{id: 332, name: 'History'}],
        selectCount: 1
    }
];
export const _SPELL = {
    atHigherLevels: '--test at higher levels',
    castingTime: {id: 1187, name: '1 action'},
    charts: CHARTS,
    components: [
        {id: '71', name: 'Verbal'},
        {id: '72', name: 'Somatic'},
        {id: '73', name: 'Material', description: '--test'}
    ],
    damage: {
        abilityScore: {id: 0, name: ''},
        applyAbilityScoreModifier: false,
        attackRollType: {id: 118, name: 'Ranged Spell'},
        condition: {id: 235, name: 'Blinded'},
        dice: {dieCount: 1, dieType: 6, divisor: 1, modifier: 0, multiplier: 1, rendered: '1d6'},
        improvement: {
            dice: {dieCount: 1, dieType: 6, divisor: 1, modifier: 0, multiplier: 1, rendered: '1d6'},
            levelCount: 1,
            projectileCount: 1
        },
        levelCount: '2',
        maximum: {dice: {dieCount: 4, dieType: 6, divisor: 1, modifier: 0, multiplier: 1, rendered: '4d6'}},
        projectileCount: '2',
        supplemental: [],
        type: {id: 82, name: 'Necrotic'}
    },
    description: '--test description',
    duration: {id: 1189, name: '8 hours'},
    id: 0,
    isRitual: false,
    level: '1',
    mechanics: MECHANICS,
    name: '--test spell',
    range: {id: 1188, name: '30 feet'},
    resource: {id: 2, name: 'Player\'s Handbook'},
    savingThrow: {
        abilityScore: {id: 58, name: 'Wisdom'},
        effect: {id: 288, name: 'Cancel Effect'}
    },
    school: {id: 289, name: 'Abjuration'},
    supplementalDescriptions: [
        {description: '--test fdjf dsj dfjgn fdg d', id: -1, orderIndex: 0, title: '--test desc 01'},
        {description: '--test fdj kdfsjg dfkgn df ngfd&nbsp;', id: -2, orderIndex: 1, title: '--test desc 02'}
    ]
};