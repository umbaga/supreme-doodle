import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../../common/inputs/DndInput';
import util from '../../../util/util';

class PicklistForm extends React.Component {
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
        let picklist = this.props.picklist;
        picklist.items = picklist.items.filter(function(item) {
            return !item.isSupplemental;
        });
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
                                value={picklist.name}
                                onChange={this.props.onChange}
                                />
                        </div>
                        <div className="col-md-12">
                            <DndInput
                                name="applySupplementalPicklist"
                                label="Apply Supplemental Picklist"
                                dataType={util.datatypes.BOOL}
                                value={picklist.applySupplementalPicklist}
                                onChange={this.props.onChange}
                                />
                        </div>
                        <div className="col-md-12">
                            <DndInput
                                name="items"
                                label="Add New Item"
                                dataType={util.datatypes.ARRAY.LIST.ADD.NEW}
                                value={picklist.items}
                                onChange={this.props.onChange}
                                childValue={this.props.editItem.name}
                                childName="name"
                                buttonOnClick={this.props.onChange}
                                onChangeChild={this.props.onChangeItem}
                                buttonDatatype={util.datatypes.ACTION.LIST.NEW}
                                changeFocusRefName="items"
                                />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

PicklistForm.propTypes = {
    editItem: PropTypes.object.isRequired,
    picklist: PropTypes.object.isRequired,
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

export default PicklistForm;