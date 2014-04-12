describe('e2e test todooo route', function() {


	describe('notes list', function() {

		var ptor, mockModule;

		beforeEach(function() {
			ptor = protractor.getInstance();
			console.info('\nrunning:', jasmine.getEnv().currentSpec.description);
		});

		it('should be empty at the beginning', function() {
			mockModule = function() {
				angular.module('todoooMock', ['ngMockE2E']).run(['$httpBackend', function($httpBackend) {
					// create a new backend definition
					$httpBackend.whenGET('server/api/get-notes.php').respond([]);
					// download the original templates
					$httpBackend.whenGET(/^templates\//).passThrough();
				}]);
			}

			// override preexisting modules with the same name.
			ptor.addMockModule('todoooMock', mockModule);

			ptor.get('#/todooo');
			expect(ptor.isElementPresent(by.id('entries-list-empty'))).toBe(true);
		});

		it('should contain three notes', function() {
			mockModule = function() {
				angular.module('todoooMock', ['ngMockE2E']).run(['$httpBackend', function($httpBackend) {
					$httpBackend.whenGET('server/api/get-notes.php').respond([
						{"id":"1","note":"Learn how to test an AngularJS web application","isChecked":1,"signedDate":"2013-11-13","completedDate":"2013-11-20"},
						{"id":"2","note":"Write one (or more) post about testing in AngularJS","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"},
						{"id":"3","note":"Conqueer the world","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"}
					]);
					$httpBackend.whenGET(/^templates\//).passThrough();
				}]);
			}
			ptor.addMockModule('todoooMock', mockModule);
			ptor.get('#/todooo');
			ptor.findElements(by.repeater('i in entries')).then(function(elems) {
				expect(elems.length).toBe(3);
			});
		});

		it('should allow to expand each note, displaying more info', function() {
			var $noteBody;
			mockModule = function() {
				angular.module('todoooMock', ['ngMockE2E']).run(['$httpBackend', function($httpBackend) {
					$httpBackend.whenGET('server/api/get-notes.php').respond([
						{"id":"1","note":"Learn how to test an AngularJS web application","isChecked":1,"signedDate":"2013-11-13","completedDate":"2013-11-20"},
						{"id":"2","note":"Write one (or more) post about testing in AngularJS","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"},
						{"id":"3","note":"Conqueer the world","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"}
					]);
					$httpBackend.whenGET(/^templates\//).passThrough();
				}]);
			}
			ptor.addMockModule('todoooMock', mockModule);
			ptor.get('#/todooo');

			$noteBody = ptor.$('#entries-list li:nth-of-type(2) .more');

			expect($noteBody.isDisplayed()).toBe(false);
			ptor.$('#entries-list li:nth-of-type(2) .note').click();
			expect($noteBody.isDisplayed()).toBe(true);
			ptor.$('#entries-list li:nth-of-type(2) .compact').click();
			expect($noteBody.isDisplayed()).toBe(false);
		});

		it('should allow to hide completed tasks', function() {
			mockModule = function() {
				angular.module('todoooMock', ['ngMockE2E']).run(['$httpBackend', function($httpBackend) {
					$httpBackend.whenGET('server/api/get-notes.php').respond([
						{"id":"1","note":"Learn how to test an AngularJS web application","isChecked":1,"signedDate":"2013-11-13","completedDate":"2013-11-20"},
						{"id":"2","note":"Write one (or more) post about testing in AngularJS","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"},
						{"id":"3","note":"Conqueer the world","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"}
					]);
					$httpBackend.whenGET(/^templates\//).passThrough();
				}]);
			}
			ptor.addMockModule('todoooMock', mockModule);
			ptor.get('#/todooo');
			ptor.findElement(by.model('view')).then(function(cbox) {
				ptor.findElements(by.repeater('i in entries')).then(function(elems) {
					expect(elems.length).toBe(3);
				});
				cbox.click();
				ptor.findElements(by.repeater('i in entries')).then(function(elems) {
					expect(elems.length).toBe(2);
				});
			});
		});

	});


	describe('note deletion', function() {

		var ptor, mockModule;

		beforeEach(function() {
			ptor = protractor.getInstance();
			console.info('\nrunning:', jasmine.getEnv().currentSpec.description);
		});

		it('should allow to remove a note', function() {

			mockModule = function() {
				angular.module('todoooMock', ['ngMockE2E']).run(['$httpBackend', function($httpBackend) {
					$httpBackend.whenGET('server/api/get-notes.php').respond([
						{"id":"1","note":"Learn how to test an AngularJS web application","isChecked":1,"signedDate":"2013-11-13","completedDate":"2013-11-20"},
						{"id":"2","note":"Write one (or more) post about testing in AngularJS","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"},
						{"id":"3","note":"Conqueer the world","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"}
					]);
					$httpBackend.whenPOST('server/api/delete-note.php').respond({"status": true});
					$httpBackend.whenGET(/^templates\//).passThrough();
				}]);
			}

			ptor.addMockModule('todoooMock', mockModule);
			ptor.get('#/todooo');
			
			ptor.$('#entries-list li:nth-of-type(2) .note').click();
			ptor.$('#entries-list li:nth-of-type(2) .del').click();
			ptor.findElements(by.repeater('i in entries')).then(function(elems) {
				expect(elems.length).toBe(2);
			});

		});

		it('should display an error message when deletion fails', function() {

			mockModule = function() {
				angular.module('todoooMock', ['ngMockE2E']).run(['$httpBackend', function($httpBackend) {
					$httpBackend.whenGET('server/api/get-notes.php').respond([
						{"id":"1","note":"Learn how to test an AngularJS web application","isChecked":1,"signedDate":"2013-11-13","completedDate":"2013-11-20"},
						{"id":"2","note":"Write one (or more) post about testing in AngularJS","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"},
						{"id":"3","note":"Conqueer the world","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"}
					]);
					$httpBackend.whenPOST('server/api/delete-note.php').respond(500, '');
					$httpBackend.whenGET(/^templates\//).passThrough();
				}]);
			}

			ptor.addMockModule('todoooMock', mockModule);
			ptor.get('#/todooo');
			
			ptor.$('#entries-list li:nth-of-type(2) .note').click();
			ptor.$('#entries-list li:nth-of-type(2) .del').click();
			expect(ptor.$('#error').isDisplayed()).toBe(true);

		});

	});


	describe('note update', function() {

		var ptor, mockModule;

		beforeEach(function() {
			ptor = protractor.getInstance();
			console.info('\nrunning:', jasmine.getEnv().currentSpec.description);
		});

		it('should allow to update the status of a note', function() {

			mockModule = function() {
				angular.module('todoooMock', ['ngMockE2E']).run(['$httpBackend', function($httpBackend) {
					$httpBackend.whenGET('server/api/get-notes.php').respond([
						{"id":"1","note":"Learn how to test an AngularJS web application","isChecked":1,"signedDate":"2013-11-13","completedDate":"2013-11-20"},
						{"id":"2","note":"Write one (or more) post about testing in AngularJS","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"},
						{"id":"3","note":"Conqueer the world","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"}
					]);
					$httpBackend.whenPOST('server/api/update-note.php').respond({"status": true});
					$httpBackend.whenGET(/^templates\//).passThrough();
				}]);
			}

			ptor.addMockModule('todoooMock', mockModule);
			ptor.get('#/todooo');

			ptor.findElement(by.model('view')).then(function(cbox) {
				ptor.$('#entries-list li:nth-of-type(2) .check img').click();
				cbox.click();
				ptor.findElements(by.repeater('i in entries')).then(function(elems) {
					expect(elems.length).toBe(1);
				});
			});

		});

		it('should display an error message when update fails', function() {

			mockModule = function() {
				angular.module('todoooMock', ['ngMockE2E']).run(['$httpBackend', function($httpBackend) {
					$httpBackend.whenGET('server/api/get-notes.php').respond([
						{"id":"1","note":"Learn how to test an AngularJS web application","isChecked":1,"signedDate":"2013-11-13","completedDate":"2013-11-20"},
						{"id":"2","note":"Write one (or more) post about testing in AngularJS","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"},
						{"id":"3","note":"Conqueer the world","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"}
					]);
					$httpBackend.whenPOST('server/api/update-note.php').respond(500, '');
					$httpBackend.whenGET(/^templates\//).passThrough();
				}]);
			}

			ptor.addMockModule('todoooMock', mockModule);
			ptor.get('#/todooo');
			
			ptor.$('#entries-list li:nth-of-type(2) .check img').click();
			expect(ptor.$('#error').isDisplayed()).toBe(true);

		});

	});


	describe('note creation', function() {

		var ptor, mockModule;

		beforeEach(function() {
			ptor = protractor.getInstance();
			console.info('\nrunning:', jasmine.getEnv().currentSpec.description);
		});

		it('should allow to create a new note', function() {
			mockModule = function() {
				angular.module('todoooMock', ['ngMockE2E']).run(['$httpBackend', function($httpBackend) {
					$httpBackend.whenGET('server/api/get-notes.php').respond([
						{"id":"1","note":"Learn how to test an AngularJS web application","isChecked":1,"signedDate":"2013-11-13","completedDate":"2013-11-20"},
						{"id":"2","note":"Write one (or more) post about testing in AngularJS","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"},
						{"id":"3","note":"Conqueer the world","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"}
					]);
					$httpBackend.whenPOST('server/api/create-new-note.php').respond({"status": true, "id": 4});
					$httpBackend.whenGET(/^templates\//).passThrough();
				}]);
			}

			ptor.addMockModule('todoooMock', mockModule);
			ptor.get('#/todooo');

			ptor.$('input#entry').sendKeys('Enjoy the possession of the world');
			ptor.$('input#entry').submit();
			ptor.findElements(by.repeater('i in entries')).then(function(elems) {
				expect(elems.length).toBe(4);
			});

		});

		it('should display an error message when creation fails', function() {
			mockModule = function() {
				angular.module('todoooMock', ['ngMockE2E']).run(['$httpBackend', function($httpBackend) {
					$httpBackend.whenGET('server/api/get-notes.php').respond([
						{"id":"1","note":"Learn how to test an AngularJS web application","isChecked":1,"signedDate":"2013-11-13","completedDate":"2013-11-20"},
						{"id":"2","note":"Write one (or more) post about testing in AngularJS","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"},
						{"id":"3","note":"Conqueer the world","isChecked":0,"signedDate":"2013-11-13","completedDate":"-"}
					]);
					$httpBackend.whenPOST('server/api/create-new-note.php').respond(500, '');
					$httpBackend.whenGET(/^templates\//).passThrough();
				}]);
			}

			ptor.addMockModule('todoooMock', mockModule);
			ptor.get('#/todooo');

			ptor.$('input#entry').sendKeys('Give back the world');
			ptor.$('input#entry').submit();
			expect(ptor.$('#error').isDisplayed()).toBe(true);

		});

	});


});