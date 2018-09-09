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
export const SPELL = {
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