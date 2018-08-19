import * as types from '../actionTypes';
import spellApi from '../../api/admin/SpellApi';

export function loadSpellsSuccess(spells) {
    return {type: types.LOAD_SPELLS_SUCCESS, spells};
}

export function updateSpellSuccess(spell) {
    return {type: types.UPDATE_SPELL_SUCCESS, spell};
}

export function createSpellSuccess(spell) {
    return {type: types.CREATE_SPELL_SUCCESS, spell};
}

export function deleteSpellSuccess(spell) {
    return {type: types.DELETE_SPELL_SUCCESS, spell};
}

export function upsertSpellSuccess(spell) {
    return {type: types.UPSERT_SPELL_SUCCESS, spell};
}

export function loadSpells() {
    return function(dispatch) {
        return spellApi.getAllSpells().then(spells => {
            dispatch(loadSpellsSuccess(spells));
        }).catch(error => {
            throw (error);
        });
    };
}

export function updateSpell(spell) {
    return function (dispatch) {
        return spellApi.updateSpell(spell).then(responseSpell => {
            dispatch(updateSpellSuccess(responseSpell.spell));
        }).catch(error => {
            throw (error);
        });
    };
}

export function createSpell(spell) {
    return function (dispatch) {
        return spellApi.createSpell(spell).then(responseSpell => {
            dispatch(createSpellSuccess(responseSpell.spell));
            return responseSpell;
        }).catch(error => {
            throw (error);
        });
    };
}

export function deleteSpell(spell) {
    return function(dispatch) {
        return spellApi.deleteSpell(spell).then(() => {
            dispatch(deleteSpellSuccess(spell));
            return;
        }).catch(error => {
            throw (error);
        });
    };
}

export function upsertSpell(spell) {
    return function(dispatch) {
        if (spell.id && spell.id != 0) {
            return spellApi.updateSpell(spell).then(responseSpell => {
                dispatch(updateSpellSuccess(responseSpell.spell));
            }).catch(error => {
                throw (error);
            });
        } else {
            return spellApi.createSpell(spell).then(responseSpell => {
                dispatch(createSpellSuccess(responseSpell.spell));
                return responseSpell;
            }).catch(error => {
                throw (error);
            });
        }
    };
}