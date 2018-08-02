import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../../common/inputs/DndInput';
import util from '../../../util/util';

class _TemplateForm extends React.Component {
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
                                value={this.props._template.name}
                                onChange={this.props.onChange}
                                />
                        </div>
                        <div className="col-md-12">
                            <DndInput
                                name="applySupplemental_Template"
                                label="Apply Supplemental _Template"
                                dataType={util.datatypes.BOOL}
                                value={this.props._template.applySupplemental_Template}
                                onChange={this.props.onChange}
                                />
                        </div>
                        <div className="col-md-12">
                            <DndInput
                                name="items"
                                label="Add New Item"
                                dataType={util.datatypes.ARRAY.LIST.ADD.NEW}
                                value={this.props._template.items}
                                childValue={this.props.editItem.name}
                                childName="name"
                                onChange={this.props.onChange}
                                buttonOnClick={this.props.onChange}
                                onChangeChild={this.props.onChangeItem}
                                buttonDatatype={util.datatypes.ACTION.LIST.NEW}
                                />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

_TemplateForm.propTypes = {
    editItem: PropTypes.object.isRequired,
    _template: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onSaveNew: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeItem: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isCreate: PropTypes.bool.isRequired,
    _templates: PropTypes.array,
    saving: PropTypes.bool
};

export default _TemplateForm;