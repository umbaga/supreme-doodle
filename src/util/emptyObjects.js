import * as exampleObjects from './exampleObjects';
import * as itemtypes from './itemTypeDefinition';

const _ID_NAME_OBJECT = {id: 0, name: ''};
const _ID_NAME_DESC_OBJECT = {id: 0, name: '', description: ''};

const _DICE = {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 0};
const _FEATURE = _ID_NAME_DESC_OBJECT;
const _PROFICIENCY = _ID_NAME_OBJECT;
const _RESOURCE = {id: 2, name: 'Player\'s Handbook'};

export const examples = exampleObjects;

export const ITEMTYPE = {
    id: 0,
    name: '',
    isPicklist: false,
    applySupplementalPicklist: false
};