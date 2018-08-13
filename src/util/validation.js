export const isReadyToSave = {
    chart: function(val) {
        let retVal = true;
        
        return retVal;
    }
};
export const isReadyToShow = {
    chart: function(val) {
        let retVal = true;
        if (val.columnCount == 0) {
            retVal = false;
        }
        if (val.rowCount == 0) {
            retVal = false;
        }
        return retVal;
    }
};