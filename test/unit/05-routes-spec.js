// point of interest for the test:
//  - verify the routes configurations

describe("unit testing route", function() {

  describe("/todooo", function() {
    it('should exists, and should be properly configured', function() {
      var $route;
      module('todooo');
      inject(['$route', function(_$route_) {
        $route = _$route_;
      }]);
      expect($route.routes['/todooo']).not.toBeUndefined();
      expect($route.routes['/todooo'].controller).toBe('todoooController');
      expect($route.routes['/todooo'].templateUrl).toBe('templates/main.html');
    });
  });

  describe("/404", function() {
    it('should exists, and should be properly configured', function() {
      var $route;
      module('todooo');
      inject(['$route', function(_$route_) {
        $route = _$route_;
      }]);
      expect($route.routes['/404']).not.toBeUndefined();
      expect($route.routes['/404'].controller).toBe('404Controller');
      expect($route.routes['/404'].templateUrl).toBe('templates/404.html');
    });
  });

  describe("others routes", function() {
    it('should redirect to "404" route', function() {
      var $route;
      module('todooo');
      inject(['$route', function(_$route_) {
        $route = _$route_;
      }]);
      expect($route.routes[null].redirectTo).toBe('/404');
    });
  });

});