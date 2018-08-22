import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../DndInput';
import DndList from '../DndList';
import DndFieldset from '../../form/DndFieldset';
import DndDataEntryButtonBar from '../../buttons/DndDataEntryButtonBar';
import util from '../../../../util/util';

class DndManageSupplementalDescriptions extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        const supplementalDescriptions = this.props.value.sort(function(a, b) {
            return a.orderIndex - b.orderIndex;
        });
        const supplementalDescription = this.props.editSupplementalDescription;
        return (
            <fragment>
                <DndFieldset
                    legend="New Description"
                    collapsible
                    startCollapsed={supplementalDescriptions.length != 0}
                    >
                    <DndInput
                        name="title"
                        label="Title"
                        dataTask="supplementaldescription"
                        value={supplementalDescription.title}
                        onChange={this.props.onChangeChild}
                        dataType={util.datatypes.STRING.SHORT}
                        />
                    <DndInput
                        name="description"
                        label="Description"
                        dataTask="supplementaldescription"
                        value={supplementalDescription.description}
                        onChange={this.props.onChangeChild}
                        dataType={util.datatypes.STRING.HTML.LONG}
                        notCollapsible
                        />
                    <DndDataEntryButtonBar
                        dataTask="supplementaldescription"
                        name="supplementalDescriptions"
                        onSave={this.props.onChange}
                        onCancel={this.props.onChangeChild}
                        cancelAction={util.datatypes.ACTION.SUPPLEMENTAL_DESCRIPTION.CANCEL}
                        saveAction={util.datatypes.ACTION.SUPPLEMENTAL_DESCRIPTION.ADD}
                        saveDisabled={!util.validation.isReadyToSave.supplementalDescription(supplementalDescription)}
                        />
                </DndFieldset>
                <DndFieldset
                    legend="Exisitng Descriptions"
                    collapsible
                    startCollapsed={supplementalDescriptions.length == 0}
                    >
                    <DndList
                        name="supplementalDescriptions"
                        value={supplementalDescriptions}
                        dataTask="supplementaldescription"
                        dataType={util.datatypes.ACTION.SUPPLEMENTAL_DESCRIPTION}
                        childName="title"
                        onChange={this.props.onChange}
                        onChangeChild={this.props.onChangeChild}
                        isCollapsible
                        childObjectKeys={['displayObject']}
                        childObjectValues={['value']}
                        isOrdering
                        isEditable
                        />
                </DndFieldset>
            </fragment>
        );
    }
}

DndManageSupplementalDescriptions.propTypes = {
    editSupplementalDescription: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeChild: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired
};

export default DndManageSupplementalDescriptions;