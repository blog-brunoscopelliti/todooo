// point of interest for the test:
//  - verify that all the methods provided by the service work as expected
//  - verify that XHR requests are sent (without stubbing).

describe("unit test service", function() {

  describe("noteService", function() {

    var $httpBackend, _note;

    beforeEach(module('todooo'));

    beforeEach(inject(['noteService', '$httpBackend', function(noteService, _$httpBackend_) {
      _note = noteService;
      $httpBackend = _$httpBackend_;
    }]));

    afterEach(function() {
      // verifies that all of the requests defined via the expect api were made.
      $httpBackend.verifyNoOutstandingExpectation();
      // verifies that there are no outstanding requests that need to be flushed.
      $httpBackend.verifyNoOutstandingRequest();
    });    

    it('should exists', inject(['noteService', function(noteService) {
      expect(noteService).not.toBe(null);
    }]));

    it('should be able to call the get-notes web service', function() {
      // creates a new request expectation for GET requests.
      $httpBackend.expectGET('server/api/get-notes.php');
      // creates a new backend definition.
      $httpBackend.when('GET', 'server/api/get-notes.php').respond([]);
      // executes the service's method getNotes
      _note.getNotes();
      // flushes all pending requests using the trained responses.
      $httpBackend.flush();
    });

    it('should be able to call the create-new-note web service', function() {
      $httpBackend.expectPOST('server/api/create-new-note.php');
      $httpBackend.when('POST', 'server/api/create-new-note.php').respond([]);
      _note.createNote();
      $httpBackend.flush();
    });

    it('should be able to call the update-note web service', function() {
      $httpBackend.expectPOST('server/api/update-note.php');
      $httpBackend.when('POST', 'server/api/update-note.php').respond([]);
      _note.updateNote();
      $httpBackend.flush();
    });

    it('should be able to call the delete-note web service', function() {
      $httpBackend.expectPOST('server/api/delete-note.php');
      $httpBackend.when('POST', 'server/api/delete-note.php').respond([]);
      _note.deleteNote();
      $httpBackend.flush();
    });

    // AngularJS $httpBackend doc:
    // http://docs.angularjs.org/api/ngMock.$httpBackend

  });

});