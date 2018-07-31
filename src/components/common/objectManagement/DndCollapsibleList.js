import React from 'react';
import PropTypes from 'prop-types';
import DndCollapsibleTableRow from '../subcomponents/DndCollapsibleTableRow';
import DndCollapsibleTableRowContents from '../subcomponents/DndCollapsibleTableRowContents';

class DndCollapsibleList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showThisId: null
        };
        this._onRemoveItem = this._onRemoveItem.bind(this);
        this.setShowThisId = this.setShowThisId.bind(this);
    }
    
    _onRemoveItem(event, item) {
        this.props.onChange(event, item);
        this.props.onReset();
    }
    
    setShowThisId(obj) {
        let newId = null;
        if (this.state.showThisId != obj.id) {
            newId = obj.id;
        }
        this.setState({showThisId: newId});
    }
    
    render() {
        const objects = this.props.objects;
        return (
            <table className="table table-sm table-striped table-hover">
                <tbody>
                    {objects.sort(function(a, b) {
                        if (a.orderIndex < b.orderIndex) {
                            return -1;
                        }
                        if (a.orderIndex > b.orderIndex) {
                            return 1;
                        }
                        return 0;
                    }).map(function(obj) {
                        let boundClick = this.setShowThisId.bind(this, obj);
                        return (<DndCollapsibleTableRow
                                    key={obj.id}
                                    item={obj}
                                    items={objects}
                                    onChangeOrder={this.props.onChange}
                                    onSelectItem={this.props.onSelectEditedItem}
                                    onRemoveItem={this._onRemoveItem}
                                    removeItemAction={this.props.removeItemAction}
                                    selectItemAction={this.props.selectItemAction}
                                    boundClick={boundClick}
                                    showThisId={this.state.showThisId}
                                    moveItemDownAction={this.props.moveItemDownAction}
                                    moveItemUpAction={this.props.moveItemUpAction}
                                    >
                                    <DndCollapsibleTableRowContents
                                        item={obj}
                                        />
                                </DndCollapsibleTableRow>);
                    }.bind(this))}
                </tbody>
            </table>
        );
    }
}

DndCollapsibleList.propTypes = {
    objects: PropTypes.array.isRequired,
    onSelectEditedItem: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    removeItemAction: PropTypes.string,
    selectItemAction: PropTypes.string,
    moveItemDownAction: PropTypes.string,
    moveItemUpAction: PropTypes.string
};

export default DndCollapsibleList;
