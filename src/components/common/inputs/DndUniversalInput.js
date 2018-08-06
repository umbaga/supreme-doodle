import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInput from './DndInput';

class DndUniversalInput extends React.Component {
    constructor(props, context) {
        super(props, context);

    }
    
    setFocus() {
        this.refs.name.refs.name.focus();
    }
    
    render() {
        const resourcePicklist = this.props.picklists ? util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.RESOURCE) : null;
        const resourceLabel = this.props.labelPrefix && this.props.labelPrefix.length != 0 ? this.props.labelPrefix + ' Resource' : 'Resource';
        const nameLabel = this.props.labelPrefix && this.props.labelPrefix.length != 0 ? this.props.labelPrefix + ' Name' : 'Name';
        const descriptionLabel = this.props.labelPrefix && this.props.labelPrefix.length != 0 ? this.props.labelPrefix + ' Description' : 'Description';
        const resourceInput = this.props.picklists ? (
            <div className="col-md-12">
                <DndInput
                    name="resource"
                    label={resourceLabel}
                    dataType={util.datatypes.PICKLIST}
                    value={this.props.referenceObject.resource}
                    onChange={this.props.onChange}
                    picklist={resourcePicklist}
                    />
            </div>
        ) : null;
        const descriptionInput = this.props.hideDescription ? null : (
            <div className="col-md-12">
                <DndInput
                    name="description"
                    label={descriptionLabel}
                    dataType={util.datatypes.STRING.HTML.LONG}
                    value={this.props.referenceObject.description}
                    onChange={this.props.onChange}
                    />
            </div>
        );
        return (
            <fragment>
                <div className="col-md-12">
                    <DndInput
                        name="name"
                        ref="name"
                        label={nameLabel}
                        dataType={util.datatypes.STRING.SHORT}
                        value={this.props.referenceObject.name}
                        onChange={this.props.onChange}
                        />
                </div>
                {resourceInput}
                {descriptionInput}
            </fragment>
        );
    }
}

DndUniversalInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    picklists: PropTypes.array,
    referenceObject: PropTypes.object.isRequired,
    labelPrefix: PropTypes.string,
    hideDescription: PropTypes.bool
};

export default DndUniversalInput;