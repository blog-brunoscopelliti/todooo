// point of interest for the test:
//  - verify that the module exists
//  - verify that module's dependencies are set properly

describe("unit test module", function() {

  describe("todooo", function() {

    var module, deps;
    var hasModule = function(m) {
      return deps.indexOf(m) >= 0;
    };

    beforeEach(function() {
      module = angular.module("todooo");
      deps = module.value('todooo').requires;
    });

    it("should be registered", function() {
      expect(module).not.toEqual(null);
    });

    it("should have ngRoute as a dependency", function() {
      expect(hasModule('ngRoute')).toEqual(true);
    });

    it("should have todooo.services as a dependency", function() {
      expect(hasModule('todooo.services')).toEqual(true);
    });

    it("should have todooo.controllers as a dependency", function() {
      expect(hasModule('todooo.controllers')).toEqual(true);
    });

    it("should have todooo.filters as a dependency", function() {
      expect(hasModule('todooo.filters')).toEqual(true);
    });

    it("should have todooo.directives as a dependency", function() {
      expect(hasModule('todooo.directives')).toEqual(true);
    });

  });

});