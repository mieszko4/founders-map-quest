# Founders Map Quest
>A *Try Catch* challenge

## Trello

Please see [Trello board](https://trello.com/b/0NsrOTRq/founder-s-map-quest/) for project management details.

## Demo

You can see [demo page here](https://milosz.ch/fmq/).

## Set up

### Pre-requirments

* node (5.1.1)
* npm (3.3.12)
* compass
* phantomjs
* protractor
* karma
* jasmine

After cloning, run `npm install` and `bower install`.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## E2e testing

* Make sure that server is running with `grunt serve`.
* In another terminal run `webdriver-manager start`.
* In another terminal run `protractor test/protractor.conf.js` in order to run tests.
