import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../../common/inputs/DndInput';
import util from '../../../util/util';

class _PicklistForm extends React.Component {
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
                                value={this.props.picklist.name}
                                onChange={this.props.onChange}
                                />
                        </div>
                        <div className="col-md-12">
                            <DndInput
                                name="applySupplementalPicklist"
                                label="Apply Supplemental Picklist"
                                dataType={util.datatypes.BOOL}
                                value={this.props.picklist.applySupplementalPicklist}
                                onChange={this.props.onChange} />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

_PicklistForm.propTypes = {
    picklist: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onSaveNew: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isCreate: PropTypes.bool.isRequired,
    picklists: PropTypes.array,
    saving: PropTypes.bool
};

export default _PicklistForm;