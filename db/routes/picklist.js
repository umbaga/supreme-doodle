module.exports = function(app, pg, async, pool, itemtypes, common) {
    let results = [];
    let sql = '';
    let vals = [];
    let query = null;
    let tmp = null;
    let resObj = null;
    app.delete('/api/adm/picklist/:id', function(req, res) {
        results = [];
        vals = [];
        sql = '';
        query = null;
        pool.connect(function(err, client, done) {
            if (err) {
                done();
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            async.waterfall([
                function init(cb) {
                    resObj = req.body.picklist;
                    cb(null, resObj);
                },
                function itemTable(resObj, callback) {
                    results = [];
                    vals = [];
                    sql = 'DELETE FROM adm_core_type';
                    sql += ' WHERE id = $1';
                    vals = [
                        resObj.id
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        done();
                        resObj.id = parseInt(results[0].id);
                        return callback(null, resObj);
                    });
                }
            ], function(error, result) {
                if (error) {
                    console.error(error);
                }
                return res.json(result);
            });
        });
    });
    app.put('/api/adm/picklist/:id', function(req, res) {
        results = [];
        vals = [];
        sql = '';
        query = null;
        pool.connect(function(err, client, done) {
            if (err) {
                done();
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            async.waterfall([
                function init(cb) {
                    resObj = req.body.picklist;
                    cb(null, resObj);
                },
                function itemTable(resObj, callback) {
                    results = [];
                    vals = [];
                    sql = 'UPDATE adm_core_type';
                    sql += ' SET "typeName" = $2';
                    sql += ', "applySupplementalPicklist" = $3';
                    sql += ' WHERE id = $1';
                    vals = [
                        resObj.id,
                        resObj.name,
                        resObj.applySupplementalPicklist
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        done();
                        resObj.id = parseInt(results[0].id);
                        return callback(null, resObj);
                    });
                }
            ], function(error, result) {
                if (error) {
                    console.error(error);
                }
                return res.json(result);
            });
        });
    });
    app.post('/api/adm/picklist', function(req, res){
        results = [];
        vals = [];
        sql = '';
        query = null;
        pool.connect(function(err, client, done) {
            if (err) {
                done();
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            async.waterfall([
                function init(cb) {
                    resObj = req.body.picklist;
                    cb(null, resObj);
                },
                function itemTable(resObj, callback) {
                    results = [];
                    vals = [];
                    sql = 'INSERT INTO adm_core_type';
                    sql += '("typeName", "isPicklist", "applySupplementalPicklist")';
                    sql += 'VALUES ($1, $2, $3) RETURNING id;';
                    vals = [
                        resObj.name,
                        true,
                        resObj.applySupplementalPicklist
                    ];
                    query = client.query(new pg.Query(sql, vals));
                    query.on('row', function(row) {
                        results.push(row);
                    });
                    query.on('end', function() {
                        done();
                        resObj.id = parseInt(results[0].id);
                        return callback(null, resObj);
                    });
                }
            ], function(error, result) {
                if (error) {
                    console.error(error);
                }
                return res.json(result);
            });
        });
    });
    app.get('/api/adm/picklists', function(req, res) {
        results = [];
        pool.connect(function(err, client, done) {
            if (err) {
                done();
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            sql = 'SELECT t."id", t."typeName" AS "name", t."applySupplementalPicklist"';
            sql += ' FROM adm_core_type t';
            sql += ' WHERE t."isPicklist" = $1';
            sql += ' ORDER BY t."typeName"';
            vals = [
                true
            ];
            query = client.query(new pg.Query(sql, vals));
            query.on('row', function(row) {
                results.push(row);
            });
            query.on('end', function() {
                done();
                return res.json(results);
            });
        });
    });
};