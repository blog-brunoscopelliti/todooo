'use strict';

window.app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

	$routeProvider.when('/todooo', {
		templateUrl: 'templates/main.html', 
		controller: 'todoooController',
		resolve: {
			entries: ['noteService', function(_note) {
				return _note.getNotes();
			}]
		}
	});

	$routeProvider.when('/404', {
		templateUrl: 'templates/404.html', 
		controller: '404Controller'
	});	

	$routeProvider.otherwise({ redirectTo: '/404' });

	/* Set XHR request interceptor */
	$httpProvider.interceptors.push(['$q', function($q) {

		var serialize = function(obj, prefix) {
			var str = [];
			for(var p in obj) {
				var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
				str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
			}
			return str.join("&");
		}

		return {
			request: function(config) {
				if (config.data && typeof config.data === 'object') {
					config.data = serialize(config.data);
				}
				return config || $q.when(config);
			}
		};

	}]);

}]);


window.app.run(['$rootScope', '$http', function($root, $http) {

	//
	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8;";

}]);