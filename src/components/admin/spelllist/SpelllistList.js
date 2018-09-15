import React from 'react';
import PropTypes from 'prop-types';
import SpelllistItem from './SpelllistItem';

class SpelllistList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    
    render() {
        return (
            <tbody>
                {this.props.spelllists.map(function(spelllist, idx) {
                    return (
                        <SpelllistItem
                            key={idx}
                            spelllist={spelllist}
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

SpelllistList.propTypes = {
    spelllists: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    onEdit: PropTypes.func
};

export default SpelllistList;