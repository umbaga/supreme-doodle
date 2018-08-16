import * as itemtypes from './itemTypeDefinition';

const _RESOURCE = {id: itemtypes.TYPE.RESOURCE.PHB, name: 'Player\'s Handbook'};

const _CHARTS = {
    _DICE: {
        columnCount: 1,
        columns: [
            {
                columnIndex: 0,
                dataType: {id: 322},
                id: 0,
                picklist: {id: 0, name: ''},
                selectItemType: {id: 0},
                text: '--test col'
            }
        ],
        description: '--test dice description',
        dice: {dieCount: 1, dieType: 4, divisor: 1, modifier: 0, multiplier: 1, rendered: '1d4'},
        entries: [
            {
                boolValue: null,
                columnIndex: 0,
                dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
                id: 0,
                numberValue: 0,
                picklistItem: {id: 0, name: ''},
                rowIndex: 0,
                text: '--test entry 1'
            },
            {
                boolValue: null,
                columnIndex: 0,
                dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
                id: 0,
                numberValue: 0,
                picklistItem: {id: 0, name: ''},
                rowIndex: 1,
                text: '--test entry 2'
            },
            {
                boolValue: null,
                columnIndex: 0,
                dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
                id: 0,
                numberValue: 0,
                picklistItem: {id: 0, name: ''},
                rowIndex: 2,
                text: '--test entry 3'
            },
            {
                boolValue: null,
                columnIndex: 0,
                dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
                id: 0,
                numberValue: 0,
                picklistItem: {id: 0, name: ''},
                rowIndex: 3,
                text: '--test entry 4'
            }
        ],
        id: 0,
        isNewType: false,
        orderIndex: 0,
        picklist: {id: 0, name: ''},
        rowCount: 4,
        rows: [
            {
                diceRange: {minimum: 1, maximum: 1},
                id: 0,
                picklistItem: {id: 0, name: ''},
                rowIndex: 0,
                text: ''
            },
            {
                diceRange: {minimum: 2, maximum: 2},
                id: 0,
                picklistItem: {id: 0, name: ''},
                rowIndex: 1,
                text: ''
            },
            {
                diceRange: {minimum: 3, maximum: 3},
                id: 0,
                picklistItem: {id: 0, name: ''},
                rowIndex: 2,
                text: ''
            },
            {
                diceRange: {minimum: 4, maximum: 4},
                id: 0,
                picklistItem: {id: 0, name: ''},
                rowIndex: 3,
                text: ''
            }
        ],
        title: '--test dice chart',
        type: {id: 1062, name: 'Dice Chart'}
    },
    _SELECT: {
        columnCount: 1,
        columns: [
            {
                columnIndex: 0,
                dataType: {name: 'Picklist', id: 1066},
                id: 0,
                picklist: {id: '59', name: 'Ability Score'},
                text: ''
            }
        ],
        description: '',
        dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
        entries: [
            {
                boolValue: null,
                columnIndex: 0,
                dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
                id: 0,
                numberValue: 0,
                picklistItem: {name: 'Constitution', id: 61, abbreviation: 'Con'},
                rowIndex: 0,
                text: ''
            },
            {
                boolValue: null,
                columnIndex: 0,
                dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
                id: 0,
                numberValue: 0,
                picklistItem: {name: 'Charisma', id: 60, abbreviation: 'Cha'},
                rowIndex: 1,
                text: ''
            },
            {
                boolValue: null,
                columnIndex: 0,
                dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
                id: 0,
                numberValue: 0,
                picklistItem: {name: 'Strength', id: 64, abbreviation: 'Str'},
                rowIndex: 2,
                text: ''
            }
        ],
        id: 0,
        isNewType: false,
        orderIndex: 1,
        picklist: {id: 163, name: 'Alignment: Ethical Component'},
        rowCount: 3,
        rows: [
            {
                diceRange: {maximum: 0, minimum: 0},
                id: 0,
                picklistItem: {name: 'Chaotic', id: 164, orderIndex: 2},
                rowIndex: 0,
                text: ''
            },
            {
                diceRange: {maximum: 0, minimum: 0},
                id: 0,
                picklistItem: {name: 'Lawful', id: 165, orderIndex: 0},
                rowIndex: 1,
                text: ''
            },
            {
                diceRange: {maximum: 0, minimum: 0},
                id: 0,
                picklistItem: {name: 'Neutral', id: 166, orderIndex: 1},
                rowIndex: 2,
                text: ''
            }
        ],
        title: '--test selection chart',
        type: {id: 1063, name: 'Selection Chart'}
    },
    _STANDARD: {
        columnCount: 5,
        columns: [
            {
                columnIndex: 0,
                dataType: {id: 322},
                id: 0,
                picklist: {id: 0},
                text: '--string col'
            },
            {
                columnIndex: 1,
                dataType: {name: 'Boolean', id: 321},
                id: 0,
                picklist: {id: 0},
                text: '--bool col'
            },
            {
                columnIndex: 2,
                dataType: {name: 'Die Roll', id: 1067},
                id: 0,
                picklist: {id: 0},
                text: '--dice col'
            },
            {
                columnIndex: 3,
                dataType: {name: 'Number', id: 1065},
                id: 0,
                picklist: {id: 0},
                text: '--number col'
            },
            {
                columnIndex: 4,
                dataType: {name: 'Picklist', id: 1066},
                id: 0,
                picklist: {id: '252', name: 'Damage Source'},
                text: '--picklist col'
            }
        ],
        description: '--test description',
        dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
        entries: [
            {
                boolValue: null,
                columnIndex: 0,
                dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
                id: 0,
                numberValue: 0,
                picklistItem: {id: 0, name: ''},
                rowIndex: 0,
                text: '--string entry 1'
            },
            {
                boolValue: null,
                columnIndex: 0,
                dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
                id: 0,
                numberValue: 0,
                picklistItem: {id: 0, name: ''},
                rowIndex: 1,
                text: '--string entry 2'
            },
            {
                boolValue: true,
                columnIndex: 1,
                dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
                id: 0,
                numberValue: 0,
                picklistItem: {id: 0, name: ''},
                rowIndex: 0,
                text: ''
            },
            {
                boolValue: true,
                columnIndex: 1,
                dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
                id: 0,
                numberValue: 0,
                picklistItem: {id: 0, name: ''},
                rowIndex: 1,
                text: ''
            },
            {
                boolValue: null,
                columnIndex: 2,
                dice: {dieCount: 1, dieType: 4, divisor: 1, modifier: 0, multiplier: 1, rendered: '1d4'},
                id: 0,
                numberValue: 0,
                picklistItem: {id: 0, name: ''},
                rowIndex: 0,
                text: ''
            },
            {
                boolValue: null,
                columnIndex: 2,
                dice: {dieCount: 2, dieType: 4, divisor: 1, modifier: 0, multiplier: 1, rendered: '2d4'},
                id: 0,
                numberValue: 0,
                picklistItem: {id: 0, name: ''},
                rowIndex: 1,
                text: ''
            },
            {
                boolValue: null,
                columnIndex: 3,
                dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
                id: 0,
                numberValue: 2,
                picklistItem: {id: 0, name: ''},
                rowIndex: 0,
                text: ''
            },
            {
                boolValue: null,
                columnIndex: 3,
                dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
                id: 0,
                numberValue: 3,
                picklistItem: {id: 0, name: ''},
                rowIndex: 1,
                text: ''
            },
            {
                boolValue: null,
                columnIndex: 4,
                dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
                id: 0,
                numberValue: 0,
                picklistItem: {name: 'Falling', id: 295},
                rowIndex: 0,
                text: ''
            },
            {
                boolValue: null,
                columnIndex: 4,
                dice: {id: 0, dieCount: 0, dieType: 0, modifier: 0, multiplier: 1, divisor: 1, rendered: ''},
                id: 0,
                numberValue: 0,
                picklistItem: {name: 'Non-magical', id: 253},
                rowIndex: 1,
                text: ''
            }
        ],
        id: 0,
        isNewType: false,
        orderIndex: 2,
        picklist: {id: 0, name: ''},
        rowCount: 2,
        rows: [
            {
                diceRange: {maximum: 0, minimum: 0},
                id: 0,
                picklistItem: {id: 0, name: ''},
                rowIndex: 0,
                text: '--row 1'
            },
            {
                diceRange: {maximum: 0, minimum: 0},
                id: 0,
                picklistItem: {id: 0, name: ''},
                rowIndex: 1,
                text: '--row 2'
            }
        ],
        title: '--test standard chart',
        type: {id: 1064}
    }
};

const _ASSIGNED_EQUIPMENT = [
    {
        assigned: 1,
        cost: '2',
        count: 1,
        id: '618',
        name: 'Abacus',
        unit: '',
        weight: '2',
        category: {id: 114, name: 'General'}
    },
    {
        assigned: '2',
        cost: '0.4',
        count: 1,
        id: '628',
        name: 'Basket',
        unit: '',
        weight: '2',
        category: {id: 114, name: 'General'}
    },
    {
        assigned: 1,
        cost: 0,
        count: 1,
        id: 0,
        name: '--test trinkt',
        unit: '',
        weight: 0,
        category: {id: 887, name: 'Trinket'}
    }
];

const _PROFICIENCY_GROUP = {
    assigned: [
        {id: 379, name: 'Simple Weapons', category: {id: 134, name: 'Weapon'}},
        {id: 430, name: 'Light Armor', category: {id: 126, name: 'Armor'}},
        {id: 431, name: 'Medium Armor', category: {id: 126, name: 'Armor'}}
    ],
    select: {
        category: [
            {id: 129, name: 'Language', count: 2},
            {id: 130, name: 'Musical Instrument', count: 1}
        ],
        list: [
            {
                category: {id: 127, name: 'Artisan\'s Tool'},
                count: 2,
                proficiencies: [
                    {
                        category: {id: 127, name: 'Artisan\'s Tool'},
                        id: '791',
                        name: 'Weaver\'s Tools'
                    },
                    {
                        category: {id: 127, name: 'Artisan\'s Tool'},
                        id: '785',
                        name: 'Potter\'s Tools'
                    },
                    {
                        category: {id: 127, name: 'Artisan\'s Tool'},
                        id: '787',
                        name: 'Smith\'s Tools'
                    }
                ]
            },
            {
                category: {id: 132, name: 'Skill'},
                count: 1,
                proficiencies: [
                    {
                        category: {id: 132, name: 'Skill'},
                        id: '386',
                        name: 'Arcana'
                    },
                    {
                        category: {id: 132, name: 'Skill'},
                        id: '387',
                        name: 'History'
                    },
                    {
                        category: {id: 132, name: 'Skill'},
                        id: '390',
                        name: 'Religion'
                    }
                ]
            }
        ]
    }
};

export const BACKGROUND = {
    id: 0,
    name: '--test background',
    resource: _RESOURCE,
    description: '--test background description',
    suggestedCharacteristics: '--test bg sugg char',
    proficiencies: _PROFICIENCY_GROUP,
    equipment: {
        startingGold: 10,
        assigned: _ASSIGNED_EQUIPMENT
    },
    charts: [
        _CHARTS._DICE,
        _CHARTS._SELECT,
        _CHARTS._STANDARD
    ],
    feature: {
        id: 0,
        name: '--test feature',
        description: '--test feature description'
    },
    variants: []
};

export const CHARTS = {
    DICE: _CHARTS._DICE,
    SELECT: _CHARTS._SELECT,
    STANDARD: _CHARTS._STANDARD
};