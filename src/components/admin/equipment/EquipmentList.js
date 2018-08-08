import React from 'react';
import PropTypes from 'prop-types';
import EquipmentItem from './EquipmentItem';
import util from '../../../util/util';

class EquipmentList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.renderBody = this.renderBody.bind(this);
        this.renderArmorBody = this.renderArmorBody.bind(this);
        this.renderWeaponBody = this.renderWeaponBody.bind(this);
    }
    
    renderBody(equipments, selectedCategory) {
        if (selectedCategory.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.ARMOR) {
            return this.renderArmorBody(equipments);
        } else if (selectedCategory.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
            return this.renderWeaponBody(equipments);
        } else {
            return (
                <tbody>
                    {equipments.map(function(equipment, idx) {
                        return (
                            <EquipmentItem
                                key={idx}
                                equipment={equipment}
                                openModal={this.props.openModal}
                                selectedId={this.props.selectedId}
                                changeSelectedId={this.props.changeSelectedId}
                                onEdit={this.props.onEdit}
                                selectedCategory={this.props.selectedCategory}
                                />
                        );
                    }.bind(this))}
                </tbody>
            );
        }
    }
    
    renderArmorBody(equipments) {
        let tmpEquipments = equipments.sort(function(a, b) {
            if (a.armor.armorClass.base > b.armor.armorClass.base) {
                return 1;
            } else if (a.armor.armorClass.base < b.armor.armorClass.base) {
                return -1;
            } else {
                if (a.armor.stealthDisadvantage > b.armor.stealthDisadvantage) {
                    return -1;
                } else if (a.armor.stealthDisadvantage < b.armor.stealthDisadvantage) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
        return (
            <tbody>
                <tr><th colSpan="8">Light Armor</th></tr>
                {tmpEquipments.filter(function(equipment) {
                    return equipment.proficiency.id == util.itemtypes.TYPE.PROFICIENCY.ARMOR.LIGHT;
                }).map(function(equipment) {
                    return (
                        <EquipmentItem
                            key={equipment.id}
                            equipment={equipment}
                            openModal={this.props.openModal}
                            selectedId={this.props.selectedId}
                            changeSelectedId={this.props.changeSelectedId}
                            onEdit={this.props.onEdit}
                            selectedCategory={this.props.selectedCategory}
                            />
                    );
                }.bind(this))}
                <tr><th colSpan="8">Medium Armor</th></tr>
                {tmpEquipments.filter(function(equipment) {
                    return equipment.proficiency.id == util.itemtypes.TYPE.PROFICIENCY.ARMOR.MEDIUM;
                }).map(function(equipment) {
                    return (
                        <EquipmentItem
                            key={equipment.id}
                            equipment={equipment}
                            openModal={this.props.openModal}
                            selectedId={this.props.selectedId}
                            changeSelectedId={this.props.changeSelectedId}
                            onEdit={this.props.onEdit}
                            selectedCategory={this.props.selectedCategory}
                            />
                    );
                }.bind(this))}
                <tr><th colSpan="8">Heavy Armor</th></tr>
                {tmpEquipments.filter(function(equipment) {
                    return equipment.proficiency.id == util.itemtypes.TYPE.PROFICIENCY.ARMOR.HEAVY;
                }).map(function(equipment) {
                    return (
                        <EquipmentItem
                            key={equipment.id}
                            equipment={equipment}
                            openModal={this.props.openModal}
                            selectedId={this.props.selectedId}
                            changeSelectedId={this.props.changeSelectedId}
                            onEdit={this.props.onEdit}
                            selectedCategory={this.props.selectedCategory}
                            />
                    );
                }.bind(this))}
                <tr><th colSpan="8">Shields</th></tr>
                {tmpEquipments.filter(function(equipment) {
                    return equipment.proficiency.id == util.itemtypes.TYPE.PROFICIENCY.ARMOR.SHIELD;
                }).map(function(equipment) {
                    return (
                        <EquipmentItem
                            key={equipment.id}
                            equipment={equipment}
                            openModal={this.props.openModal}
                            selectedId={this.props.selectedId}
                            changeSelectedId={this.props.changeSelectedId}
                            onEdit={this.props.onEdit}
                            selectedCategory={this.props.selectedCategory}
                            />
                    );
                }.bind(this))}
            </tbody>
        );
    }
    
    renderWeaponBody(equipments) {
        let tmpEquipments = equipments;
        return (
            <tbody>
                <tr><th colSpan="7">Simple Melee Weapons</th></tr>
                {tmpEquipments.filter(function(equipment) {
                    return equipment.proficiency.id == util.itemtypes.TYPE.PROFICIENCY.WEAPON.SIMPLE && equipment.weapon.class.id == util.itemtypes.TYPE.WEAPON_CLASS.MELEE;
                }).map(function(equipment) {
                    return (
                        <EquipmentItem
                            key={equipment.id}
                            equipment={equipment}
                            openModal={this.props.openModal}
                            selectedId={this.props.selectedId}
                            changeSelectedId={this.props.changeSelectedId}
                            onEdit={this.props.onEdit}
                            selectedCategory={this.props.selectedCategory}
                            />
                    );
                }.bind(this))}
                <tr><th colSpan="7">Simple Ranged Weapons</th></tr>
                {tmpEquipments.filter(function(equipment) {
                    return equipment.proficiency.id == util.itemtypes.TYPE.PROFICIENCY.WEAPON.SIMPLE && equipment.weapon.class.id == util.itemtypes.TYPE.WEAPON_CLASS.RANGED;
                }).map(function(equipment) {
                    return (
                        <EquipmentItem
                            key={equipment.id}
                            equipment={equipment}
                            openModal={this.props.openModal}
                            selectedId={this.props.selectedId}
                            changeSelectedId={this.props.changeSelectedId}
                            onEdit={this.props.onEdit}
                            selectedCategory={this.props.selectedCategory}
                            />
                    );
                }.bind(this))}
                <tr><th colSpan="7">Martial Melee Weapons</th></tr>
                {tmpEquipments.filter(function(equipment) {
                    return equipment.proficiency.id == util.itemtypes.TYPE.PROFICIENCY.WEAPON.MARTIAL && equipment.weapon.class.id == util.itemtypes.TYPE.WEAPON_CLASS.MELEE;
                }).map(function(equipment) {
                    return (
                        <EquipmentItem
                            key={equipment.id}
                            equipment={equipment}
                            openModal={this.props.openModal}
                            selectedId={this.props.selectedId}
                            changeSelectedId={this.props.changeSelectedId}
                            onEdit={this.props.onEdit}
                            selectedCategory={this.props.selectedCategory}
                            />
                    );
                }.bind(this))}
                <tr><th colSpan="7">Martial Ranged Weapons</th></tr>
                {tmpEquipments.filter(function(equipment) {
                    return equipment.proficiency.id == util.itemtypes.TYPE.PROFICIENCY.WEAPON.MARTIAL && equipment.weapon.class.id == util.itemtypes.TYPE.WEAPON_CLASS.RANGED;
                }).map(function(equipment) {
                    return (
                        <EquipmentItem
                            key={equipment.id}
                            equipment={equipment}
                            openModal={this.props.openModal}
                            selectedId={this.props.selectedId}
                            changeSelectedId={this.props.changeSelectedId}
                            onEdit={this.props.onEdit}
                            selectedCategory={this.props.selectedCategory}
                            />
                    );
                }.bind(this))}
            </tbody>
        );
    }
    
    render() {
        const equipments = this.props.equipments;
        const selectedCategory = this.props.selectedCategory;
        return this.renderBody(equipments, selectedCategory);
    }
}

EquipmentList.propTypes = {
    equipments: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    onEdit: PropTypes.func,
    selectedCategory: PropTypes.object.isRequired,
    picklists: PropTypes.array.isRequired
};

export default EquipmentList;