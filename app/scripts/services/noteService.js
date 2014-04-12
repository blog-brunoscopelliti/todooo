'use strict';

if (!window.services) {
	window.services = angular.module('todooo.services', []);
}

window.services.factory('noteService', ['$http', function($http) {

	var sdo = {

		getNotes: function() {
			var promise = $http.get('server/api/get-notes.php').success(function (data, status, headers, config) {
				data.forEach(function(el, j) {
					el.isChecked = el.isChecked == '1' ? true : false; 
				});
				return data;
			});
			return promise;
		},

		createNote: function(note) {
			var promise = $http.post('server/api/create-new-note.php', note).success(function (data, status, headers, config) {
				return data;
			}).error(function(data, status, headers, config) {
				return status;
			});
			return promise;
		},

		updateNote: function(note) {
			var promise = $http.post('server/api/update-note.php', note).success(function (data, status, headers, config) {
				return data;
			}).error(function(data, status, headers, config) {
				return status;
			});
			return promise;
		},

		deleteNote: function(note) {
			var promise = $http.post('server/api/delete-note.php', note).success(function (data, status, headers, config) {
				return data;
			}).error(function(data, status, headers, config) {
				return status;
			});
			return promise;
		}

	}

	return sdo;

}]);