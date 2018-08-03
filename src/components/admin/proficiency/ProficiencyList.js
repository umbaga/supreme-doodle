import React from 'react';
import PropTypes from 'prop-types';
import ProficiencyItem from './ProficiencyItem';
//import util from '../../../util/util';

class ProficiencyList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    
    render() {
        return (
            <tbody>
                {this.props.proficiencies.map(function(proficiency, idx) {
                    return (
                        <ProficiencyItem
                            key={idx}
                            proficiency={proficiency}
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
/*
                            */

ProficiencyList.propTypes = {
    proficiencies: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    onEdit: PropTypes.func
};

export default ProficiencyList;