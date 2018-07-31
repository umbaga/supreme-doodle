import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndProficiencyGroupItem from './DndProficiencyGroupItem';

class DndProficiencyGroupDisplay extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const proficiencyGroups = this.props.proficiencyGroups;
        let showArmor = false;
        let showLanguage = false;
        let showSavingThrow = false;
        let showSkill = false;
        let showTool = false;
        let showWeapon = false;
        for (let x = 0; x < proficiencyGroups.length; x++) {
            if (proficiencyGroups[x].category.id == util.itemtypes.PROFICIENCY_CATEGORY.ARMOR || proficiencyGroups[x].category.parentId == util.itemtypes.PROFICIENCY_CATEGORY.ARMOR) {
                showArmor = true;
            }
            if (proficiencyGroups[x].category.id == util.itemtypes.PROFICIENCY_CATEGORY.LANGUAGE || proficiencyGroups[x].category.parentId == util.itemtypes.PROFICIENCY_CATEGORY.LANGUAGE) {
                showLanguage = true;
            }
            if (proficiencyGroups[x].category.id == util.itemtypes.PROFICIENCY_CATEGORY.SAVING_THROW || proficiencyGroups[x].category.parentId == util.itemtypes.PROFICIENCY_CATEGORY.SAVING_THROW) {
                showSavingThrow = true;
            }
            if (proficiencyGroups[x].category.id == util.itemtypes.PROFICIENCY_CATEGORY.SKILL || proficiencyGroups[x].category.parentId == util.itemtypes.PROFICIENCY_CATEGORY.SKILL) {
                showSkill = true;
            }
            if (proficiencyGroups[x].category.id == util.itemtypes.PROFICIENCY_CATEGORY.TOOL || proficiencyGroups[x].category.parentId == util.itemtypes.PROFICIENCY_CATEGORY.TOOL) {
                showTool = true;
            }
            if (proficiencyGroups[x].category.id == util.itemtypes.PROFICIENCY_CATEGORY.WEAPON || proficiencyGroups[x].category.parentId == util.itemtypes.PROFICIENCY_CATEGORY.WEAPON) {
                showWeapon = true;
            }
        }
        let armor = null;
        let language = null;
        let savingThrow = null;
        let skill = null;
        let tool = null;
        let weapon = null;
        if (showArmor) {
            armor = (
                <div>
                    <span>Armor:</span>
                    <span>
                        {proficiencyGroups.filter(function(group) {
                            return group.category.id == util.itemtypes.PROFICIENCY_CATEGORY.ARMOR || group.category.parentId == util.itemtypes.PROFICIENCY_CATEGORY.ARMOR;
                        }).map(group =>
                               <DndProficiencyGroupItem
                                   key={group.id}
                                   proficiencyGroup={group}
                                   />
                          )}
                    </span>
                </div>
            );
        }
        if (showLanguage) {
            language = (
                <div>
                    <span>Languages:</span>
                    <span>
                        {proficiencyGroups.filter(function(group) {
                            return group.category.id == util.itemtypes.PROFICIENCY_CATEGORY.LANGUAGE || group.category.parentId == util.itemtypes.PROFICIENCY_CATEGORY.LANGUAGE;
                        }).map(group =>
                               <DndProficiencyGroupItem
                                   key={group.id}
                                   proficiencyGroup={group}
                                   />
                          )}
                    </span>
                </div>
            );
        }
        if (showSavingThrow) {
            savingThrow = (
                <div>
                    <span>Saving Throws:</span>
                    <span>
                        {proficiencyGroups.filter(function(group) {
                            return group.category.id == util.itemtypes.PROFICIENCY_CATEGORY.SAVING_THROW || group.category.parentId == util.itemtypes.PROFICIENCY_CATEGORY.SAVING_THROW;
                        }).map(group =>
                               <DndProficiencyGroupItem
                                   key={group.id}
                                   proficiencyGroup={group}
                                   />
                          )}
                    </span>
                </div>
            );
        }
        if (showSkill) {
            skill = (
                <div>
                    <span>Skills:</span>
                    <span>
                        {proficiencyGroups.filter(function(group) {
                            return group.category.id == util.itemtypes.PROFICIENCY_CATEGORY.SKILL || group.category.parentId == util.itemtypes.PROFICIENCY_CATEGORY.SKILL;
                        }).map(group =>
                               <DndProficiencyGroupItem
                                   key={group.id}
                                   proficiencyGroup={group}
                                   />
                          )}
                    </span>
                </div>
            );
        }
        if (showTool) {
            tool = (
                <div>
                    <span>Tools:</span>
                    <span>
                        {proficiencyGroups.filter(function(group) {
                            return group.category.id == util.itemtypes.PROFICIENCY_CATEGORY.TOOL || group.category.parentId == util.itemtypes.PROFICIENCY_CATEGORY.TOOL;
                        }).map(group =>
                               <DndProficiencyGroupItem
                                   key={group.id}
                                   proficiencyGroup={group}
                                   />
                          )}
                    </span>
                </div>
            );
        }
        if (showWeapon) {
            weapon = (
                <div>
                    <span>Weapons:</span>
                    <span>
                        {proficiencyGroups.filter(function(group) {
                            return group.category.id == util.itemtypes.PROFICIENCY_CATEGORY.WEAPON || group.category.parentId == util.itemtypes.PROFICIENCY_CATEGORY.WEAPON;
                        }).map(group =>
                               <DndProficiencyGroupItem
                                   key={group.id}
                                   proficiencyGroup={group}
                                   />
                          )}
                    </span>
                </div>
            );
        }
        
        return (
            <div>
                <div>Proficiencies:</div>
                {armor}
                {weapon}
                {savingThrow}
                {skill}
                {language}
                {tool}
            </div>
        );
    }
}

DndProficiencyGroupDisplay.propTypes = {
    proficiencyGroups: PropTypes.array.isRequired
};

export default DndProficiencyGroupDisplay;
