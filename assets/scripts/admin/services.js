(function () {
  'use strict';

  var App = angular.module('Plugins')

  App.service('FBMessengerService', [
    '$http',
    'toastr',
    'CatchHttpError',
    '$q',
    function($http, toastr, CatchHttpError, $q) {
      
      this.get = function () {
        return $http.get('/fb-chat-config').catch(CatchHttpError);
      }
      
      this.update = function (cfg) {
        return $http.post('/fb-chat-config', cfg).catch(CatchHttpError);
      }
    }
  ])

})();
