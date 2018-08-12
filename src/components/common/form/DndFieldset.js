import React from 'react';
import PropTypes from 'prop-types';

class DndFieldset extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            hideContents: this.props.startCollapsed ? this.props.startCollapsed : false
        };
        this._onClickLegend = this._onClickLegend.bind(this);
    }
    
    _onClickLegend() {
        this.setState({hideContents: !this.state.hideContents});
    }
    
    render() {
        let finalCollapsible = this.props.collapsible;
        if (finalCollapsible == null || finalCollapsible == undefined) {
            finalCollapsible = (this.props.startCollapsed) ? this.props.startCollapsed : false;
        }
        let finalLegend = this.props.legend;
        let collapseIconStyle = (this.props.iconCollapse) ? this.props.iconCollapse : 'chevron-circle-up';
        let expandIconStyle = (this.props.iconExpand) ? this.props.iconExpand : 'chevron-circle-down';
        let collapseStyle = 'fa fa-' + collapseIconStyle + ' legend-icon';
        let expandStyle = 'fa fa-' + expandIconStyle + ' legend-icon';
        let collapseIcon = finalCollapsible ? (
            <i className={this.state.hideContents ? expandStyle : collapseStyle}/>
        ) : null;
        return (
            <fieldset>
                <legend onClick={this._onClickLegend}>{collapseIcon}{finalLegend}</legend>
                <div className={this.state.hideContents ? 'hidden' : ''}>
                    {this.props.children}
                </div>
            </fieldset>
        );
    }
}

DndFieldset.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    collapsible: PropTypes.bool,
    iconCollapse: PropTypes.string,
    iconExpand: PropTypes.string,
    legend: PropTypes.string,
    startCollapsed: PropTypes.bool
};

export default DndFieldset;