import React from 'react';
import PropTypes from 'prop-types';
import _TemplateItem from './_TemplateItem';

class _TemplateList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    
    render() {
        return (
            <tbody>
                {this.props._templates.map(function(_template, idx) {
                    return (
                        <_TemplateItem
                            key={idx}
                            _template={_template}
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

_TemplateList.propTypes = {
    _templates: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    onEdit: PropTypes.func
};

export default _TemplateList;