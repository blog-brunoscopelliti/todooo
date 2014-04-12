'use strict';

if (!window.filters) {
	window.filters = angular.module('todooo.filters', []);
}

window.filters = filters.filter('onlyUnchecked', function(){
	
	return function(input, onlyUnchecked){
		
		var resultSet = [];

		if (!onlyUnchecked) {
			resultSet = input;
		}
		else {
			input.forEach(function(el, i) {
				!el.isChecked && resultSet.push(el);
			});
		}
		
		return resultSet;

	}

});