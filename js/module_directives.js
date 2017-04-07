(function(){
	var app = angular.module('module_directives',[]);

	app.directive('card', function(){
		return{		
			restrict: 'E',
			templateUrl: './templates/test.html',
			replace: true		
		};
	});

	app.directive('cardInfo', function(){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: './templates/card_info.html'
		}
	});

})();