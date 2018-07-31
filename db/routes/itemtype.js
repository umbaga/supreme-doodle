module.exports = function(app, pg, async, pool, itemtypes, common) {
    let results = [];
    let sql = '';
    let vals = [];
    let query = null;
    let tmp = null;
    let resObj = null;
    app.delete('/api/adm/itemtype/:id', function(req, res) {
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
                    resObj = req.body.itemtype;
                    cb(null, resObj);
                },
                function typeTable(resObj, callback) {
                    results = [];
                    vals = [];
                    sql = 'DELETE FROM adm_core_type';
                    SQL += ' WHERE id = $1';
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
    app.put('/api/adm/itemtype/:id', function(req, res) {
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
                    resObj = req.body.itemtype;
                    cb(null, resObj);
                },
                function typeTable(resObj, callback) {
                    results = [];
                    vals = [];
                    sql = 'UPDATE adm_core_type';
                    sql += ' SET "typename" = $2';
                    sql += ', "isPicklist" = $3';
                    sql += ', "applySypplementalPicklist" = $4';
                    sql += ' WHERE id = $1';
                    vals = [
                        resObj.id,
                        resObj.name,
                        resObj.isPicklist,
                        resObj.applySypplementalPicklist
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
    app.post('/api/adm/itemtype', function(req, res){
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
                    resObj = req.body.itemtype;
                    cb(null, resObj);
                },
                function typeTable(resObj, callback) {
                    results = [];
                    vals = [];
                    sql = 'INSERT INTO adm_core_type';
                    sql += '("typeName", "isPicklist", "applySypplementalPicklist")';
                    sql += 'VALUES ($1, $2, $3) RETURNING id;';
                    vals = [
                        resObj.name,
                        resObj.isPicklist,
                        resObj.applySypplementalPicklist
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
    app.get('/api/adm/itemtypes', function(req, res) {
        results = [];
        pool.connect(function(err, client, done) {
            if (err) {
                done();
                console.error(err);
                return res.status(500).json({ success: false, data: err});
            }
            sql = 'SELECT t."id", t."typeName" AS "name", t."isPicklist", t."isPicklist", t."applySupplementalPicklist"';
            sql += ' FROM adm_core_type t';
            sql += ' ORDER BY t."typeName"';
            query = client.query(new pg.Query(sql));
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