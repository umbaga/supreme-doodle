import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as equipmentActions from '../../../actions/admin/equipmentActions';
import EquipmentForm from './EquipmentForm';
import util from '../../../util/util';
import DndModal from '../../common/DndModal';

class EquipmentEntry extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editItem: Object.assign({}, util.objectModel.ITEM),
            editEquipment: Object.assign({}, util.objectModel.ASSIGNED_EQUIPMENT),
            equipment: this.props.equipment,
            isCreate: this.props.isCreate,
            canEdit: this.props.canEdit,
            saving: false
        };
        this.cancelEquipment = this.cancelEquipment.bind(this);
        this.deleteEquipment = this.deleteEquipment.bind(this);
        this.postAction = this.postAction.bind(this);
        this.saveEquipment = this.saveEquipment.bind(this);
        this.saveAndNewEquipment = this.saveAndNewEquipment.bind(this);
        this.saveAndBackEquipment = this.saveAndBackEquipment.bind(this);
        this.updateFormState = this.updateFormState.bind(this);
        this.updateItemFormState = this.updateItemFormState.bind(this);
        this.updateEquipmentFormState = this.updateEquipmentFormState.bind(this);
        this.clearInfoForCategory = this.clearInfoForCategory.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.equipment.id != nextProps.equipment.id) {
            this.setState({equipment: nextProps.equipment});
        }
        this.setState({saving: false});
    }

    cancelEquipment(event) {
        event.preventDefault();
        this.postAction();
    }

    deleteEquipment(event) {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.deleteEquipment(this.state.equipment);
            this.postAction();
        }
    }

    postAction() {
        this.props.closeModal();
    }

    saveEquipment(event) {
        event.preventDefault();
        const oldEquipment = this.state.equipment;
        let newEquipment = util.common.resetObject.equipment(this.props.selectedCategory, oldEquipment);
        this.setState({saving: true, equipment: newEquipment});
        this.props.actions.upsertEquipment(this.state.equipment);
    }

    saveAndNewEquipment(event) {
        this.saveEquipment(event);
        this.refs.form.refs.name.setFocus();
    }

    saveAndBackEquipment(event) {
        this.saveEquipment(event);
        this.postAction();
    }

    updateFormState(event) {
        let arrayItem = this.state.editItem;
        if (util.common.formState.functions.set.fieldFromTargetName(event) == 'assignedEquipment') {
            arrayItem = this.state.editEquipment;
        }
        let equipment = util.common.formState.standard(event, this.state.equipment, this.props.picklists, arrayItem);
        let newEditItem = Object.assign({}, util.common.resetObject.item(equipment.weapon.properties.length * -1));
        let newEditEquipment = Object.assign({}, util.common.resetObject.assignedEquipment());
        if (event.target.getAttribute('name') == 'category') {
            equipment = this.clearInfoForCategory(equipment);
        }
        if (util.common.formState.functions.set.fieldFromTargetName(event).split('assignedEquipment').length > 1) {
            let newCost = 0;
            let newWeight = 0;
            for (let q = 0; q < equipment.assignedEquipment.length; q++) {
                newCost = newCost + (equipment.assignedEquipment[q].cost * equipment.assignedEquipment[q].assigned);
                newWeight = newWeight + (equipment.assignedEquipment[q].weight * equipment.assignedEquipment[q].assigned);
            }
            equipment.cost = newCost;
            equipment.weight = newWeight;
        }
        return this.setState({equipment: equipment, editItem: newEditItem, editEquipment: newEditEquipment});
    }

    updateItemFormState(event) {
        let editItem = util.common.formState.standard(event, this.state.editItem, this.props.picklists);
        return this.setState({editItem: editItem});
    }
    
    updateEquipmentFormState(event) {
        let editEquipment = util.common.formState.standard(event, this.state.editEquipment, this.props.picklists);
        return this.setState({editEquipment: editEquipment});
    }
    
    clearInfoForCategory(equipment) {
        let retVal = equipment;
        if (equipment.category.id != util.itemtypes.TYPE.EQUIPMENT_CATEGORY.ARMOR) {
            retVal.armor = {};
            retVal.armor.armorClass = {};
            retVal.armor.armorClass.applyDexterity = true;
            retVal.armor.armorClass.base = 11;
            retVal.armor.armorClass.isCumulative = false;
            retVal.armor.armorClass.maximumDexterity = 0;
            retVal.armor.minimumStrength = 0;
            retVal.armor.stealthDisadvantage = false;
        }
        if (equipment.category.id != util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
            retVal.weapon = {};
            retVal.weapon.class = {id: 0};
            retVal.weapon.damage = {};
            retVal.weapon.damage.dice = {id: 0, rendered: ''};
            retVal.weapon.damage.type = {id: 0};
            retVal.weapon.damage.versatile = {};
            retVal.weapon.damage.versatile.dice = {id: 0, rendered: ''};
            retVal.weapon.properties = [];
            retVal.weapon.range = {};
            retVal.weapon.range.maximum = 0;
            retVal.weapon.range.normal = 0;
            retVal.weapon.special = '';
        }
        return retVal;
    }
    
    render() {
        let equipment = this.state.equipment;
        if (this.props.selectedCategory && this.props.selectedCategory.id && this.props.selectedCategory.id != 0) {
            equipment.category = this.props.selectedCategory;
        }
        return (
            <DndModal
                headingCaption="Equipment"
                closeModal={this.props.closeModal}
                isCreate={this.props.isCreate}
                canEdit={this.props.canEdit}
                openModal={this.props.openModal}
                showModal={this.props.showModal}
                onCancel={this.cancelEquipment}
                onDelete={this.deleteEquipment}
                onSave={this.saveAndBackEquipment}
                onSaveNew={this.saveAndNewEquipment}
                size="large">
                <EquipmentForm
                    ref="form"
                    equipment={equipment}
                    picklists={this.props.picklists}
                    onSave={this.saveAndBackEquipment}
                    onSaveNew={this.saveAndNewEquipment}
                    onChange={this.updateFormState}
                    onCancel={this.cancelEquipment}
                    onDelete={this.deleteEquipment}
                    isCreate={this.state.isCreate}
                    equipments={this.props.equipments}
                    saving={this.state.saving}
                    onChangeItem={this.updateItemFormState}
                    editItem={this.state.editItem}
                    editEquipment={this.state.editEquipment}
                    onChangeEquipment={this.updateEquipmentFormState}
                    />
            </DndModal>
        );
    }
}

EquipmentEntry.propTypes = {
    equipment: PropTypes.object,
    equipments: PropTypes.object,
    actions: PropTypes.object,
    canEdit: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    isCreate: PropTypes.bool,
    picklists: PropTypes.array,
    selectedCategory: PropTypes.object.isRequired
};

function getEquipmentById(equipments, id, selectedCategory) {
    if (id != 0) {
        let equipment = equipments.find(equipment => equipment.id == id);
        return Object.assign({}, equipment);
    } else {
        return Object.assign({}, util.common.resetObject.equipment(selectedCategory));
    }
}

function mapStateToProps(state, ownProps) {
    let equipment = util.common.resetObject.equipment(ownProps.selectedCategory);
    const equipmentId = ownProps.selectedId;
    let isCreate = true;
    if (ownProps.selecetdId != 0) {
        if (equipmentId && state.equipments.length > 0) {
            equipment = getEquipmentById(state.equipments, ownProps.selectedId, ownProps.selectedCategory);
            isCreate = false;
        }
    } else if (ownProps.selectedCategory && ownProps.selectedCategory.id && ownProps.selectedCategory.id != 0) {
        equipment = getEquipmentById(state.equipments, ownProps.selectedId, ownProps.selectedCategory);
    }
    return {equipment: equipment, isCreate: isCreate};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(equipmentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentEntry);