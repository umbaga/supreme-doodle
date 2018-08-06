import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import util from '../../../util/util';
import DndListItemButtonBar from '../../common/buttons/DndListItemButtonBar';
import * as equipmentActions from '../../../actions/admin/equipmentActions';

class EquipmentItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedId: this.props.selectedId
        };
        this.editEquipment = this.editEquipment.bind(this);
        this.deleteEquipment = this.deleteEquipment.bind(this);
    }
    editEquipment() {
        event.preventDefault();
        this.props.openModal();
        this.props.changeSelectedId(this.props.equipment.id);
        this.props.onEdit();
        this.setState({selectedId: this.props.equipment.id});
    }
    deleteEquipment() {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.deleteEquipment(this.props.equipment);
        }
    }
    render() {
        let equipment = this.props.equipment;
        let costCell = (<td className="text-center">{util.format.forDisplay.number.coin(equipment.cost)}</td>);
        let weightCell = (<td className="text-center">{util.format.forDisplay.number.weight(equipment.weight)}</td>);
        let speedCell = null;
        let carryCapacityCell = null;
        let armorClassCell = null;
        let strengthCell = null;
        let stealthCell = null;
        let damageCell = null;
        let propertiesCell = null;
        if (this.props.selectedCategory.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.MOUNT) {
            weightCell = null;
            speedCell = (<td className="text-center">{util.format.forDisplay.number.speed(equipment.speed)}</td>);
        }
        if (this.props.selectedCategory.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WATER_VEHICLE) {
            weightCell = null;
            speedCell = (<td className="text-center">{util.format.forDisplay.number.vehicleSpeed(equipment.speed)}</td>);
        }
        if (this.props.selectedCategory.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.MOUNT) {
            carryCapacityCell = (<td className="text-center">{util.format.forDisplay.number.weight(equipment.carryCapacity)}</td>);
        }
        if (this.props.selectedCategory.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.ARMOR) {
            armorClassCell = (<td>{util.format.forDisplay.obj.armorClass(equipment.armor.armorClass)}</td>);
            strengthCell = (<td className="text-center">{util.format.forDisplay.number.abilityScoreMinimum(equipment.armor.minimumStrength, 'Str')}</td>);
            stealthCell = (<td className="text-center">{util.format.forDisplay.bool.hasDisadvantage(equipment.armor.stealthDisadvantage)}</td>);
        }
        if (this.props.selectedCategory.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
            damageCell = (<td className="text-center">{util.format.forDisplay.obj.damage(equipment.weapon.damage)}</td>);
            propertiesCell = (<td>{util.format.forDisplay.array.weaponProperties(equipment.weapon)}</td>);
        }
        return (
            <tr key={this.props.equipment.id}>
                <td width="50"></td>
                <td>{util.format.forDisplay.obj.equipmentName(equipment)}</td>
                {costCell}
                {armorClassCell}
                {strengthCell}
                {stealthCell}
                {damageCell}
                {weightCell}
                {propertiesCell}
                {speedCell}
                {carryCapacityCell}
                <td>
                    <DndListItemButtonBar
                        listItem={this.props.equipment}
                        onEdit={this.editEquipment}
                        onDelete={this.deleteEquipment} />
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {equipment: ownProps.equipment};
}

EquipmentItem.propTypes = {
    equipment: PropTypes.object.isRequired,
    actions: PropTypes.object,
    openModal: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    onEdit: PropTypes.func,
    selectedCategory: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(equipmentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentItem);