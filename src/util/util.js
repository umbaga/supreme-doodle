import * as objectModel from './emptyObjects';
import * as forDisplay from './formatForDisplay';
import * as forDb from './formatForDb';
import * as dataTypes from './dataTypes';
//import * as picklistInfo from './picklistInfo';
import * as itemTypeDefinition from './itemTypeDefinition';
import unicode from './unicode';
import * as common from './commonFunctions';
import * as hardCoded from './hardcoded';
//import * as hardCodedPicklists from './hardCodedPicklists';

let util = {};
util.objectModel = objectModel;
let format = {};
format.forDisplay = forDisplay;
format.forDb = forDb;
util.format = format;
util.datatypes = dataTypes;
//util.picklists = picklistInfo;
//util.common.picklists.hardCodedPicklists = hardCodedPicklists;
util.unicode = unicode;
util.common = common;
util.itemtypes = itemTypeDefinition;
util.hardCoded = hardCoded;

export default util;