import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import util from '../../../util/util';
import DndListItemButtonBar from '../../common/buttons/DndListItemButtonBar';
import * as _templateActions from '../../../actions/admin/_templateActions';
import { Popover, OverlayTrigger } from 'react-bootstrap';

class _TemplateItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedId: this.props.selectedId
        };
        this.edit_Template = this.edit_Template.bind(this);
        this.delete_Template = this.delete_Template.bind(this);
    }
    edit_Template() {
        event.preventDefault();
        this.props.openModal();
        this.props.changeSelectedId(this.props._template.id);
        this.props.onEdit();
        this.setState({selectedId: this.props._template.id});
    }
    delete_Template() {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.delete_Template(this.props._template);
        }
    }
    render() {
        const itemArrayPopover = (
            <Popover id={this.props._template.id}>
                {popoverContent(this.props._template.items)}
            </Popover>
        );
        function popoverContent(val) {
            let tmp = [];
            if (val) {
                for (let x = 0; x < val.length; x++) {
                    tmp.push(<div key={x}>{val[x].name}</div>);
                }
            }
            return tmp;
        }
        return (
            <tr key={this.props._template.id}>
                <td width="50"></td>
                <td>{this.props._template.name}</td>
                <td className="truncate">
                    <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={itemArrayPopover}>
                        <span>{util.format.forDisplay.array.commaDelimitedList(this.props._template.items)}</span>
                    </OverlayTrigger>
                </td>
                <td>
                    <DndListItemButtonBar
                        listItem={this.props._template}
                        onEdit={this.edit_Template}
                        onDelete={this.delete_Template} />
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {_template: ownProps._template};
}

_TemplateItem.propTypes = {
    _template: PropTypes.object.isRequired,
    actions: PropTypes.object,
    openModal: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    onEdit: PropTypes.func
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(_templateActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(_TemplateItem);