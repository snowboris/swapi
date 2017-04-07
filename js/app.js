(function(){

	var app = angular.module('star-wars',['module_directives']);

	app.factory('httpq', function($http, $q){
		return {
			get : function() {
				var deffered = $q.defer();
				$http.get.apply(null,arguments)
				.then(deffered.resolve)
				.catch(deffered.resolve);
				return deffered.promise;
			}
		}
	});

	
	app.controller("star-warsController", function(httpq){
		var starWars = this;
		starWars.gender = '';

		starWars.peoples = [];
		starWars.index = 0; 


		this.requestPeople = function(numPage){
			httpq.get("http://swapi.co/api/people/?page=" + numPage)
				.then(function(datas){
					starWars.obj = datas.data;
					starWars.peoples = starWars.peoples.concat(datas.data.results);
					if(starWars.obj.next!=null) {
						starWars.requestPeople(numPage+1);
					}
				})
				.catch(function(){
					alert("error");
				})
				.finally(function(){
				});
			
		};

		this.requestPeople(1);

		this.setGender = function(setGender){
			this.gender = setGender;
		};

		this.isSelected =function(getGender){
			return this.gender === getGender;
		};

		this.onClick = function(human){
			starWars.peoples.forEach(function(item,i,arr){
				if(human===item.name) {
					starWars.index=i;
					
					return;
				}
				
			});

			$(".modal").modal('show');
		};

	});

	app.filter('filter', function(){
		return function(item,gender){

			var results = [];

			if(gender==='') return item;

			item.forEach(function(item,i,arr){
				if(gender==='other') {
					if(item.gender!=='female'&&item.gender!=='male') {
						results[results.length] = item;
					}
				} else if(gender ===item.gender){
					if(item.gender===gender) {
						results[results.length] = item;
					}
				}
			});
			return results;

		};
	});

})();