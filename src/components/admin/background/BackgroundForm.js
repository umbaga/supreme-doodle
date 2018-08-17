import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../../common/inputs/DndInput';
import DndUniversalInput from '../../common/inputs/DndUniversalInput';
import DndManageProficiencies from '../../common/inputs/manage/DndManageProficiencies';
import DndManageCharts from '../../common/inputs/manage/DndManageCharts';
import util from '../../../util/util';
import { Tabs, Tab } from 'react-bootstrap';

class BackgroundForm extends React.Component {
    constructor(props) {
        super(props);
        this.setFocus = this.setFocus.bind(this);
    }
    
    componentDidMount() {
        this.refs.name.setFocus();
    }
    
    setFocus() {
        this.refs.name.setFocus();
    }
    
    render() {
        const background = this.props.background;
        const picklists = this.props.picklists;
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
        return (
            <div>
                <form>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Description">
                            <DndUniversalInput
                                ref="name"
                                referenceObject={background}
                                onChange={this.props.onChange}
                                picklists={picklists}
                                />
                            <div className="col-md-12">
                                <DndInput
                                    name="suggestedCharacteristics"
                                    label="Suggested Characteristics"
                                    dataType={util.datatypes.STRING.HTML.LONG}
                                    value={background.suggestedCharacteristics}
                                    onChange={this.props.onChange}
                                    notCollapsible
                                    />
                            </div>
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
                            <DndManageProficiencies
                                onChange={this.props.onChange}
                                value={background.proficiencies}
                                picklists={picklists}
                                onChangeChild={this.props.onChangeChild}
                                editProficiency={this.props.editProficiency}
                                editCategory={this.props.editProficiencyCategory}
                                editProficiencyList={this.props.editProficiencyList}
                                />
                        </Tab>
                        <Tab eventKey={4} title="Equipment">
                            <div className="col-md-12">
                                <DndInput
                                    name="equipment.startingGold"
                                    label="Starting Gold"
                                    dataType={util.datatypes.NUMBER.DEC}
                                    value={background.equipment.startingGold}
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
                        </Tab>
                        <Tab eventKey={5} title="Charts">
                            <DndManageCharts
                                onChange={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                picklists={picklists}
                                value={background.charts}
                                editChart={this.props.editChart}
                                />
                        </Tab>
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