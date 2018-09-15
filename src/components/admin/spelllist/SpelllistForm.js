import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../../common/inputs/DndInput';
import DndUniversalInput from '../../common/inputs/DndUniversalInput';
import util from '../../../util/util';
import { Tabs, Tab } from 'react-bootstrap';

class SpelllistForm extends React.Component {
    constructor(props) {
        super(props);
        this.setFocus = this.setFocus.bind(this);
        this.getSpellsByLevel = this.getSpellsByLevel.bind(this);
    }
    
    componentDidMount() {
        this.refs.name.setFocus();
    }
    
    setFocus() {
        this.refs.name.setFocus();
    }
    
    getSpellsByLevel(spells, level) {
        return spells.filter(function (spell) {
            return spell.level == level;
        });
    }
    render() {
        let spelllist = this.props.spelllist;
        spelllist.spells = spelllist.spells.sort(function(a, b) {
            if (a.name > b.name) {
                return 1;
            } else if (a.name < b.name) {
                return -1;
            } else {
                return 0;
            }
        });
        let picklists = this.props.picklists;
        let spells = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.SPELL);
        return (
            <div>
                <form>
                    <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="General">
                            <DndUniversalInput
                                ref="name"
                                referenceObject={spelllist}
                                onChange={this.props.onChange}
                                picklists={picklists}
                                hideDescription
                                />
                        </Tab>
                        <Tab eventKey={2} title="Cantrips">
                            <DndInput
                                name="spells"
                                label="Cantrips"
                                dataType={util.datatypes.ARRAY.LIST.ADD.PICKLIST}
                                value={this.getSpellsByLevel(spelllist.spells, 0)}
                                onChange={this.props.onChange}
                                childValue={this.props.editItem.name}
                                childName="name"
                                buttonOnClick={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                                changeFocusRefName="spells"
                                picklist={this.getSpellsByLevel(spells, 0)}
                                listTableStartScrollingAt={8}
                                dataTask="item"
                                />
                        </Tab>
                        <Tab eventKey={3} title="1st">
                            <DndInput
                                name="spells"
                                label="Cantrips"
                                dataType={util.datatypes.ARRAY.LIST.ADD.PICKLIST}
                                value={this.getSpellsByLevel(spelllist.spells, 1)}
                                onChange={this.props.onChange}
                                childValue={this.props.editItem.name}
                                childName="name"
                                buttonOnClick={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                                changeFocusRefName="spells"
                                picklist={this.getSpellsByLevel(spells, 1)}
                                listTableStartScrollingAt={8}
                                dataTask="item"
                                />
                        </Tab>
                        <Tab eventKey={4} title="2nd">
                            <DndInput
                                name="spells"
                                label="Cantrips"
                                dataType={util.datatypes.ARRAY.LIST.ADD.PICKLIST}
                                value={this.getSpellsByLevel(spelllist.spells, 2)}
                                onChange={this.props.onChange}
                                childValue={this.props.editItem.name}
                                childName="name"
                                buttonOnClick={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                                changeFocusRefName="spells"
                                picklist={this.getSpellsByLevel(spells, 2)}
                                listTableStartScrollingAt={8}
                                dataTask="item"
                                />
                        </Tab>
                        <Tab eventKey={5} title="3rd">
                            <DndInput
                                name="spells"
                                label="Cantrips"
                                dataType={util.datatypes.ARRAY.LIST.ADD.PICKLIST}
                                value={this.getSpellsByLevel(spelllist.spells, 3)}
                                onChange={this.props.onChange}
                                childValue={this.props.editItem.name}
                                childName="name"
                                buttonOnClick={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                                changeFocusRefName="spells"
                                picklist={this.getSpellsByLevel(spells, 3)}
                                listTableStartScrollingAt={8}
                                dataTask="item"
                                />
                        </Tab>
                        <Tab eventKey={6} title="4th">
                            <DndInput
                                name="spells"
                                label="Cantrips"
                                dataType={util.datatypes.ARRAY.LIST.ADD.PICKLIST}
                                value={this.getSpellsByLevel(spelllist.spells, 4)}
                                onChange={this.props.onChange}
                                childValue={this.props.editItem.name}
                                childName="name"
                                buttonOnClick={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                                changeFocusRefName="spells"
                                picklist={this.getSpellsByLevel(spells, 4)}
                                listTableStartScrollingAt={8}
                                dataTask="item"
                                />
                        </Tab>
                        <Tab eventKey={7} title="5th">
                            <DndInput
                                name="spells"
                                label="Cantrips"
                                dataType={util.datatypes.ARRAY.LIST.ADD.PICKLIST}
                                value={this.getSpellsByLevel(spelllist.spells, 5)}
                                onChange={this.props.onChange}
                                childValue={this.props.editItem.name}
                                childName="name"
                                buttonOnClick={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                                changeFocusRefName="spells"
                                picklist={this.getSpellsByLevel(spells, 5)}
                                listTableStartScrollingAt={8}
                                dataTask="item"
                                />
                        </Tab>
                        <Tab eventKey={8} title="6th">
                            <DndInput
                                name="spells"
                                label="Cantrips"
                                dataType={util.datatypes.ARRAY.LIST.ADD.PICKLIST}
                                value={this.getSpellsByLevel(spelllist.spells, 6)}
                                onChange={this.props.onChange}
                                childValue={this.props.editItem.name}
                                childName="name"
                                buttonOnClick={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                                changeFocusRefName="spells"
                                picklist={this.getSpellsByLevel(spells, 6)}
                                listTableStartScrollingAt={8}
                                dataTask="item"
                                />
                        </Tab>
                        <Tab eventKey={9} title="7th">
                            <DndInput
                                name="spells"
                                label="Cantrips"
                                dataType={util.datatypes.ARRAY.LIST.ADD.PICKLIST}
                                value={this.getSpellsByLevel(spelllist.spells, 7)}
                                onChange={this.props.onChange}
                                childValue={this.props.editItem.name}
                                childName="name"
                                buttonOnClick={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                                changeFocusRefName="spells"
                                picklist={this.getSpellsByLevel(spells, 7)}
                                listTableStartScrollingAt={8}
                                dataTask="item"
                                />
                        </Tab>
                        <Tab eventKey={10} title="8th">
                            <DndInput
                                name="spells"
                                label="Cantrips"
                                dataType={util.datatypes.ARRAY.LIST.ADD.PICKLIST}
                                value={this.getSpellsByLevel(spelllist.spells, 8)}
                                onChange={this.props.onChange}
                                childValue={this.props.editItem.name}
                                childName="name"
                                buttonOnClick={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                                changeFocusRefName="spells"
                                picklist={this.getSpellsByLevel(spells, 8)}
                                listTableStartScrollingAt={8}
                                dataTask="item"
                                />
                        </Tab>
                        <Tab eventKey={11} title="9th">
                            <DndInput
                                name="spells"
                                label="Cantrips"
                                dataType={util.datatypes.ARRAY.LIST.ADD.PICKLIST}
                                value={this.getSpellsByLevel(spelllist.spells, 9)}
                                onChange={this.props.onChange}
                                childValue={this.props.editItem.name}
                                childName="name"
                                buttonOnClick={this.props.onChange}
                                onChangeChild={this.props.onChangeChild}
                                buttonDatatype={util.datatypes.ACTION.LIST.PICKLIST}
                                changeFocusRefName="spells"
                                picklist={this.getSpellsByLevel(spells, 9)}
                                listTableStartScrollingAt={8}
                                dataTask="item"
                                />
                        </Tab>
                    </Tabs>
                </form>
            </div>
        );
    }
}

SpelllistForm.propTypes = {
    editItem: PropTypes.object.isRequired,
    spelllist: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onSaveNew: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeChild: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isCreate: PropTypes.bool.isRequired,
    picklists: PropTypes.array,
    saving: PropTypes.bool
};

export default SpelllistForm;