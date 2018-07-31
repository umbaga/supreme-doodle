import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';

class DndDieChartDisplay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderHeaderWithDescription = this.renderHeaderWithDescription.bind(this);
    }

    renderHeaderWithDescription(chart) {
        if (chart.description && chart.description.length != 0) {
            return (
                <div>
                    <div>{chart.title}</div>
                    <div>{chart.description}</div>
                </div>
            );
        }
        return null;
    }
    
    render() {
        const chart = this.props.chart;
        return (
            <div>
                {this.renderHeaderWithDescription(chart)}
                <table>
                    <thead>
                        <tr>
                            <th>{util.format.forDisplay.string.dieRoll(chart.dieRoll, true)}</th>
                            <th>{chart.title}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            chart.entries.map(entry =>
                                                <tr key={entry.id}>
                                                <th>{util.format.forDisplay.string.dieRollValueRange(entry)}</th>
                                                  <td>{entry.description}</td>
                                              </tr>
                                             )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

DndDieChartDisplay.propTypes = {
    chart: PropTypes.object.isRequired
};

export default DndDieChartDisplay;
