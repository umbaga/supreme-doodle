import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import util from '../../../util/util';
import DndListItemButtonBar from '../../common/buttons/DndListItemButtonBar';
import * as spelllistActions from '../../../actions/admin/spelllistActions';

class SpelllistItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedId: this.props.selectedId
        };
        this.editSpelllist = this.editSpelllist.bind(this);
        this.deleteSpelllist = this.deleteSpelllist.bind(this);
    }
    editSpelllist() {
        event.preventDefault();
        this.props.openModal();
        this.props.changeSelectedId(this.props.spelllist.id);
        this.props.onEdit();
        this.setState({selectedId: this.props.spelllist.id});
    }
    deleteSpelllist() {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.deleteSpelllist(this.props.spelllist);
        }
    }
    render() {
        return (
            <tr key={this.props.spelllist.id}>
                <td width="50"></td>
                <td>{this.props.spelllist.name}</td>
                <td>
                    <DndListItemButtonBar
                        listItem={this.props.spelllist}
                        onEdit={this.editSpelllist}
                        onDelete={this.deleteSpelllist} />
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {spelllist: ownProps.spelllist};
}

SpelllistItem.propTypes = {
    spelllist: PropTypes.object.isRequired,
    actions: PropTypes.object,
    openModal: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    onEdit: PropTypes.func
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(spelllistActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpelllistItem);