import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInput from '../inputs/DndInput';
import DndDataEntryButtonBar from '../buttons/DndDataEntryButtonBar';
import DndSpellSelectionRow from '../subcomponents/DndSpellSelectionRow';

class DndManageSpellSelection extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderList = this.renderList.bind(this);
        this.renderForm = this.renderForm.bind(this);
        
    }
    
    renderList() {
        const spellSelections = this.props.spellSelections;
        if (spellSelections && spellSelections.length != 0) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Assigned Spells</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spellSelections.map(function(spellSelection, idx) {
                            return (
                                <DndSpellSelectionRow
                                    key={idx}
                                    spellSelection={spellSelection}
                                    onRemove={this.props.onChange}
                                    name="spellcasting.spellSelections"
                                    dataType={util.datatypes.action.SPELL_SELECTION.REMOVE}
                                    />
                            );
                        }.bind(this))}
                    </tbody>
                </table>
            );
        }
        return null;
    }
    
    renderForm(){
        const editSpellSelection = this.props.editSpellSelection;
        const rechargeTypes = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.RECHARGE_TYPE);
        let spells = this.props.spells;
        const spelllists = this.props.spelllists;
        const schools = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.SCHOOL_OF_MAGIC);
        const selectionTypes = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.SPELL_SELECTION);
        let selectionCriteriaInputs = null;
        let castingInformationInputs = null;
        let selectedSpell = util.common.picklists.getPicklistItemFromSinglePicklist(spells, editSpellSelection.spell.id);
        if ((selectedSpell && selectedSpell.level != -1) || (editSpellSelection.spellLevel != -1)) {
            spells = spells.filter(function(spell) {
                if (editSpellSelection) {
                    return spell.level == editSpellSelection.spellLevel;
                } else {
                    return spell.level == selectedSpell.level;
                }
            });
        }
        const spellInput = (
            <DndInput
                label="Select Spell"
                name="spell"
                value={editSpellSelection.spell}
                onChange={this.props.onChange}
                dataType={util.datatypes.picklist.GENERAL}
                picklist={spells}
                stackLabel
                />
        );
        
        const schoolInput = (
            <DndInput
                label="Select School"
                name="school"
                value={editSpellSelection.school}
                onChange={this.props.onChange}
                dataType={util.datatypes.picklist.SCHOOL_OF_MAGIC}
                picklist={schools}
                stackLabel
                />
        );
        
        const spelllistInput = (
            <DndInput
                label="Select Spell List"
                name="spelllist"
                value={editSpellSelection.spelllist}
                onChange={this.props.onChange}
                dataType={util.datatypes.picklist.GENERAL}
                picklist={spelllists}
                stackLabel
                />
        );
        
        const spellLevelInput = (
            <DndInput
                label="Select Spell Level"
                name="spellLevel"
                value={editSpellSelection.spellLevel}
                onChange={this.props.onChange}
                dataType={util.datatypes.number.SPELL_LEVEL}
                stackLabel
                />
        );
        
        const selectCountInput = (
            <DndInput
                label="Select Count"
                name="selectCount"
                value={editSpellSelection.selectCount}
                onChange={this.props.onChange}
                dataType={util.datatypes.number.INT}
                stackLabel
                />
        );
        
        const castingCountInput = (
            <DndInput
                label="Casting Count"
                name="castingCount"
                value={editSpellSelection.castingCount}
                onChange={this.props.onChange}
                dataType={util.datatypes.number.INT}
                stackLabel
                />
        );
        
        const rechargeTypeInput = (
            <DndInput
                label="Regain Uses"
                name="rechargeType"
                value={editSpellSelection.rechargeType}
                onChange={this.props.onChange}
                dataType={util.datatypes.picklist.RECHARGE_TYPE}
                picklist={rechargeTypes}
                stackLabel
                />
        );
        
        const characterLevelInput = (
            <DndInput
                label="Character Level"
                name="characterLevel"
                value={editSpellSelection.characterLevel}
                onChange={this.props.onChange}
                dataType={util.datatypes.number.CHARACTER_LEVEL}
                stackLabel
                />
        );
        
        switch (editSpellSelection.selectionType.id) {
            case util.itemtypes.SPELL_SELECTION.BY_LEVEL:
                selectionCriteriaInputs = (
                    <div>
                        <div className="col-sm-6">
                            {selectCountInput}
                        </div>
                        <div className="col-sm-6">
                            {spellLevelInput}
                        </div>
                    </div>
                );
                if (editSpellSelection.spellLevel != 0 && editSpellSelection.selectCount != 0) {
                    castingInformationInputs = (
                        <div>
                            <div className="col-sm-6">
                                {castingCountInput}
                            </div>
                            <div className="col-sm-6">
                                {rechargeTypeInput}
                            </div>
                            <div className="col-sm-6">
                                {characterLevelInput}
                            </div>
                        </div>
                    );
                }
                break;
            case util.itemtypes.SPELL_SELECTION.BY_SCHOOL:
                selectionCriteriaInputs = (
                    <div>
                        <div className="col-sm-6">
                            {selectCountInput}
                        </div>
                        <div className="col-sm-6">
                            {spellLevelInput}
                        </div>
                        <div className="col-sm-6">
                            {schoolInput}
                        </div>
                    </div>
                );
                if (editSpellSelection.spellLevel != 0 && editSpellSelection.selectCount != 0 && editSpellSelection.school.id != 0) {
                    castingInformationInputs = (
                        <div>
                            <div className="col-sm-6">
                                {castingCountInput}
                            </div>
                            <div className="col-sm-6">
                                {rechargeTypeInput}
                            </div>
                            <div className="col-sm-6">
                                {characterLevelInput}
                            </div>
                        </div>
                    );
                }
                break;
            case util.itemtypes.SPELL_SELECTION.BY_SPELL_LIST:
                selectionCriteriaInputs = (
                    <div>
                        <div className="col-sm-6">
                            {selectCountInput}
                        </div>
                        <div className="col-sm-6">
                            {spellLevelInput}
                        </div>
                        <div className="col-sm-6">
                            {spelllistInput}
                        </div>
                    </div>
                );
                if (editSpellSelection.spellLevel != 0 && editSpellSelection.selectCount != 0 && editSpellSelection.spelllist.id != 0) {
                    castingInformationInputs = (
                        <div>
                            <div className="col-sm-6">
                                {castingCountInput}
                            </div>
                            <div className="col-sm-6">
                                {rechargeTypeInput}
                            </div>
                            <div className="col-sm-6">
                                {characterLevelInput}
                            </div>
                        </div>
                    );
                }
                break;
            case util.itemtypes.SPELL_SELECTION.BY_SPELL:
                selectionCriteriaInputs = (
                    <div>
                        <div className="col-sm-6">
                            {spellLevelInput}
                        </div>
                        <div className="col-sm-6">
                            {spellInput}
                        </div>
                    </div>
                );
                if (selectedSpell && selectedSpell.level != 0) {
                    castingInformationInputs = (
                        <div>
                            <div className="col-sm-6">
                                {castingCountInput}
                            </div>
                            <div className="col-sm-6">
                                {rechargeTypeInput}
                            </div>
                            <div className="col-sm-6">
                                {characterLevelInput}
                            </div>
                        </div>
                    );
                } else if (selectedSpell && selectedSpell.id != 0) {
                    castingInformationInputs = (
                        <div>
                            <div className="col-sm-6">
                                {characterLevelInput}
                            </div>
                        </div>
                    );
                }
                break;
            default:
        }
        return (
            <div>
                <DndInput
                    label="Selection Type"
                    name="selectionType"
                    value={editSpellSelection.selectionType}
                    onChange={this.props.onChange}
                    dataType={util.datatypes.picklist.SPELL_SELECTION}
                    picklist={selectionTypes}
                    />
                {selectionCriteriaInputs}
                {castingInformationInputs}
                <DndDataEntryButtonBar
                    onCancel={this.props.onChange}
                    onSave={this.props.onChange}
                    name="spellcasting.spellSelections"
                    saveAction={util.datatypes.action.SPELL_SELECTION.ADD}
                    cancelAction={util.datatypes.action.SPELL_SELECTION.RESET}
                    />
            </div>
        );
    }
    
    render() {
        return (
            <div>
                <div className="col-sm-12">
                    {this.renderForm()}
                </div>
                <div className="col-sm-12">
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

DndManageSpellSelection.propTypes = {
    spellSelections: PropTypes.array.isRequired,
    picklists: PropTypes.array.isRequired,
    editSpellSelection: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    spells: PropTypes.array.isRequired,
    spelllists: PropTypes.array.isRequired
};

export default DndManageSpellSelection;
