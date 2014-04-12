'use strict';

if (!window.directives) {
	window.directives = angular.module('todooo.directives', []);	
}

window.directives.directive('expandable', [function() {

	return function($scope, elem, attrs) {

		elem.on('click', function() {

			angular.element(document.getElementsByClassName('expanded')).removeClass('expanded');
			angular.element(this).parent().parent().addClass('expanded');

		});

	};

}]);