import React from 'react';
import PropTypes from 'prop-types';
//import DndInput from '../../common/inputs/DndInput';
import DndUniversalInput from '../../common/inputs/DndUniversalInput';
//import util from '../../../util/util';
import { Tabs, Tab } from 'react-bootstrap';

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
        const _template = this.props._template;
        const picklists = this.props.picklists;
        return (
            <div>
                <form>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="General">
                            <DndUniversalInput
                                ref="name"
                                referenceObject={_template}
                                onChange={this.props.onChange}
                                picklists={picklists}
                                />
                        </Tab>
                    </Tabs>
                    <div className="modal-no-tabs">
                        <div className="col-md-12">
                            <DndUniversalInput
                                ref="name"
                                referenceObject={_template}
                                onChange={this.props.onChange}
                                picklists={picklists}
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
    onChangeChild: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isCreate: PropTypes.bool.isRequired,
    picklists: PropTypes.array,
    saving: PropTypes.bool
};

export default _TemplateForm;