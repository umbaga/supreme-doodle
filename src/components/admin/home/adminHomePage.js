import React from 'react';
import {Link} from 'react-router';

class AdminHomePage extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>Adm--in</h1>
                <p>Admin Categories Here:</p>
                <ul>
                    <li><Link to="admin/testbed">TESTBED</Link></li>
                    <li><Link to="admin/itemtype">Item Types</Link></li>
                    <li><Link to="admin/picklist">Picklists</Link></li>
                    <li><Link to="admin/proficiency">Proficiencies</Link></li>
                    <li><Link to="admin/equipment">Equipment</Link></li>
                </ul>
            </div>
        );
    }
}

export default AdminHomePage;