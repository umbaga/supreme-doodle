import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import util from '../../../util/util';
import DndListItemButtonBar from '../../common/buttons/DndListItemButtonBar';
import * as spellActions from '../../../actions/admin/spellActions';

class SpellItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedId: this.props.selectedId
        };
        this.editSpell = this.editSpell.bind(this);
        this.deleteSpell = this.deleteSpell.bind(this);
    }
    editSpell() {
        event.preventDefault();
        this.props.openModal();
        this.props.changeSelectedId(this.props.spell.id);
        this.props.onEdit();
        this.setState({selectedId: this.props.spell.id});
    }
    deleteSpell() {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.deleteSpell(this.props.spell);
        }
    }
    render() {
        return (
            <tr key={this.props.spell.id}>
                <td width="50"></td>
                <td>{this.props.spell.name}</td>
                <td>
                    <DndListItemButtonBar
                        listItem={this.props.spell}
                        onEdit={this.editSpell}
                        onDelete={this.deleteSpell} />
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {spell: ownProps.spell};
}

SpellItem.propTypes = {
    spell: PropTypes.object.isRequired,
    actions: PropTypes.object,
    openModal: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    onEdit: PropTypes.func
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(spellActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpellItem);