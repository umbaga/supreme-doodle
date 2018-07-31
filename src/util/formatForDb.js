let bool = {};
bool.asCheckBlank = function(val) {
    if (val) {
        return '\u2713';
    }
    return '';
};
bool.asCheckX = function(val) {
    if (val) {
        return '\u2713';
    }
    return '\u2717';
};
bool.asYesNo = function(val) {
    if (val) {
        return 'Yes';
    }
    return 'No';
};
bool.asTrueFalse = function(val) {
    if (val) {
        return 'True';
    }
    return 'False';
};

let obj = {};
obj.profiencyGroupName = function(val, moduleName) {
    let retVal = moduleName + ' - ' + val.mechanic.name;
    return retVal;
};

let string = {};
string.dieRoll = function(val) {
    let retVal = val;
    return retVal;
};

let number = {};
number.coin = function(val) {
    return val;
};
number.weight = function(val) {
    return val;
};

export {bool, string, number};