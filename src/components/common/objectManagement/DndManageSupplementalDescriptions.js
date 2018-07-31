import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInput from '../inputs/DndInput';
import DndDataEntryButtonBar from '../buttons/DndDataEntryButtonBar';
import DndCollapsibleTableRow from '../subcomponents/DndCollapsibleTableRow';

class DndManageSupplementalDescriptions extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showThisId: null
        };
        this.renderEditDescription = this.renderEditDescription.bind(this);
        this.renderDescriptionList = this.renderDescriptionList.bind(this);
        this.setShowThisId = this.setShowThisId.bind(this);
        this._onSaveClick = this._onSaveClick.bind(this);
    }
    
    renderEditDescription(description) {
        return (
            <div className="col-sm-12">
                <DndInput
                    name="title"
                    label="Title"
                    value={description.title}
                    dataType={util.datatypes.string.STRING}
                    onChange={this.props.onChange}
                    />
                <DndInput
                    name="description"
                    label="Description"
                    value={description.description}
                    dataType={util.datatypes.string.DESCRIPTION}
                    onChange={this.props.onChange}
                    />
            </div>
        );
    }
    
    setShowThisId(description) {
        let newId = null;
        if (this.state.showThisId != description.id) {
            newId = description.id;
        }
        this.setState({showThisId: newId});
    }
    
    _onSaveClick(event) {
        this.props.onChange(event);
        this.props.onResetDescription();
    }
    
    renderDescriptionList(descriptions) {
        if (descriptions && descriptions.length) {
            return (
                <fieldset>
                    <legend>Descriptions</legend>
                    <table className="table table-sm table-striped table-hover">
                        <tbody>
                            {descriptions.map(function(c) {
                                let boundClick = this.setShowThisId.bind(this, c);
                                return (
                                    <DndCollapsibleTableRow
                                        key={c.id}
                                        item={c}
                                        items={descriptions}
                                        onChangeOrder={this.props.onChange}
                                        onSelectItem={this.props.onChange}
                                        onRemoveItem={this.props.onChange}
                                        boundClick={boundClick}
                                        showThisId={this.state.showThisId}
                                        removeItemAction={util.datatypes.action.DESCRIPTION.REMOVE}
                                        selectItemAction={util.datatypes.action.DESCRIPTION.SELECT}
                                        moveItemDownAction={util.datatypes.action.DESCRIPTION.CHANGE_INDEX.DOWN}
                                        moveItemUpAction={util.datatypes.action.DESCRIPTION.CHANGE_INDEX.UP}
                                        name="supplementalDescriptions"
                                        >
                                        <div>{c.description}</div>
                                    </DndCollapsibleTableRow>
                                );
                            }.bind(this))}
                        </tbody>
                    </table>
                </fieldset>
            );
        } else {
            return null;
        }
    }
    render() {
        const descriptions = this.props.descriptions;
        const description = this.props.description;
        return (
            <div>
                {this.renderEditDescription(description)}
                <DndDataEntryButtonBar
                    onCancel={this.props.onResetDescription}
                    onSave={this._onSaveClick}
                    saveAction={util.datatypes.action.DESCRIPTION.ADD}
                    resetAction={util.datatypes.action.DESCRIPTION.RESET}
                    name="supplementalDescriptions"
                    />
                {this.renderDescriptionList(descriptions)}
            </div>
        );
    }
}

DndManageSupplementalDescriptions.propTypes = {
    descriptions: PropTypes.array.isRequired,
    description: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelectDescription: PropTypes.func.isRequired,
    onResetDescription: PropTypes.func.isRequired
};

export default DndManageSupplementalDescriptions;
