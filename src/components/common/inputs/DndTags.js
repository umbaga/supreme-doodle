import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';

class DndTags extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
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
                {this.props.value.map(function(item, idx) {
                    return (
                        <div className="badge badge-pill dnd-tag" key={idx}>
                            <span className="dnd-tag-text">{item[this.props.childName]}</span>
                            <i
                                className="close fa fa-times dnd-tag-x"
                                onClick={this.props.onChange}
                                name={this.props.name}
                                datatype={this.props.dataType.REMOVE}
                                value={idx}
                                ></i>
                        </div>
                    );
                }.bind(this))}
            </div>
        );
    }
}

DndTags.propTypes = {
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

export default DndTags;