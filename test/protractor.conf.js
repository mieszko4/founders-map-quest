exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:9000/',
  framework: 'jasmine',

  specs: ['*.e2e.js'],

  capabilities: {
    'browserName': 'chrome'
  },
  allScriptsTimeout: 11000,
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    showColors: true
  }
};
