import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class DndButton extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._onClick = this._onClick.bind(this);
    }

    _onClick(event) {
        if (this.props.changeFocusRefName && this.props.changeFocusRefName.length != 0) {
            this.props.refs[this.props.changeFocusRefName].focus();
        }
        this.props.onClick(event);
    }
    
    render() {
        let bootstrapStyle = '';
        let fontawesomeStyle = 'fa fa-';
        let extraText = '';
        let extraClasses = '';
        if (this.props.isBadge) {
            extraClasses += ' badge ';
        }
        let finalDisabled = this.props.disabled ? this.props.disabled : false;
        let dataTask = (this.props.dataTask) ? this.props.dataTask : 'normal';
        extraClasses += ' ' + this.props.additionalButtonStyles;
        let finalButtonType = (this.props.buttonType) ? this.props.buttonType : 'cog';
        switch (finalButtonType.toLowerCase()) {
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
                fontawesomeStyle += finalButtonType.toLowerCase();
                bootstrapStyle += 'primary';
        }
        const renderedLabel = (this.props.label && this.props.label.length != 0 && finalButtonType.toLowerCase() == 'label') ? (
            <div>{this.props.label}</div>
        ) : (
            <div><i className={fontawesomeStyle + extraClasses}></i>{extraText}</div>
        );
        const finalBootstrapStyle = (this.props.bsButtonStyle && this.props.bsButtonStyle.length != 0) ? this.props.bsButtonStyle : bootstrapStyle;
        let name = (this.props.name && this.props.name.length != 0) ? this.props.name : this.props.dataType;
        if (this.props.dataType && this.props.dataType.length != 0) {
            return (
                <Button bsStyle={finalBootstrapStyle} onClick={this._onClick}
                    datatype={this.props.dataType} name={name} value={this.props.selectedIndex} disabled={finalDisabled}
                    data-task={dataTask}>
                    {renderedLabel}
                </Button>
            );
        } else {
            return (
                <Button bsStyle={finalBootstrapStyle} onClick={this.props.onClick} disabled={finalDisabled}>
                    {renderedLabel}
                </Button>
            );
        }
    }
}

DndButton.propTypes = {
    additionalButtonStyles: PropTypes.string,
    bsButtonStyle: PropTypes.string,
    buttonType: PropTypes.string,
    changeFocusRefName: PropTypes.string,
    dataTask: PropTypes.string,
    dataType: PropTypes.string,
    disabled: PropTypes.bool,
    isBadge: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
    refs: PropTypes.object,
    selectedIndex: PropTypes.number
};

export default DndButton;