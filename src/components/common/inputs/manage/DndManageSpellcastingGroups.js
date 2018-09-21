import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../DndInput';
import DndList from '../DndList';
import DndFieldset from '../../form/DndFieldset';
import util from '../../../../util/util';

class DndManageSpellcastingGroups extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderInputs = this.renderInputs.bind(this);
        this.renderRechargeInputs = this.renderRechargeInputs.bind(this);
        this.renderSpellListInputs = this.renderSpellListInputs.bind(this);
        this.renderSpellInputs = this.renderSpellInputs.bind(this);
        this.renderSchoolInputs = this.renderSchoolInputs.bind(this);
        this.renderSelectCountInputs = this.renderSelectCountInputs.bind(this);
    }
    
    renderInputs(spellcastingGroup) {
        if (spellcastingGroup.type.id && spellcastingGroup.type.id != 0) {
            return (
                <fragment>
                    <div className="col-md-6">
                        <DndInput
                            name="spellLevel"
                            label="Spell Level"
                            dataType={util.datatypes.NUMBER.SPELL_LEVEL}
                            value={spellcastingGroup.spellLevel}
                            onChange={this.props.onChangeChild}
                            dataTask="spellcasting-group"
                            />
                    </div>
                    <div className="col-md-6">
                        <DndInput
                            name="characterLevel"
                            label="Character Level"
                            dataType={util.datatypes.NUMBER.CHARACTER_LEVEL}
                            value={spellcastingGroup.characterLevel}
                            onChange={this.props.onChangeChild}
                            dataTask="spellcasting-group"
                            />
                    </div>
                    <div className="col-md-6">
                        <DndInput
                            name="slotLevel"
                            label="Cast At Spell Level"
                            dataType={util.datatypes.NUMBER.SPELL_LEVEL}
                            value={spellcastingGroup.slotLevel}
                            onChange={this.props.onChangeChild}
                            dataTask="spellcasting-group"
                            />
                    </div>
                    {this.renderSelectCountInputs(spellcastingGroup)}
                    {this.renderSchoolInputs(spellcastingGroup)}
                    {this.renderSpellInputs(spellcastingGroup)}
                    {this.renderRechargeInputs(spellcastingGroup)}
                    {this.renderSpellListInputs(spellcastingGroup)}
                    <div className="col-md-12">
                        <DndInput
                            labelCols={2}
                            label="Final Spellcasting Group"
                            name="spellcasting.groups"
                            dataType={util.datatypes.STRING.LONG}
                            value={util.format.forDisplay.obj.spellcastingGroup(spellcastingGroup)}
                            onChange={this.props.onChange}
                            isReadOnly
                            buttonDatatype={util.datatypes.ACTION.SPELLCASTING_GROUP}
                            buttonDataTask="spellcasting-group"
                            buttonOnClick={this.props.onChange}
                            buttonType="additem"
                            buttonDisabled={!util.validation.isReadyToSave.spellcastingGroup(spellcastingGroup)}
                            />
                    </div>
                </fragment>
            );
        }
        return null;
    }
    
    renderRechargeInputs(spellcastingGroup) {
        const rechargeTypes = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.RECHARGE_TYPE);
        if (spellcastingGroup.spellLevel >= 1) {
            return (
                <fragment>
                    <div className="col-md-6">
                        <DndInput
                            name="chargeCount"
                            label="Charges"
                            dataType={util.datatypes.NUMBER.INT}
                            value={spellcastingGroup.chargeCount}
                            onChange={this.props.onChangeChild}
                            dataTask="spellcasting-group"
                            />
                    </div>
                    <div className="col-md-6">
                        <DndInput
                            name="rechargeType"
                            label="Recharge Type"
                            dataType={util.datatypes.PICKLIST}
                            value={spellcastingGroup.rechargeType}
                            onChange={this.props.onChangeChild}
                            picklist={rechargeTypes}
                            dataTask="spellcasting-group"
                            />
                    </div>
                </fragment>
            );
        }
        return null;
    }
    
    renderSpellListInputs(spellcastingGroup) {
        const spelllists = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.SPELLLIST);
        if (spellcastingGroup.type.id == util.itemtypes.TYPE.SPELLCASTING_GROUP.BY_SPELLLIST) {
            return (
                <div className="col-md-6">
                    <DndInput
                        name="spelllist"
                        label="Spell List"
                        dataType={util.datatypes.PICKLIST}
                        value={spellcastingGroup.spelllist}
                        onChange={this.props.onChangeChild}
                        picklist={spelllists}
                        dataTask="spellcasting-group"
                        />
                </div>
            );
        }
        return null;
    }
    
    renderSpellInputs(spellcastingGroup) {
        const spells = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.SPELL).filter(function(spell) {
            if (spellcastingGroup.spellLevel == -1) {
                return true;
            } else {
                return spell.level == spellcastingGroup.spellLevel;
            }
        });
        if (spellcastingGroup.type.id == util.itemtypes.TYPE.SPELLCASTING_GROUP.BY_SPELL) {
            return (
                <div className="col-md-6">
                    <DndInput
                        name="spell"
                        label="Spell"
                        dataType={util.datatypes.PICKLIST}
                        value={spellcastingGroup.spell}
                        onChange={this.props.onChangeChild}
                        picklist={spells}
                        dataTask="spellcasting-group"
                        />
                </div>
            );
        }
        return null;
    }
    
    renderSchoolInputs(spellcastingGroup) {
        const schools = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.SCHOOL_OF_MAGIC);
        if (spellcastingGroup.type.id == util.itemtypes.TYPE.SPELLCASTING_GROUP.BY_SCHOOL) {
            return (
                <div className="col-md-6">
                    <DndInput
                        name="school"
                        label="School"
                        dataType={util.datatypes.PICKLIST}
                        value={spellcastingGroup.school}
                        onChange={this.props.onChangeChild}
                        picklist={schools}
                        dataTask="spellcasting-group"
                        />
                </div>
            );
        }
        return null;
    }
    
    renderSelectCountInputs(spellcastingGroup) {
        if (spellcastingGroup.type.id != util.itemtypes.TYPE.SPELLCASTING_GROUP.BY_SPELL) {
            return (
                <div className="col-md-6">
                    <DndInput
                        name="selectCount"
                        label="Select Count"
                        dataType={util.datatypes.NUMBER.INT}
                        value={spellcastingGroup.selectCount}
                        onChange={this.props.onChangeChild}
                        dataTask="spellcasting-group"
                        />
                </div>
            );
        }
        return null;
    }
    
    render() {
        const spellcastingGroups = this.props.value;
        const spellcastingGroup = this.props.editSpellcastingGroup;
        const spellcastingGroupTypes = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.SPELLCASTING_GROUP_TYPE);
        return (
            <fragment>
                <DndFieldset
                    legend="New Spellcasting Group"
                    collapsible
                    >
                    <div className="col-md-6">
                        <DndInput
                            name="type"
                            label="Type"
                            dataType={util.datatypes.PICKLIST}
                            value={spellcastingGroup.type}
                            onChange={this.props.onChangeChild}
                            picklist={spellcastingGroupTypes}
                            dataTask="spellcasting-group"
                            />
                    </div>
                    {this.renderInputs(spellcastingGroup)}
                </DndFieldset>
                <DndFieldset
                    legend="Exisitng Spellcasting Groups"
                    collapsible
                    >
                    <DndList
                        name="spellcasting.groups"
                        value={spellcastingGroups}
                        dataTask="spellcasting"
                        dataType={util.datatypes.ACTION.SPELLCASTING_GROUP}
                        childName="title"
                        onChange={this.props.onChange}
                        onChangeChild={this.props.onChangeChild}
                        isCollapsible
                        renderNameFunction={util.format.forDisplay.obj.spellcastingGroup}
                        />
                </DndFieldset>
            </fragment>
        );
    }
}

DndManageSpellcastingGroups.propTypes = {
    editSpellcastingGroup: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeChild: PropTypes.func.isRequired,
    picklists: PropTypes.array.isRequired,
    value: PropTypes.array.isRequired
};

export default DndManageSpellcastingGroups;