import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInput from '../inputs/DndInput';
import DndInputWrapper from '../inputs/DndInputWrapper';
import DndDataEntryButtonBar from '../buttons/DndDataEntryButtonBar';
import DndBreathWeaponRow from '../subcomponents/DndBreathWeaponRow';
import DndButton from '../buttons/DndButton';
import DndListRow from '../subcomponents/DndListRow';

class DndManageBreathWeapons extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderList = this.renderList.bind(this);
        this.renderChargesImprovementList = this.renderChargesImprovementList.bind(this);
        this.renderDamageImprovementList = this.renderDamageImprovementList.bind(this);
    }
    
    renderList(breathWeapons) {
        if (breathWeapons && breathWeapons.length != 0) {
            return (
                <table>
                    <tbody>
                        {breathWeapons.map(function(breathWeapon, idx) {
                            return (
                                <DndBreathWeaponRow
                                    key={idx}
                                    breathWeapon={breathWeapon}
                                    onRemoveBreathWeapon={this.props.onChange}
                                    deleteButtonName="breathWeapons"
                                    deleteButtonAction={util.datatypes.action.BREATH_WEAPON.REMOVE}
                                    index={idx}
                                    />
                            );
                        }.bind(this))}
                    </tbody>
                </table>
            );
        }
        return null;
    }
    
    renderChargesImprovementList(breathWeapon){
        if (breathWeapon && breathWeapon.charges && breathWeapon.charges.improvement && breathWeapon.charges.improvement.length != 0) {
            return (
                <table>
                    <tbody>
                        {breathWeapon.charges.improvement.map(function(improvement, idx) {
                            return (
                                <DndListRow
                                    key={idx}
                                    index={idx}
                                    item={improvement}
                                    onRemoveItem={this.props.onChangeImprovement}
                                    displayValue={util.format.forDisplay.obj.breathWeaponImprovement.Charges(improvement)}
                                    deleteButtonName="charges.improvement"
                                    deleteButtonAction={util.datatypes.action.BREATH_WEAPON.IMPROVEMENT.CHARGES.REMOVE}
                                    />
                            );
                        }.bind(this))}
                    </tbody>
                </table>
            );
        }
        return null;
    }
    
    renderDamageImprovementList(breathWeapon) {
        if (breathWeapon && breathWeapon.damage && breathWeapon.damage.improvement && breathWeapon.damage.improvement.length != 0) {
            return (
                <table>
                    <tbody>
                        {breathWeapon.damage.improvement.map(function(improvement, idx) {
                            return (
                                <tr key={idx}>
                                    <td>{util.format.forDisplay.obj.breathWeaponImprovement.Damage(improvement)}</td>
                                    <td></td>
                                </tr>
                            );
                        }.bind(this))}
                    </tbody>
                </table>
            );
        }
        return null;
    }
    
    render() {
        const breathWeapon = this.props.editBreathWeapon;
        const breathWeaponImprovement = this.props.editBreathWeaponImprovement;
        const damageTypes = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.DAMAGE_TYPE);
        const areaOfEffectShapes = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.AREA_OF_EFFECT_SHAPE);
        const rechargeTypes = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.RECHARGE_TYPE);
        const abilityScores = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ABILITY_SCORE);
        const savingThrowEffects = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.SAVE_EFFECT);
        return (
            <div>
                <DndInput
                    name="damage"
                    label="Damage and Type"
                    dataType={util.datatypes.combo.DAMAGE_AND_DAMAGE_TYPE}
                    value={breathWeapon.damage}
                    onChange={this.props.onChange}
                    picklist={damageTypes}
                    />
                <div className="col-sm-4">
                    <DndInput
                        name="range"
                        label="Range"
                        dataType={util.datatypes.number.INT}
                        value={breathWeapon.range}
                        onChange={this.props.onChange}
                        numberStepVal={5}
                        />
                    <DndInput
                        name="charges.count"
                        label="Charges"
                        dataType={util.datatypes.number.INT}
                        value={breathWeapon.charges.count}
                        onChange={this.props.onChange}
                        />
                </div>
                <div className="col-sm-8">
                    <DndInput
                        name="areaOfEffect.shape"
                        label="Area of Effect Shape"
                        dataType={util.datatypes.picklist.AREA_OF_EFFECT_SHAPE}
                        value={breathWeapon.areaOfEffect}
                        onChange={this.props.onChange}
                        picklist={areaOfEffectShapes}
                        />
                    <DndInput
                        name="charges.rechargeType"
                        label="Recharge Type"
                        dataType={util.datatypes.picklist.RECHARGE_TYPE}
                        value={breathWeapon.charges.rechargeType}
                        onChange={this.props.onChange}
                        picklist={rechargeTypes}
                        />
                </div>
                <div className="col-sm-12">
                    <DndInputWrapper
                        label="Saving Throw"
                        stackLabel>
                        <div>
                            <div className="col-sm-6">
                                <DndInput
                                    name="savingThrow.abilityScore"
                                    label="Abilty Score"
                                    dataType={util.datatypes.picklist.ABILITY_SCORE}
                                    value={breathWeapon.savingThrow.abilityScore}
                                    onChange={this.props.onChange}
                                    picklist={abilityScores}
                                    />
                            </div>
                            <div className="col-sm-6">
                                <DndInput
                                    name="savingThrow.effect"
                                    label="Effect"
                                    dataType={util.datatypes.picklist.SAVE_EFFECT}
                                    value={breathWeapon.savingThrow.effect}
                                    onChange={this.props.onChange}
                                    picklist={savingThrowEffects}
                                    />
                            </div>
                        </div>
                    </DndInputWrapper>
                </div>
                <div className="col-sm-12">
                    <DndInputWrapper
                        label="Saving Throw DC"
                        stackLabel
                        >
                        <div>
                            <div className="col-sm-2">
                                <DndInput
                                    name="savingThrow.dc.base"
                                    label="Base"
                                    dataType={util.datatypes.number.INT}
                                    value={breathWeapon.savingThrow.dc.base}
                                    onChange={this.props.onChange}
                                    />
                            </div>
                            <div className="col-sm-4">
                                <DndInput
                                    name="savingThrow.dc.applyProficiencyBonus"
                                    label="Apply Proficiency Bonus"
                                    dataType={util.datatypes.bool.BOOL}
                                    value={breathWeapon.savingThrow.dc.applyProficiencyBonus}
                                    onChange={this.props.onChange}
                                    />
                            </div>
                            <div className="col-sm-6">
                                <DndInput
                                    name="savingThrow.dc.abilityScore"
                                    label="Ability Score"
                                    dataType={util.datatypes.picklist.ABILITY_SCORE}
                                    value={breathWeapon.savingThrow.dc.abilityScore}
                                    onChange={this.props.onChange}
                                    picklist={abilityScores}
                                    />
                            </div>
                        </div>
                    </DndInputWrapper>
                </div>
                <div className="col-sm-12">
                    <DndInputWrapper
                        label="Level-Based Improvement"
                        stackLabel>
                        <div>
                            <div className="col-sm-6">
                                <DndInputWrapper
                                    label="Charges"
                                    stackLabel>
                                    <div>
                                        <div className="col-sm-5">
                                            <DndInput
                                                name="characterLevel"
                                                label="Character Level"
                                                dataType={util.datatypes.number.CHARACTER_LEVEL}
                                                value={breathWeaponImprovement.characterLevel}
                                                onChange={this.props.onChangeImprovement}
                                                stackLabel
                                                />
                                        </div>
                                        <div className="col-sm-5">
                                            <DndInput
                                                name="count"
                                                label="Charges Gained"
                                                dataType={util.datatypes.number.INT}
                                                value={breathWeaponImprovement.count}
                                                onChange={this.props.onChangeImprovement}
                                                stackLabel
                                                />
                                        </div>
                                        <div className="col-sm-2">
                                            <DndButton
                                                buttonType="additem"
                                                onClick={this.props.onChangeImprovement}
                                                dataType={util.datatypes.action.BREATH_WEAPON.IMPROVEMENT.CHARGES.ADD}
                                                name="charges.improvement"
                                                />
                                        </div>
                                        <div className="col-sm-12">
                                            {this.renderChargesImprovementList(breathWeapon)}
                                        </div>
                                    </div>
                                </DndInputWrapper>
                            </div>
                            <div className="col-sm-6">
                                <DndInputWrapper
                                    label="Damage"
                                    stackLabel>
                                    <div>
                                        <div className="col-sm-5">
                                            <DndInput
                                                name="characterLevel"
                                                label="Character Level"
                                                dataType={util.datatypes.number.CHARACTER_LEVEL}
                                                value={breathWeaponImprovement.characterLevel}
                                                onChange={this.props.onChangeImprovement}
                                                stackLabel
                                                />
                                        </div>
                                        <div className="col-sm-5">
                                            <DndInput
                                                name="dice"
                                                label="Damage Gained"
                                                dataType={util.datatypes.special.DICE_ROLL}
                                                value={breathWeaponImprovement.dice}
                                                onChange={this.props.onChangeImprovement}
                                                stackLabel
                                                />
                                        </div>
                                        <div className="col-sm-2">
                                            <DndButton
                                                buttonType="additem"
                                                onClick={this.props.onChangeImprovement}
                                                dataType={util.datatypes.action.BREATH_WEAPON.IMPROVEMENT.DAMAGE.ADD}
                                                name="damage.improvement"
                                                />
                                        </div>
                                        <div className="col-sm-12">
                                            {this.renderDamageImprovementList(breathWeapon)}
                                        </div>
                                    </div>
                                </DndInputWrapper>
                            </div>
                        </div>
                    </DndInputWrapper>
                    <DndDataEntryButtonBar
                        onCancel={this.props.onChange}
                        onSave={this.props.onChange}
                        name="breathWeapons"
                        saveAction={util.datatypes.action.BREATH_WEAPON.ADD}
                        cancelAction={util.datatypes.action.BREATH_WEAPON.RESET}
                        />
                </div>
                {this.renderList(this.props.breathWeapons)}
            </div>
        );
    }
}

DndManageBreathWeapons.propTypes = {
    onChange: PropTypes.func.isRequired,
    picklists: PropTypes.array.isRequired,
    breathWeapons: PropTypes.array.isRequired,
    editBreathWeapon: PropTypes.object.isRequired,
    editBreathWeaponImprovement: PropTypes.object.isRequired,
    showAdvancement: PropTypes.bool,
    onChangeImprovement: PropTypes.func.isRequired
};

export default DndManageBreathWeapons;