import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../../../util/util';
import DndButton from '../../../buttons/DndButton';
import DndInput from '../../../inputs/DndInput';
import DndManageDieChartEntry from '../../../subcomponents/charts/DndManageDieChartEntry';

class DndDieChartForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderEditChart = this.renderEditChart.bind(this);
    }
    
    renderEditChart(chart) {
        if (util.datatypes.compareDataType(chart.dice.rendered, util.datatypes.special.DICE_ROLL)) {
            return (
                <div>
                    <DndButton
                        buttonType="fill"
                        dataType={util.datatypes.action.CHART.EXPAND_DIE}
                        onClick={this.props.onChange}
                        />
                    {chart.entries.map(function(entry, idx) {
                        return (
                           <DndManageDieChartEntry
                               key={idx}
                               chart={chart}
                               entry={entry}
                               onChange={this.props.onChange}
                               />
                        );
                    }.bind(this))}
                </div>
            );
        }
        return null;
    }
    
    render() {
        const chart = this.props.chart;
        return (
            <div>
                <DndInput
                    dataType={util.datatypes.special.DICE_ROLL}
                    label="Dice"
                    name="dice"
                    onChange={this.props.onChange}
                    value={chart.dice}
                    />
                {this.renderEditChart(chart)}
            </div>
        );
    }
}

DndDieChartForm.propTypes = {
    chart: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default DndDieChartForm;
