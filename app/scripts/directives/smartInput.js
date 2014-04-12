'use strict';

if (!window.directives) {
	window.directives = angular.module('todooo.directives', []);	
}

window.directives.directive('smartInput', [function() {

	var ddo = {
		restrict: 'E',
		controller: ['$scope', '$element', '$attrs', function($scope, $elements, $attrs) {
			$scope.req = $attrs.required;
			$scope.regex = $attrs.validation;
		}],
		link: function postLink($scope, elem, attrs) {

			$scope.$watch('entry', function($viewValue) {

				if ((typeof $viewValue === 'undefined' || $viewValue.length == 0) && elem.hasClass('visible')) {
					elem.removeClass('visible');
				}
				else if ($viewValue.length > 0 && !elem.hasClass('visible')) {
					elem.addClass('visible');
				}

			});

		},
		replace: true,
		template: '<span class="smart-input-box"><span class="smart-tip">type a new message, then click enter</span><span><input type="text" name="entry" id="entry" ng-model="entry" ng-required="{{req}}" ng-pattern="{{regex}}" placeholder="type a new message, then click enter"/></span></span>'
	}

	return ddo;

}]);