import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndButton from '../buttons/DndButton';

class DndList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        let buttonType = 'removeitem';
        if (this.props.buttonType && this.props.buttonType.length != 0) {
            buttonType = this.props.buttonType;
        }
        let scrollingStyle = {};
        if (!this.props.hideScrolling) {
            let rowHeight = 50;
            let rowCount = 6;
            if (this.props.rowHeight) {
                rowHeight = this.props.rowHeight;
            }
            if (this.props.startScrollingAt) {
                rowCount = this.props.startScrollingAt;
            }
            if (this.props.value.length > rowCount) {
                scrollingStyle = util.styles.scrolling.list;
                scrollingStyle.height = (rowHeight * rowCount).toString() + 'px';
            }
        }
        return (
            <div style={scrollingStyle}>
                <table className="table table-sm table-striped table-hover">
                    <tbody>
                        {this.props.value.map(function(item, idx) {
                            return (
                                <tr key={idx}>
                                    <td>{item[this.props.childName]}</td>
                                    <td>
                                        <div className="pull-right">
                                            <DndButton
                                                buttonType={buttonType}
                                                onClick={this.props.onChange}
                                                name={this.props.name}
                                                dataType={this.props.dataType.REMOVE}
                                                selectedIndex={idx}
                                                />
                                        </div>
                                    </td>
                                </tr>
                            );
                        }.bind(this))}
                    </tbody>
                </table>
            </div>
        );
    }
}

DndList.propTypes = {
    bsButtonStyle: PropTypes.string,
    buttonDatatype: PropTypes.string,
    buttonOnClick: PropTypes.func,
    buttonType: PropTypes.string,
    childName: PropTypes.string,
    dataType: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.array,
        PropTypes.bool
    ]).isRequired,
    startScrollingAt: PropTypes.number,
    rowHeight: PropTypes.number,
    hideScrolling: PropTypes.bool
};

export default DndList;