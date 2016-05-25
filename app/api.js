module.exports = function(aurora, netsuite){

    // var User = models.user;
    // var Person = models.person;
    // var Thing = models.thing;

    return {

        // signup: function (req,res)
        // {

        //     var body = req.body;

        //     User.findOne({ username: body.username
        //     },function(err, user) {
        //         if (err)
        //             res.send(500, {'message': err});
        //         // check to see if theres already a user with that email
        //         if (user) {
        //             res.send(403, {'message': 'User already exist!'});
        //         }else {
        //             var newUser = new User({ username: body.username,email: body.email, password:body.password})
        //             newUser.save(function (err, user) {
        //                 if (err){
        //                     res.send(500, {'message': err});
        //                 }
        //                 res.json({ 'message': 'User was successfully registered!'});
        //             });
        //         }
        //     });
        // },

        // login:function(req,res)
        // {
        //     res.json({ auth_token: req.user.token.auth_token});
        // },

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
            var q = 'SELECT count(*) AS transactions FROM NS_TRANSACTIONS;';
            var transactions = aurora.runQuery( function(err, results) {
                if (err)
                  throw err; // or return an error message, or something
                else
                console.log("RRRRRRRRRRRRRRRR: ", results);
                res.send(results); // as a demo, we'll send back the results to the client;
                                     // if you pass an object to 'res.send()', it will send
                                     // a JSON-response.
              }, q);



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



