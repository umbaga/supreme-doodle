import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../../../actions/sessionActions';

class Header extends React.Component {
    constructor() {
        super();
        this.logOut = this.logOut.bind(this);
    }

    logOut(event) {
        event.preventDefault();
        this.props.actions.logOutUser();
    }

    render() {
        if (this.props.logged_in) {
            return (
                <nav>
                    <IndexLink to="/" activeClassName="active">Home</IndexLink>
                    {" | "}
                    <Link to="/Home" activeClassName="active">Admin</Link>
                    {" | "}
                    <a href="/logout" onClick={this.logOut}>log out</a>
                </nav>
            );
        } else {
            return (
                <nav>
                    <IndexLink to="/" activeClassName="active">Home</IndexLink>
                    {" | "}
                    <Link to="/Home" activeClassName="active">Admin</Link>
                    {" | "}
                    <Link to="/login" activeClassName="active">log in</Link>
                </nav>
            );
        }
    }
}

Header.propTypes = {
    actions: PropTypes.object.isRequired,
    logged_in: PropTypes.bool
};

function mapStateToProps(state) {
    return {logged_in: state.session};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(sessionActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);