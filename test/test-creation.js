/*global describe, beforeEach, it*/

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('Made generator test', function() {
  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        return done(err);
      }

      this.made = helpers.createGenerator('made:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ]);
      this.made.options['skip-install'] = true;

      done();
    }.bind(this));
  });

  it('the generator can be required without throwing', function() {
    // not testing the actual run of generators yet
    this.app = require('../app');
  });

  it('creates expected files', function(done) {
    var expected = [
      ['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      ['Gruntfile.js', /coffee:/],
      'app/favicon.ico',
      'app/robots.txt',
      'app/scripts/main.coffee',
      'app/styles/main.scss',
      'app/views/index.jade',
      'app/views/layout.jade',
      'app/views/404.jade',
      'lib/config/config.js',
      'lib/config/env/all.js',
      'lib/config/env/development.js',
      'lib/config/env/production.js',
      'lib/config/env/test.js',
      'lib/config/express.js',
      'lib/controllers/api.js',
      'lib/controllers/index.js',
      'lib/routes.js',
      'server.js'
    ];

    helpers.mockPrompt(this.made, {
      features: ['includeCompass']
    });

    this.made.coffee = true;
    this.made.run({}, function() {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files in non-AMD non-coffee mode', function(done) {
    var expected = [
      ['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      'app/favicon.ico',
      'app/robots.txt',
      'app/scripts/main.js',
      'app/styles/main.scss',
      'app/views/index.jade',
      'app/views/layout.jade',
      'app/views/404.jade',
      'lib/config/config.js',
      'lib/config/env/all.js',
      'lib/config/env/development.js',
      'lib/config/env/production.js',
      'lib/config/env/test.js',
      'lib/config/express.js',
      'lib/controllers/api.js',
      'lib/controllers/index.js',
      'lib/routes.js',
      'server.js'
    ];

    helpers.mockPrompt(this.made, {
      features: ['includeCompass']
    });

    this.made.coffee = false;
    this.made.run({}, function() {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files in AMD mode', function(done) {
    var expected = [
      ['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      'app/favicon.ico',
      'app/robots.txt',
      'app/scripts/main.js',
      'app/styles/main.scss',
      'app/views/index.jade',
      'app/views/layout.jade',
      'app/views/404.jade',
      'lib/config/config.js',
      'lib/config/env/all.js',
      'lib/config/env/development.js',
      'lib/config/env/production.js',
      'lib/config/env/test.js',
      'lib/config/express.js',
      'lib/controllers/api.js',
      'lib/controllers/index.js',
      'lib/routes.js',
      'server.js'
    ];

    helpers.mockPrompt(this.made, {
      features: ['includeCompass']
    });

    this.made.run({}, function() {
      helpers.assertFiles(expected);
      done();
    });
  });
});
