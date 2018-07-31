import React from 'react';
import PropTypes from 'prop-types';
//import util from '../../../util/util';

class _TemplateDetails extends React.Component {
    constructor(props) {
        super(props);
        this.renderAtHighestLevel = this.renderAtHighestLevel.bind(this);
    }
    
    componentDidMount() {
        
    }
    
    render() {
        const _template = this.props._template;
        return (
            <div>
                <div><em>{_template.name}</em></div>
            </div>
        );
    }
}

_TemplateDetails.propTypes = {
    _template: PropTypes.object.isRequired,
    picklists: PropTypes.array
};

export default _TemplateDetails;