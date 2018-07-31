import React from 'react';
import {Link} from 'react-router';

class AdminHomePage extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>Admin</h1>
                <p>Admin Categories Here:</p>
                <ul>
                    <li><Link to="admin/testbed">TESTBED</Link></li>
                    <li><Link to="admin/Itemtypes">Item Types</Link></li>
                </ul>
            </div>
        );
    }
}

export default AdminHomePage;