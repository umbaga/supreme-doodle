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
    divisor: 1
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
    name: '--test background',
    resource: _RESOURCE,
    description: '--test background description description description description description',
    suggestedCharacteristics: '--test background suggested characteristics',
    proficiencies: {
        assigned: [
            {
                abilityScore: null,
                category: {id: 129, name: 'Language'},
                id: '406',
                language: {dialects: null, rarity: null, script: null},
                name: 'Common',
                resource: {id: 2, name: 'Player\'s Handbook'}
            }
        ],
        select: {
            category: [
                {
                    count: 1,
                    id: 133,
                    name: 'Tool'
                }
            ],
            list: [
                {
                    category: {id: 127, name: 'Artisan\'s Tool'},
                    count: 1,
                    proficiencies: [
                        {
                            abilityScore: null,
                            category: {id: 127, name: 'Artisan\'s Tool'},
                            id: '791',
                            language: {dialects: null, rarity: null, script: null},
                            name: 'Weaver\'s Tools',
                            resource: {id: 2, name: 'Player\'s Handbook'}
                        },
                        {
                            abilityScore: null,
                            category: {id: 127, name: 'Artisan\'s Tool'},
                            id: '785',
                            language: {dialects: null, rarity: null, script: null},
                            name: 'Potter\'s Tools',
                            resource: {id: 2, name: 'Player\'s Handbook'}
                        },
                        {
                            abilityScore: null,
                            category: {id: 127, name: 'Artisan\'s Tool'},
                            id: '787',
                            language: {dialects: null, rarity: null, script: null},
                            name: 'Smith\'s Tools',
                            resource: {id: 2, name: 'Player\'s Handbook'}
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
export const _BACKGROUND = {
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