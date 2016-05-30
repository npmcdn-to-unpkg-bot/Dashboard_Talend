

define(['angular'], function (angular) {
    'use strict';

    var mainAppControllers = angular.module('mainAppControllers', []);
    mainAppControllers.controller('NavCtrl', ['$location', 'localStorageService', 'AuthenticationService', NavCtrl]);
    mainAppControllers.controller('LoginCtrl', ['$location', 'ResourceService' ,'CryptoJSService', 'localStorageService', 'toastr' ,LoginCtrl]);
    // mainAppControllers.controller('RegistrationCtrl', ['ResourceService', 'CryptoJSService', 'toastr', RegistrationCtrl]);
    // mainAppControllers.controller('HomeCtrl', ['ResourceService', 'data', 'toastr', HomeCtrl]);
    mainAppControllers.controller('DashboardCtrl', ['ResourceService', 'data', 'toastr', DashboardCtrl]);
    // mainAppControllers.controller('PersonCtrl', ['ResourceService', 'toastr', PersonCtrl]);
    // mainAppControllers.controller('ThingCtrl', ['ResourceService', 'toastr', ThingCtrl]);
    mainAppControllers.controller('ProvaCtrl', [ProvaCtrl]);

    function ProvaCtrl() {
        var vm = this;
        vm.user = "";
    }

    ProvaCtrl.prototype.printHello = function()
    {
        var vm = this;
        return "Hello World "+vm.user;
    };


    function NavCtrl($location, localStorageService, AuthenticationService)
    {
        var vm = this;
        vm.$location = $location;
        vm.localStorageService = localStorageService;
        vm.isAuthenticated = AuthenticationService.isLogged()
    }

    NavCtrl.prototype.logout = function ()
    {
        var vm = this;
        vm.localStorageService.clearAll();
        vm.$location.path("/login");
    };

    function DashboardCtrl(ResourceService, data, toastr)
    {
        var vm = this;
        vm.ResourceService = ResourceService;
        vm.data = data;
        vm.toastr = toastr;
        vm.transactions = data[0][0];
        vm.last_update = data[2][0];

        graphic_log(data[1][0]);
        graphic_months_tra(data[3]);
        graphic_months_line(data[4]);
        graphic_months_link(data[5]);
        graphic_net_aur(data[0][0]);


        vm.graphicTran = {};
        vm.graphicLines = {};
        vm.graphicLinks = {};
        vm.graphicTran.show = true;
        vm.graphicLines.show = false;
        vm.graphicLinks.show = false;

        vm.GraphicTransactions = function() {
            vm.graphicTran.show = true;
            vm.graphicLines.show = false;
            vm.graphicLinks.show = false;
        };
        vm.GraphicLines = function() {
            vm.graphicTran.show = false;
            vm.graphicLines.show = true;
            vm.graphicLinks.show = false;
        };
        vm.GraphicLinks = function() {
            vm.graphicTran.show = false;
            vm.graphicLines.show = false;
            vm.graphicLinks.show = true;
        };

    }



    function LoginCtrl ($location, ResourceService, CryptoJS, localStorageService, toastr)
    {
        var vm = this;
        vm.$location = $location;
        vm.ResourceService = ResourceService;
        vm.failed_login = "";
        vm.toastr = toastr;
    }

    LoginCtrl.prototype.login = function()
    {
        var vm = this;
        var user = {"username": vm.username, "password": vm.password};

        if(vm.username!==undefined || vm.password !==undefined){

            vm.ResourceService.login(user).then(function(data){
                console.log("DATOSSS: ", data)
                if(data.code != 200){
                    vm.toastr.error(data.data.error);
                }else{
                    vm.$location.path("/dashboard");
                }
            });

        }else{
            noty({text: 'Username and password are mandatory!',  timeout: 2000, type: 'error'});
        }
    };

    // function RegistrationCtrl (ResourceService, CryptoJS, toastr)
    // {
    //     var vm = this;
    //     vm.ResourceService = ResourceService;
    //     vm.CryptoJS = CryptoJS;
    //     vm.toastr = toastr;
    // }

    // RegistrationCtrl.prototype.signup = function()
    // {
    //     var vm = this;
    //     var salt = vm.username;

    //     var enc_password = CryptoJS.PBKDF2(vm.password, salt, { keySize: 256/32 });
    //     var enc_check_password = CryptoJS.PBKDF2(vm.check_password, salt, { keySize: 256/32 });

    //     var user = {"username": vm.username, "password": enc_password.toString(), "check_password" : enc_check_password.toString() };

    //     if(vm.username!==undefined || vm.password !==undefined || vm.check_password !==undefined){
    //         if(vm.password !== vm.check_password){
    //             vm.toastr.warning('password and check_password must be the same!');
    //         }else{
    //             vm.ResourceService.signup(user).then(function(){
    //                 vm.toastr.success('User successfully registered!');
    //                 vm.username = null;
    //                 vm.password = null;
    //                 vm.check_password = null;
    //             },function(data) {
    //                 vm.toastr.error(data.message);
    //             });
    //         }
    //     }else{
    //         noty({text: 'Username and password are mandatory!',  timeout: 2000, type: 'warning'});
    //     }
    // };


    // function HomeCtrl(ResourceService, data, toastr)
    // {
    //     var vm = this;
    //     vm.ResourceService = ResourceService;
    //     vm.data = data;
    //     vm.toastr = toastr;

    //     vm.people = data[0].people;
    //     vm.things = data[1].things;
    // }

    // HomeCtrl.prototype.updatePerson = function(index, modify)
    // {
    //     var vm = this;
    //     var person = vm.people[index];

    //     if(modify){
    //         vm.people[index].modify=true;
    //     }else{
    //         vm.ResourceService.updatePerson(person).then(function(){
    //             vm.people[index].modify=false;
    //             vm.toastr.success("Person successfully updated!");
    //         },function(data, status) {
    //             if(status!==401){
    //                 vm.toastr.error(data);
    //             }
    //         });
    //     }
    // };

    // HomeCtrl.prototype.updateThing = function(index, modify)
    // {
    //     var vm = this;
    //     var thing = vm.things[index];

    //     if(modify){
    //         vm.things[index].modify=true;
    //     }else{

    //         vm.ResourceService.updateThing(thing).then(function(){
    //             vm.things[index].modify=false;
    //             vm.toastr.success("Thing successfully updated!");
    //         },function(data, status) {
    //             if(status!==401){
    //                 vm.toastr.error(data);
    //             }
    //         });
    //     }
    // };

    // HomeCtrl.prototype.deleteThing = function(index)
    // {
    //     var vm = this;
    //     var thing = vm.things[index];

    //     vm.ResourceService.deleteThing(thing).then(function(){
    //         vm.things.splice(index, 1);
    //         vm.toastr.success("Thing successfully deleted!");
    //     },function(data, status) {
    //         if(status!==401){
    //             vm.toastr.error(data);
    //         }
    //     });
    // };

    // HomeCtrl.prototype.deletePerson = function(index)
    // {
    //     var vm = this;
    //     var person = vm.people[index];

    //     vm.ResourceService.deletePerson(person).then(function(){
    //         vm.people.splice(index, 1);
    //         vm.toastr.success("Person successfully deleted!");
    //     },function(data, status) {
    //         if(status!==401){
    //             vm.toastr.error(data);
    //         }
    //     });
    // };

    // function PersonCtrl(ResourceService, toastr) {
    //     var vm = this;
    //     vm.person = null;
    //     vm.ResourceService = ResourceService;
    //     vm.toastr = toastr;
    // }

    // PersonCtrl.prototype.createPerson = function()
    // {
    //     var vm = this;
    //     var person = {person: vm.person};

    //     vm.ResourceService.createPerson(person).then(function(data){
    //         vm.person = null;
    //         vm.toastr.success(data.message);
    //     },function(data, status) {
    //         if(status!==401){
    //             vm.toastr.error(data);
    //         }
    //     });
    // };


    // function ThingCtrl(ResourceService, toastr)
    // {
    //     var vm = this;
    //     vm.thing = null;
    //     vm.ResourceService = ResourceService;
    //     vm.toastr = toastr;
    // }

    // ThingCtrl.prototype.createThing = function()
    // {
    //     var vm = this;
    //     var thing = {thing: vm.thing};

    //     vm.ResourceService.createThing(thing).then(function(data){
    //         vm.thing = null;
    //         vm.toastr.success(data.message);
    //     },function(data, status) {
    //         if(status!==401){
    //             vm.toastr.error(data);
    //         }
    //     });
    // };

    return mainAppControllers;

});