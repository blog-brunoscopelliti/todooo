module.exports = function(config) {
  config.set({

    files : [

      // angular frameworks
      'app/scripts/lib/angular/1.2.4/angular.js',
      'app/scripts/lib/angular/1.2.4/angular-route.js',
      'app/scripts/lib/angular/1.2.4/angular-mocks.js',
      
      // app scripts
      'app/scripts/app.js',
      'app/scripts/config/*.js',
      'app/scripts/services/*.js',
      'app/scripts/controllers/*.js',
      'app/scripts/filters/*.js',
      'app/scripts/directives/*.js',
      
      // test
      'test/unit/**/*.js'
    ],

    preprocessors: {
      '**/scripts/app.js': 'coverage',
      '**/scripts/config/*.js': 'coverage',
      '**/scripts/services/*.js': 'coverage',
      '**/scripts/controllers/*.js': 'coverage',
      '**/scripts/filters/*.js': 'coverage',
      '**/scripts/directives/*.js': 'coverage'
    },

    logLevel: 'info',
    basePath: '../',
    frameworks: ['jasmine'],
    reporters: ['progress', 'junit', 'html', 'coverage'],
    
    junitReporter: {
      outputFile: 'test/unit-results/xml/junit-results.xml'
    },

    coverageReporter: {
      type : 'html',
      dir : 'test/unit-results/coverage',
      file : 'coverage.html'
    },
    
    htmlReporter: {
      outputDir: 'test/unit-results/html'
    },

    // need to set CHROME_BIN, FIREFOX_BIN
    browsers: ['Chrome', 'Firefox'],
    autoWatch: false,
    singleRun: true,
    colors: true

  });
};