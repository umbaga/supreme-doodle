import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../../common/inputs/DndInput';
import DndUniversalInput from '../../common/inputs/DndUniversalInput';
import util from '../../../util/util';

class ProficiencyForm extends React.Component {
    constructor(props) {
        super(props);
        this.setFocus = this.setFocus.bind(this);
        this.renderAbilityScoreInputs = this.renderAbilityScoreInputs.bind(this);
        this.renderLanguageInputs = this.renderLanguageInputs.bind(this);
    }
    
    componentDidMount() {
        this.refs.name.setFocus();
    }
    
    setFocus() {
        this.refs.name.setFocus();
    }
    
    renderAbilityScoreInputs(proficiency, abilityScores) {
        let retVal = null;
        if (proficiency.category.id == util.itemtypes.TYPE.PROFICIENCY_CATEGORY.SAVING_THROW
           || proficiency.category.id == util.itemtypes.TYPE.PROFICIENCY_CATEGORY.SKILL) {
            retVal = (
                <div className="col-md-12">
                    <DndInput
                        name="abilityScore"
                        label="Ability"
                        dataType={util.datatypes.PICKLIST}
                        value={proficiency.abilityScore}
                        onChange={this.props.onChange}
                        picklist={abilityScores}
                        />
                </div>
            );
        }
        return retVal;
    }
    
    renderLanguageInputs(proficiency, rarities, scripts) {
        let retVal = null;
        if (proficiency.category.id == util.itemtypes.TYPE.PROFICIENCY_CATEGORY.LANGUAGE) {
            retVal = (
                <div className="col-md-12">
                    <DndInput
                        name="language.rarity"
                        label="Rarity"
                        dataType={util.datatypes.PICKLIST}
                        value={proficiency.language.rarity}
                        onChange={this.props.onChange}
                        picklist={rarities}
                        />
                    <DndInput
                        name="language.script"
                        label="Script"
                        dataType={util.datatypes.PICKLIST}
                        value={proficiency.language.script}
                        onChange={this.props.onChange}
                        picklist={scripts}
                        />
                    <DndInput
                        name="language.dialects"
                        label="Add Dialects"
                        dataType={util.datatypes.ARRAY.LIST.ADD.NEW}
                        value={this.props.proficiency.language.dialects}
                        childValue={this.props.editItem.name}
                        childName="name"
                        onChange={this.props.onChange}
                        buttonOnClick={this.props.onChange}
                        onChangeChild={this.props.onChangeItem}
                        buttonDatatype={util.datatypes.ACTION.LIST.NEW}
                        listTableStartScrollingAt={4}
                        />
                </div>
            );
        }
        return retVal;
    }
    
    render() {
        const proficiency = this.props.proficiency;
        const picklists = this.props.picklists;
        const categories = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.PROFICIENCY_CATEGORY);
        const abilityScores = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.ABILITY_SCORE);
        const rarities = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.LANGUAGE_RARITY);
        const scripts = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.LANGUAGE_SCRIPT);
        return (
            <div>
                <form>
                    <div className="modal-no-tabs">
                        <div className="col-md-12">
                            <DndUniversalInput
                                ref="name"
                                referenceObject={proficiency}
                                onChange={this.props.onChange}
                                picklists={picklists}
                                hideDescription
                                />
                        </div>
                        <div className="col-md-12">
                            <div className="col-md-12">
                                <div className="col-md-12">
                                    <DndInput
                                        name="category"
                                        label="Category"
                                        dataType={util.datatypes.PICKLIST}
                                        value={proficiency.category}
                                        onChange={this.props.onChange}
                                        picklist={categories}
                                        />
                                </div>
                                {this.renderAbilityScoreInputs(proficiency, abilityScores)}
                                {this.renderLanguageInputs(proficiency, rarities, scripts)}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

ProficiencyForm.propTypes = {
    editItem: PropTypes.object.isRequired,
    proficiency: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onSaveNew: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeItem: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isCreate: PropTypes.bool.isRequired,
    picklists: PropTypes.array,
    saving: PropTypes.bool
};

export default ProficiencyForm;