// point of interest for the test:
//  - 


// protractor api
// https://github.com/angular/protractor/blob/master/docs/api.md

describe('e2e test routes', function() {

	var ptor;

	beforeEach(function() {
		ptor = protractor.getInstance();
		console.info('\nrunning:', jasmine.getEnv().currentSpec.description);
	});

	afterEach(function() {
		var img;
		// Take a screenshot automatically after each failing test.
		if (!jasmine.getEnv().currentSpec.results().passed()) {
			img = jasmine.getEnv().currentSpec.description.replace(/ /g, '-');
			browser.takeScreenshot().then(function(png) {
				require('fs').writeFile('test/e2e/screenshots/' + img + '.png', png, 'base64');
			});
		}
	});
	

	it('should load 404 route', function() {

		var route;

		ptor.get('/');

		ptor.getCurrentUrl().then(function(url) {

			route = url.split('#')[1];
			
			// check the redirects to the default route
			expect(route).toBe('/404');

			// check the page content
			expect(ptor.isElementPresent(by.className('error404'))).toBe(true);
			expect(ptor.findElement(by.className('error404')).getText()).toBe('404');

			// The findElement, findElements, and isElementPresent functions take a locator strategy as their parameter.
			// https://github.com/angular/protractor/blob/master/docs/api.md#locator-strategies

			// take a screenshot
			browser.takeScreenshot().then(function(png) {
				require("fs").writeFile("test/e2e/screenshots/404.png", png, 'base64');
			});

		});

	});

	it('should load todooo route', function() {

		var route;

		ptor.get('#/todooo');

		ptor.getCurrentUrl().then(function(url) {
			route = url.split('#')[1];
			expect(route).toBe('/todooo');
			expect(ptor.isElementPresent(by.id('reg-new-entry'))).toBe(true);
			expect(ptor.isElementPresent(by.id('entries-list'))).toBe(true);
			expect(ptor.isElementPresent(by.id('the-big-chuck-norris-img'))).toBe(false);
		});

	});

});