'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var wiredep = require('wiredep');


var MadeGenerator = module.exports = function MadeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, Gruntfile template will need this
  this.testFramework = options['test-framework'] || 'mocha';
  this.coffee = options.coffee;

  // for hooks to resolve on mocha by default
  options['test-framework'] = this.testFramework;

  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', {
    as: 'app',
    options: {
      options: {
        'skip-install': options['skip-install-message'],
        'skip-message': options['skip-install']
      }
    }
  });

  this.options = options;

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MadeGenerator, yeoman.generators.Base);

MadeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  if (!this.options['skip-welcome-message']) {
    console.log(this.yeoman);
    console.log(chalk.magenta('Out of the box I include HTML5 Boilerplate, jQuery, Express, Jade and a Gruntfile.js to build your app.'));
  }

  var prompts = [{
    type: 'checkbox',
    name: 'features',
    message: 'What more would you like?',
    choices: [{
      name: 'Sass with Compass',
      value: 'includeCompass',
      checked: true
    }, {
      name: 'Bootstrap',
      value: 'includeBootstrap',
      checked: true
    }, {
      name: 'Modernizr',
      value: 'includeModernizr',
      checked: true
    }]
  }];

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    function hasFeature(feat) { return features.indexOf(feat) !== -1; }

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.includeCompass = hasFeature('includeCompass');
    this.includeBootstrap = hasFeature('includeBootstrap');
    this.includeModernizr = hasFeature('includeModernizr');

    cb();
  }.bind(this));
};

MadeGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

MadeGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

MadeGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

MadeGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

MadeGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

MadeGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

MadeGenerator.prototype.h5bp = function h5bp() {
  this.copy('favicon.ico', 'app/favicon.ico');
  this.copy('robots.txt', 'app/robots.txt');
  this.copy('htaccess', 'app/.htaccess');
};

MadeGenerator.prototype.mainStylesheet = function mainStylesheet() {
  var css = 'main.' + (this.includeCompass ? 's' : '') + 'css';
  this.copy(css, 'app/styles/' + css);
};

// MadeGenerator.prototype.writeIndex = function writeIndex() {

//   this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
//   this.indexFile = this.engine(this.indexFile, this);

//   // wire Twitter Bootstrap plugins
//   if (this.includeBootstrap) {
//     var bs = 'bower_components/bootstrap' + (this.includeCompass ? '-sass/vendor/assets/javascripts/bootstrap/' : '/js/');
//     this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js', [
//       bs + 'affix.js',
//       bs + 'alert.js',
//       bs + 'dropdown.js',
//       bs + 'tooltip.js',
//       bs + 'modal.js',
//       bs + 'transition.js',
//       bs + 'button.js',
//       bs + 'popover.js',
//       bs + 'carousel.js',
//       bs + 'scrollspy.js',
//       bs + 'collapse.js',
//       bs + 'tab.js'
//     ]);
//   }

//   this.indexFile = this.appendFiles({
//     html: this.indexFile,
//     fileType: 'js',
//     optimizedPath: 'scripts/main.js',
//     sourceFileList: ['scripts/main.js'],
//     searchPath: '{app,.tmp}'
//   });
// };

MadeGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.mkdir('app/views');
  // this.write('app/index.html', this.indexFile);

  if (this.coffee) {
    this.write(
      'app/scripts/main.coffee',
      'console.log "\'Allo from CoffeeScript!"'
    );
  }
  else {
    this.write('app/scripts/main.js', 'console.log(\'\\\'Allo \\\'Allo!\');');
  }
};
MadeGenerator.prototype.server = function () {
  this.template('express/server.js', 'server.js');
  this.copy('express/jshintrc', 'lib/.jshintrc');
  this.template('express/controllers/api.js', 'lib/controllers/api.js');
  this.template('express/controllers/index.js', 'lib/controllers/index.js');
  this.template('express/routes.js', 'lib/routes.js');

  this.template('express/config/express.js', 'lib/config/express.js');
  this.template('express/config/config.js', 'lib/config/config.js');
  this.template('express/config/env/all.js', 'lib/config/env/all.js');
  this.template('express/config/env/development.js', 'lib/config/env/development.js');
  this.template('express/config/env/production.js', 'lib/config/env/production.js');
  this.template('express/config/env/test.js', 'lib/config/env/test.js');
};
MadeGenerator.prototype.views = function () {
  this.template('views/index.jade', 'app/views/index.jade');
  this.template('views/layout.jade', 'app/views/layout.jade');
  this.copy('views/404.jade', 'app/views/404.jade');
};


MadeGenerator.prototype.install = function () {
  if (this.options['skip-install']) {
    return;
  }

  var done = this.async();
  this.installDependencies({
    skipMessage: this.options['skip-install-message'],
    skipInstall: this.options['skip-install'],
    callback: done
  });
};
