// point of interest for the test:
//  - verify that the directive modify the DOM

describe("unit test directive", function() {
  
  describe("smartInput", function() {

    var $compile, $rootScope;

    beforeEach(module('todooo'));

    beforeEach(inject(['$compile','$rootScope', function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $rootScope.entry = '';
    }]));

    it("should display a text input", function() {
      var element = $compile('<smart-input data-validation="/^.{1,140}$/" data-required="true"></smart-input>')($rootScope);
      expect(element.find('input').length).toBe(1);
    });
    
    it("should set a watcher on entry", function() {
      var isEntryWatched = false,
        element = $compile('<smart-input data-validation="/^.{1,140}$/" data-required="true"></smart-input>')($rootScope);

      $rootScope.$$watchers.forEach(function(el, i) {
        if (el.exp == 'entry') { 
          isEntryWatched = true;
        }
      });
      expect(isEntryWatched).toBe(true);
    });

    it("should show/hide the smart placeholder when the input is filled/empty", function() {
      var element = $compile('<smart-input data-validation="/^.{1,140}$/" data-required="true"></smart-input>')($rootScope);
      
      // fire the watches
      $rootScope.$digest();
      expect(element.hasClass('visible')).toBe(false);
      
      // change the content of the input, and fire the watches
      $rootScope.entry = 'Be Happy!';
      $rootScope.$digest();
      expect(element.hasClass('visible')).toBe(true);
    });

  });

});