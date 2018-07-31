import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DndListItemButtonBar from '../../common/buttons/DndListItemButtonBar';
import * as _templateActions from '../../../actions/admin/_templateActions';
//import util from '../../../util/util';

class _TemplateListItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedId: this.props.selectedId
        };
        this.edit_Template = this.edit_Template.bind(this);
        this.delete_Template = this.delete_Template.bind(this);
        this.view_TemplateDetails = this.view_TemplateDetails.bind(this);
    }
    edit_Template() {
        event.preventDefault();
        this.props.openModal();
        this.props.changeSelectedId(this.props._template.id);
        this.props.onEdit();
        this.setState({selectedId: this.props._template.id, canEdit: true});
    }
    delete_Template() {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.delete_Template(this.props._template);
        }
    }
    view_TemplateDetails() {
        event.preventDefault();
        this.props.openModal();
        this.props.changeSelectedId(this.props._template.id);
        this.props.onViewDetails();
        this.setState({selectedId: this.props._template.id, canEdit: false});
    }
    render() {
        return (
            <tr key={this.props._template.id}>
                <td width="90%">{this.props._template.name}</td>
                <td width="10%">
                    <DndListItemButtonBar
                        listItem={this.props._template}
                        onEdit={this.edit_Template}
                        onDelete={this.delete_Template}
                        onViewDetails={this.view_TemplateDetails}
                        showDetailsButton />
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {_template: ownProps._template};
}

_TemplateListItem.propTypes = {
    _template: PropTypes.object.isRequired,
    actions: PropTypes.object,
    changeSelectedId: PropTypes.func.isRequired,
    onEdit: PropTypes.func,
    onViewDetails: PropTypes.func,
    openModal: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(_templateActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(_TemplateListItem);