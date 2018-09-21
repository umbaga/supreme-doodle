import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../DndInput';
import DndList from '../DndList';
import DndFieldset from '../../form/DndFieldset';
import DndDataEntryButtonBar from '../../buttons/DndDataEntryButtonBar';
import util from '../../../../util/util';

class DndManageNaturalWeapons extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        const naturalWeapons = this.props.value;
        const naturalWeapon = this.props.editNaturalWeapon;
        const picklists = this.props.picklists;
        let startEntryCollapsed = false;
        //let startEntryCollapsed = {naturalWeapons.length != 0};
        let startListCollapsed = false;
        //let startListCollapsed = {naturalWeapons.length == 0};
        const naturalWeaponTypes = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.NATURAL_WEAPON_TYPE);
        const damageTypes = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.DAMAGE_TYPE);
        const abilityScores = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.ABILITY_SCORE, null, [util.itemtypes.TYPE.ABILITY_SCORE.SPELLCASTING]);
        return (
            <fragment>
                <DndFieldset
                    legend="New Natural Weapon"
                    collapsible
                    startCollapsed={startEntryCollapsed}
                    >
                    <div className="col-md-4">
                        <DndInput
                            name="type"
                            label="Type"
                            dataType={util.datatypes.PICKLIST}
                            value={naturalWeapon.type}
                            onChange={this.props.onChangeChild}
                            picklist={naturalWeaponTypes}
                            stackLabel
                            dataTask="natural-weapon"
                            />
                    </div>
                    <div className="col-md-4">
                        <DndInput
                            name="attack.abilityScore"
                            label="Attack Ability"
                            dataType={util.datatypes.PICKLIST}
                            value={naturalWeapon.attack.abilityScore}
                            onChange={this.props.onChangeChild}
                            picklist={abilityScores}
                            stackLabel
                            dataTask="natural-weapon"
                            />
                    </div>
                    <div className="col-md-4">
                        <DndInput
                            name="attack.count"
                            label="# of Attacks"
                            dataType={util.datatypes.NUMBER.INT}
                            value={naturalWeapon.attack.count}
                            onChange={this.props.onChangeChild}
                            stackLabel
                            dataTask="natural-weapon"
                            />
                    </div>
                    <div className="col-md-4">
                        <DndInput
                            name="damage.abilityScore"
                            label="Damage Ability"
                            dataType={util.datatypes.PICKLIST}
                            value={naturalWeapon.damage.abilityScore}
                            onChange={this.props.onChangeChild}
                            picklist={abilityScores}
                            stackLabel
                            dataTask="natural-weapon"
                            />
                    </div>
                    <div className="col-md-4">
                        <DndInput
                            name="damage"
                            label="Damage/Type"
                            dataType={util.datatypes.COMBO.DICE.PICKLIST}
                            value={naturalWeapon.damage}
                            onChange={this.props.onChangeChild}
                            picklist={damageTypes}
                            childName="damage.type"
                            childValue={naturalWeapon.damage.type}
                            stackLabel
                            dataTask="natural-weapon"
                            />
                    </div>
                    <DndDataEntryButtonBar
                        dataTask="natural-weapon"
                        name="naturalWeapons"
                        onSave={this.props.onChange}
                        onCancel={this.props.onChangeChild}
                        cancelAction={util.datatypes.ACTION.NATURAL_WEAPON.CANCEL}
                        saveAction={util.datatypes.ACTION.NATURAL_WEAPON.ADD}
                        saveDisabled={!util.validation.isReadyToSave.naturalWeapon(naturalWeapon)}
                        />
                </DndFieldset>
                <DndFieldset
                    legend="Exisitng Natural Weapons"
                    collapsible
                    startCollapsed={startListCollapsed}
                    >
                    <DndList
                        name="naturalWeapons"
                        value={naturalWeapons}
                        dataTask="natural-weapon"
                        dataType={util.datatypes.ACTION.NATURAL_WEAPON}
                        childName="title"
                        onChange={this.props.onChange}
                        onChangeChild={this.props.onChangeChild}
                        renderNameFunction={util.format.forDisplay.obj.naturalWeapon}
                        />
                </DndFieldset>
            </fragment>
        );
    }
}

DndManageNaturalWeapons.propTypes = {
    editNaturalWeapon: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeChild: PropTypes.func.isRequired,
    picklists: PropTypes.array.isRequired,
    value: PropTypes.array.isRequired
};

export default DndManageNaturalWeapons;