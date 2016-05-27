module.exports = function(app, passport, netsuite, aurora) {

    var api = require('./api.js')(netsuite, aurora);

    app.get('/', function(req, res){
        res.render('index');
    });

    app.post('/api/login', showClientRequest, api.login);

    app.get('/api/transactions', showClientRequest, api.getTransactions);

    app.get('/api/transactions_log', showClientRequest, api.getTransactionsLog);

    app.get('/api/last_update', showClientRequest, api.getLastUpdate);

    app.get('/api/last_monthsT', showClientRequest, api.getLastMonthsT);

    app.get('/api/last_monthsLN', showClientRequest, api.getLastMonthsLN);

    app.get('/api/last_monthsLK', showClientRequest, api.getLastMonthsLK);

    app.get('/partials/:name', showClientRequest, function (req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    });



    function showClientRequest(req, res, next) {
        var request = {
            REQUEST : {
                HEADERS: req.headers,
                BODY : req.body
            }
        }
        console.log(request)
        return next();
    }
}