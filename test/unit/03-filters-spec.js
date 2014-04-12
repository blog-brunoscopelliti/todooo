// point of interest for the test:
//  - verify that filter returns the correct output with different input data 

describe("unit test filter", function() {

  describe("onlyUnchecked", function() {

    var $filter;

    var fakeEntries = [
      {"id":"1","note":"Learn how to test an AngularJS web application","isChecked":1,"signedDate":"2013-11-13","completedDate":"2013-11-20"},
      {"id":"2","note":"Write one (or more) post about testing in AngularJS","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"},
      {"id":"3","note":"Conqueer the world","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"}
    ]

    beforeEach(module('todooo'));

    beforeEach(inject(['$filter', function(_$filter_) {
      $filter = _$filter_;
    }]));    

    it('should exists', function() {
      expect($filter('onlyUnchecked')).not.toEqual(null);
    });

    it('should returns all the notes, when the onlyUnchecked argument is falsy', function() {
      var onlyUnchecked = $filter('onlyUnchecked');
      expect(onlyUnchecked(fakeEntries, false).length).toBe(3);
      expect(onlyUnchecked(fakeEntries).length).toBe(3);
    });

    it('should returns only the notes which have isChecked property setted to false, when the onlyUnchecked argument is true', function() {
      var onlyUnchecked = $filter('onlyUnchecked');
      expect(onlyUnchecked(fakeEntries, true).length).toBe(2);
    });

    it('should returns an empty array, when the input argument is an empty array', function() {
      var onlyUnchecked = $filter('onlyUnchecked');
      expect(onlyUnchecked([]) instanceof Array).toBe(true);
      expect(onlyUnchecked([]).length).toBe(0);
    });

  });

});