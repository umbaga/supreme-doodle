import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../DndInput';
import DndList from '../DndList';
import DndFieldset from '../../form/DndFieldset';
import DndProficiencyBlock from '../../display/DndProficiencyBlock';
import util from '../../../../util/util';

class DndManageCharts extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        const picklists = this.props.picklists;
        
        return (
            <fragment>
                <div>CHARTS</div>
            </fragment>
        );
    }
}

DndManageCharts.propTypes = {
    onChange: PropTypes.func.isRequired,
    onChangeChild: PropTypes.func.isRequired,
    picklists: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    editChart: PropTypes.object.isRequired
};

export default DndManageCharts;