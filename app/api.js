var request = require('request');

module.exports = function(aurora, netsuite){

    // var User = models.user;
    // var Person = models.person;
    // var Thing = models.thing;

    return {

        login:function(req,res)
        {
            if (!req.body.grant_type || !req.body.username || !req.body.password) {
                loginResponse(res, {
                    "error": "Invalid Params"
                }, 400);
                console.log('___________________________ LOGIN POST ____________________________');
                console.log('___________________________________________________________________');
            } else if (req.body.grant_type === 'password') {
                var usr = req.body.username;
                var psw = req.body.password;
                var newurl = 'http://equipovision.com:4510/ServiceForMobile.asmx/LoginBeta?user=' + usr + '&password=' + psw;
                request(newurl, function (error, response, body) {
                    var serverRes = {
                        data: {},
                        code: 200
                    };
                    if (!error && response.statusCode == 200) {
                        try {
                            var msg = JSON.parse(body)[0];
                            if (msg.data) {
                                console.log(msg);
                                serverRes.data = {
                                    "access_token": msg.data,
                                    "account_id": msg.userAttr.SimpleID,
                                    "user_name": msg.userAttr.Name,
                                    "user_fullname": msg.userAttr.usrFirstNameLastName,
                                    "user_isAdmin": msg.userAttr.usrIsAdminClientUser
                                };
                                serverRes.code = 200;
                            } else {
                                serverRes.data = {
                                    "error": msg.errorDesc || "Invalid Credentials"
                                };
                                serverRes.code = 400;
                            }
                        } catch (ex) {
                            serverRes.data = {
                                "error": "Internal Error"
                            };
                            serverRes.code = 500;
                        }
                    } else if (error) {
                        serverRes.data = {
                            "error": "Proxy Error"
                        };
                        serverRes.code = 403;
                    } else {
                        serverRes.data = {
                            "error": "Server Service Unavailable "
                        };
                        serverRes.code = 503;
                    }

                    // serverRes.data = {
                    //          "access_token": "BACKMOCKS",
                    //          "account_id": "12478",
                    //          "user_name": "BACK MOCKS",
                    //          "user_fullname": "BACK MOCKS",
                    //          "user_isAdmin": "BACK MOCKS"
                    //      };
                    // serverRes.code = 200;

                    console.log('___________________________ LOGIN POST ____________________________');
                    console.log('___________________________________________________________________');
                });
            } else {
                loginResponse(res, {
                    "error": "unsupported_grant_type"
                }, 400);
                console.log('___________________________ LOGIN POST ____________________________');
                console.log('___________________________________________________________________');
            }

        },

        // logout: function(req,res)
        // {
        //     req.user.auth_token = null;
        //     req.user.save(function(err,user){
        //         if (err){
        //             res.send(500, {'message': err});
        //         }
        //         res.json({ message: 'See you!'});
        //     });
        // },
        // createPerson: function(req,res)
        // {
        //     var person = req.body.person;

        //     if (typeof person.name != "string") {
        //         res.send(400, {'message': "Name must be a string!"});
        //     }
        //     if (typeof person.age != "number") {
        //         res.send(400, {'message': "Age must be a number!"});
        //     }

        //     var newPerson = new Person({ name: person.name, age: person.age})
        //     newPerson.save(function (err, user) {
        //         if (err){
        //             res.send(500, {'message': err});
        //         }
        //         res.json({ 'message': 'Person was successfully added!'});
        //     });

        // },
        getTransactions: function(req,res)
        {
            var query = "SELECT * FROM"+
                "(SELECT count(*) AS transactions FROM equipovision.NS_TRANSACTIONS) AS transactions,"+
                "(SELECT count(*) AS tlines FROM equipovision.NS_TRANSACTION_LINES) AS tlines,"+
                "(SELECT count(*) AS tlinks FROM equipovision.NS_TRANSACTION_LINKS) AS tlinks;";
            var transactions = aurora.runQuery( function(err, results) {
                if (err)
                  throw err; // or return an error message, or something
                else
                    res.send(results); // as a demo, we'll send back the results to the client;
                                     // if you pass an object to 'res.send()', it will send
                                     // a JSON-response.
              }, query);

        },

        getTransactionsLog: function(req,res)
        {
            var query = "SELECT * FROM"+ 
                "(SELECT count(*) AS finished_T FROM equipovision._SEV_TALEND_JOBS_EXEC WHERE projectName = 'SEV_TRANSACTIONS_AND_LINES' AND jobName = 'TABLE_TRANSACTIONS' AND jobStatus = 'FINISHED') AS finished_T,"+ 
                "(SELECT count(*) AS working_T FROM equipovision._SEV_TALEND_JOBS_EXEC WHERE projectName = 'SEV_TRANSACTIONS_AND_LINES' AND jobName = 'TABLE_TRANSACTIONS' AND jobStatus = 'WORKING') AS working_T,"+
                "(SELECT count(*) AS warn_T FROM equipovision._SEV_TALEND_JOBS_LOG WHERE projectName = 'SEV_TRANSACTIONS_AND_LINES' AND jobName = 'TABLE_TRANSACTIONS' AND logLevel = 'WARN') AS warn_T,"+
                "(SELECT count(*) AS error_T FROM equipovision._SEV_TALEND_JOBS_LOG WHERE projectName = 'SEV_TRANSACTIONS_AND_LINES' AND jobName = 'TABLE_TRANSACTIONS' AND logLevel = 'ERROR') AS error_T,"+
                
                "(SELECT sum(nSuccess) AS finished_TLI FROM equipovision._SEV_TALEND_JOBS_EXEC WHERE projectName = 'SEV_TRANSACTIONS_AND_LINES' AND jobName = 'TABLE_TRANSACTION_LINES' AND jobStatus = 'FINISHED') AS finished_TLI,"+
                "(SELECT count(*) AS working_TLI FROM equipovision._SEV_TALEND_JOBS_EXEC WHERE projectName = 'SEV_TRANSACTIONS_AND_LINES' AND jobName = 'TABLE_TRANSACTION_LINES' AND jobStatus = 'WORKING') AS working_TLI,"+
                "(SELECT count(*) AS warn_TLI FROM equipovision._SEV_TALEND_JOBS_LOG WHERE projectName = 'SEV_TRANSACTIONS_AND_LINES' AND jobName = 'TABLE_TRANSACTION_LINES' AND logLevel = 'WARN') AS warn_TLI,"+
                "(SELECT count(*) AS error_TLI FROM equipovision._SEV_TALEND_JOBS_LOG WHERE projectName = 'SEV_TRANSACTIONS_AND_LINES' AND jobName = 'TABLE_TRANSACTION_LINES' AND logLevel = 'ERROR') AS error_TLI,"+
                
                "(SELECT sum(nSuccess) AS finished_TLK FROM equipovision._SEV_TALEND_JOBS_EXEC WHERE projectName = 'TRANSACTION_LINKS' AND jobName = 'SEV_TransactionLinks_v4' AND jobStatus = 'FINISHED') AS finished_TLK,"+ 
                "(SELECT count(*) AS working_TLK FROM equipovision._SEV_TALEND_JOBS_EXEC WHERE projectName = 'TRANSACTION_LINKS' AND jobName = 'SEV_TransactionLinks_v4' AND jobStatus = 'WORKING') AS working_TLK,"+
                "(SELECT count(*) AS warn_TLK FROM equipovision._SEV_TALEND_JOBS_LOG WHERE projectName = 'TRANSACTION_LINKS' AND jobName = 'SEV_TransactionLinks_v4' AND logLevel = 'WARN') AS warn_TLK,"+
                "(SELECT count(*) AS error_TLK FROM equipovision._SEV_TALEND_JOBS_LOG WHERE projectName = 'TRANSACTION_LINKS' AND jobName = 'SEV_TransactionLinks_v4' AND logLevel = 'ERROR') AS error_TLK;";
            var transactions = aurora.runQuery( function(err, results) {
                if (err)
                  throw err; // or return an error message, or something
                else
                    res.send(results); // as a demo, we'll send back the results to the client;
                                     // if you pass an object to 'res.send()', it will send
                                     // a JSON-response.
              }, query);

        },

        getLastUpdate: function(req,res)
        {
            var query = "SELECT * FROM"+
                "(SELECT DATE_FORMAT(DATE_LAST_MODIFIED, '%d-%m-%Y %H:%i:%s') AS transactions FROM equipovision.NS_TRANSACTIONS order by DATE_LAST_MODIFIED desc limit 1) as transactions,"+ 
                "(SELECT DATE_FORMAT(DATE_LAST_MODIFIED, '%d-%m-%Y %H:%i:%s') AS liness FROM equipovision.NS_TRANSACTION_LINES order by DATE_LAST_MODIFIED desc limit 1) as liness,"+
                "(SELECT DATE_FORMAT(DATE_LAST_MODIFIED, '%d-%m-%Y %H:%i:%s') AS linkss FROM equipovision.NS_TRANSACTION_LINKS order by DATE_LAST_MODIFIED desc limit 1) as linkss;";
            var transactions = aurora.runQuery( function(err, results) {
                if (err)
                  throw err; // or return an error message, or something
                else
                    res.send(results); // as a demo, we'll send back the results to the client;
                                     // if you pass an object to 'res.send()', it will send
                                     // a JSON-response.
              }, query);

        },

        getLastMonthsT: function(req,res)
        {
            var query = "SELECT "+
                "DATE_FORMAT(DATE_LAST_MODIFIED, '%b %Y') as mess, "+
                "COUNT(TRANSACTION_ID) AS cantidad "+
                "FROM equipovision.NS_TRANSACTIONS "+
                "group by DATE_FORMAT(DATE_LAST_MODIFIED, '%Y,%m,%b ') "+
                "order by DATE_FORMAT(DATE_LAST_MODIFIED, '%Y,%m,%b ') DESC "+
                "LIMIT 12;";
            var transactions = aurora.runQuery( function(err, results) {
                if (err)
                  throw err; // or return an error message, or something
                else
                    res.send(results); // as a demo, we'll send back the results to the client;
                                     // if you pass an object to 'res.send()', it will send
                                     // a JSON-response.
              }, query);

        },

        getLastMonthsLN: function(req,res)
        {
            var query = "SELECT "+
                "DATE_FORMAT(DATE_LAST_MODIFIED, '%b %Y') as mess, "+
                "COUNT(TRANSACTION_ID) AS cantidad "+
                "FROM equipovision.NS_TRANSACTION_LINES "+
                "group by DATE_FORMAT(DATE_LAST_MODIFIED, '%Y,%m,%b ') "+
                "order by DATE_FORMAT(DATE_LAST_MODIFIED, '%Y,%m,%b ') DESC "+
                "LIMIT 12;";
            var transactions = aurora.runQuery( function(err, results) {
                if (err)
                  throw err; // or return an error message, or something
                else
                    res.send(results); // as a demo, we'll send back the results to the client;
                                     // if you pass an object to 'res.send()', it will send
                                     // a JSON-response.
              }, query);

        },

        getLastMonthsLK: function(req,res)
        {
            var query = "SELECT "+
                "DATE_FORMAT(DATE_LAST_MODIFIED, '%b %Y') as mess, "+
                "COUNT(ORIGINAL_TRANSACTION_ID) AS cantidad "+
                "FROM equipovision.NS_TRANSACTION_LINKS "+
                "group by DATE_FORMAT(DATE_LAST_MODIFIED, '%Y,%m,%b ') "+
                "order by DATE_FORMAT(DATE_LAST_MODIFIED, '%Y,%m,%b ') DESC "+
                "LIMIT 12;";
            var transactions = aurora.runQuery( function(err, results) {
                if (err)
                  throw err; // or return an error message, or something
                else
                    res.send(results); // as a demo, we'll send back the results to the client;
                                     // if you pass an object to 'res.send()', it will send
                                     // a JSON-response.
              }, query);

        }
        // removePerson: function(req,res)
        // {
        //     var _id = req.params.id;

        //     Person.remove({ _id:_id}, function (err, user) {
        //         if (err){
        //             res.send(500, {'message': err});
        //         }
        //         res.json({ 'message': 'Person was successfully removed!'});
        //     })


        // },
        // getPeople: function(req,res)
        // {

        //     Person.find(function(err,people){
        //         res.json({people: people });
        //     })


        // },
        // createThing: function(req,res)
        // {

        //     console.log(req.body);
        //     var thing = req.body.thing;

        //     if (typeof thing.name != "string") {
        //         res.send(400, {'message': "Name must be a string!"});
        //     }
        //     if (typeof thing.size != "number") {
        //         res.send(400, {'message': "Size must be a number!"});
        //     }

        //     var newThing = new Thing({ name: thing.name, size: thing.size})
        //     newThing.save(function (err, thing) {
        //         if (err){
        //             res.send(500, {'message': err});
        //         }
        //         res.json({ 'message': 'Thing was successfully created!'});
        //     });

        // },
        // updateThing: function(req,res)
        // {
        //     var _id = req.params.id;
        //     console.log(req.body);
        //     console.log(_id);

        //     var thing = req.body.thing;

        //     var query = { _id: _id };
        //     Thing.update(query, {name:thing.name,size:thing.size}, null, function (err, thing) {
        //         if (err){
        //             res.send(500, {'message': err});
        //         }
        //         res.json({ 'message': 'Thing was successfully updated!'});
        //     })

        // },
        // removeThing: function(req,res)
        // {
        //     var _id = req.params.id;

        //     Thing.remove({ _id:_id}, function (err, user) {
        //         if (err){
        //             res.send(500, {'message': err});
        //         }
        //         res.json({ 'message': 'Thing was successfully removed!'});
        //     })

        // },

        // getThings: function(req,res)
        // {
        //     Thing.find(function(err,things){
        //         res.json({things: things });
        //     });

        // }


    }

}



