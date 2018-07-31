import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndChartDisplay from '../display/DndChartDisplay';
import DndDieChartDisplay from '../display/DndDieChartDisplay';

class DndCollapsibleTableRowContents extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderContents = this.renderContents.bind(this);
    }
    
    renderContents(item) {
        if (item && item.type && item.type.id != 0) {
            switch (item.type.id) {
                case util.itemtypes.CHART.DIE_ROLL:
                    return (<DndDieChartDisplay chart={item}/>);
                case util.itemtypes.CHART.STANDARD:
                    return (<DndChartDisplay chart={item}/>);
                default:
                    return null;
            }
        } else {
            return null;
        }
    }
    
    render() {
        const item = this.props.item;
        return (
            <div>
                {this.renderContents(item)}
            </div>
        );
    }
}

DndCollapsibleTableRowContents.propTypes = {
    item: PropTypes.object.isRequired
};

export default DndCollapsibleTableRowContents;