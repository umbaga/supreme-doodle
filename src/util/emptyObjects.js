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
const _CHART_COLUMN = {
    id: 0,
    text: '',
    columnIndex: 0,
    dataType: {id: itemtypes.TYPE.DATA_TYPE.STRING},
    selectItemType: _ID_NAME_OBJECT
};
const _CHART_ENTRY = {
    id: 0,
    columnIndex: 0,
    rowIndex: 0,
    selectedItem: _ID_NAME_OBJECT,
    value: 0
};
const _CHART_ROW = {
    id: 0,
    text: '',
    diceRange: {
        maximum: 0,
        minimum: 0
    },
    rowIndex: 0,
    selectedItem: _ID_NAME_OBJECT
};

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
export const _BACKGROUND = {
    id: 0,
    name: '--test background',
    resource: _RESOURCE,
    description: '--test background description description description description description',
    suggestedCharacteristics: '--test background suggested characteristics',
    proficiencies: {
        assigned: [
            {
                category: {id: 129, name: 'Language'},
                id: '406',
                name: 'Common'
            },
            {
                category: {id: 134, name: 'Weapon'},
                id: '407',
                name: 'Simple'
            },
            {
                category: {id: 134, name: 'Weapon'},
                id: '380',
                name: 'Martial'
            }
        ],
        select: {
            category: [
                {
                    count: 1,
                    id: 133,
                    name: 'Tool'
                },
                {
                    count: 2,
                    id: 129,
                    name: 'Language'
                }
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
    },
    equipment: {
        startingGold: 10,
        assigned: [
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
        ]
    },
    charts: [],
    feature: {
        id: 0,
        name: '--test feature',
        description: '--test feature description'
    },
    variants: []
};
export const BACKGROUND = {
    id: 0,
    name: '',
    resource: _RESOURCE,
    description: '',
    suggestedCharacteristics: '',
    proficiencies: {
        assigned: [],
        select: {
            category: [],
            list: []
        }
    },
    equipment: {
        startingGold: 0,
        assigned: []
    },
    charts: [],
    feature: {
        id: 0,
        name: '',
        description: ''
    },
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
    rowCount: 0,
    rows: [],
    selectItemType: _ID_NAME_OBJECT,
    type: {id: 1064}
};
export function CHART_COLUMN(newIndex) {
    let retVal = _CHART_COLUMN;
    retVal.columnIndex = newIndex;
    return retVal;
}
export function CHART_ENTRY(newColumnIndex, newRowIndex) {
    let retVal = Object.assign({}, _CHART_ENTRY);
    retVal.columnIndex = newColumnIndex;
    retVal.rowIndex = newRowIndex;
    return retVal;
}
export function CHART_ROW(newIndex) {
    let retVal = _CHART_ROW;
    retVal.rowIndex = newIndex;
    return retVal;
}
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
export const TRINKET = {
    id: 0,
    name: '',
    resource: _RESOURCE,
    category: {id: itemtypes.TYPE.EQUIPMENT_CATEGORY.TRINKET, name: 'Trinket'},
    cost: 0,
    weight: 0
};