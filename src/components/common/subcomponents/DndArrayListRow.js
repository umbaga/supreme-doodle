import React from 'react';
import PropTypes from 'prop-types';
import DndButton from '../buttons/DndButton';
import DndListItemButtonBar from '../buttons/DndListItemButtonBar';
import DndIncrementButtons from '../buttons/DndIncrementButtons';
import { Panel } from 'react-bootstrap';

class DndArrayListRow extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._onSelectEditedItem = this._onSelectEditedItem.bind(this);
        this._onRemoveItem = this._onRemoveItem.bind(this);
    }
    
    _onSelectEditedItem(event) {
        this.props.onSelectItem(event, this.props.item);
    }
    
    _onRemoveItem(event) {
        this.props.onRemoveItem(event, this.props.item);
    }
    
    render() {
        const item = this.props.item;
        const items = this.props.items;
        return (
            <tr key={item.id}>
                <td>
                    <DndButton
                        buttonType={item.id == this.props.showThisId ? 'collapse' : 'expand'}
                        onClick={this.props.boundClick}
                        />
                </td>
                <td>
                    {item.title}
                    <Panel collapsible expanded={this.props.showThisId == item.id}>
                            {this.props.children}
                    </Panel>
                </td>
                <td>
                    <DndIncrementButtons
                        item={item}
                        items={items}
                        onMoveItem={this.props.onChangeOrder}
                        moveItemDownAction={this.props.moveItemDownAction}
                        moveItemUpAction={this.props.moveItemUpAction}
                        name={this.props.name}
                        />
                </td>
                <td>
                    <DndListItemButtonBar
                        listItem={item}
                        onEdit={this._onSelectEditedItem}
                        onDelete={this._onRemoveItem}
                        editAction={this.props.selectItemAction}
                        deleteAction={this.props.removeItemAction}
                        returnCompleteObject
                        name={this.props.name}
                        />
                </td>
            </tr>
        );
    }
}

DndArrayListRow.propTypes = {
    children: PropTypes.object,
    item: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    onChangeOrder: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    boundClick: PropTypes.func,
    showThisId: PropTypes.number,
    removeItemAction: PropTypes.string,
    selectItemAction: PropTypes.string,
    moveItemDownAction: PropTypes.string,
    moveItemUpAction: PropTypes.string,
    name: PropTypes.string
};

export default DndArrayListRow;