'use strict';

const fs = require('fs');

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      'before:package:initialize': this.beforePackage.bind(this),
    };
  }

  beforePackage() {
    if (!(this.serverless.variables.service.package && this.serverless.variables.service.package.include)) {
      return
    }

    let foundMissingInclude = false;

    for (const include of this.serverless.variables.service.package.include) {
      if (!fs.existsSync(include)) {
        this.serverless.cli.log('missing package.include: ' + include);
        foundMissingInclude = true;
      }
    }

    if (foundMissingInclude) {
      throw new this.serverless.classes.Error(
        'serverless-require-includes: detected missing package.include dependency'
      );
    }
  }
}

module.exports = ServerlessPlugin;
