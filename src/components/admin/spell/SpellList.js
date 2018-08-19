import React from 'react';
import PropTypes from 'prop-types';
import SpellItem from './SpellItem';

class SpellList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    
    render() {
        return (
            <tbody>
                {this.props.spells.map(function(spell, idx) {
                    return (
                        <SpellItem
                            key={idx}
                            spell={spell}
                            openModal={this.props.openModal}
                            selectedId={this.props.selectedId}
                            changeSelectedId={this.props.changeSelectedId}
                            onEdit={this.props.onEdit}
                            />
                    );
                }.bind(this))}
            </tbody>
        );
    }
}

SpellList.propTypes = {
    spells: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    onEdit: PropTypes.func
};

export default SpellList;