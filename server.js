/**
 * Dependencias para el funcionamiento de la aplicación
*/
var express  = require('express');
var flash    = require('connect-flash');
var http = require('http');
var path = path = require('path');
var uuid = require('node-uuid');

var vhost = 'nodejsapp.local'
var port     = process.env.PORT || 3000;
var ip     = process.env.IP || "localhost";

var app = express();


//Se agrega una variable que contiene la configuración de la conexión hacia aurora.
var aurora = require('./config/aurora/conecction');



app.configure(function() {
    // Se configuran los parámetros para express
    app.set('port', port);
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(express.bodyParser()); // get information from html forms
    app.set('view engine', 'html'); // set up html for templating
    app.engine('.html', require('ejs').__express);
    app.set('views', __dirname + '/views');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.methodOverride());
    app.use(express.json());
    app.use(express.urlencoded());

    //provagg
    app.use(app.router); //init routing

});

require('./app/routes.js')(app, aurora); // Lee las rutas que tiene la aplicación


//Se inicializa el servidor de Node JS

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + vhost+":"+server.address().port);
});