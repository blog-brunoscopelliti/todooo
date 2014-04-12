'use strict';

if (!window.ctrls) {
	window.ctrls = angular.module('todooo.controllers', []);
}

window.ctrls.controller('todoooController', ['$scope', 'noteService', 'entries', function($scope, _note, entries) {

	$scope.hideCompleted = false;
	$scope.isBusy = false;
	$scope.showError = false;
	$scope.entry = '';
	

	$scope.entries = entries.data;
	
	$scope.register = function() {

		var newEntry = { note: $scope.$$childHead.entry }

		if (!$scope.isBusy) {

			$scope.isBusy = true;

			// Store the data about the submitted entry
			_note.createNote(newEntry).then(function(promise) {
				if (promise.data.status) {
					newEntry.id = promise.data.id;
					newEntry.isChecked = false;
					newEntry.signedDate = new Date();
					newEntry.completedDate = '-';

					$scope.entries.push(newEntry);

					// Clean the form
					$scope.entry = '';
					$scope.reg.$setPristine();
				}
				$scope.isBusy = false;
			}, function(promise) {
				// Clean the form
				$scope.entry = '';
				$scope.reg.$setPristine();

				$scope.showError = true;
				$scope.isBusy = false;
			});

		}		

	};

	$scope.update = function(entryId) {

		var pos, newInfo = { id: entryId };

		if (!$scope.isBusy) {

			$scope.isBusy = true;

			$scope.entries.forEach(function(el, i) {
				if (el.id == entryId) {
					newInfo.isChecked = $scope.entries[i].isChecked ? '0' : '1';
					pos = i;
				}
			});

			// Update the status of the note
			_note.updateNote(newInfo).then(function(promise) {
				if (promise.data.status) {
					$scope.entries[pos].isChecked = !$scope.entries[pos].isChecked;
					$scope.entries[pos].completedDate = $scope.entries[pos].isChecked ? new Date() : null;
				}
				$scope.isBusy = false;
			}, function(promise) {
				$scope.showError = true;
				$scope.isBusy = false;
			});

		}

	}

	$scope.delete = function(entryId) {

		if (!$scope.isBusy) {

			$scope.isBusy = true;

			_note.deleteNote({id: entryId}).then(function(promise) {
				var j;
				if (promise.data.status) {
					$scope.entries.forEach(function(el, i) {
						if (el.id == entryId) {
							j = i;
						}
					});
					if (typeof j != 'undefined') {
						$scope.entries.splice(j,1);
					}
				}
				$scope.isBusy = false;
			}, function(promise) {
				$scope.showError = true;
				$scope.isBusy = false;
			});

		}

	}

}]);

window.ctrls.controller('404Controller', ['$scope', function($scope) { }]);