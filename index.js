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

    for (const include of this.serverless.variables.service.package.include) {
      if (!fs.existsSync(include)) {
        this.serverless.cli.log("Missing include: " + include);
        process.exit(1);
      }
    }
  }

}

module.exports = ServerlessPlugin;
