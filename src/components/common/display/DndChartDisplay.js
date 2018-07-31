import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';

class DndChartDisplay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderDescription = this.renderDescription.bind(this);
        this.renderRowColumnInHeader = this.renderRowColumnInHeader.bind(this);
        this.renderRowColumnInBody = this.renderRowColumnInBody.bind(this);
        this.renderChart = this.renderChart.bind(this);
    }

    renderDescription(chart) {
        if (chart.description && chart.description.length != 0) {
            return (
                <div>
                    {chart.description}
                </div>
            );
        }
        return null;
    }
    
    renderRowColumnInHeader(hasRowTitles) {
        if (hasRowTitles) {
            return (<th></th>);
        } else {
            return null;
        }
    }
    
    renderRowColumnInBody(row, hasRowTitles) {
        if (hasRowTitles) {
            return (<th>{row.title}</th>);
        } else {
            return null;
        }
    }
    
    renderChart(chart) {
        let hasRowTitles = false;
        for (let x = 0; x < chart.rows.length; x++) {
            if (chart.rows[x].title && chart.rows[x].title.length != 0) {
                hasRowTitles = true;
            }
        }
        if (chart.type.id == util.itemtypes.CHART.STANDARD) {
            return (
                <table className="table table-sm table-striped table-hover">
                    <thead>
                        <tr>
                            <th colSpan={chart.columnCount + 1}>{chart.title}</th>
                        </tr>
                        <tr>
                            {this.renderRowColumnInHeader(hasRowTitles)}
                            {chart.columns.map(function(column, idx) {
                                return (
                                    <th key={idx}>{column.title}</th>
                                );
                            }.bind(this))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            chart.rows.map(function(row, idx) {
                                return (
                                    <tr key={idx}>
                                        {this.renderRowColumnInBody(row, hasRowTitles)}
                                        {chart.entries.filter(function(entry) {
                                            return entry.rowIndex == row.orderIndex;
                                        }).sort(function(a, b) {
                                            return a.columnIndex - b.columnIndex;
                                        }).map(function(entry, idx2) {
                                            return (
                                                <td key={idx + '_' + idx2}>{entry.description}</td>
                                            );
                                        }.bind(this))}
                                    </tr>
                                );
                            }.bind(this))
                        }
                    </tbody>
                </table>
            );
        } else if (chart.type.id == util.itemtypes.CHART.DIE_ROLL) {
            return (
                <table className="table table-sm table-striped table-hover">
                    <thead>
                        <tr>
                            <th>{util.format.forDisplay.string.dieRoll(chart.dice, true)}</th>
                            <th>{chart.title}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chart.entries.sort(function (a, b) {
                            return a.minimum - b.minimum;
                        }).map(function(entry, idx) {
                            return (
                                <tr key={idx}>
                                    <th>{util.format.forDisplay.string.dieRollValueRange(entry)}</th>
                                    <td>{entry.description}</td>
                                </tr>
                            );
                        }.bind(this))}
                    </tbody>
                </table>
            );
        } else {
            return null;
        }
    }
    
    render() {
        const chart = this.props.chart;
        return (
            <div>
                {this.renderChart(chart)}
                {this.renderDescription(chart)}
            </div>
        );
    }
}

DndChartDisplay.propTypes = {
    chart: PropTypes.object.isRequired
};

export default DndChartDisplay;
