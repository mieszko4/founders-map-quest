'use strict';
var path = require('path');

describe('foundersMapQuestApp typical usage', function() {
  it('should automatically redirect to /dasboard when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
  });

  describe('should show navigation', function () {
    var lis;
    beforeAll(function () {
      lis = element.all(by.css('.navbar-nav li'));
    });

    it('should have nagation bar', function () {
      expect(element(by.className('navbar-nav')).isDisplayed()).toBe(true);
      expect(lis.count()).toBe(2);
    });

    it('should have Dashboard as menu', function () {
      lis.filter(function (li) {
        return li.getText().then(function (text) {
          return text.toLowerCase().match('dashboard');
        });
      }).then(function (filteredLis) {
        expect(filteredLis.length).toBe(1);
      });
    });

    it('should have About as menu', function () {
      lis.filter(function (li) {
        return li.getText().then(function (text) {
          return text.toLowerCase().match('about');
        });
      }).then(function (filteredLis) {
        expect(filteredLis.length).toBe(1);
      });
    });
  });

  describe('should navigate', function () {
    var lis;
    beforeAll(function () {
      lis = element.all(by.css('.navbar-nav li'));
    });

    it('should go to Dashboard', function () {
      //go to not-found page
      browser.get('index.html#/non-existing');
      expect(browser.getLocationAbsUrl()).toMatch('/non-existing');

      lis.filter(function (li) {
        return li.getText().then(function (text) {
          return text.toLowerCase().match('dashboard');
        });
      }).then(function (filteredLis) {
        filteredLis[0].element(by.tagName('a')).click();
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
      });
    });

    it('should go to About', function () {
      //go to not-found page
      browser.get('index.html#/non-existing');
      expect(browser.getLocationAbsUrl()).toMatch('/non-existing');

      lis.filter(function (li) {
        return li.getText().then(function (text) {
          return text.toLowerCase().match('about');
        });
      }).then(function (filteredLis) {
        filteredLis[0].element(by.tagName('a')).click();
        expect(browser.getLocationAbsUrl()).toMatch('/about');
      });
    });

    it('should not go to show-image directly', function () {
      //go to not-found page
      browser.get('index.html#/non-existing');
      browser.get('index.html#/dashboard/show-image');
      expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });

    it('should not go to map when it is not loaded', function () {
      //go to not-found page
      browser.get('index.html#/non-existing');
      browser.get('index.html#/dashboard/map');
      expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });
  });

  describe('should show dashboard with load button only', function () {
    var loadButton;
    beforeAll(function () {
      browser.get('index.html#/dashboard');
      loadButton = element(by.partialButtonText('Load data'));
    });

    it('should have load button showing that data is not loaded yet', function () {
      expect(loadButton.isPresent()).toBe(true);
      loadButton.getText().then(function (text) {
        expect(text.toLowerCase()).not.toMatch('again');
      });
      expect(element(by.css('.fmq-dashboard-page .data-loaded')).isPresent()).toBe(false);
    });

    it('should not have table visible', function () {
      expect(element(by.css('.fmq-dashboard-page .table-container')).isDisplayed()).toBe(false);
    });

    it('should not have map visible', function () {
      expect(element(by.css('.fmq-dashboard-page .map-container')).isPresent()).toBe(false);
    });
  });

  describe('should show load data dialog with empty data', function () {
    var loadButton,
      loadData;
    beforeAll(function () {
      browser.get('index.html#/dashboard');
      loadButton = element(by.partialButtonText('Load data'));
    });

    it('should open load data dialog', function () {
      loadButton.click();
      expect(browser.getLocationAbsUrl()).toMatch('/load-data');

      loadData = element(by.css('.fmq-load-data-page'));
      expect(loadData.isDisplayed()).toBe(true);
    });

    it('should have empty form', function () {
      var raw = element(by.model('vm.form.raw'));
      var delimiter = element.all(by.model('vm.form.delimiter')).filter(function (input) {
        return input.isSelected();
      }).first();
      var latitudeColumn = element(by.model('vm.form.latitudeColumn'));
      var longitudeColumn = element(by.model('vm.form.longitudeColumn'));

      expect(raw.getAttribute('value')).toBe('');
      expect(delimiter.getAttribute('value')).toBe(',');
      expect(latitudeColumn.getAttribute('value')).toBe('');
      expect(longitudeColumn.getAttribute('value')).toBe('');
    });
  });

  describe('should load data from file', function () {
    var chooseFile,
      modalFooter;

    beforeAll(function () {
      browser.get('index.html#/non-existing');
      browser.get('index.html#/dashboard/load-data');
      expect(browser.getLocationAbsUrl()).toMatch('/load-data');

      chooseFile = element(by.buttonText('Choose File'));
      modalFooter = element(by.className('modal-footer'));
    });

    it('should have choose file button', function () {
      expect(chooseFile.isPresent()).toBe(true);
    });

    it('should parse data taken from file', function () {
      var fileToUpload = 'fixtures/sample.colon.csv',
      absolutePath = path.resolve(__dirname, fileToUpload);

      chooseFile.element(by.tagName('input')).sendKeys(absolutePath);

      var raw = element(by.model('vm.form.raw'));
      var delimiter = element.all(by.model('vm.form.delimiter')).filter(function (input) {
        return input.isSelected();
      }).first();
      var latitudeColumn = element(by.model('vm.form.latitudeColumn'));
      var longitudeColumn = element(by.model('vm.form.longitudeColumn'));

      expect(raw.getAttribute('value')).not.toBe('');
      expect(delimiter.getAttribute('value')).toBe(';');
      expect(latitudeColumn.getAttribute('value')).toBe('number:9');
      expect(longitudeColumn.getAttribute('value')).toBe('number:10');
    });

    it('should load data', function () {
      var load = modalFooter.element(by.buttonText('Load'));
      expect(load.isDisplayed()).toBe(true);
      expect(load.isEnabled()).toBe(true);
      load.click();
      expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });
  });

  describe('should display table and map', function () {
    var map,
      table,
      resetButton;

    beforeAll(function () {
      map = element(by.css('.fmq-dashboard-page .map-container'));
      table = element(by.css('.fmq-dashboard-page .table-container'));

      resetButton = element(by.className('filters-sorts-reset'));
    });

    it('should have map and table present', function () {
      expect(map.isDisplayed()).toBe(true);
      expect(table.isDisplayed()).toBe(true);

      expect(resetButton.isDisplayed()).toBe(true);
    });

    it('should filter by selection', function () {
      expect(table.all(by.css('tbody tr')).count()).toBe(3);
      var filters = element.all(by.model('vm.filterStates[$index]'));

      filters.get(1).clear().sendKeys('le');
      expect(table.all(by.css('tbody tr')).count()).toBe(2);
      expect(table.all(by.css('tbody tr')).first().getText()).not.toMatch('No items');

      filters.get(1).clear().sendKeys('oo');
      expect(table.all(by.css('tbody tr')).count()).toBe(1);
      expect(table.all(by.css('tbody tr')).first().getText()).not.toMatch('No items');

      filters.get(0).clear().sendKeys('1');
      expect(table.all(by.css('tbody tr')).count()).toBe(1);
      expect(table.all(by.css('tbody tr')).first().getText()).not.toMatch('No items');

      filters.get(0).clear().sendKeys('2');
      expect(table.all(by.css('tbody tr')).count()).toBe(1);
      expect(table.all(by.css('tbody tr')).first().getText()).toMatch('No items');

      resetButton.click();
      expect(table.all(by.css('tbody tr')).count()).toBe(3);
      expect(table.all(by.css('tbody tr')).first().getText()).not.toMatch('No items');
    });

    it('should select marker', function () {
      //TODO
    });

    it('should sort', function () {
      //TODO
    });

    it('should show image', function () {
      //TODO
    });

    it('should go to map and open marker', function () {
      //TODO
    });
  });

  describe('should show load data with empty form when going directly and data is loaded', function () {
    var modalFooter;

    beforeAll(function () {
      browser.get('index.html#/non-existing');
      browser.get('index.html#/dashboard/load-data');
      expect(browser.getLocationAbsUrl()).toMatch('/load-data');

      modalFooter = element(by.className('modal-footer'));
    });

    it('should have empty form', function () {
      var raw = element(by.model('vm.form.raw'));
      var delimiter = element.all(by.model('vm.form.delimiter')).filter(function (input) {
        return input.isSelected();
      }).first();
      var latitudeColumn = element(by.model('vm.form.latitudeColumn'));
      var longitudeColumn = element(by.model('vm.form.longitudeColumn'));

      expect(raw.getAttribute('value')).toBe('');
      expect(delimiter.getAttribute('value')).toBe(',');
      expect(latitudeColumn.getAttribute('value')).toBe('');
      expect(longitudeColumn.getAttribute('value')).toBe('');

      var load = modalFooter.element(by.buttonText('Load'));
      expect(load.isDisplayed()).toBe(true);
      expect(load.isEnabled()).toBe(false);
    });

    it('should go back to dashboard on cancel', function () {
      var cancel = modalFooter.element(by.buttonText('Cancel'));
      expect(cancel.isDisplayed()).toBe(true);
      cancel.click();
      expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });
  });

  describe('should show load data with non-empty form when going from dashboard', function () {
    var loadButton;

    beforeAll(function () {
      browser.get('index.html#/dashboard');
      expect(browser.getLocationAbsUrl()).toMatch('/dashboard');

      loadButton = element(by.partialButtonText('Load data'));
    });

    it('should have load again button', function () {
      expect(loadButton.isPresent()).toBe(true);
      loadButton.getText().then(function (text) {
        expect(text.toLowerCase()).toMatch('again');
      });
    });

    it('should navigate to load-data', function () {
      loadButton.click();
      expect(browser.getLocationAbsUrl()).toMatch('/load-data');
    });

    it('should not have empty form', function () {
      var raw = element(by.model('vm.form.raw'));
      var delimiter = element.all(by.model('vm.form.delimiter')).filter(function (input) {
        return input.isSelected();
      }).first();
      var latitudeColumn = element(by.model('vm.form.latitudeColumn'));
      var longitudeColumn = element(by.model('vm.form.longitudeColumn'));

      expect(raw.getAttribute('value')).not.toBe('');
      expect(delimiter.getAttribute('value')).toBe(';');
      expect(latitudeColumn.getAttribute('value')).toBe('number:9');
      expect(longitudeColumn.getAttribute('value')).toBe('number:10');
    });
  });
});
