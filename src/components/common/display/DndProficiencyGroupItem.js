import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';

class DndProficiencyGroupItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const proficiencyGroup = this.props.proficiencyGroup;
        return (
            <div>
                {util.format.forDisplay.obj.proficiencyGroup(proficiencyGroup)}
            </div>
        );
    }
}

DndProficiencyGroupItem.propTypes = {
    proficiencyGroup: PropTypes.object.isRequired
};

export default DndProficiencyGroupItem;
