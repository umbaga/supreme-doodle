import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInput from '../inputs/DndInput';
import DndDataEntryButtonBar from '../buttons/DndDataEntryButtonBar';
import DndCollapsibleTableRow from '../subcomponents/DndCollapsibleTableRow';

class _DndManageSupplementalDescriptions extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showThisId: null
        };
        this.renderEditDescription = this.renderEditDescription.bind(this);
        this.renderDescriptionList = this.renderDescriptionList.bind(this);
        this.setShowThisId = this.setShowThisId.bind(this);
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
                                        onChangeOrder={this.props.onChangeDescriptionOrder}
                                        onSelectItem={this.props.onSelectDescription}
                                        onRemoveItem={this.props.onRemoveDescription}
                                        boundClick={boundClick}
                                        showThisId={this.state.showThisId}
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
                    onSave={this.props.onAddDescription}
                    />
                {this.renderDescriptionList(descriptions)}
            </div>
        );
    }
}

_DndManageSupplementalDescriptions.propTypes = {
    descriptions: PropTypes.array.isRequired,
    description: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeDescriptionOrder: PropTypes.func.isRequired,
    onAddDescription: PropTypes.func.isRequired,
    onCreateDescription: PropTypes.func.isRequired,
    onRemoveDescription: PropTypes.func.isRequired,
    onSelectDescription: PropTypes.func.isRequired,
    onResetDescription: PropTypes.func.isRequired
};

export default _DndManageSupplementalDescriptions;
