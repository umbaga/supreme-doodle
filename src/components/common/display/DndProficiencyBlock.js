import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';

class DndProficiencyBlock extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        const picklists = this.props.picklists;
        const proficiencyCategories = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.PROFICIENCY_CATEGORY);
        return (
            <div>
                {proficiencyCategories.filter(function(category) {
                    return !category.parentId;
                }.bind(this)).map(function(category, idx) {
                    let catIds = [category.id];
                    for (let q = 0; q < proficiencyCategories.length; q++) {
                        if (category.id == proficiencyCategories[q].parentId) {
                            catIds.push(proficiencyCategories[q].id);
                        }
                    }
                    return (
                        <fragment key={idx}>
                            <div>{category.name}:</div>
                            <div>{util.format.forDisplay.obj.proficiencyBlock.assigned(this.props.displayObject, catIds)}</div>
                            <div>{util.format.forDisplay.obj.proficiencyBlock.selectFrom.category(this.props.displayObject, catIds)}</div>
                            <div>{util.format.forDisplay.obj.proficiencyBlock.selectFrom.list(this.props.displayObject, catIds)}</div>
                        </fragment>
                    );
                }.bind(this))}
            </div>
        );
    }
}

DndProficiencyBlock.propTypes = {
    displayObject: PropTypes.object.isRequired,
    picklists: PropTypes.array.isRequired
};

export default DndProficiencyBlock;