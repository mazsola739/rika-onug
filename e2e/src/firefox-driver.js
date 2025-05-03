const { Builder, Browser } = require('selenium-webdriver')
const { Options } = require('selenium-webdriver/firefox')

const options = new Options()
// to start headless:
// options.addArguments('-headless')

exports.firefoxDriver = new Builder()
    .forBrowser(Browser.FIREFOX)
    .setFirefoxOptions(options)
    .build()