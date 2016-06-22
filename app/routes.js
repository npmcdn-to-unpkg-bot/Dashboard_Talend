
//Se agregan todas las rutas del servidor para el envío y obtención de datos 
module.exports = function(app, aurora) {

    //Se obtienen las funciones para la obtención de información
    var api = require('./api.js')(aurora);

    app.get('/', function(req, res){
        res.render('index');
    });

    //Ruta para el logeo de los usuarios 
    app.post('/api/login', showClientRequest, api.login);

    //Obtiene el numero total de las transacciones, lines, links
    app.get('/api/transactions', showClientRequest, api.getTransactions);

    //Obtiene el numero total de errores que se pudieron presentar
    app.get('/api/transactions_log', showClientRequest, api.getTransactionsLog);

    //Consulta la ultima inserción del Job en las tablas de aurora 
    app.get('/api/last_update', showClientRequest, api.getLastUpdate);

    //Obtiene las transacciones de los últimos 12 meses en base de la fecha de modificación 
    app.get('/api/last_monthsT', showClientRequest, api.getLastMonthsT);

    //Obtiene las transacciones de los últimos 12 meses en base de la fecha de creación 
    app.get('/api/create_monthsT', showClientRequest, api.getCreateMonthsT);

    //Obtiene los lines de los últimos 12 meses en base de la fecha de modificación 
    app.get('/api/last_monthsLN', showClientRequest, api.getLastMonthsLN);

    //Obtiene los lines de los últimos 12 meses en base de la fecha de creación 
    app.get('/api/create_monthsLN', showClientRequest, api.getCreateMonthsLN);

    //Obtiene los links de los últimos 12 meses en base de la fecha de modificación 
    app.get('/api/last_monthsLK', showClientRequest, api.getLastMonthsLK);

    //Obtiene los links de los últimos 12 meses en base de la fecha de creación 
    app.get('/api/create_monthsLK', showClientRequest, api.getCreateMonthsLK);

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
        //console.log(request)
        return next();
    }
}