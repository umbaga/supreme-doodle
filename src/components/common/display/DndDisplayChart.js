import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';

class DndDisplayChart extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        return (
            <div>
                TEST
            </div>
        );
    }
}

DndDisplayChart.propTypes = {
    displayObject: PropTypes.object
};

export default DndDisplayChart;