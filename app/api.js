var request = require('request');

module.exports = function(aurora){

    return {

        //Función que permite el logeo de los usuarios utilizando una petición al servidor de equipo vision
        login:function(req,res)
        {
            if (req.body.username != null && req.body.password != null) {
                console.log('___________________________ LOGIN POST ____________________________');
                console.log('___________________________________________________________________');
                var usr = req.body.username;
                var psw = req.body.password;
                var newurl = 'http://equipovision.com:4510/ServiceForMobile.asmx/LoginBeta?user=' + usr + '&password=' + psw;
                request(newurl, function (error, response, body) {
                    var serverRes = {
                        data: {},
                        code: 200
                    };
                    if (!error && response.statusCode == 200) {
                        var msg = JSON.parse(body);
                        try {
                            if (msg[0].userAttr != null) {
                                serverRes.data = {
                                    "access_token": msg[0].data,
                                    "account_id": msg[0].userAttr.SimpleID,
                                    "user_name": msg[0].userAttr.Name,
                                    "user_fullname": msg[0].userAttr.usrFirstNameLastName,
                                    "user_isAdmin": msg[0].userAttr.usrIsAdminClientUser
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

                    res.send(serverRes);
                });
            } else {
                res.send(500, {'message': "Insert username or password!"});
                console.log('___________________________ LOGIN POST ____________________________');
                console.log('___________________________________________________________________');
            }

        },

        //Cierra la sesión del usuario por medio de un token
        logout: function(req,res)
        {
            req.user.auth_token = null;
            req.user.save(function(err,user){
                if (err){
                    res.send(500, {'message': err});
                }
                res.json({ message: 'See you!'});
            });
        },

        //Obtiene el numero total de transacciones, lines, links de aurora y netsuite 
        getTransactions: function(req,res)
        {
            var query = "SELECT * FROM equipovision._SEV_DASHBOARD_RECORDS_SUMMARY;";
            var transactions = aurora.runQuery( function(err, results) {
                if (err)
                  throw err; // or return an error message, or something
                else
                    res.send(results); // as a demo, we'll send back the results to the client;
                                     // if you pass an object to 'res.send()', it will send
                                     // a JSON-response.
            }, query);
        },

        //Obtiene la información de los errores que se pueden presentar en la ejecución de job.
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
                
                "(SELECT sum(nSuccess) AS finished_TLK FROM equipovision._SEV_TALEND_JOBS_EXEC WHERE projectName = 'SEV_TRANSACTION_LINKS' AND jobName = 'TABLE_TRANSACTION_LINKS' AND jobStatus = 'FINISHED') AS finished_TLK,"+ 
                "(SELECT count(*) AS working_TLK FROM equipovision._SEV_TALEND_JOBS_EXEC WHERE projectName = 'SEV_TRANSACTION_LINKS' AND jobName = 'TABLE_TRANSACTION_LINKS' AND jobStatus = 'WORKING') AS working_TLK,"+
                "(SELECT count(*) AS warn_TLK FROM equipovision._SEV_TALEND_JOBS_LOG WHERE projectName = 'SEV_TRANSACTION_LINKS' AND jobName = 'TABLE_TRANSACTION_LINKS' AND logLevel = 'WARN') AS warn_TLK,"+
                "(SELECT count(*) AS error_TLK FROM equipovision._SEV_TALEND_JOBS_LOG WHERE projectName = 'SEV_TRANSACTION_LINKS' AND jobName = 'TABLE_TRANSACTION_LINKS' AND logLevel = 'ERROR') AS error_TLK;";
            var transactions = aurora.runQuery( function(err, results) {
                if (err)
                  throw err; // or return an error message, or something
                else
                    res.send(results); // as a demo, we'll send back the results to the client;
                                     // if you pass an object to 'res.send()', it will send
                                     // a JSON-response.
            }, query);
        },

        ////Obtiene la fecha del ultimo registro en las tablas de transacciones, lines y links de la DB de Aurora
        getLastUpdate: function(req,res)
        {
            var query = "SELECT * FROM"+
                "(SELECT DATE_FORMAT(DATE_LAST_MODIFIED, '%d-%m-%Y %H:%i:%s') AS transactions FROM equipovision.NS_TRANSACTIONS order by DATE_LAST_MODIFIED desc limit 1) as transactions,"+ 
                "(SELECT DATE_FORMAT(DATE_LAST_MODIFIED_GMT, '%d-%m-%Y %H:%i:%s') AS liness FROM equipovision.NS_TRANSACTION_LINES order by DATE_LAST_MODIFIED desc limit 1) as liness,"+
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

        //Obtiene las transacciones de los últimos 12 meses en base de la fecha de modificación de la DB deAurora
        getLastMonthsT: function(req,res)
        {
            var query = "SELECT concat(MONTH_NAME, '-', YEAR) AS mess, (AURORA_RECORDS) AS aurora,"+
                    "(NETSUITE_RECORDS) AS netsuite"+
                    " FROM equipovision._SEV_DASHBOARD_DATA"+
                    " WHERE TABLE_NAME = 'TRANSACTIONS' order by YEAR DESC LIMIT 12;";
            var transactions = aurora.runQuery( function(err, results) {
                if (err)
                  throw err; // or return an error message, or something
                else
                    res.send(results); // as a demo, we'll send back the results to the client;
                                     // if you pass an object to 'res.send()', it will send
                                     // a JSON-response.
            }, query);
        },

        ////Obtiene las transacciones de los últimos 12 meses en base de la fecha de creación de la DB deAurora
        getCreateMonthsT: function(req,res)
        {
            var query = "SELECT concat(MONTH_NAME, '-', YEAR) AS mess, (AURORA_RECORDS) AS aurora,"+
                    "(NETSUITE_RECORDS) AS netsuite"+
                    " FROM equipovision._SEV_DASHBOARD_DATA"+
                    " WHERE TABLE_NAME = 'CREATE-TRANSACTIONS' order by YEAR DESC LIMIT 12;";
            var transactions = aurora.runQuery( function(err, results) {
                if (err)
                  throw err; // or return an error message, or something
                else
                    res.send(results); // as a demo, we'll send back the results to the client;
                                     // if you pass an object to 'res.send()', it will send
                                     // a JSON-response.
            }, query);
        },

        ////Obtiene los lines de los últimos 12 meses en base de la fecha de modificación de la DB deAurora
        getLastMonthsLN: function(req,res)
        {
            var query = "SELECT concat(MONTH_NAME, '-', YEAR) AS mess, (AURORA_RECORDS) AS aurora,"+
                    "(NETSUITE_RECORDS) AS netsuite"+
                    " FROM equipovision._SEV_DASHBOARD_DATA"+
                    " WHERE TABLE_NAME = 'TRANSACTION_LINES' order by YEAR DESC LIMIT 12;";
            var transactions = aurora.runQuery( function(err, results) {
                if (err)
                  throw err; // or return an error message, or something
                else
                    res.send(results); // as a demo, we'll send back the results to the client;
                                     // if you pass an object to 'res.send()', it will send
                                     // a JSON-response.
            }, query);
        },

        //Obtiene los links de los últimos 12 meses en base de la fecha de creación de la DB deAurora
        getCreateMonthsLN: function(req,res)
        {
            var query = "SELECT concat(MONTH_NAME, '-', YEAR) AS mess, (AURORA_RECORDS) AS aurora,"+
                    "(NETSUITE_RECORDS) AS netsuite"+
                    " FROM equipovision._SEV_DASHBOARD_DATA"+
                    " WHERE TABLE_NAME = 'CREATE-TRANSACTION_LINES' order by YEAR DESC LIMIT 12;";
            var transactions = aurora.runQuery( function(err, results) {
                if (err)
                  throw err; // or return an error message, or something
                else
                    res.send(results); // as a demo, we'll send back the results to the client;
                                     // if you pass an object to 'res.send()', it will send
                                     // a JSON-response.
            }, query);
        },

        //Obtiene los links de los últimos 12 meses en base de la fecha de modificación de la DB deAurora
        getLastMonthsLK: function(req,res)
        {
            var query = "SELECT concat(MONTH_NAME, '-', YEAR) AS mess, (AURORA_RECORDS) AS aurora,"+
                    "(NETSUITE_RECORDS) AS netsuite"+
                    " FROM equipovision._SEV_DASHBOARD_DATA"+
                    " WHERE TABLE_NAME = 'TRANSACTION_LINKS' order by YEAR DESC LIMIT 12;";
            var transactions = aurora.runQuery( function(err, results) {
                if (err)
                  throw err; // or return an error message, or something
                else
                    res.send(results); // as a demo, we'll send back the results to the client;
                                     // if you pass an object to 'res.send()', it will send
                                     // a JSON-response.
            }, query);
        },

        //Obtiene los links de los últimos 12 meses en base de la fecha de creación de la DB deAurora
        getCreateMonthsLK: function(req,res)
        {
            var query = "SELECT concat(MONTH_NAME, '-', YEAR) AS mess, (AURORA_RECORDS) AS aurora,"+
                    "(NETSUITE_RECORDS) AS netsuite"+
                    " FROM equipovision._SEV_DASHBOARD_DATA"+
                    " WHERE TABLE_NAME = 'CREATE-TRANSACTION_LINKS' order by YEAR DESC LIMIT 12;";
            var transactions = aurora.runQuery( function(err, results) {
                if (err)
                  throw err; // or return an error message, or something
                else
                    res.send(results); // as a demo, we'll send back the results to the client;
                                     // if you pass an object to 'res.send()', it will send
                                     // a JSON-response.
            }, query);
        }

    }

}



