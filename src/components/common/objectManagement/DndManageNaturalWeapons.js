import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInput from '../inputs/DndInput';
import DndDataEntryButtonBar from '../buttons/DndDataEntryButtonBar';
import DndNaturalWeaponRow from '../subcomponents/DndNaturalWeaponRow';

class DndManageNaturalWeapons extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderList = this.renderList.bind(this);
    }
    
    renderList(naturalWeapons) {
        if (naturalWeapons && naturalWeapons.length != 0) {
            return (
                <table>
                    <tbody>
                        {naturalWeapons.map(function(naturalWeapon, idx) {
                            return (
                                <DndNaturalWeaponRow
                                    key={idx}
                                    naturalWeapon={naturalWeapon}
                                    onRemoveNaturalWeapon={this.props.onChange}
                                    deleteButtonName="naturalWeapons"
                                    deleteButtonAction={util.datatypes.action.NATURAL_WEAPON.REMOVE}
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
    
    render() {
        const naturalWeapon = this.props.editNaturalWeapon;
        const types = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.NATURAL_WEAPON_TYPE);
        const damageTypes = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.DAMAGE_TYPE);
        const abilityScores = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ABILITY_SCORE);
        return (
            <div>
                <DndInput
                    label="Natural Weapon"
                    name="type"
                    value={naturalWeapon.type}
                    onChange={this.props.onChange}
                    dataType={util.datatypes.picklist.NATURAL_WEAPON_TYPE}
                    picklist={types}
                    />
                <div className="col-sm-6">
                    <DndInput
                        label="# of Attacks"
                        name="attack.count"
                        value={naturalWeapon.attack.count}
                        onChange={this.props.onChange}
                        dataType={util.datatypes.number.INT}
                        />
                </div>
                <div className="col-sm-6">
                    <DndInput
                        label="Attack modifier Ability Score"
                        name="attack.abilityScore"
                        dataType={util.datatypes.picklist.ABILITY_SCORE}
                        value={naturalWeapon.attack.abilityScore}
                        onChange={this.props.onChange}
                        picklist={abilityScores}
                        placeholder="None"
                        />
                </div>
                <div className="col-sm-6">
                    <DndInput
                        name="damage"
                        label="Damage and Type"
                        dataType={util.datatypes.combo.DAMAGE_AND_DAMAGE_TYPE}
                        value={naturalWeapon.damage}
                        onChange={this.props.onChange}
                        picklist={damageTypes}
                        />
                </div>
                <div className="col-sm-6">
                    <DndInput
                        label="Damage modifier Ability Score"
                        name="damage.abilityScore"
                        dataType={util.datatypes.picklist.ABILITY_SCORE}
                        value={naturalWeapon.damage.abilityScore}
                        onChange={this.props.onChange}
                        picklist={abilityScores}
                        placeholder="None"
                        />
                </div>
                <DndDataEntryButtonBar
                    onCancel={this.props.onChange}
                    onSave={this.props.onChange}
                    name="naturalWeapons"
                    saveAction={util.datatypes.action.NATURAL_WEAPON.ADD}
                    cancelAction={util.datatypes.action.NATURAL_WEAPON.RESET}
                    />
                {this.renderList(this.props.naturalWeapons)}
            </div>
        );
    }
}

DndManageNaturalWeapons.propTypes = {
    onChange: PropTypes.func.isRequired,
    picklists: PropTypes.array.isRequired,
    naturalWeapons: PropTypes.array.isRequired,
    editNaturalWeapon: PropTypes.object.isRequired
};

export default DndManageNaturalWeapons;