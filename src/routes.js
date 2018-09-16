import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';

import AdminHomePage from './components/admin/home/adminHomePage';

import BackgroundPage from './components/admin/background/BackgroundPage';
import DescriptionPage from './components/admin/description/DescriptionPage';
import EquipmentPage from './components/admin/equipment/EquipmentPage';
import ItemtypePage from './components/admin/itemtype/ItemtypePage';
import PicklistPage from './components/admin/picklist/PicklistPage';
import ProficiencyPage from './components/admin/proficiency/ProficiencyPage';
import RacePage from './components/admin/race/RacePage';
import SpellPage from './components/admin/spell/SpellPage';
import SpelllistPage from './components/admin/spelllist/SpelllistPage';

import AboutPage from './components/about/AboutPage';
import LogInPage from './components/LogInPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={AdminHomePage} />
        <Route path="/Home" component={AdminHomePage} />
        <Route path="/admin/background" component={BackgroundPage} />
        <Route path="/admin/description" component={DescriptionPage} />
        <Route path="/admin/equipment" component={EquipmentPage} />
        <Route path="/admin/itemtype" component={ItemtypePage} />
        <Route path="/admin/picklist" component={PicklistPage} />
        <Route path="/admin/proficiency" component={ProficiencyPage} />
        <Route path="/admin/race" component={RacePage} />
        <Route path="/admin/spell" component={SpellPage} />
        <Route path="/admin/spelllist" component={SpelllistPage} />
        <Route path="/login" component={LogInPage} />
        <Route path="/about" component={AboutPage} />
    </Route>
);