import React from 'react';
import PropTypes from 'prop-types';
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
        
        return (
            <div>
                <form>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="General">
                            <div>&nbsp;</div>
                            <DndUniversalInput
                                ref="name"
                                referenceObject={_template}
                                onChange={this.props.onChange}
                                picklists={this.props.picklists}
                                hideDescription
                                />
                        </Tab>
                        <Tab eventKey={2} title="Damage/Save">
                            <div>&nbsp;</div>
                        </Tab>
                    </Tabs>
                </form>
            </div>
        );
    }
}

_TemplateForm.propTypes = {
    _template: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    isCreate: PropTypes.bool.isRequired,
    onEdit: PropTypes.func,
    onViewDetails: PropTypes.func,
    saving: PropTypes.bool,
    picklists: PropTypes.array
};

export default _TemplateForm;