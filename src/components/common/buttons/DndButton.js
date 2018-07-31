import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class DndButton extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let bootstrapStyle = '';
        let fontawesomeStyle = 'fa fa-';
        let extraText = '';
        let extraClasses = '';
        if (this.props.isBadge) {
            extraClasses += ' badge ';
        }
        extraClasses += ' ' + this.props.additionalButtonStyles;
        switch (this.props.buttonType.toLowerCase()) {
            case 'additem':
                fontawesomeStyle += 'plus-circle';
                bootstrapStyle += 'default';
                break;
            case 'back':
                fontawesomeStyle += 'angle-left';
                bootstrapStyle += 'default';
                break;
            case 'cancel':
                fontawesomeStyle += 'ban';
                bootstrapStyle += 'primary';
                break;
            case 'collapse':
                fontawesomeStyle += 'caret-up';
                bootstrapStyle += 'default';
                break;
            case 'create':
                fontawesomeStyle += 'file-text-o';
                bootstrapStyle += 'primary';
                break;
            case 'delete':
                fontawesomeStyle += 'trash-o';
                bootstrapStyle += 'primary';
                break;
            case 'edit':
                fontawesomeStyle += 'edit';
                bootstrapStyle += 'primary';
                break;
            case 'doubleleft':
                fontawesomeStyle += 'angle-double-left';
                bootstrapStyle += 'default';
                break;
            case 'doubleright':
                fontawesomeStyle += 'angle-double-right';
                bootstrapStyle += 'default';
                break;
            case 'expand':
                fontawesomeStyle += 'caret-down';
                bootstrapStyle += 'default';
                break;
            case 'fill':
                fontawesomeStyle += 'expand';
                bootstrapStyle += 'primary';
                break;
            case 'hamburger':
                fontawesomeStyle += 'bars';
                bootstrapStyle += 'primary';
                break;
            case 'left':
                fontawesomeStyle += 'angle-left';
                bootstrapStyle += 'default';
                break;
            case 'movedown':
                fontawesomeStyle += 'caret-down';
                bootstrapStyle += 'default';
                break;
            case 'moveup':
                fontawesomeStyle += 'caret-up';
                bootstrapStyle += 'default';
                break;
            case 'removeitem':
                fontawesomeStyle += 'minus-circle';
                bootstrapStyle += 'default';
                break;
            case 'reset':
                fontawesomeStyle += 'undo';
                bootstrapStyle += 'primary';
                break;
            case 'right':
                fontawesomeStyle += 'angle-right';
                bootstrapStyle += 'default';
                break;
            case 'save':
                fontawesomeStyle += 'floppy-o';
                bootstrapStyle += 'primary';
                break;
            case 'savenew':
                fontawesomeStyle += 'floppy-o';
                bootstrapStyle += 'primary';
                extraText += '+';
                break;
            case 'search':
                fontawesomeStyle += 'search';
                bootstrapStyle += 'default';
                break;
            case 'view':
                fontawesomeStyle += 'eye';
                bootstrapStyle += 'primary';
                break;
            default:
                fontawesomeStyle += 'cog';
                bootstrapStyle += 'primary';
        }
        const renderedLabel = (this.props.label && this.props.label.length != 0 && this.props.buttonType.toLowerCase() == 'label') ? (
            <div>{this.props.label}</div>
        ) : (
            <div><i className={fontawesomeStyle + extraClasses}></i>{extraText}</div>
        );
        const finalBootstrapStyle = (this.props.bsButtonStyle && this.props.bsButtonStyle.length != 0) ? this.props.bsButtonStyle : bootstrapStyle;
        let name = (this.props.name && this.props.name.length != 0) ? this.props.name : this.props.dataType;
        if (this.props.dataType && this.props.dataType.length != 0) {
            return (
                <Button bsStyle={finalBootstrapStyle} onClick={this.props.onClick} datatype={this.props.dataType} name={name}>
                    {renderedLabel}
                </Button>
            );
        } else {
            return (
                <Button bsStyle={finalBootstrapStyle} onClick={this.props.onClick}>
                    {renderedLabel}
                </Button>
            );
        }
    }
}

DndButton.propTypes = {
    buttonType: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isBadge: PropTypes.bool,
    additionalButtonStyles: PropTypes.string,
    label: PropTypes.string,
    bsButtonStyle: PropTypes.string,
    dataType: PropTypes.string,
    name: PropTypes.string
};

export default DndButton;