import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../../common/inputs/DndInput';
import util from '../../../util/util';

class ItemtypeForm extends React.Component {
    constructor(props) {
        super(props);
        this.setFocus = this.setFocus.bind(this);
        this.renderApplySupplementalPicklist = this.renderApplySupplementalPicklist.bind(this);
        this.renderPicklistItems = this.renderPicklistItems.bind(this);
    }
    
    componentDidMount() {
        this.refs.name.setFocus();
    }
    
    setFocus() {
        this.refs.name.setFocus();
    }
    
    renderApplySupplementalPicklist() {
        return this.props.itemtype.isPicklist ? (
            <DndInput
                name="applySupplementalPicklist"
                label="Apply Supplemental Picklist"
                dataType={util.datatypes.BOOL}
                value={this.props.itemtype.applySupplementalPicklist}
                onChange={this.props.onChange} />
        ) : null;
    }
    
    renderPicklistItems() {
        return this.props.itemtype.isPicklist ? (
            <div className="col-md-12">
                PICKLIST ITEMS
            </div>
        ) : null;
    }
    
    render() {
        return (
            <div>
                <form>
                    <div className="modal-no-tabs">
                        <div className="col-md-12">
                            <DndInput
                                name="name"
                                ref="name"
                                label="Name"
                                dataType={util.datatypes.STRING.SHORT}
                                value={this.props.itemtype.name}
                                onChange={this.props.onChange}
                                />
                        </div>
                        <div className="col-md-6">
                            <DndInput
                                name="isPicklist"
                                label="Is Picklist"
                                dataType={util.datatypes.BOOL}
                                value={this.props.itemtype.isPicklist}
                                onChange={this.props.onChange} />
                        </div>
                        <div className="col-md-6">
                            {this.renderApplySupplementalPicklist()}
                        </div>
                        {this.renderPicklistItems()}
                    </div>
                </form>
            </div>
        );
    }
}

ItemtypeForm.propTypes = {
    itemtype: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onSaveNew: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isCreate: PropTypes.bool.isRequired,
    saving: PropTypes.bool
};

export default ItemtypeForm;