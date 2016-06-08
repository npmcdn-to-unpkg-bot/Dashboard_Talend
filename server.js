/**
 * Module dependencies
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


//var netsuite = require('./config/netsuite/conecction');
var netsuite = "Hola";
//var q = aurora.runQuery('SELECT * FROM JOBS_CONTROL;');


app.configure(function() {
    // set up our express application
    app.set('port', port);
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(express.bodyParser()); // get information from html forms
    app.set('view engine', 'html'); // set up html for templating
    app.engine('.html', require('ejs').__express);
    app.set('views', __dirname + '/views');
    app.use(express.static(path.join(__dirname, 'public')));
    //app.use(express.session({ secret: 'keyboard cat' }));// persistent login sessions
    app.use(express.methodOverride());
    app.use(express.json());
    app.use(express.urlencoded());
    //app.use(flash()); // use connect-flash for flash messages stored in session

    //provagg
    app.use(app.router); //init routing

});
var aurora = require('./config/aurora/conecction');
require('./app/routes.js')(app, aurora, netsuite); // load our routes and pass in our app and fully configured passport


//express.vhost(vhost, app);

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + vhost+":"+server.address().port);
});