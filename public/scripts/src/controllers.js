
function get_gmt_date(){
    var new_date = new Date();
    var gmt = new_date.toGMTString();
    var get_hours = gmt.split(" ");
    var str_date = get_hours[3] + "-" + get_hours[2] + "-" + get_hours[1] + " " + get_hours[4];
    var new_da = new Date(str_date);
    var day = new_da.getDay();
    var hour_gmt = new_da.getHours();
    return [hour_gmt,day]
}

function insert_green_color(secction){
    secction.className += "panel panel-green";
}

function insert_blue_color(secction){
    secction.className += "panel panel-primary";
}

function insert_red_color(secction){
    secction.className += "panel panel-red";
}

function insert_orange_color(secction){
    secction.className += "panel panel-orange";
}


function range_hours(hour, hour_gmt, secction){
    var range = hour_gmt - hour;
    if(range < 1){
        console.log("ENTREEEEEE____GREEN");
        insert_green_color(secction);
    }
    if(range > 1 && range < 4){
        console.log("ENTREEEEEE____ORANGE");
        insert_orange_color(secction);
    }
    if(range > 3){
        console.log("ENTREEEEEE____RED");
        insert_red_color(secction);
    }
}


function live_jobs(date, secction){
    
    var da = date.split(" ");
    var y = da[0].split("-");
    var st_date = y[2] + "-" + y[1] + "-" + y[0] + " " + da[1];
    var new_date = new Date(st_date);
    var day = new_date.getDay();
    var hour = new_date.getHours();

    var date_gmt = get_gmt_date();
    var hour_gmt = date_gmt[0];
    var day_gmt = date_gmt[1];
    //var day_gmt = 1;

    if(day_gmt < 7 && day_gmt != 1) {
        if(day_gmt == 6 && hour_gmt < 7){
            console.log("ENTREEEEEE1111111")
            range_hours(hour, hour_gmt, secction);
        }
        if(day_gmt == 6 && hour_gmt > 6){
            console.log("ENTREEEEEE222222")
            insert_blue_color(secction);
        }
        if(day_gmt != 6){
            range_hours(hour, hour_gmt, secction);
        }
        
    }
    else{
        if(day_gmt == 7){
            insert_blue_color(secction);
        }
        if(day_gmt == 1 && hour_gmt > 15){
            range_hours(hour, hour_gmt, secction);
        }
        if(day_gmt == 1 && hour_gmt < 16){
            insert_blue_color(secction);
        }
    }

}
//lunes 16
// sabado 6



//Creación de los controladores para la inserción de información en los templates
define(['angular'], function (angular) {
    'use strict';

    var mainAppControllers = angular.module('mainAppControllers', []);
    mainAppControllers.controller('LoginCtrl', ['$location', 'ResourceService', 'localStorageService', 'toastr' ,LoginCtrl]);
    mainAppControllers.controller('DashboardCtrl', ['$location', 'ResourceService', 'data', 'toastr', 'localStorageService', DashboardCtrl]);

    //Obtiene la información que se colocara en el dashboard 
    function DashboardCtrl($location, ResourceService, data, toastr, localStorageService){
        var vm = this;
        vm.$location = $location;
        vm.localStorageService = localStorageService;
        var transactions = document.getElementById("transactions");
        var lines = document.getElementById("lines");
        var links = document.getElementById("links");

        vm.ResourceService = ResourceService;
        vm.data = data;
        vm.toastr = toastr;
        vm.transactions = data[0];
        vm.last_update = data[2][0];

        live_jobs(data[2][0].transactions,transactions);
        live_jobs(data[2][0].liness,lines);
        live_jobs(data[2][0].linkss,links);

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

    //Obtiene las transacciones de los últimos 12 meses en base de la fecha de modificación
    // e inserta en la grafica
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

    //Obtiene las transacciones de los últimos 12 meses en base de la fecha de creación
    // e inserta en la grafica
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

    //Obtiene los lines de los últimos 12 meses en base de la fecha de modificación
    // e inserta en la grafica
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

    //Obtiene los lines de los últimos 12 meses en base de la fecha de creación
    // e inserta en la grafica
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

    //Obtiene los links de los últimos 12 meses en base de la fecha de modificación
    // e inserta en la grafica
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

    //Obtiene los links de los últimos 12 meses en base de la fecha de creación
    // e inserta en la grafica
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

    // Realiza el fin se sesión del usuario en la aplicación
    DashboardCtrl.prototype.logout = function (){      
        var vm = this;
        vm.localStorageService.clearAll();
        vm.$location.path("/login");
    };

    // obtiene las ultimas fechas de inserción en la base de datos
    DashboardCtrl.prototype.RefreshLastUpdate = function (){
        
        var vm = this;
        vm.graphicTran = {};
        vm.ResourceService.getLastUpdate().then(function(data){
            vm.last_update = data[0];

    
        });
    };

    // Obtiene el usuario y la contraseña del template
    function LoginCtrl ($location, ResourceService, localStorageService, toastr)
    {
        var vm = this;
        vm.$location = $location;
        vm.ResourceService = ResourceService;
        vm.localStorageService = localStorageService;
        vm.failed_login = "";
        vm.toastr = toastr;
    }

    // Verifica si el usuario y la contraseña son las correctas
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

    window.setInterval(function(){
      window.location.reload();
    }, 300000);

    return mainAppControllers;
});