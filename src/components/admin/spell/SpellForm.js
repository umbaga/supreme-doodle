import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../../common/inputs/DndInput';
import DndCheckboxList from '../../common/inputs/DndCheckboxList';
import DndUniversalInput from '../../common/inputs/DndUniversalInput';
import DndManageCharts from '../../common/inputs/manage/DndManageCharts';
import DndManageSupplementalDescriptions from '../../common/inputs/manage/DndManageSupplementalDescriptions';
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
                <div className="col-md-12">
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
        return (
            <div>
                <form>
                    <Tabs defaultActiveKey={5} id="uncontrolled-tab-example">
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
                            DAMAGE/EFFECT
                        </Tab>
                        <Tab eventKey={3} title="Mechanics">
                            MECHANICS
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

SpellForm.propTypes = {
    editChart: PropTypes.object.isRequired,
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