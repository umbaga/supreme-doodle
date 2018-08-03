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

export const EQUIPMENT = {
    id: 0,
    name: '',
    resource: _RESOURCE,
    description: '',
    armor: {
        armorClass: {
            applyDexterity: true,
            base: 11,
            isCumulative: false,
            maximumDexterity: 0
        },
        minimumStrength: 0,
        proficiency: _ID_NAME_OBJECT,
        stealthDisadvantage: false
    },
    assignedEquipment: [],
    carryCapacity: 0,
    category: _ID_NAME_OBJECT,
    cost: 0,
    count: 1,
    speed: 0,
    unit: '',
    weapon: {
        ammunition: _ID_NAME_OBJECT,
        class: _ID_NAME_OBJECT,
        damage: {
            dice: _DICE,
            type: _ID_NAME_OBJECT,
            versatile: {
                dice: _DICE
            }
        },
        proficiency: _ID_NAME_OBJECT,
        properties: [],
        range: {
            maximum: 0,
            normal: 0
        },
        special: ''
    },
    weight: 0
};
export const ITEM = _ID_NAME_OBJECT;
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