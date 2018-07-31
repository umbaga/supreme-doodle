import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../../util/util';
import DndButton from '../../buttons/DndButton';

class DndManageChartEntry extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderDieRangeSelect = this.renderDieRangeSelect.bind(this);
        this.renderDescriptionInput = this.renderDescriptionInput.bind(this);
        this._onRemoveEntry = this._onRemoveEntry.bind(this);
        this.renderDeleteButton = this.renderDeleteButton.bind(this);
    }
    
    _onRemoveEntry() {
        this.props.onRemoveEntry(this.props.entry);
    }
    
    renderDieRangeSelect(chart, entry) {
        let dieRollRangeArray = [];
        for (let v = entry.minimum; v <= chart.dieRoll.dieCount * chart.dieRoll.dieType; v++) {
            dieRollRangeArray.push({minimum: entry.minimum, maximum: v});
        }
        return (
            <select
                name={entry.id + '_select'}
                value={entry.maximum}
                onChange={this.props.onChangeChart}
                datatype={util.datatypes.special.DIE_CHART_ENTRY_DIE_ROLL_RANGE}
                className="form-control"
                >
                {dieRollRangeArray.map(rollRange =>
                    <option
                        key={rollRange.minimum + '-' + rollRange.maximum}
                        value={rollRange.maximum}
                        >
                       {util.format.forDisplay.string.dieRollValueRange(rollRange)}
                    </option>
                )}
            </select>
        );
    }
    renderDescriptionInput(entry) {
        return (
            <input
                name={entry.id + '_description'}
                type="text"
                value={entry.description}
                onChange={this.props.onChangeChart}
                datatype={util.datatypes.special.DIE_CHART_ENTRY_DESCRIPTION}
                className="form-control"
                />
        );
    }
    renderDeleteButton(chart) {
        return chart.entries.length > 1 ? (
            <span className="input-group-btn">
                <DndButton
                    buttonType="delete"
                    onClick={this._onRemoveEntry}
                    />
            </span>
        ) : null;
    }
    render() {
        const chart = this.props.chart;
        const entry = this.props.entry;
        return (
            <div className="col-md-12">
                <div className=" input-group input-inline">
                    {this.renderDieRangeSelect(chart, entry)}
                </div>
                <div className=" input-group input-inline">
                    {this.renderDescriptionInput(entry)}
                    {this.renderDeleteButton(chart)}
                </div>
            </div>
        );
    }
}

DndManageChartEntry.propTypes = {
    chart: PropTypes.object.isRequired,
    entry: PropTypes.object.isRequired,
    onChangeChart: PropTypes.func.isRequired,
    onRemoveEntry: PropTypes.func.isRequired
};

export default DndManageChartEntry;
