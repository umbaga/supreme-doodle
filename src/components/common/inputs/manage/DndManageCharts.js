import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../DndInput';
import DndList from '../DndList';
import DndFieldset from '../../form/DndFieldset';
import util from '../../../../util/util';

class DndManageCharts extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderTitle = this.renderTitle.bind(this);
        this.renderDescription = this.renderDescription.bind(this);
        this.renderColumnsAndRows = this.renderColumnsAndRows.bind(this);
        this.renderRowDeterminationInput = this.renderRowDeterminationInput.bind(this);
        this.renderIsNewTypeCheckbox = this.renderIsNewTypeCheckbox.bind(this);
    }
    
    renderTitle(chart) {
        return (chart.type.id != 0) ? (
            <div className="col-md-12">
                <DndInput
                    name="title"
                    label="Title"
                    dataType={util.datatypes.STRING.SHORT}
                    onChange={this.props.onChangeChild}
                    dataTask="chart"
                    value={chart.title}
                    />
            </div>
        ) : '';
    }
    
    renderDescription(chart) {
        return (chart.type.id != 0) ? (
            <div className="col-md-12">
                <DndInput
                    name="description"
                    label="Description"
                    dataType={util.datatypes.STRING.HTML.LONG}
                    onChange={this.props.onChangeChild}
                    dataTask="chart"
                    value={chart.description}
                    />
            </div>
        ) : '';
    }
    
    renderColumnsAndRows(chart, picklistTypes, colRowDivStyle) {
        let disableRowInput = false;
        if (chart.type.id == util.itemtypes.TYPE.CHART.DICE) {
            disableRowInput = true;
        } else if (chart.type.id == util.itemtypes.TYPE.CHART.SELECT) {
            console.log('x');
            console.log(chart.isNewType);
            disableRowInput = !chart.isNewType;
        }
        return (chart.type.id != 0) ? (
            <fragment>
                {this.renderIsNewTypeCheckbox(chart, colRowDivStyle)}
                {this.renderRowDeterminationInput(chart, picklistTypes, colRowDivStyle)}
                <div className="col-md-12">
                    <DndInput
                        name="rowCount"
                        label="Rows"
                        dataType={util.datatypes.NUMBER.INT}
                        onChange={this.props.onChangeChild}
                        dataTask="chart"
                        value={chart.rowCount}
                        isReadOnly={disableRowInput}
                        />
                </div>
                <div className="col-md-12">
                    <DndInput
                        name="columnCount"
                        label="Columns"
                        dataType={util.datatypes.NUMBER.INT}
                        onChange={this.props.onChangeChild}
                        dataTask="chart"
                        value={chart.columnCount}
                        />
                </div>
            </fragment>
        ) : '';
    }
    
    renderIsNewTypeCheckbox(chart, colRowDivStyle) {
        let retVal = null;
        if (chart.type.id == util.itemtypes.TYPE.CHART.SELECT) {
            retVal = (
                <div className="col-md-12">
                    <DndInput
                        name="isNewType"
                        label="Is New"
                        dataType={util.datatypes.BOOL}
                        onChange={this.props.onChangeChild}
                        dataTask="chart"
                        value={chart.isNewType}
                        />
                </div>
            );
        }
        return retVal;
    }
    
    renderRowDeterminationInput(chart, picklistTypes, colRowDivStyle) {
        let retVal = null;
        if (chart.type.id == util.itemtypes.TYPE.CHART.DICE) {
            retVal = (
                <div className="col-md-12">
                    <DndInput
                        name="dice"
                        label="Dice"
                        dataType={util.datatypes.SPECIAL.DICE}
                        onChange={this.props.onChangeChild}
                        dataTask="chart"
                        value={chart.dice}
                        buttonType="fill"
                        buttonDatatype={util.datatypes.ACTION.CHART}
                        buttonOverwriteAction="EXPAND"
                        buttonOnClick={this.props.onChangeChild}
                        buttonDisabled={!util.datatypes.compareDataType(chart.dice.rendered, util.datatypes.SPECIAL.DICE, [0, 1, 2])}
                        />
                </div>
            );
        } else if (chart.type.id == util.itemtypes.TYPE.CHART.SELECT) {
            if (chart.isNewType) {
                retVal = (
                    <div className="col-md-12">
                        <DndInput
                            name="selectItemType"
                            label="Type"
                            dataType={util.datatypes.STRING.SHORT}
                            onChange={this.props.onChangeChild}
                            dataTask="chart"
                            value={chart.selectItemType.name}
                            placeholder="New Type Name"
                            />
                    </div>
                );
            } else {
                retVal = (
                    <div className="col-md-12">
                        <DndInput
                            name="selectItemType"
                            label="Type"
                            dataType={util.datatypes.PICKLIST}
                            onChange={this.props.onChangeChild}
                            dataTask="chart"
                            value={chart.selectItemType}
                            picklist={picklistTypes}
                            buttonType="fill"
                            buttonDatatype={util.datatypes.ACTION.CHART}
                            buttonOverwriteAction="EXPAND"
                            buttonOnClick={this.props.onChangeChild}
                            buttonDisabled={chart.selectItemType.id == 0}
                            />
                    </div>
                );
            }
        }
        return retVal;
    }
    
    render() {
        const chart = this.props.editChart;
        const charts = this.props.value;
        const picklists = this.props.picklists;
        const chartTypes = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.CHART);
        const picklistTypes = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.PICKLIST);
        let colRowColSpan = 6;//(chart.type.id == util.itemtypes.TYPE.CHART.STANDARD) ? 6 : 4;
        if (chart.type.id == util.itemtypes.TYPE.CHART.DICE) {
            colRowColSpan = 4;
        } else if (chart.type.id == util.itemtypes.TYPE.CHART.SELECT) {
            colRowColSpan = 3;
        }
        let colRowDivStyle = 'col-md-' + colRowColSpan.toString();
        return (
            <fragment>
                <DndFieldset
                    legend="New Chart Entry"
                    collapsible
                    startCollapsed={charts.length != 0}
                    >
                    <div className="col-md-4">
                        <div className="col-md-12">
                            <DndInput
                                name="type"
                                label="Type (Row Definition)"
                                dataType={util.datatypes.PICKLIST}
                                onChange={this.props.onChangeChild}
                                dataTask="chart"
                                picklist={chartTypes}
                                value={chart.type}
                                />
                        </div>
                        {this.renderTitle(chart)}
                        {this.renderDescription(chart)}
                        {this.renderColumnsAndRows(chart, picklistTypes, colRowDivStyle)}
                    </div>
                    <div className="col-md-8">
                        THIS IS WHERE THE CHART FORM GOES
                    </div>
                </DndFieldset>
                <DndFieldset
                    legend="Exisitng Charts"
                    collapsible
                    startCollapsed={charts.length == 0}
                    >
                    Existing Charts
                </DndFieldset>
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