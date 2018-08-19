import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../../common/inputs/DndInput';
import DndUniversalInput from '../../common/inputs/DndUniversalInput';
import DndNestedCheckbox from '../../common/inputs/DndNestedCheckbox';
import DndManageProficiencies from '../../common/inputs/manage/DndManageProficiencies';
import DndManageCharts from '../../common/inputs/manage/DndManageCharts';
import DndFieldset from '../../common/form/DndFieldset';
import DndCheckboxList from '../../common/inputs/DndCheckboxList';
import util from '../../../util/util';
import { Tabs, Tab } from 'react-bootstrap';

class BackgroundForm extends React.Component {
    constructor(props) {
        super(props);
        this.setFocus = this.setFocus.bind(this);
        this.renderSuggestedCharacteristicsInput = this.renderSuggestedCharacteristicsInput.bind(this);
        this.renderChartsTab = this.renderChartsTab.bind(this);
        this.renderProficienciesInputs = this.renderProficienciesInputs.bind(this);
        this.renderEquipmentInputs = this.renderEquipmentInputs.bind(this);
    }
    
    componentDidMount() {
        this.refs.name.setFocus();
    }
    
    setFocus() {
        this.refs.name.setFocus();
    }
    
    renderSuggestedCharacteristicsInput() {
        let retVal = null;
        if (!this.props.background.isVariant) {
            retVal = (
                <div className="col-md-12">
                    <DndInput
                        name="suggestedCharacteristics"
                        label="Suggested Characteristics"
                        dataType={util.datatypes.STRING.HTML.LONG}
                        value={this.props.background.suggestedCharacteristics}
                        onChange={this.props.onChange}
                        notCollapsible
                        />
                </div>
            );
        }
        return retVal;
    }
    
    renderChartsTab() {
        let retVal = null;
        if (!this.props.background.isVariant) {
            retVal = (
                <Tab eventKey={5} title="Charts">
                    <DndManageCharts
                        onChange={this.props.onChange}
                        onChangeChild={this.props.onChangeChild}
                        picklists={this.props.picklists}
                        value={this.props.background.charts}
                        editChart={this.props.editChart}
                        />
                </Tab>
            );
        }
        return retVal;
    }
    
    renderProficienciesInputs() {
        return (this.props.background.isVariant) ? (
            <fragment>
                <DndFieldset
                    legend="Lose These Proficiencies"
                    collapsible
                    >
                    <DndCheckboxList
                        name="proficiencies.variant.lose.assigned"
                        dataTask="lose-proficiency"
                        dataType={util.datatypes.ACTION.VARIANT.LOSE.PROFICIENCY}
                        onChange={this.props.onChange}
                        onChangeChild={this.props.onChangeChild}
                        picklists={this.props.picklists}
                        value={this.props.background.proficiencies.variant.lose.assigned}
                        referenceValue={this.props.background.parent.proficiencies.assigned}
                        displayPropertyName="name"
                        />
                    <DndCheckboxList
                        name="proficiencies.variant.lose.select.category"
                        dataTask="lose-proficiency"
                        dataType={util.datatypes.ACTION.VARIANT.LOSE.PROFICIENCY_CATEGORY}
                        onChange={this.props.onChange}
                        onChangeChild={this.props.onChangeChild}
                        picklists={this.props.picklists}
                        value={this.props.background.proficiencies.variant.lose.select.category}
                        referenceValue={this.props.background.parent.proficiencies.select.category}
                        displayPropertyFunction={util.format.forDisplay.obj.proficiencyCategory}
                        />
                </DndFieldset>
                <DndFieldset
                    legend="Gain These Proficiencies"
                    collapsible
                    >
                    <DndManageProficiencies
                        name="proficiencies.variant.gain"
                        onChange={this.props.onChange}
                        value={this.props.background.proficiencies.variant.gain}
                        picklists={this.props.picklists}
                        onChangeChild={this.props.onChangeChild}
                        editProficiency={this.props.editProficiency}
                        editCategory={this.props.editProficiencyCategory}
                        editProficiencyList={this.props.editProficiencyList}
                        />
                </DndFieldset>
            </fragment>
        ) : (
            <DndManageProficiencies
                onChange={this.props.onChange}
                value={this.props.background.proficiencies}
                picklists={this.props.picklists}
                onChangeChild={this.props.onChangeChild}
                editProficiency={this.props.editProficiency}
                editCategory={this.props.editProficiencyCategory}
                editProficiencyList={this.props.editProficiencyList}
                />
        );
    }
    
    renderEquipmentInputs(equipments, assignedTrinkets, assignedEquipment, gainedEquipment) {
        return (this.props.background.isVariant) ? (
            <fragment>
                <DndFieldset
                    legend="Lose This Equipment"
                    collapsible
                    >
                    <DndCheckboxList
                        name="equipment.variant.lose"
                        dataTask="lose-proficiency"
                        dataType={util.datatypes.ACTION.VARIANT.LOSE.EQUIPMENT}
                        onChange={this.props.onChange}
                        onChangeChild={this.props.onChangeChild}
                        picklists={this.props.picklists}
                        value={this.props.background.equipment.variant.lose}
                        referenceValue={this.props.background.parent.equipment.assigned}
                        displayPropertyName="name"
                        />
                </DndFieldset>
                <DndFieldset
                    legend="Gain This Equipment"
                    collapsible
                    >
                    <DndInput
                        name="equipment.variant.gain"
                        label="Assigned Equipment"
                        dataType={util.datatypes.ARRAY.LIST.ADD.WITH_VALUE.PICKLIST.INT}
                        value={gainedEquipment}
                        onChange={this.props.onChange}
                        buttonOnClick={this.props.onChange}
                        buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                        changeFocusRefName="equipment.variant.gain"
                        picklist={equipments}
                        childName="name"
                        childValue={this.props.editEquipment}
                        childAuxiliaryNames={['assigned']}
                        childAuxiliaryDatatypes={[util.datatypes.NUMBER.INT]}
                        childAuxiliaryValues={[this.props.editEquipment.assigned]}
                        onChangeChild={this.props.onChangeChild}
                        renderNameFunction={util.format.forDisplay.obj.equipmentName}
                        dataTask="assignedequipment"
                        />
                </DndFieldset>
            </fragment>
        ) : (
            <fragment>
                <div className="col-md-12">
                    <DndInput
                        name="equipment.startingGold"
                        label="Starting Gold"
                        dataType={util.datatypes.NUMBER.DEC}
                        value={this.props.background.equipment.startingGold}
                        onChange={this.props.onChange}
                        />
                </div>
                <div className="col-sm-12">
                    <DndInput
                        name="equipment.assigned"
                        label="Trinkets"
                        dataType={util.datatypes.ARRAY.TAGS.ADD.NEW}
                        value={assignedTrinkets}
                        onChange={this.props.onChange}
                        childValue={this.props.editTrinket.name}
                        childName="name"
                        buttonOnClick={this.props.onChange}
                        onChangeChild={this.props.onChangeChild}
                        buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                        changeFocusRefName="equipment.assigned"
                        dataTask="assignedequipment-trinket"
                        />
                </div>
                <div className="col-md-12">
                    <DndInput
                        name="equipment.assigned"
                        label="Assigned Equipment"
                        dataType={util.datatypes.ARRAY.LIST.ADD.WITH_VALUE.PICKLIST.INT}
                        value={assignedEquipment}
                        onChange={this.props.onChange}
                        buttonOnClick={this.props.onChange}
                        buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                        changeFocusRefName="equipment.assigned"
                        picklist={equipments}
                        childName="name"
                        childValue={this.props.editEquipment}
                        childAuxiliaryNames={['assigned']}
                        childAuxiliaryDatatypes={[util.datatypes.NUMBER.INT]}
                        childAuxiliaryValues={[this.props.editEquipment.assigned]}
                        onChangeChild={this.props.onChangeChild}
                        renderNameFunction={util.format.forDisplay.obj.equipmentName}
                        dataTask="assignedequipment"
                        />
                </div>
            </fragment>
        );
    }
    
    render() {
        const background = this.props.background;
        const picklists = this.props.picklists;
        const backgrounds = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.BACKGROUND);
        const equipments = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.EQUIPMENT).filter(function(eq) {
            return eq.category.id != util.itemtypes.TYPE.EQUIPMENT_CATEGORY.TRINKET;
        }).concat(util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.EQUIPMENT_CATEGORY)).sort(function(a, b) {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            } else {
                return 0;
            }
        });
        let assignedEquipment = background.equipment.assigned.filter(function(equipment) {
            return equipment.category.id != util.itemtypes.TYPE.EQUIPMENT_CATEGORY.TRINKET;
        }.bind(this));
        let assignedTrinkets = background.equipment.assigned.filter(function(equipment) {
            return equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.TRINKET;
        }.bind(this));
        let gainedEquipment = background.equipment.variant.gain;
        return (
            <div>
                <form>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Description">
                            <div className="col-md-12">
                                <DndNestedCheckbox
                                    value={background.isVariant}
                                    label="Is Variant"
                                    onChange={this.props.onChange}
                                    name="isVariant"
                                    >
                                    <DndInput
                                        name="parent"
                                        hideLabel
                                        dataType={util.datatypes.PICKLIST}
                                        value={background.parent}
                                        onChange={this.props.onChange}
                                        picklist={backgrounds}
                                        />
                                </DndNestedCheckbox>
                            </div>
                            <DndUniversalInput
                                ref="name"
                                referenceObject={background}
                                onChange={this.props.onChange}
                                picklists={picklists}
                                />
                            {this.renderSuggestedCharacteristicsInput()}
                        </Tab>
                        <Tab eventKey={2} title="Feature">
                            <DndUniversalInput
                                ref="feature.name"
                                referenceObject={background.feature}
                                onChange={this.props.onChange}
                                referenceObjectPrefix="feature"
                                />
                        </Tab>
                        <Tab eventKey={3} title="Proficiencies">
                            {this.renderProficienciesInputs()}
                        </Tab>
                        <Tab eventKey={4} title="Equipment">
                            {this.renderEquipmentInputs(equipments, assignedTrinkets, assignedEquipment, gainedEquipment)}
                        </Tab>
                        {this.renderChartsTab()}
                    </Tabs>
                </form>
            </div>
        );
    }
}

BackgroundForm.propTypes = {
    editEquipment: PropTypes.object.isRequired,
    editTrinket: PropTypes.object.isRequired,
    editProficiency: PropTypes.object.isRequired,
    editProficiencyCategory: PropTypes.object.isRequired,
    editProficiencyList: PropTypes.object.isRequired,
    editChart: PropTypes.object.isRequired,
    onChangeChild: PropTypes.func.isRequired,
    background: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onSaveNew: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isCreate: PropTypes.bool.isRequired,
    picklists: PropTypes.array,
    saving: PropTypes.bool
};

export default BackgroundForm;