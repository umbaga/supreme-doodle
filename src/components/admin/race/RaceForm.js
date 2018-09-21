import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../../common/inputs/DndInput';
import DndNestedCheckbox from '../../common/inputs/DndNestedCheckbox';
import DndUniversalInput from '../../common/inputs/DndUniversalInput';
import DndManageProficiencies from '../../common/inputs/manage/DndManageProficiencies';
import DndManageCharts from '../../common/inputs/manage/DndManageCharts';
import DndManageMechanics from '../../common/inputs/manage/DndManageMechanics';
import DndManageNaturalWeapons from '../../common/inputs/manage/DndManageNaturalWeapons';
import DndManageSpellcastingGroups from '../../common/inputs/manage/DndManageSpellcastingGroups';
import DndManageSupplementalDescriptions from '../../common/inputs/manage/DndManageSupplementalDescriptions';
import util from '../../../util/util';
import { Tabs, Tab } from 'react-bootstrap';

class RaceForm extends React.Component {
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
        const race = this.props.race;
        const races = this.props.races;
        const picklists = this.props.picklists;
        const abilityScores = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.ABILITY_SCORE, null, [util.itemtypes.TYPE.ABILITY_SCORE.SPELLCASTING]);
        const monsterTags = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.MONSTER_TAG);
        const monsterTypes = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.MONSTER_TYPE);
        const movementTypes = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.MOVEMENT_TYPE);
        const senses = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.ADVANCED_SENSE);
        const sizes = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.SIZE);
        const tabPaneStyle = 'tab-pane-double-row-of-tabs';
        return (
            <div>
                <form>
                    <Tabs defaultActiveKey={9} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="General" className={tabPaneStyle}>
                            <DndUniversalInput
                                ref="name"
                                referenceObject={race}
                                onChange={this.props.onChange}
                                picklists={picklists}
                                hideDescription
                                />
                            <div className="col-md-12">
                                <DndNestedCheckbox
                                    value={race.isVariant}
                                    label="Parent Race"
                                    onChange={this.props.onChange}
                                    name="isVariant"
                                    >
                                    <DndInput
                                        name="parent"
                                        hideLabel
                                        dataType={util.datatypes.PICKLIST}
                                        value={race.parent}
                                        onChange={this.props.onChange}
                                        picklist={races}
                                        />
                                </DndNestedCheckbox>
                            </div>
                            <div className="col-md-4">
                                <DndInput
                                    name="size"
                                    label="Size"
                                    dataType={util.datatypes.PICKLIST}
                                    value={race.size}
                                    onChange={this.props.onChange}
                                    picklist={sizes}
                                    />
                            </div>
                            <div className="col-md-4">
                                <DndInput
                                    name="monsterType"
                                    label="Type"
                                    dataType={util.datatypes.PICKLIST}
                                    value={race.monsterType}
                                    onChange={this.props.onChange}
                                    picklist={monsterTypes}
                                    />
                            </div>
                            <div className="col-md-4">
                                <DndInput
                                    name="monsterTags"
                                    label="Tags"
                                    dataType={util.datatypes.ARRAY.TAGS.ADD.PICKLIST}
                                    value={race.monsterTags}
                                    onChange={this.props.onChange}
                                    picklist={monsterTags}
                                    childValue={this.props.editMonsterTag}
                                    childName="name"
                                    buttonOnClick={this.props.onChange}
                                    onChangeChild={this.props.onChangeChild}
                                    buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                                    changeFocusRefName="race.monsterTags"
                                    dataTask="monster-tag"
                                    />
                            </div>
                            <div className="col-md-3">
                                <DndInput
                                    name="abilityScores.strength"
                                    label="Strength"
                                    dataType={util.datatypes.NUMBER.INT_ALLOW_NEGATIVE}
                                    value={race.abilityScores.strength}
                                    onChange={this.props.onChange}
                                    labelCols={6}
                                    />
                            </div>
                            <div className="col-md-3">
                                <DndInput
                                    name="abilityScores.dexterity"
                                    label="Dexterity"
                                    dataType={util.datatypes.NUMBER.INT_ALLOW_NEGATIVE}
                                    value={race.abilityScores.dexterity}
                                    onChange={this.props.onChange}
                                    labelCols={6}
                                    />
                            </div>
                            <div className="col-md-3">
                                <DndInput
                                    name="abilityScores.constitution"
                                    label="Constitution"
                                    dataType={util.datatypes.NUMBER.INT_ALLOW_NEGATIVE}
                                    value={race.abilityScores.constitution}
                                    onChange={this.props.onChange}
                                    labelCols={6}
                                    />
                            </div>
                            <div className="col-md-3">
                                <DndInput
                                    name="abilityScores.selectCount"
                                    label="Select Count"
                                    dataType={util.datatypes.NUMBER.INT}
                                    value={race.abilityScores.selectCount}
                                    onChange={this.props.onChange}
                                    labelCols={6}
                                    />
                            </div>
                            <div className="col-md-3">
                                <DndInput
                                    name="abilityScores.intelligence"
                                    label="Intelligence"
                                    dataType={util.datatypes.NUMBER.INT_ALLOW_NEGATIVE}
                                    value={race.abilityScores.intelligence}
                                    onChange={this.props.onChange}
                                    labelCols={6}
                                    />
                            </div>
                            <div className="col-md-3">
                                <DndInput
                                    name="abilityScores.wisdom"
                                    label="Wisdom"
                                    dataType={util.datatypes.NUMBER.INT_ALLOW_NEGATIVE}
                                    value={race.abilityScores.wisdom}
                                    onChange={this.props.onChange}
                                    labelCols={6}
                                    />
                            </div>
                            <div className="col-md-3">
                                <DndInput
                                    name="abilityScores.charisma"
                                    label="Charisma"
                                    dataType={util.datatypes.NUMBER.INT_ALLOW_NEGATIVE}
                                    value={race.abilityScores.charisma}
                                    onChange={this.props.onChange}
                                    labelCols={6}
                                    />
                            </div>
                            <div className="col-md-3">
                                <DndInput
                                    name="abilityScores.selectValue"
                                    label="Select Value"
                                    dataType={util.datatypes.NUMBER.INT_ALLOW_NEGATIVE}
                                    value={race.abilityScores.selectValue}
                                    onChange={this.props.onChange}
                                    labelCols={6}
                                    />
                            </div>
                            <div className="col-md-3">
                                <DndInput
                                    name="vitals.height.base"
                                    label="Height (inches)"
                                    dataType={util.datatypes.NUMBER.INT}
                                    value={race.vitals.height.base}
                                    onChange={this.props.onChange}
                                    labelCols={6}
                                    />
                            </div>
                            <div className="col-md-3">
                                <DndInput
                                    name="vitals.height.dice"
                                    label="Height Mod"
                                    dataType={util.datatypes.SPECIAL.DICE}
                                    value={race.vitals.height.dice}
                                    onChange={this.props.onChange}
                                    labelCols={6}
                                    />
                            </div>
                            <div className="col-md-3">
                                <DndInput
                                    name="vitals.weight.base"
                                    label="Weight"
                                    dataType={util.datatypes.NUMBER.INT}
                                    value={race.vitals.weight.base}
                                    onChange={this.props.onChange}
                                    labelCols={6}
                                    />
                            </div>
                            <div className="col-md-3">
                                <DndInput
                                    name="vitals.weight.dice"
                                    label="Weight Mod"
                                    dataType={util.datatypes.SPECIAL.DICE}
                                    value={race.vitals.weight.dice}
                                    onChange={this.props.onChange}
                                    labelCols={6}
                                    />
                            </div>
                        </Tab>
                        <Tab eventKey={2} title="Movement/Senses" className={tabPaneStyle}>
                            <div className="col-md-6">
                                <DndInput
                                    name="movement"
                                    label="Movement"
                                    dataType={util.datatypes.ARRAY.LIST.ADD.WITH_VALUE.PICKLIST.INT}
                                    value={race.movement}
                                    onChange={this.props.onChange}
                                    buttonOnClick={this.props.onChange}
                                    buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                                    changeFocusRefName="movement"
                                    picklist={movementTypes}
                                    childName="name"
                                    childValue={this.props.editMovement}
                                    childAuxiliaryNames={['value']}
                                    childAuxiliaryNumberStepVal={[5]}
                                    childAuxiliaryDatatypes={[util.datatypes.NUMBER.INT]}
                                    childAuxiliaryValues={[this.props.editMovement.value]}
                                    onChangeChild={this.props.onChangeChild}
                                    dataTask="movement"
                                    stackLabel
                                    />
                            </div>
                            <div className="col-md-6">
                                <DndInput
                                    name="senses"
                                    label="Senses"
                                    dataType={util.datatypes.ARRAY.LIST.ADD.WITH_VALUE.PICKLIST.INT}
                                    value={race.senses}
                                    onChange={this.props.onChange}
                                    buttonOnClick={this.props.onChange}
                                    buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                                    changeFocusRefName="senses"
                                    picklist={senses}
                                    childName="name"
                                    childValue={this.props.editSense}
                                    childAuxiliaryNames={['value']}
                                    childAuxiliaryNumberStepVal={[5]}
                                    childAuxiliaryDatatypes={[util.datatypes.NUMBER.INT]}
                                    childAuxiliaryValues={[this.props.editSense.value]}
                                    onChangeChild={this.props.onChangeChild}
                                    dataTask="sense"
                                    stackLabel
                                    />
                            </div>
                        </Tab>
                        <Tab eventKey={3} title="Proficiencies" className={tabPaneStyle}>
                            <DndManageProficiencies
                                onChange={this.props.onChange}
                                value={this.props.race.proficiencies}
                                picklists={this.props.picklists}
                                onChangeChild={this.props.onChangeChild}
                                editProficiency={this.props.editProficiency}
                                editCategory={this.props.editProficiencyCategory}
                                editProficiencyList={this.props.editProficiencyList}
                                />
                        </Tab>
                        <Tab eventKey={4} title="Mechanics" className={tabPaneStyle}>
                            <DndManageMechanics
                                onChange={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                picklists={this.props.picklists}
                                value={race.mechanics}
                                editMechanic={this.props.editMechanic}
                                />
                        </Tab>
                        <Tab eventKey={5} title="Spellcasting" className={tabPaneStyle}>
                            <div className="col-md-12">
                                <DndInput
                                    name="spellcasting.abilityScore"
                                    label="Spellcasting Ability"
                                    dataType={util.datatypes.PICKLIST}
                                    value={race.spellcasting.abilityScore}
                                    onChange={this.props.onChange}
                                    picklist={abilityScores}
                                    />
                            </div>
                            <div className="col-md-12">
                                <DndManageSpellcastingGroups
                                    editSpellcastingGroup={this.props.editSpellcastingGroup}
                                    onChange={this.props.onChange}
                                    onChangeChild={this.props.onChangeChild}
                                    picklists={picklists}
                                    value={race.spellcasting.groups}
                                    />
                            </div>
                        </Tab>
                        <Tab eventKey={6} title="Charts" className={tabPaneStyle}>
                            <DndManageCharts
                                onChange={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                picklists={this.props.picklists}
                                value={race.charts}
                                editChart={this.props.editChart}
                                />
                        </Tab>
                        <Tab eventKey={7} title="Descriptions" className={tabPaneStyle}>
                            <DndManageSupplementalDescriptions
                                editSupplementalDescription={this.props.editSupplementalDescription}
                                onChange={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                value={race.supplementalDescriptions}
                                />
                        </Tab>
                        <Tab eventKey={8} title="Natural Weapons" className={tabPaneStyle}>
                            <DndManageNaturalWeapons
                                editNaturalWeapon={this.props.editNaturalWeapon}
                                onChange={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                value={race.naturalWeapons}
                                picklists={picklists}
                                />
                        </Tab>
                        <Tab eventKey={9} title="Breath Weapons" className={tabPaneStyle}>
                            BREATH_WEAPONS
                        </Tab>
                    </Tabs>
                </form>
            </div>
        );
    }
}

RaceForm.propTypes = {
    editChart: PropTypes.object.isRequired,
    editMechanic: PropTypes.object.isRequired,
    editMonsterTag: PropTypes.object.isRequired,
    editMovement: PropTypes.object.isRequired,
    editNaturalWeapon: PropTypes.object.isRequired,
    editProficiency: PropTypes.object.isRequired,
    editProficiencyCategory: PropTypes.object.isRequired,
    editProficiencyList: PropTypes.object.isRequired,
    editSense: PropTypes.object.isRequired,
    editSpellcastingGroup: PropTypes.object.isRequired,
    editSupplementalDescription: PropTypes.object.isRequired,
    race: PropTypes.object.isRequired,
    races: PropTypes.array,
    onSave: PropTypes.func.isRequired,
    onSaveNew: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeChild: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isCreate: PropTypes.bool.isRequired,
    picklists: PropTypes.array,
    saving: PropTypes.bool
};

export default RaceForm;