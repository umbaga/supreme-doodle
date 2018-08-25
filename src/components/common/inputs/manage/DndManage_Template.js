import React from 'react';
import PropTypes from 'prop-types';
//import DndInput from '../DndInput';
//import DndList from '../DndList';
import DndFieldset from '../../form/DndFieldset';
//import DndDataEntryButtonBar from '../../buttons/DndDataEntryButtonBar';
//import util from '../../../../util/util';

class DndManage_Templates extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        const _templates = this.props.value;
        //const _template = this.props.edit_Template;
        return (
            <fragment>
                <DndFieldset
                    legend="New _Template"
                    collapsible
                    startCollapsed={_templates.length != 0}
                    >
                    EDIT_MECHANIC
                </DndFieldset>
                <DndFieldset
                    legend="Exisitng _Templates"
                    collapsible
                    startCollapsed={_templates.length == 0}
                    >
                    MECHANICS
                </DndFieldset>
            </fragment>
        );
    }
}

DndManage_Templates.propTypes = {
    edit_Template: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeChild: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired
};

export default DndManage_Templates;