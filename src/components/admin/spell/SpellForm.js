import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../../common/inputs/DndInput';
import DndInputWrapper from '../../common/inputs/DndInputWrapper';
import DndList from '../../common/inputs/DndList';
import DndCheckboxList from '../../common/inputs/DndCheckboxList';
import DndUniversalInput from '../../common/inputs/DndUniversalInput';
import DndManageCharts from '../../common/inputs/manage/DndManageCharts';
import DndManageMechanics from '../../common/inputs/manage/DndManageMechanics';
import DndManageSupplementalDescriptions from '../../common/inputs/manage/DndManageSupplementalDescriptions';
import DndNestedCheckbox from '../../common/inputs/DndNestedCheckbox';
import util from '../../../util/util';
import { Tabs, Tab } from 'react-bootstrap';

class SpellForm extends React.Component {
    constructor(props) {
        super(props);
        this.setFocus = this.setFocus.bind(this);
        this.renderReactionTextInput = this.renderReactionTextInput.bind(this);
        this.renderMaterialComponentInput = this.renderMaterialComponentInput.bind(this);
        this.renderAreaOfEffectInput = this.renderAreaOfEffectInput.bind(this);
        this.renderConcentrationInput = this.renderConcentrationInput.bind(this);
        this.renderListInputs = this.renderListInputs.bind(this);
        this.renderDamageAdvancementInputs = this.renderDamageAdvancementInputs.bind(this);
        this.renderProjectileAdvancementInputs = this.renderProjectileAdvancementInputs.bind(this);
    }
    
    componentDidMount() {
        this.refs.name.setFocus();
    }
    
    setFocus() {
        this.refs.name.setFocus();
    }
    
    renderReactionTextInput() {
        if (this.props.spell.castingTime.unit.id == util.itemtypes.TYPE.SPELL_CASTING_TIME.REACTION) {
            return (
                <div className="col-md-6">
                    <DndInput
                        name="castingTime.text"
                        label="Reaction Text"
                        dataType={util.datatypes.STRING.SHORT}
                        value={this.props.spell.castingTime.text}
                        onChange={this.props.onChange}
                        />
                </div>
            );
        } else {
            return null;
        }
    }
    
    renderAreaOfEffectInput(areaOfEffectShapes) {
        if (this.props.spell.range.unit.id == util.itemtypes.TYPE.SPELL_RANGE.SELF) {
            return (
                <div className="col-md-6">
                    <DndInput
                        name="range.areaOfEffect.value"
                        label="Area of Effect"
                        dataType={util.datatypes.COMBO.NUMBER.INT.TWO_PICKLISTS}
                        value={this.props.spell.range.areaOfEffect.value}
                        onChange={this.props.onChange}
                        picklist={areaOfEffectShapes}
                        childName="range.areaOfEffect.shape"
                        childValue={this.props.spell.range.areaOfEffect.shape}
                        childAuxiliaryNames={['range.areaOfEffect.unit']}
                        childAuxiliaryValues={[this.props.spell.range.areaOfEffect.unit]}
                        />
                </div>
            );
        } else {
            return null;
        }
    }
    
    renderMaterialComponentInput() {
        let hasMaterialComponent = false;
        for (let q = 0; q < this.props.spell.components.length; q++) {
            if (this.props.spell.components[q].requireFlavorText) {
                hasMaterialComponent = true;
            }
        }
        if (this.props.spell.materialComponentText && this.props.spell.materialComponentText.length != 0) {
            hasMaterialComponent = true;
        }
        if (hasMaterialComponent) {
            return (
                <DndInput
                    name="materialComponentText"
                    hideLabel
                    dataType={util.datatypes.STRING.SHORT}
                    value={this.props.spell.materialComponentText}
                    onChange={this.props.onChange}
                    />
            );
        } else {
            return null;
        }
    }
    
    renderConcentrationInput(concentrationDurations) {
        if (this.props.spell.duration.unit.id == util.itemtypes.TYPE.SPELL_DURATION.CONCENTRATION) {
            return (
                <div className="col-md-12">
                    <DndInput
                        name="duration.concentration.value"
                        label="Up to"
                        dataType={util.datatypes.COMBO.NUMBER.INT.PICKLIST}
                        value={this.props.spell.duration.concentration.value}
                        onChange={this.props.onChange}
                        picklist={concentrationDurations}
                        childName="duration.concentration.unit"
                        childValue={this.props.spell.duration.concentration.unit}
                        />
                </div>
            );
        } else {
            return null;
        }
    }
    
    renderListInputs(typeName, listName, listLabel, spell, editItem, damageTypes) {
        let countInput = null;
        let listCols = 6;
        if (!spell.damage[listName].isInclusive) {
            countInput = (
                <div className="col-md-2">
                    <DndInput
                        name={'damage.' + listName + '.count'}
                        label="Select Count"
                        value={spell.damage[listName].count}
                        dataType={util.datatypes.NUMBER.INT}
                        onChange={this.props.onChange}
                        stackLabel
                        />
                </div>
            );
            listCols = 4;
        }
        if (spell.damage[typeName].id == util.itemtypes.TYPE.SUPPLEMENTAL_PICKLIST.SELECT_FROM_LIST) {
            return (
                <fragment>
                    <div className="col-md-2">
                        <DndInput
                            name={'damage.' + listName + '.isInclusive'}
                            label="Is Inclusive"
                            value={spell.damage[listName].isInclusive}
                            dataType={util.datatypes.BOOL}
                            onChange={this.props.onChange}
                            stackLabel
                            />
                    </div>
                    {countInput}
                    <div className={'col-md-' + listCols}>
                        <DndInput
                            name={'damage.' + listName + '.list'}
                            label={listLabel}
                            dataType={util.datatypes.ARRAY.TAGS.ADD.PICKLIST}
                            value={spell.damage[listName].list}
                            onChange={this.props.onChange}
                            picklist={damageTypes}
                            childValue={this.props.editItem}
                            childName="name"
                            buttonOnClick={this.props.onChange}
                            onChangeChild={this.props.onChangeChild}
                            buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                            changeFocusRefName="damage.typeList.list"
                            dataTask="damage-type"
                            stackLabel
                            />
                    </div>
                </fragment>
            );
        }
        return null;
    }
    
    renderDamageAdvancementInputs(spell, advancementTypes) {
        let advancementInput = null;
        if (spell.damage.advancement.type.id == util.itemtypes.TYPE.ADVANCEMENT_TYPE.AT_LEVEL) {
            advancementInput = (
                <DndInput
                    name="damage.advancement.atLevels"
                    label="At Levels"
                    dataType={util.datatypes.ARRAY.COMMA_DELIMITED.INT}
                    value={spell.damage.advancement.atLevels}
                    onChange={this.props.onChange}
                    stackLabel
                    buttonType="fill"
                    buttonDatatype={util.datatypes.ACTION.SPELL}
                    buttonOverwriteAction="EXPAND_AT_LEVELS"
                    buttonOnClick={this.props.onChange}
                    />
            );
        } else if (spell.damage.advancement.type.id == util.itemtypes.TYPE.ADVANCEMENT_TYPE.EVERY_X_LEVELS) {
            advancementInput = (
                <DndInput
                    name="damage.advancement.levelCount"
                    label="Every # Levels"
                    dataType={util.datatypes.NUMBER.INT}
                    value={spell.damage.advancement.levelCount}
                    onChange={this.props.onChange}
                    stackLabel
                    />
            );
        }
        let diceInput = null;
        if (util.datatypes.compareDataType(spell.damage.dice, util.datatypes.SPECIAL.DICE) && spell.damage.type.id != 0) {
            diceInput = (
                <div className="col-md-2">
                    <DndInput
                        name="damage.advancement.dice"
                        label="Damage Gained"
                        dataType={util.datatypes.SPECIAL.DICE}
                        value={spell.damage.advancement.dice}
                        onChange={this.props.onChange}
                        stackLabel
                        />
                </div>
            );
        }
        if ((util.datatypes.compareDataType(spell.damage.dice, util.datatypes.SPECIAL.DICE) && spell.damage.type.id != 0)
           || (spell.damage.projectileCount != 0)) {
            return (
                <fragment>
                    {diceInput}
                    <div className="col-md-3">
                        <DndInput
                            name="damage.advancement.type"
                            label="Advancement Type"
                            dataType={util.datatypes.PICKLIST}
                            value={spell.damage.advancement.type}
                            onChange={this.props.onChange}
                            picklist={advancementTypes}
                            stackLabel
                            />
                    </div>
                    <div className="col-md-3">
                        {advancementInput}
                    </div>
                </fragment>
            );
        }
        return null;
    }
    
    renderProjectileAdvancementInputs(spell) {
        let advancementInput = null;
        if (spell.damage.projectileCount) {
            advancementInput = (
                <div className="col-md-4">
                    <DndInput
                        name="damage.advancement.projectileCount"
                        label="Projectiles Gained"
                        dataType={util.datatypes.NUMBER.INT}
                        value={spell.damage.advancement.projectileCount}
                        onChange={this.props.onChange}
                        stackLabel
                        />
                </div>
            );
        }
        return advancementInput;
    }
    
    render() {
        const spell = this.props.spell;
        const picklists = this.props.picklists;
        const schools = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.SCHOOL_OF_MAGIC);
        const castingTimes = util.common.picklists.getPicklistItems(picklists, [util.itemtypes.TYPE.ITEM.UNIT.TIME, util.itemtypes.TYPE.ITEM.ACTION_TYPE]);
        const ranges = util.common.picklists.getPicklistItems(picklists, [util.itemtypes.TYPE.ITEM.UNIT.LENGTH, util.itemtypes.TYPE.ITEM.RANGE]);
        const areaShapes = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.AREA_OF_EFFECT_SHAPE);
        const areaRanges = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.UNIT.LENGTH);
        const durations = util.common.picklists.getPicklistItems(picklists, [util.itemtypes.TYPE.ITEM.UNIT.TIME, util.itemtypes.TYPE.ITEM.DURATION]);
        const spellComponents = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.SPELL_COMPONENT);
        const concentrationDurations = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.UNIT.TIME);
        const damageTypes = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.DAMAGE_TYPE);
        const conditions = util.common.picklists.getPicklistItems(picklists, [util.itemtypes.TYPE.ITEM.CONDITION, util.itemtypes.TYPE.ITEM.OTHER_EFFECT, util.itemtypes.TYPE.ITEM.SUPPLEMENTAL_PICKLIST]);
        const savingThrowEffects = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.SAVE_EFFECT);
        const abilityScores = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.ABILITY_SCORE);
        const advancementTypes = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.ADVANCEMENT_TYPE);
        const attackTypes = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.ATTACK_TYPE);
        return (
            <div>
                <form>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="General">
                            <DndUniversalInput
                                ref="name"
                                referenceObject={spell}
                                onChange={this.props.onChange}
                                picklists={picklists}
                                hideDescription
                                nameResourceSameRow
                                />
                            <div className="col-md-4">
                                <DndInput
                                    name="level"
                                    label="Level"
                                    dataType={util.datatypes.NUMBER.SPELL_LEVEL}
                                    value={spell.level}
                                    onChange={this.props.onChange}
                                    />
                            </div>
                            <div className="col-md-4">
                                <DndInput
                                    name="school"
                                    label="School"
                                    dataType={util.datatypes.PICKLIST}
                                    value={spell.school}
                                    onChange={this.props.onChange}
                                    picklist={schools}
                                    />
                            </div>
                            <div className="col-md-4">
                                <DndInput
                                    name="isRitual"
                                    label="Ritual"
                                    dataType={util.datatypes.BOOL}
                                    value={spell.isRitual}
                                    onChange={this.props.onChange}
                                    />
                            </div>
                            <div className="col-md-6">
                                <DndInput
                                    name="castingTime.value"
                                    label="Casting Time"
                                    dataType={util.datatypes.COMBO.NUMBER.INT.PICKLIST}
                                    value={spell.castingTime.value}
                                    onChange={this.props.onChange}
                                    picklist={castingTimes}
                                    childName="castingTime.unit"
                                    childValue={spell.castingTime.unit}
                                    />
                            </div>
                            {this.renderReactionTextInput()}
                            <div className="col-md-6">
                                <DndInput
                                    name="range.value"
                                    label="Range"
                                    dataType={util.datatypes.COMBO.NUMBER.INT.PICKLIST}
                                    value={spell.range.value}
                                    onChange={this.props.onChange}
                                    picklist={ranges}
                                    childName="range.unit"
                                    childValue={spell.range.unit}
                                    />
                            </div>
                            {this.renderAreaOfEffectInput([areaRanges, areaShapes])}
                            <div className="col-md-8">
                                <DndCheckboxList
                                    name="components"
                                    dataTask="normal"
                                    dataType={util.datatypes.ACTION.SPELL_COMPONENT}
                                    onChange={this.props.onChange}
                                    onChangeChild={this.props.onChangeChild}
                                    picklists={this.props.picklists}
                                    value={this.props.spell.components}
                                    referenceValue={spellComponents}
                                    displayPropertyName="name"
                                    />
                            </div>
                            <div className="col-md-4">
                                {this.renderMaterialComponentInput()}
                            </div>
                            <div className="col-md-6">
                                <DndInput
                                    name="duration.value"
                                    label="Duration"
                                    dataType={util.datatypes.COMBO.NUMBER.INT.PICKLIST}
                                    value={spell.duration.value}
                                    onChange={this.props.onChange}
                                    picklist={durations}
                                    childName="duration.unit"
                                    childValue={spell.duration.unit}
                                    />
                            </div>
                            <div className="col-md-6">
                                {this.renderConcentrationInput(concentrationDurations)}
                            </div>
                            <div className="col-md-12">
                                <DndInput
                                    name="description"
                                    label="Description"
                                    dataType={util.datatypes.STRING.HTML.LONG}
                                    value={spell.description}
                                    onChange={this.props.onChange}
                                    longStringHeight={420}
                                    notCollapsible
                                    stackLabel
                                    />
                            </div>
                            <div className="col-md-12">
                                <DndInput
                                    name="atHigherLevels"
                                    label="At Higher Levels"
                                    dataType={util.datatypes.STRING.HTML.LONG}
                                    value={spell.atHigherLevels}
                                    onChange={this.props.onChange}
                                    notCollapsible
                                    stackLabel
                                    />
                            </div>
                        </Tab>
                        <Tab eventKey={2} title="Damage/Effect">
                            <div className="col-md-4">
                                <DndInput
                                    name="damage"
                                    label="Damage/Type"
                                    dataType={util.datatypes.COMBO.DICE.PICKLIST}
                                    value={spell.damage}
                                    onChange={this.props.onChange}
                                    picklist={damageTypes}
                                    childName="damage.type"
                                    childValue={spell.damage.type}
                                    stackLabel
                                    />
                            </div>
                            {this.renderListInputs('type', 'typeList', 'Damage Types', spell, this.props.editItem, damageTypes)}
                            {this.renderDamageAdvancementInputs(spell, advancementTypes)}
                            <div className="col-md-4">
                                <DndInput
                                    name="damage.projectileCount"
                                    label="Projectiles"
                                    dataType={util.datatypes.NUMBER.INT}
                                    value={spell.damage.projectileCount}
                                    onChange={this.props.onChange}
                                    stackLabel
                                    />
                            </div>
                            {this.renderProjectileAdvancementInputs(spell, advancementTypes)}
                            <div className="col-md-4">
                                <DndNestedCheckbox
                                    value={spell.damage.applyAbilityScoreModifier}
                                    label="Apply Ability Score"
                                    onChange={this.props.onChange}
                                    name="damage.applyAbilityScoreModifier"
                                    stackLabel
                                    >
                                    <DndInput
                                        name="damage.abilityScore"
                                        dataType={util.datatypes.PICKLIST}
                                        value={spell.damage.abilityScore}
                                        onChange={this.props.onChange}
                                        picklist={abilityScores}
                                        hideLabel
                                        />
                                </DndNestedCheckbox>
                            </div>
                            <div className="col-md-4">
                                <DndInput
                                    name="damage.condition"
                                    label="Condition"
                                    dataType={util.datatypes.PICKLIST}
                                    value={spell.damage.condition}
                                    onChange={this.props.onChange}
                                    picklist={conditions}
                                    stackLabel
                                    />
                            </div>
                            {this.renderListInputs('condition', 'conditionList', 'Conditions', spell, this.props.editItem, conditions)}
                            <div className="col-md-4">
                                <DndInput
                                    name="damage.savingThrow.abilityScore"
                                    label="Save Ability"
                                    dataType={util.datatypes.PICKLIST}
                                    value={spell.damage.savingThrow.abilityScore}
                                    onChange={this.props.onChange}
                                    picklist={abilityScores}
                                    stackLabel
                                    />
                            </div>
                            <div className="col-md-4">
                                <DndInput
                                    name="damage.savingThrow.effect"
                                    label="Save Effect"
                                    dataType={util.datatypes.PICKLIST}
                                    value={spell.damage.savingThrow.effect}
                                    onChange={this.props.onChange}
                                    picklist={savingThrowEffects}
                                    stackLabel
                                    />
                            </div>
                            <div className="col-md-4">
                                <DndInput
                                    name="damage.areaOfEffect.value"
                                    label="Area of Effect"
                                    dataType={util.datatypes.COMBO.NUMBER.INT.TWO_PICKLISTS}
                                    value={this.props.spell.damage.areaOfEffect.value}
                                    onChange={this.props.onChange}
                                    picklist={[areaRanges, areaShapes]}
                                    childName="damage.areaOfEffect.shape"
                                    childValue={this.props.spell.damage.areaOfEffect.shape}
                                    childAuxiliaryNames={['damage.areaOfEffect.unit']}
                                    childAuxiliaryValues={[this.props.spell.damage.areaOfEffect.unit]}
                                    stackLabel
                                    />
                            </div>
                            <div className="col-md-4">
                                <DndInput
                                    name="damage.attack.type"
                                    label="Attack Type"
                                    dataType={util.datatypes.PICKLIST}
                                    value={spell.damage.attack.type}
                                    onChange={this.props.onChange}
                                    picklist={attackTypes}
                                    stackLabel
                                    />
                            </div>
                            <div className="col-md-4">
                                <DndInput
                                    name="dice"
                                    label="Supplemental Damage"
                                    dataType={util.datatypes.COMBO.DICE.PICKLIST}
                                    value={this.props.editSupplementalDamage}
                                    onChange={this.props.onChangeChild}
                                    picklist={damageTypes}
                                    childName="type"
                                    childValue={this.props.editSupplementalDamage.type}
                                    dataTask="supplementaldamage"
                                    stackLabel
                                    buttonType="additem"
                                    buttonName="damage.supplemental"
                                    buttonDatatype={util.datatypes.ACTION.SUPPLEMENTAL_DAMAGE}
                                    buttonOnClick={this.props.onChange}
                                    buttonDisabled={!util.datatypes.compareDataType(this.props.editSupplementalDamage.dice.rendered, util.datatypes.SPECIAL.DICE) || this.props.editSupplementalDamage.type.id == 0}
                                    inputWidth={['75px']}
                                    />
                            </div>
                            <div className="col-md-4">
                                <DndInputWrapper
                                    label="Damages"
                                    stackLabel
                                    >
                                    <DndList
                                        name="damage.supplemental"
                                        value={spell.damage.supplemental}
                                        onChange={this.props.onChange}
                                        dataType={util.datatypes.ACTION.SUPPLEMENTAL_DAMAGE}
                                        hideScrolling
                                        renderNameFunction={util.format.forDisplay.obj.damage}
                                        dataTask="supplementaldamage"
                                        />
                                </DndInputWrapper>
                            </div>
                        </Tab>
                        <Tab eventKey={3} title="Mechanics">
                            <DndManageMechanics
                                onChange={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                picklists={this.props.picklists}
                                value={spell.mechanics}
                                editMechanic={this.props.editMechanic}
                                />
                        </Tab>
                        <Tab eventKey={4} title="Charts">
                            <DndManageCharts
                                onChange={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                picklists={this.props.picklists}
                                value={spell.charts}
                                editChart={this.props.editChart}
                                />
                        </Tab>
                        <Tab eventKey={5} title="Supplemental Descriptions">
                            <DndManageSupplementalDescriptions
                                editSupplementalDescription={this.props.editSupplementalDescription}
                                onChange={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                value={spell.supplementalDescriptions}
                                />
                        </Tab>
                    </Tabs>
                </form>
            </div>
        );
    }
}
/*
                            */
SpellForm.propTypes = {
    editChart: PropTypes.object.isRequired,
    editItem: PropTypes.object.isRequired,
    editMechanic: PropTypes.object.isRequired,
    editSupplementalDamage: PropTypes.object.isRequired,
    editSupplementalDescription: PropTypes.object.isRequired,
    spell: PropTypes.object.isRequired,
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

export default SpellForm;