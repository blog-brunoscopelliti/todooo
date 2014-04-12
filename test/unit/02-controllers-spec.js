// point of interest for the test:
//  - verify that the controller executed without errors
//  - verify that $scope properties are set
//  - mock XHR requests 

describe("unit test controller", function() {

  describe("todoooController", function() {

    var fakeEntries = [
      {"id":"1","note":"Learn how to test an AngularJS web application","isChecked":1,"signedDate":"2013-11-13","completedDate":"2013-11-20"},
      {"id":"2","note":"Write one (or more) post about testing in AngularJS","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"},
      {"id":"3","note":"Conqueer the world","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"}
    ];

    var rootScope, scope, ctrl;
    var $note;

    beforeEach(module('todooo'));

    beforeEach(inject(['$controller', '$rootScope', '$compile', 'noteService', function($controller, $rootScope, $compile, noteService) {
      scope = {};
      rootScope = $rootScope;
      $note = noteService;
      ctrl = $controller('todoooController', { $scope: scope, entries: { data: fakeEntries } });
    }]));

    it('should not be null', function() {
      expect(ctrl).not.toEqual(null);
    });

    it("should allow to show both completed and uncompleted notes", function() {
      expect(scope.hideCompleted).toBe(false);
    });

    it("should contain three notes", function() {
      expect(scope.entries.length).toEqual(3);
    });

    it("should map the methods of the note service", function() {
      expect(typeof scope.register).toBe('function');
      expect(typeof scope.update).toBe('function');
      expect(typeof scope.delete).toBe('function');
    });

    /* 
      From http://docs.angularjs.org/api/ngMock.$httpBackend

      During unit testing, we want our unit tests to run quickly and have no external dependencies 
      so we don’t want to send XHR or JSONP requests to a real server. 
      All we really need is to verify whether a certain request has been sent or not, 
      or alternatively just let the application make requests, respond with pre-trained responses 
      and assert that the end result is what we expect it to be.
    */

    it("should be able to create a new note", inject(['$compile', '$q', function($compile, $q) { 
    
      var deferred;
    
      scope.$$childHead = {};
      scope.$$childHead.entry = 'Test the creation of a new note.';
      scope.$$childHead.reg = $compile('<form name="reg"></form>')(scope);
    
      // simulate resolving a promise
      deferred = $q.defer();
      deferred.resolve({data: { status: true, id: 4, isChecked: false, signedDate: new Date(), completedDate: '-' }});
    
      // a spy can stub any function and tracks calls to it and all arguments
      spyOn($note, 'createNote').andReturn(deferred.promise);
    
      // execute the register function
      scope.register();
    
      // propagate promise resolution to 'then' function using $apply().
      rootScope.$apply();
      
      // expectation
      expect(scope.entries.length).toBe(4);
      expect(scope.entries[3].note).toBe('Test the creation of a new note.');
      expect(scope.entries[3].id).toBe(4);
    
    }]));

    it("should show an error when the create action fails", inject(['$compile', '$q', function($compile, $q) { 
      var deferred;

      scope.$$childHead = {};
      scope.$$childHead.entry = 'Test fail.';
      scope.$$childHead.reg = $compile('<form name="reg"></form>')(scope);

      // simulate rejecting a promise
      deferred = $q.defer();
      deferred.reject();
      
      spyOn($note, 'createNote').andReturn(deferred.promise);
      scope.register();
      rootScope.$apply();
      expect(scope.entries.length).toBe(4);
      expect(scope.showError).toBe(true);
    }]));


    it("should be able to update the state of a note", inject(['$q', function($q) { 
      var deferred = $q.defer();
      deferred.resolve({data: { status: true }});
      spyOn($note, 'updateNote').andReturn(deferred.promise);
      scope.update(1);
      expect(!!scope.entries[0].isChecked).toBe(true);
      rootScope.$apply();
      expect(!!scope.entries[0].isChecked).toBe(false);
    }]));

    it("should show an error when the update action fails", inject(['$q', function($q) { 
      var deferred = $q.defer();
      deferred.reject();
      spyOn($note, 'updateNote').andReturn(deferred.promise);
      scope.update(1);
      expect(!!scope.entries[0].isChecked).toBe(false);
      rootScope.$apply();
      expect(!!scope.entries[0].isChecked).toBe(false);
      expect(scope.showError).toBe(true);
    }]));


    it("should be able to delete a note", inject(['$q', function($q) { 
      var deferred = $q.defer();
      deferred.resolve({data: { status: true }});
      spyOn($note, 'deleteNote').andReturn(deferred.promise);
      scope.delete(4);
      rootScope.$apply();
      expect(scope.entries.length).toBe(3);
    }]));

    it("should show an error when the delete action fails", inject(['$q', function($q) { 
      var deferred = $q.defer();
      deferred.reject();
      spyOn($note, 'deleteNote').andReturn(deferred.promise);
      scope.delete(1);
      rootScope.$apply();
      expect(scope.entries.length).toBe(3);
      expect(scope.showError).toBe(true);
    }]));

  });

});