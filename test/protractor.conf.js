exports.config = {


  /*----- Selenium setup -----*/

  // location of the selenium standalone server .jar file.
  // donwnload @ https://code.google.com/p/selenium/downloads/list
  seleniumServerJar: 'selenium/selenium-server-standalone-2.38.0.jar',

  // the port to start the selenium server on, or null if the server should
  // find its own unused port.
  seleniumPort: null,

  // chromedriver location is used to help the selenium standalone server
  // find chromedriver. This will be passed to the selenium jar as
  // the system property webdriver.chrome.driver. If null, selenium will
  // attempt to find chromedriver using PATH.
  chromeDriver: 'selenium/chromedriver.exe',

  // additional command line options to pass to selenium. For example,
  // if you need to change the browser timeout, use
  // seleniumArgs: ['-browserTimeout=60'],
  seleniumArgs: [],

  // if sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
  // the tests will be run remotely using SauceLabs.
  sauceUser: null,
  sauceKey: null,


  /*----- Test -----*/
  
  // spec patterns are relative to the location of this config.
  specs: [
    'e2e/*.js'
  ],


  /*----- Capabilities to be passed to the webdriver instance -----*/

  // for a full list of available capabilities, see
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities
  // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
  capabilities: {
    'browserName': 'chrome',
    'takesScreenshot': true
  },

  // base URL for your application under test. 
  // calls to protractor.get() with relative paths will be prepended with this.
  // baseUrl: 'http://127.0.0.1:9999/mockedIndex.html',
  baseUrl: 'http://127.0.0.1:9999',

  // selector for the element housing the angular app - this defaults to
  // body, but is necessary if ng-app is on a descendant of <body>  
  rootElement: 'body',


  /*----- Options to be passed to minijasminenode -----*/
  
  jasmineNodeOpts: {
    // onComplete will be called just before the driver quits.
    onComplete: null,
    // if true, display spec names.
    isVerbose: false,
    // if true, print colors to the terminal.
    showColors: true,
    // if true, include stack traces in failures.
    includeStackTrace: true,
    // default time to wait in ms before a test fails.
    defaultTimeoutInterval: 5000
  }

};
