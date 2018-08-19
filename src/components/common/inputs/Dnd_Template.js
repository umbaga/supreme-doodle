import React from 'react';
import PropTypes from 'prop-types';
//import util from '../../../util/util';
//import DndInput from './DndInput';

class Dnd_Template extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        return (
            <div>Checkbox List</div>
        );
    }
}

Dnd_Template.propTypes = {
    onChange: PropTypes.func.isRequired,
    onChangeChild: PropTypes.func.isRequired,
    picklists: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]).isRequired
};

export default Dnd_Template;