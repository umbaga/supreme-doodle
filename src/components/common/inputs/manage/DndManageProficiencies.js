import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../DndInput';
import DndList from '../DndList';
import DndFieldset from '../../form/DndFieldset';
import DndProficiencyBlock from '../../display/DndProficiencyBlock';
import util from '../../../../util/util';

class DndManageProficiencies extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedCategory: Object.assign({}, util.objectModel.ITEM)
        };
        this._onChangeCategory = this._onChangeCategory.bind(this);
    }
    
    _onChangeCategory(event) {
        let newCategory = util.common.picklists.getPicklistItem(this.props.picklists, event.target.value);
        this.setState({selectedCategory: newCategory});
    }
    
    render() {
        const picklists = this.props.picklists;
        const proficiencies = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.PROFICIENCY).filter(function(proficiency) {
            if (this.state.selectedCategory.id == 0) {
                return true;
            } else {
                return this.state.selectedCategory.id == proficiency.category.id;
            }
        }.bind(this));
        const listProficiencies = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.PROFICIENCY).filter(function(proficiency) {
            return proficiency.category.id == this.props.editProficiencyList.category.id;
        }.bind(this));
        const categories = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.PROFICIENCY_CATEGORY);
        return (
            <fragment>
                <div className="col-md-12">
                    <DndFieldset
                        legend="Proficiencies"
                        collapsible
                        >
                        <DndProficiencyBlock
                            displayObject={this.props.value}
                            picklists={picklists}/>
                    </DndFieldset>
                </div>
                <div className="col-md-12">
                    <DndFieldset
                        legend="Assign These Proficiencies"
                        collapsible
                        startCollapsed
                        >
                        <DndInput
                            name="category"
                            label="Filer By Category"
                            dataType={util.datatypes.PICKLIST}
                            picklist={categories}
                            value={this.state.selectedCategory}
                            placeholder="None"
                            onChange={this._onChangeCategory}
                            />
                        <DndInput
                            name="proficiencies.assigned"
                            label="Proficiencies"
                            dataType={util.datatypes.ARRAY.TAGS.ADD.PICKLIST}
                            value={this.props.value.assigned}
                            onChange={this.props.onChange}
                            picklist={proficiencies}
                            childValue={this.props.editProficiency}
                            childName="name"
                            buttonOnClick={this.props.onChange}
                            onChangeChild={this.props.onChangeChild}
                            buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                            changeFocusRefName="proficiencies.assigned"
                            dataTask="Proficiency"
                            />
                    </DndFieldset>
                </div>
                <div className="col-md-12">
                    <DndFieldset
                        legend="Select # from Category"
                        collapsible
                        startCollapsed
                        >
                        <DndInput
                            name="proficiencies.select.category"
                            label="Select from Category"
                            dataType={util.datatypes.ARRAY.LIST.ADD.WITH_VALUE.PICKLIST.INT}
                            value={this.props.value.select.category}
                            onChange={this.props.onChange}
                            buttonOnClick={this.props.onChange}
                            buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                            changeFocusRefName="proficiencies.select.category"
                            picklist={categories}
                            dataTask="ProficiencyCategory"
                            childName="name"
                            childValue={this.props.editCategory}
                            childAuxiliaryNames={['count']}
                            childAuxiliaryDatatypes={[util.datatypes.NUMBER.INT]}
                            childAuxiliaryValues={[this.props.editCategory.count]}
                            onChangeChild={this.props.onChangeChild}
                            />
                    </DndFieldset>
                </div>
                <div className="col-md-12">
                    <DndFieldset
                        legend="Select # from List"
                        collapsible
                        startCollapsed
                        >
                        <DndInput
                            name="category"
                            label="Category"
                            dataType={util.datatypes.PICKLIST}
                            picklist={categories}
                            value={this.props.editProficiencyList.category}
                            onChange={this.props.onChangeChild}
                            dataTask="proficiencylist"
                            />
                        <DndInput
                            name="proficiencies"
                            label="Proficiencies"
                            dataType={util.datatypes.ARRAY.TAGS.ADD.PICKLIST}
                            value={this.props.editProficiencyList.proficiencies}
                            onChange={this.props.onChangeChild}
                            picklist={listProficiencies}
                            childValue={this.props.editProficiency}
                            childName="name"
                            buttonOnClick={this.props.onChangeChild}
                            onChangeChild={this.props.onChangeChild}
                            buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                            changeFocusRefName="proficiencies.select.list"
                            dataTask="Proficiency"
                            buttonDataTask="proficiencylist"
                            />
                        <DndInput
                            name="count"
                            label="Select # from List"
                            dataType={util.datatypes.NUMBER.INT}
                            value={this.props.editProficiencyList.count}
                            onChange={this.props.onChangeChild}
                            dataTask="proficiencylist"
                            buttonOnClick={this.props.onChange}
                            buttonName="proficiencies.select.list"
                            buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                            buttonType="save"
                            />
                        <hr/>
                        <DndList
                            value={this.props.value.select.list}
                            onChange={this.props.onChange}
                            dataType={util.datatypes.ACTION.LIST.PICKLIST}
                            renderNameFunction={util.format.forDisplay.obj.proficiencyList}
                            name="proficiencies.select.list"
                            />
                    </DndFieldset>
                </div>
            </fragment>
        );
    }
}

DndManageProficiencies.propTypes = {
    onChange: PropTypes.func.isRequired,
    onChangeChild: PropTypes.func.isRequired,
    picklists: PropTypes.array.isRequired,
    value: PropTypes.object.isRequired,
    editProficiency: PropTypes.object.isRequired,
    editCategory: PropTypes.object.isRequired,
    editProficiencyList: PropTypes.object.isRequired
};

export default DndManageProficiencies;