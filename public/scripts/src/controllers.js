

define(['angular'], function (angular) {
    'use strict';

    var mainAppControllers = angular.module('mainAppControllers', []);
    mainAppControllers.controller('LoginCtrl', ['$location', 'ResourceService', 'localStorageService', 'toastr' ,LoginCtrl]);
    mainAppControllers.controller('DashboardCtrl', ['$location', 'ResourceService', 'data', 'toastr', 'localStorageService', DashboardCtrl]);


    function DashboardCtrl($location, ResourceService, data, toastr, localStorageService){
        var vm = this;
        vm.$location = $location;
        vm.localStorageService = localStorageService;

        vm.ResourceService = ResourceService;
        vm.data = data;
        vm.toastr = toastr;
        vm.transactions = data[0];
        vm.last_update = data[2][0];

        graphic_log(data[1][0]);
        graphicLastTran(data[3]);
        graphic_net_aur(data[0]);

        vm.graphicLastTran = {};
        vm.graphicCreateTran = {};
        vm.graphicLastLines = {};
        vm.graphicCreateLines = {};
        vm.graphicLastLinks = {};
        vm.graphicCreateLinks = {};

        vm.graphicLastTran.show = true;

        $('#loading').hide();
    }

    
    DashboardCtrl.prototype.GraphicLastTran = function (){
        $( "#morris-last-transactions" ).empty();
        $("#loading2").show();
        var vm = this;

        vm.ResourceService.getLastMonthsT().then(function(data){
            graphicLastTran(data);
        });

        vm.graphicLastTran.show = true;
        vm.graphicCreateTran.show = false;
        vm.graphicLastLines.show = false;
        vm.graphicCreateLines.show = false;
        vm.graphicLastLinks.show = false;
        vm.graphicCreateLinks.show = false;

        $('#loading').hide();
    };

    DashboardCtrl.prototype.GraphicCreateTran = function (){
        $( "#morris-create-transactions" ).empty();
        $("#loading2").show();
        var vm = this;

        vm.ResourceService.getCreateMonthsT().then(function(data){
            graphicCreateTran(data);
        });

        vm.graphicLastTran.show = false;
        vm.graphicCreateTran.show = true;
        vm.graphicLastLines.show = false;
        vm.graphicCreateLines.show = false;
        vm.graphicLastLinks.show = false;
        vm.graphicCreateLinks.show = false;

        $('#loading').hide();
    };

    DashboardCtrl.prototype.GraphicLastLines = function (){
        $( "#morris-last-lines" ).empty();
        $("#loading2").show();
        var vm = this;

        vm.ResourceService.getLastMonthsLN().then(function(data){
            graphicLastLine(data);
        });

        vm.graphicLastTran.show = false;
        vm.graphicCreateTran.show = false;
        vm.graphicLastLines.show = true;
        vm.graphicCreateLines.show = false;
        vm.graphicLastLinks.show = false;
        vm.graphicCreateLinks.show = false;
        
        $('#loading').hide();
    };

    DashboardCtrl.prototype.GraphicCreateLines = function (){
        $( "#morris-create-lines" ).empty();
        $("#loading2").show();
        var vm = this;

        vm.ResourceService.getCreateMonthsLN().then(function(data){
            graphicCreateLine(data);
        });

        vm.graphicLastTran.show = false;
        vm.graphicCreateTran.show = false;
        vm.graphicLastLines.show = false;
        vm.graphicCreateLines.show = true;
        vm.graphicLastLinks.show = false;
        vm.graphicCreateLinks.show = false;
        
        $('#loading').hide();
    };

    DashboardCtrl.prototype.GraphicLastLinks = function (){
        $( "#morris-last-links" ).empty();
        $("#loading2").show();
        var vm = this;

        vm.ResourceService.getLastMonthsLK().then(function(data){
            graphicLastLink(data);
        });

        vm.graphicLastTran.show = false;
        vm.graphicCreateTran.show = false;
        vm.graphicLastLines.show = false;
        vm.graphicCreateLines.show = false;
        vm.graphicLastLinks.show = true;
        vm.graphicCreateLinks.show = false;

        $('#loading').hide();
    };

    DashboardCtrl.prototype.GraphicCreateLinks = function (){
        $( "#morris-create-links" ).empty();
        $("#loading2").show();
        var vm = this;

        vm.ResourceService.getCreateMonthsLK().then(function(data){
            graphicCreateLink(data);
        });

        vm.graphicLastTran.show = false;
        vm.graphicCreateTran.show = false;
        vm.graphicLastLines.show = false;
        vm.graphicCreateLines.show = false;
        vm.graphicLastLinks.show = false;
        vm.graphicCreateLinks.show = true;

        $('#loading').hide();
    };

    DashboardCtrl.prototype.logout = function (){      
        var vm = this;
        vm.localStorageService.clearAll();
        vm.$location.path("/login");
    };

    DashboardCtrl.prototype.RefreshLastUpdate = function (){
        
        var vm = this;
        vm.graphicTran = {};
        vm.ResourceService.getLastUpdate().then(function(data){
            vm.last_update = data[0];
            $('#loading3').hide();
        });
        $('#loading').hide();
        $('#loading2').hide();
        
    };

    function LoginCtrl ($location, ResourceService, localStorageService, toastr)
    {
        var vm = this;
        vm.$location = $location;
        vm.ResourceService = ResourceService;
        vm.localStorageService = localStorageService;
        vm.failed_login = "";
        vm.toastr = toastr;
    }

    LoginCtrl.prototype.login = function()
    {
        var vm = this;
        var user = {"username": vm.username, "password": vm.password};

        if(vm.username!==undefined || vm.password !==undefined){

            vm.ResourceService.login(user).then(function(data){
                if(data.code != 200){
                    $('#loading').hide();
                    vm.toastr.error(data.data.error);
                }else{
                    vm.localStorageService.set('auth_token',true);
                    vm.$location.path("/dashboard");
                }
            });

        }else{
            $('#loading').hide();
            noty({text: 'Username and password are mandatory!',  timeout: 2000, type: 'error'});
        }
    };

    return mainAppControllers;
});