define(['angular'], function (angular) {
    'use strict';

    var myAppServices = angular.module('myAppServices', []);
    myAppServices.service('Resolver',['$q', Resolver]);
    myAppServices.service('ResourceService',['$q', '$http', ResourceService]);
    myAppServices.service('TokenInterceptor',['$q','$location','localStorageService', TokenInterceptor]);
    myAppServices.service('AuthenticationService',['localStorageService', AuthenticationService]);


    function Resolver($q)
    {
        return function(promises){
            return $q.all(promises);
        }
    }

    function ResourceService($q,$http, $scope)
    {

        var _promises = {};

        var _genericCallback = function(key, data){
            _promises[key] = data;
        };

        var _promisesGetter = function(method, URL, data, key, refresh){
            $('#loading').show();
            if(!refresh && _promises[key]!== undefined){
                return $q.when(_promises[key]);
            }else{
                return _ajaxRequest(method, URL, data, key);
            }
        };

        var _ajaxRequest = function(method, URL, data, key){
            $('#loading').show();
            var deferred = $q.defer();
            $http({method: method, url: URL, data:data}).
                success(function(data) {
                    deferred.resolve(data);
                    if(URL==="GET") _genericCallback(key,data);
                }).
                error(function(data) {
                    deferred.reject(data);
                }
            );
            
            return deferred.promise;
        };

        return {
            getPeople : function(refresh){
                return _promisesGetter('GET','/api/people', null, "people", refresh);
            },
            getTransactions : function(refresh){
                return _promisesGetter('GET','/api/transactions', null, "transactions", refresh);
            },
            getTransactionsLog : function(refresh){
                return _promisesGetter('GET','/api/transactions_log', null, "transaction_log", refresh);
            },
            getLastUpdate : function(refresh){
                $("#loading3").show();
                return _promisesGetter('GET','/api/last_update', null, "last_update", refresh);
            },
            getLastMonthsT : function(refresh){
                return _promisesGetter('GET','/api/last_monthsT', null, "last_months_t", refresh);
            },
            getCreateMonthsT : function(refresh){
                return _promisesGetter('GET','/api/create_monthsT', null, "create_months_t", refresh);
            },
            getLastMonthsLN : function(refresh){
                return _promisesGetter('GET','/api/last_monthsLN', null, "last_months_ln", refresh);
            },
            getCreateMonthsLN : function(refresh){
                return _promisesGetter('GET','/api/create_monthsLN', null, "create_months_ln", refresh);
            },
            getLastMonthsLK : function(refresh){

                return _promisesGetter('GET','/api/last_monthsLK', null, "last_months_lk", refresh);
            },
            getCreateMonthsLK : function(refresh){

                return _promisesGetter('GET','/api/create_monthsLK', null, "create_months_lk", refresh);
            },
            login : function(user){
                return _ajaxRequest('POST', '/api/login', user, null);
            }

        }
    }

    function TokenInterceptor($q, $location, localStorageService)
    {
        return {
            request: function (config) {
                config.headers = config.headers || {};

                if(localStorageService.get("auth_token")!==null)
                    config.headers.Authorization = 'Bearer '+localStorageService.get("auth_token");

                return config;
            },

            response: function (response) {                
                return response || $q.when(response);
            },
            responseError : function (response) {

                if(response.config.url!=="/api/login" && response.status===401){
                    localStorageService.clearAll();
                    $location.path("/login");                    
                }

                return $q.reject(response);

            }
        };
    }


    function AuthenticationService(localStorageService){
        return {
            isLogged: function()
            {
                var authenticated = false;
                if(localStorageService.get("auth_token")!==null)
                    authenticated = true;

                return authenticated;
            }
        }
    }

    return myAppServices;
});