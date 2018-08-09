import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../../common/inputs/DndInput';
import DndUniversalInput from '../../common/inputs/DndUniversalInput';
import DndManageProficiencies from '../../common/inputs/manage/DndManageProficiencies';
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
        const equipments = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.EQUIPMENT);
        
        let assignedEquipment = background.equipment.assigned.filter(function(equipment) {
            return equipment.id > 0;
        }.bind(this));
        
        let assignedTrinkets = background.equipment.assigned.filter(function(equipment) {
            return equipment.id <= 0;
        }.bind(this));
        
        return (
            <div>
                <form>
                    <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
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
                        <Tab eventKey={2} title="Proficiencies">
                            <DndManageProficiencies
                                onChange={this.props.onChange}
                                value={background.proficiencies}
                                picklists={picklists}
                                onChangeChild={this.props.onChangeProficiency}
                                editProficiency={this.props.editProficiency}
                                editCategory={this.props.editProficiencyCategory}
                                editProficiencyList={this.props.editProficiencyList}
                                />
                        </Tab>
                        <Tab eventKey={3} title="Equipment">
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
                                    childValue={this.props.editEquipment.name}
                                    childName="name"
                                    buttonOnClick={this.props.onChange}
                                    onChangeChild={this.props.onChangeEquipment}
                                    buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                                    changeFocusRefName="equipment.assigned"
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
                                    onChangeChild={this.props.onChangeEquipment}
                                    renderNameFunction={util.format.forDisplay.obj.equipmentName}
                                    />
                            </div>
                        </Tab>
                        <Tab eventKey={4} title="Charts">
                            Charts
                        </Tab>
                    </Tabs>
                </form>
            </div>
        );
    }
}

BackgroundForm.propTypes = {
    editProficiency: PropTypes.object.isRequired,
    editProficiencyCategory: PropTypes.object.isRequired,
    editProficiencyList: PropTypes.object.isRequired,
    onChangeProficiency: PropTypes.func.isRequired,
    editEquipment: PropTypes.object.isRequired,
    background: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onSaveNew: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeEquipment: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isCreate: PropTypes.bool.isRequired,
    picklists: PropTypes.array,
    saving: PropTypes.bool
};

export default BackgroundForm;