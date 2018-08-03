import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DndListItemButtonBar from '../../common/buttons/DndListItemButtonBar';
import * as proficiencyActions from '../../../actions/admin/proficiencyActions';

class ProficiencyItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedId: this.props.selectedId
        };
        this.editProficiency = this.editProficiency.bind(this);
        this.deleteProficiency = this.deleteProficiency.bind(this);
    }
    editProficiency() {
        event.preventDefault();
        this.props.openModal();
        this.props.changeSelectedId(this.props.proficiency.id);
        this.props.onEdit();
        this.setState({selectedId: this.props.proficiency.id});
    }
    deleteProficiency() {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.deleteProficiency(this.props.proficiency);
        }
    }
    render() {
        const proficiency = this.props.proficiency;
        let catName = (proficiency.category && proficiency.category.name && proficiency.category.name.length != 0) ? proficiency.category.name : '';
        let abilityName = (proficiency.abilityScore && proficiency.abilityScore.name && proficiency.abilityScore.name.length != 0) ? proficiency.abilityScore.name : '';
        let rarityName = (proficiency.language && proficiency.language.rarity && proficiency.language.rarity.name && proficiency.language.rarity.name.length != 0) ? proficiency.language.rarity.name : '';
        let scriptName = (proficiency.language && proficiency.language.script && proficiency.language.script.name && proficiency.language.script.name.length != 0) ? proficiency.language.script.name : '';
        return (
            <tr key={this.props.proficiency.id}>
                <td width="50"></td>
                <td>{proficiency.name}</td>
                <td>{catName}</td>
                <td>{abilityName}</td>
                <td>{rarityName}</td>
                <td>{scriptName}</td>
                <td>
                    <DndListItemButtonBar
                        listItem={this.props.proficiency}
                        onEdit={this.editProficiency}
                        onDelete={this.deleteProficiency} />
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {proficiency: ownProps.proficiency};
}

ProficiencyItem.propTypes = {
    proficiency: PropTypes.object.isRequired,
    actions: PropTypes.object,
    openModal: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    onEdit: PropTypes.func
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(proficiencyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProficiencyItem);