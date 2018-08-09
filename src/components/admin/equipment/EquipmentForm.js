import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../../common/inputs/DndInput';
import DndInputWrapper from '../../common/inputs/DndInputWrapper';
import DndUniversalInput from '../../common/inputs/DndUniversalInput';
import util from '../../../util/util';

class EquipmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.setFocus = this.setFocus.bind(this);
        this.renderAmmunitionInputs = this.renderAmmunitionInputs.bind(this);
        this.renderArmorInputs = this.renderArmorInputs.bind(this);
        this.renderAssignedEquipmentListInputs = this.renderAssignedEquipmentListInputs.bind(this);
        this.renderCarryCapacityInputs = this.renderCarryCapacityInputs.bind(this);
        this.renderDamageInputs = this.renderDamageInputs.bind(this);
        this.renderIsImprovisedWeaponInputs = this.renderIsImprovisedWeaponInputs.bind(this);
        this.renderIsMagicItemInputs = this.renderIsMagicItemInputs.bind(this);
        this.renderProficiencyInputs = this.renderProficiencyInputs.bind(this);
        this.renderRangeInputs = this.renderRangeInputs.bind(this);
        this.renderSpecialDescriptionInputs = this.renderSpecialDescriptionInputs.bind(this);
        this.renderSpeedInputs = this.renderSpeedInputs.bind(this);
        this.renderUnitInputs = this.renderUnitInputs.bind(this);
        this.renderVersatileDamage = this.renderVersatileDamage.bind(this);
        this.renderWeaponClassInputs = this.renderWeaponClassInputs.bind(this);
        this.renderWeaponPropertyInputs = this.renderWeaponPropertyInputs.bind(this);
        this.weaponHasAmmunitionProperty = this.weaponHasAmmunitionProperty.bind(this);
        this.weaponHasRangeProperty = this.weaponHasRangeProperty.bind(this);
        this.weaponHasSpecialProperty = this.weaponHasSpecialProperty.bind(this);
        this.weaponHasVersatileDamageProperty = this.weaponHasVersatileDamageProperty.bind(this);
        this.renderWeightInput = this.renderWeightInput.bind(this);
    }
    
    componentDidMount() {
        this.refs.name.setFocus();
    }
    
    setFocus() {
        this.refs.name.setFocus();
    }
    
    weaponHasAmmunitionProperty(equipment, properties) {
        for (let q = 0; q < properties.length; q++) {
            for (let w = 0; w < equipment.weapon.properties.length; w++) {
                if (properties[q].id == equipment.weapon.properties[w].id) {
                    if (properties[q].requireAmmunition) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    weaponHasRangeProperty(equipment, properties) {
        for (let q = 0; q < properties.length; q++) {
            for (let w = 0; w < equipment.weapon.properties.length; w++) {
                if (properties[q].id == equipment.weapon.properties[w].id) {
                    if (properties[q].requireRange) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    weaponHasVersatileDamageProperty(equipment, properties) {
        for (let q = 0; q < properties.length; q++) {
            for (let w = 0; w < equipment.weapon.properties.length; w++) {
                if (properties[q].id == equipment.weapon.properties[w].id) {
                    if (properties[q].requireVersatileDamage) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    weaponHasSpecialProperty(equipment, properties) {
        for (let q = 0; q < properties.length; q++) {
            for (let w = 0; w < equipment.weapon.properties.length; w++) {
                if (properties[q].id == equipment.weapon.properties[w].id) {
                    if (properties[q].requireSpecialDescription) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    renderAmmunitionInputs(equipment, ammunitionPicklist, properties) {
        let retVal = null;
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.AMMUNITION
           || equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON && this.weaponHasAmmunitionProperty(equipment, properties)) {
            retVal = (
                <div className="col-sm-12">
                    <DndInput
                        name="ammunition"
                        label="Ammunition Type"
                        dataType={util.datatypes.PICKLIST}
                        value={equipment.ammunition}
                        onChange={this.props.onChange}
                        picklist={ammunitionPicklist}
                        />
                </div>
            );
        }
        return retVal;
    }
    
    renderArmorInputs(equipment) {
        let retVal = null;
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.ARMOR
           || equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.BARDING) {
            let hasMaxDexInput = (equipment.armor.armorClass.applyDexterity) ? (
                <div className="col-sm-6">
                    <DndInput
                        name="armor.armorClass.hasMaximumDexterity"
                        label="Has Max Dex Mod"
                        dataType={util.datatypes.BOOL}
                        value={equipment.armor.armorClass.hasMaximumDexterity}
                        onChange={this.props.onChange}
                        />
                </div>
            ) : null;
            let maxDexInput = (equipment.armor.armorClass.hasMaximumDexterity) ? (
                <div className="col-sm-6">
                    <DndInput
                        name="armor.armorClass.maximumDexterity"
                        label="Max Dex Mod"
                        dataType={util.datatypes.NUMBER.INT}
                        value={equipment.armor.armorClass.maximumDexterity}
                        onChange={this.props.onChange}
                        />
                </div>
            ) : null;
            let minStrInput = (equipment.armor.hasMinimumStrength) ? (
                <div className="col-sm-6">
                    <DndInput
                        name="armor.minimumStrength"
                        label="Min Str"
                        dataType={util.datatypes.NUMBER.INT}
                        value={equipment.armor.minimumStrength}
                        onChange={this.props.onChange}
                        />
                </div>
            ) : null;
            retVal = (
                <fragment>
                    <div className="col-sm-6">
                        <DndInput
                            name="armor.armorClass.base"
                            label="Base AC"
                            dataType={util.datatypes.NUMBER.INT}
                            value={equipment.armor.armorClass.base}
                            onChange={this.props.onChange}
                            />
                    </div>
                    <div className="col-sm-6">
                        <DndInput
                            name="armor.stealthDisadvantage"
                            label="Stealth"
                            dataType={util.datatypes.BOOL}
                            value={equipment.armor.stealthDisadvantage}
                            onChange={this.props.onChange}
                            />
                    </div>
                    <div className="col-sm-6">
                        <DndInput
                            name="armor.armorClass.applyDexterity"
                            label="Apply Dex Mod"
                            dataType={util.datatypes.BOOL}
                            value={equipment.armor.armorClass.applyDexterity}
                            onChange={this.props.onChange}
                            />
                    </div>
                    {hasMaxDexInput}
                    {maxDexInput}
                    <div className="col-sm-6">
                        <DndInput
                            name="armor.hasMinimumStrength"
                            label="Has Min Str"
                            dataType={util.datatypes.BOOL}
                            value={equipment.armor.hasMinimumStrength}
                            onChange={this.props.onChange}
                            />
                    </div>
                    {minStrInput}
                    <div className="col-sm-6">
                        <DndInput
                            name="armor.armorClass.isCumulative"
                            label="Is Cumulative"
                            dataType={util.datatypes.BOOL}
                            value={equipment.armor.armorClass.isCumulative}
                            onChange={this.props.onChange}
                            />
                    </div>
                </fragment>
            );
        }
        return retVal;
    }
    
    renderAssignedEquipmentListInputs(equipment, equipments) {
        let retVal = null;
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.PACK) {
            retVal = (
                <div className="col-md-12">
                    <DndInput
                        name="assignedEquipment"
                        label="Assigned Equipment"
                        dataType={util.datatypes.ARRAY.LIST.ADD.WITH_VALUE.PICKLIST.INT}
                        value={equipment.assignedEquipment}
                        onChange={this.props.onChange}
                        buttonOnClick={this.props.onChange}
                        buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                        changeFocusRefName="assignedEquipment"
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
            );
        }
        return retVal;
    }
    
    renderCarryCapacityInputs(equipment) {
        let retVal = null;
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.MOUNT) {
            retVal = (
                <div className="col-sm-6">
                    <DndInput
                        name="carryCapacity"
                        label="Carry Capacity"
                        dataType={util.datatypes.NUMBER.INT}
                        value={equipment.carryCapacity}
                        onChange={this.props.onChange}
                        />
                </div>
            );
        }
        return retVal;
    }
    
    renderDamageInputs(equipment, damageTypes) {
        let retVal = null;
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON
           || equipment.isImprovisedWeapon) {
            retVal = (
                <div className="col-sm-12">
                    <DndInput
                        name="weapon.damage"
                        label="Damage/Type"
                        dataType={util.datatypes.COMBO.DICE.PICKLIST}
                        value={equipment.weapon.damage}
                        onChange={this.props.onChange}
                        picklist={damageTypes}
                        childName="weapon.damage.type"
                        childValue={equipment.weapon.damage.type}
                        />
                </div>
            );
        }
        return retVal;
    }
    
    renderIsImprovisedWeaponInputs(equipment) {
        let retVal = null;
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.GENERAL) {
            retVal = (
                <div className="col-sm-6">
                    <DndInput
                        name="isImprovisedWeapon"
                        label="Is Improvised Weapon"
                        dataType={util.datatypes.BOOL}
                        value={equipment.isImprovisedWeapon}
                        onChange={this.props.onChange}
                        />
                </div>
            );
        }
        return retVal;
    }
    
    renderIsMagicItemInputs(equipment) {
        let retVal = null;
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.GENERAL) {
            retVal = (
                <div className="col-sm-6">
                    <DndInput
                        name="isMagicItem"
                        label="Is Magic Item"
                        dataType={util.datatypes.BOOL}
                        value={equipment.isMagicItem}
                        onChange={this.props.onChange}
                        />
                </div>
            );
        }
        return retVal;
    }

    renderProficiencyInputs(equipment, proficiencies) {
        let retVal = null;
        let profs = proficiencies.filter(function(prof) {
            switch (equipment.category.id) {
                case util.itemtypes.TYPE.EQUIPMENT_CATEGORY.ARMOR:
                    return prof.category.id == util.itemtypes.TYPE.PROFICIENCY_CATEGORY.ARMOR;
                case util.itemtypes.TYPE.EQUIPMENT_CATEGORY.LAND_VEHICLE:
                case util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WATER_VEHICLE:
                    return prof.category.id == util.itemtypes.TYPE.PROFICIENCY_CATEGORY.VEHICLE;
                case util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON:
                    return prof.category.id == util.itemtypes.TYPE.PROFICIENCY_CATEGORY.WEAPON;
                default:
                    return true;
            }
        });
        let cols = (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) ? 'col-sm-6' : 'col-sm-12';
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.ARMOR
            || equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON
            || equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WATER_VEHICLE
            || equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.LAND_VEHICLE) {
            retVal = (
                <div className={cols}>
                    <DndInput
                        name="proficiency"
                        label="Proficiency"
                        dataType={util.datatypes.PICKLIST}
                        value={equipment.proficiency}
                        onChange={this.props.onChange}
                        picklist={profs}
                        />
                </div>
            );
        }
        return retVal;
    }
    
    renderRangeInputs(equipment, properties) {
        let retVal = null;
        if ((equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.GENERAL && equipment.isImprovisedWeapon)
           || (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON && this.weaponHasRangeProperty(equipment, properties))) {
            let maximumRange = (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON && this.weaponHasRangeProperty(equipment, properties)) ? (
                <div className="col-sm-6">
                    <DndInput
                        name="weapon.range.maximum"
                        label="Maximum"
                        dataType={util.datatypes.NUMBER.INT}
                        value={equipment.weapon.range.maximum}
                        onChange={this.props.onChange}
                        />
                </div>
            ) : null;
            let cols = 'col-sm-';
            cols += (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON && this.weaponHasRangeProperty(equipment, properties)) ? '6' : '12';
            return (
                <fragment>
                    <DndInputWrapper
                        label="Range"
                        >
                        <div className={cols}>
                            <DndInput
                                name="weapon.range.normal"
                                label="Normal"
                                dataType={util.datatypes.NUMBER.INT}
                                value={equipment.weapon.range.normal}
                                onChange={this.props.onChange}
                                />
                        </div>
                        {maximumRange}
                    </DndInputWrapper>
                </fragment>
            );
        }
        return retVal;
    }
    
    renderSpecialDescriptionInputs(equipment, properties) {
        let retVal = null;
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON
           && this.weaponHasSpecialProperty(equipment, properties)) {
            return (
                <fragment>
                    <DndInput
                        name="weapon.special"
                        label="Special"
                        dataType={util.datatypes.STRING.HTML.LONG}
                        value={equipment.weapon.special}
                        onChange={this.props.onChange}
                        longStringHeight={105}
                        />
                </fragment>
            );
        }
        return retVal;
    }
    
    renderSpeedInputs(equipment) {
        let retVal = null;
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.MOUNT
           || equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WATER_VEHICLE) {
            let speedLabel = (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.MOUNT) ? 'Speed (ft)' : 'Speed (mph)';
            return (
                <div className="col-sm-6">
                    <DndInput
                        name="speed"
                        label={speedLabel}
                        dataType={util.datatypes.NUMBER.INT}
                        value={equipment.speed}
                        onChange={this.props.onChange}
                        />
                </div>
            );
        }
        return retVal;
    }
    
    renderUnitInputs(equipment) {
        let retVal = null;
        let unitInput = null;
        let countInput = null;
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.GENERAL
           || equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.TACK_AND_HARNESS
           || equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.FOOD) {
            unitInput = (
                <div className="col-sm-6">
                    <DndInput
                        name="unit"
                        label="Unit"
                        dataType={util.datatypes.STRING.SHORT}
                        value={equipment.unit}
                        onChange={this.props.onChange}
                        />
                </div>
            );
        }
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.GENERAL
           || equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.AMMUNITION) {
            countInput = (
                <div className="col-sm-6">
                    <DndInput
                        name="count"
                        label="Count"
                        dataType={util.datatypes.NUMBER.INT}
                        value={equipment.count}
                        onChange={this.props.onChange}
                        />
                </div>
            );
        }
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.GENERAL
           || equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.TACK_AND_HARNESS
           || equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.AMMUNITION
           || equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.FOOD) {
            retVal = (
                <fragment>
                    {countInput}
                    {unitInput}
                </fragment>
            );
        }
        return retVal;
    }
    
    renderVersatileDamage(equipment, properties) {
        let retVal = null;
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON && this.weaponHasVersatileDamageProperty(equipment, properties)) {
            retVal = (
                <div className="col-sm-12">
                    <DndInput
                        name="weapon.damage.versatile.dice"
                        label="Versatile Damage"
                        dataType={util.datatypes.SPECIAL.DICE}
                        value={equipment.weapon.damage.versatile.dice}
                        onChange={this.props.onChange}
                        />
                </div>
            );
        }
        return retVal;
    }
    
    renderWeaponClassInputs(equipment, weaponClasses) {
        let retVal = null;
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
            retVal = (
                <div className="col-sm-6">
                    <DndInput
                        name="weapon.class"
                        label="Class"
                        dataType={util.datatypes.PICKLIST}
                        value={equipment.weapon.class}
                        onChange={this.props.onChange}
                        picklist={weaponClasses}
                        />
                </div>
            );
        }
        return retVal;
    }
    
    renderWeaponPropertyInputs(equipment, properties) {
        let retVal = null;
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
            retVal = (
                <div className="col-sm-12">
                    <DndInput
                        name="weapon.properties"
                        label="Properties"
                        dataType={util.datatypes.ARRAY.TAGS.ADD.PICKLIST}
                        value={equipment.weapon.properties}
                        onChange={this.props.onChange}
                        picklist={properties}
                        childValue={this.props.editItem}
                        childName="name"
                        buttonOnClick={this.props.onChange}
                        onChangeChild={this.props.onChangeItem}
                        buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                        changeFocusRefName="weapon.properties"
                        />
                </div>
            );
        }
        return retVal;
    }
    
    renderWeightInput(equipment) {
        let isReadOnly = false;
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.PACK) {
            isReadOnly = true;
        }
        let retVal = (
            <div className="col-sm-6">
                <DndInput
                    name="weight"
                    label="Weight"
                    dataType={util.datatypes.NUMBER.DEC}
                    value={equipment.weight}
                    onChange={this.props.onChange}
                    isReadOnly={isReadOnly}
                    />
            </div>
        );
        if (equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.MOUNT
           || equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WATER_VEHICLE
           || equipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.FOOD) {
            retVal = null;
        }
        return retVal;
    }
    
    render() {
        const equipment = this.props.equipment;
        const picklists = this.props.picklists;
        const ammunitionTypes = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.AMMUNITION_TYPE);
        const categories = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.EQUIPMENT_CATEGORY);
        const damageTypes = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.DAMAGE_TYPE);
        const proficiencies = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.PROFICIENCY);
        const weaponProperties = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.WEAPON_PROPERTY);
        const weaponClasses = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.WEAPON_CLASS);
        
        const assignedEquipment = util.common.picklists.getPicklistItems(picklists, [util.itemtypes.TYPE.ITEM.EQUIPMENT, util.itemtypes.TYPE.ITEM.EQUIPMENT_CATEGORY]);
        return (
            <div>
                <form>
                    <div className="modal-no-tabs">
                        <DndUniversalInput
                            ref="name"
                            referenceObject={equipment}
                            onChange={this.props.onChange}
                            picklists={picklists}
                            />
                        <div className="col-md-12">
                            <DndInput
                                name="category"
                                label="Category"
                                dataType={util.datatypes.PICKLIST}
                                value={equipment.category}
                                onChange={this.props.onChange}
                                picklist={categories}
                                />
                        </div>
                        {this.renderProficiencyInputs(equipment, proficiencies)}
                        {this.renderWeaponClassInputs(equipment, weaponClasses)}
                        <div className="col-sm-6">
                            <DndInput
                                name="cost"
                                label="Cost"
                                dataType={util.datatypes.NUMBER.DEC}
                                value={equipment.cost}
                                onChange={this.props.onChange}
                                />
                        </div>
                        {this.renderWeightInput(equipment)}
                        {this.renderUnitInputs(equipment)}
                        {this.renderArmorInputs(equipment)}
                        {this.renderIsMagicItemInputs(equipment)}
                        {this.renderIsImprovisedWeaponInputs(equipment)}
                        {this.renderDamageInputs(equipment, damageTypes)}
                        {this.renderSpeedInputs(equipment)}
                        {this.renderCarryCapacityInputs(equipment)}
                        {this.renderWeaponPropertyInputs(equipment, weaponProperties)}
                        {this.renderRangeInputs(equipment, weaponProperties)}
                        {this.renderAmmunitionInputs(equipment, ammunitionTypes, weaponProperties)}
                        {this.renderSpecialDescriptionInputs(equipment, weaponProperties)}
                        {this.renderVersatileDamage(equipment, weaponProperties)}
                        {this.renderAssignedEquipmentListInputs(equipment, assignedEquipment)}
                    </div>
                </form>
            </div>
        );
    }
}

EquipmentForm.propTypes = {
    editItem: PropTypes.object.isRequired,
    editEquipment: PropTypes.object.isRequired,
    equipment: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onSaveNew: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeItem: PropTypes.func.isRequired,
    onChangeEquipment: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isCreate: PropTypes.bool.isRequired,
    picklists: PropTypes.array,
    saving: PropTypes.bool
};

export default EquipmentForm;