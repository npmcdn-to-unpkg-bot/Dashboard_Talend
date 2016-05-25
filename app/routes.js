module.exports = function(app, passport, netsuite, aurora) {

    var api = require('./api.js')(netsuite, aurora);

    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/api/transactions', showClientRequest, api.getTransactions);

    app.get('/partials/:name', showClientRequest, function (req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    });


    // app.get('/api/logout', showClientRequest, passport.authenticate('local-authorization', {
    //     session: false
    // }),api.logout);

    // app.get('/api/people', showClientRequest, passport.authenticate('local-authorization', {
    //     session: false
    // }),api.getPeople);



    // app.delete('/api/person/:id', showClientRequest, passport.authenticate('local-authorization', {
    //     session: false
    // }),api.removePerson);

    // app.get('/api/things', showClientRequest, passport.authenticate('local-authorization', {
    //     session: false
    // }),api.getThings);

    // app.post('/api/thing', showClientRequest, passport.authenticate('local-authorization', {
    //     session: false
    // }),api.createThing);

    // app.put('/api/thing/:id', showClientRequest, passport.authenticate('local-authorization', {
    //     session: false
    // }),api.updateThing);

    // app.delete('/api/thing/:id', showClientRequest, passport.authenticate('local-authorization', {
    //     session: false
    // }),api.removeThing);



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