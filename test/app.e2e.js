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
      expect(element(by.css('.navbar-nav')).isDisplayed()).toBe(true);
      lis.count().then(function(count) {
        expect(count).toBe(2);
      });
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
      loadButton = element(by.css('.fmq-dashboard-page .btn-load-data'));
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
      loadButton = element(by.css('.fmq-dashboard-page .btn-load-data'));
    });

    it('should open load data dialog', function () {
      loadButton.click();
      expect(browser.getLocationAbsUrl()).toMatch('/load-data');

      loadData = element(by.css('.fmq-load-data-page'));
      expect(loadData.isDisplayed()).toBe(true);
    });

    it('should have empty form', function () {
      var raw =  element(by.model('vm.form.raw'));
      var delimiter = element.all(by.model('vm.form.delimiter')).filter(function (input) {
        return input.isSelected();
      });
      var latitudeColumn =  element(by.model('vm.form.latitudeColumn'));
      var longitudeColumn =  element(by.model('vm.form.longitudeColumn'));

      expect(raw.getAttribute('value')).toBe('');
      expect(delimiter.getAttribute('value')).toEqual([',']);
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

      chooseFile = element(by.css('.fmq-load-data-page input[type=file]'));
      modalFooter = element(by.css('.modal-footer'));
    });

    it('should have choose file button', function () {
      chooseFile.element(by.xpath('..')).getText().then(function (text) {
        expect(text.toLowerCase()).toMatch('choose file');
      });
    });

    it('should parse data taken from file', function () {
      var fileToUpload = 'fixtures/sample.colon.csv',
      absolutePath = path.resolve(__dirname, fileToUpload);

      chooseFile.sendKeys(absolutePath);

      var raw =  element(by.model('vm.form.raw'));
      var delimiter =  element.all(by.model('vm.form.delimiter')).filter(function (input) {
        return input.isSelected();
      });
      var latitudeColumn =  element(by.model('vm.form.latitudeColumn'));
      var longitudeColumn =  element(by.model('vm.form.longitudeColumn'));

      expect(raw.getAttribute('value')).not.toBe('');
      expect(delimiter.getAttribute('value')).toEqual([';']);
      expect(latitudeColumn.getAttribute('value')).toBe('number:9');
      expect(longitudeColumn.getAttribute('value')).toBe('number:10');
    });

    it('should load data', function () {
      modalFooter.all(by.css('button')).filter(function (button) {
        return button.getText().then(function (text) {
          return text.toLowerCase().match('load');
        });
      }).then(function (filteredButtons) {
        expect(filteredButtons.length).toBe(1);
        filteredButtons[0].click();
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
      });
    });
  });

  describe('should display table and map', function () {
    var map,
      table;

    beforeAll(function () {
      map = element(by.css('.fmq-dashboard-page .map-container'));
      table = element(by.css('.fmq-dashboard-page .table-container'));
    });

    it('should have elements present', function () {
      expect(map.isDisplayed()).toBe(true);
      expect(table.isDisplayed()).toBe(true);
    });

    it('should filter by text', function () {
      //TODO
    });

    it('should filter by selection', function () {
      //TODO
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

      modalFooter = element(by.css('.modal-footer'));
    });

    it('should have empty form', function () {
      var raw =  element(by.model('vm.form.raw'));
      var delimiter = element.all(by.model('vm.form.delimiter')).filter(function (input) {
        return input.isSelected();
      });
      var latitudeColumn =  element(by.model('vm.form.latitudeColumn'));
      var longitudeColumn =  element(by.model('vm.form.longitudeColumn'));

      expect(raw.getAttribute('value')).toBe('');
      expect(delimiter.getAttribute('value')).toEqual([',']);
      expect(latitudeColumn.getAttribute('value')).toBe('');
      expect(longitudeColumn.getAttribute('value')).toBe('');
    });

    it('should go back to dashboard on cancel', function () {
      modalFooter.all(by.css('button')).filter(function (button) {
        return button.getText().then(function (text) {
          return text.toLowerCase().match('cancel');
        });
      }).then(function (filteredButtons) {
        expect(filteredButtons.length).toBe(1);
        filteredButtons[0].click();
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
      });
    });
  });

  describe('should show load data with non-empty form when going from dashboard', function () {
    var loadButton;

    beforeAll(function () {
      browser.get('index.html#/dashboard');
      expect(browser.getLocationAbsUrl()).toMatch('/dashboard');

      loadButton = element(by.css('.fmq-dashboard-page .btn-load-data'));
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
      var raw =  element(by.model('vm.form.raw'));
      var delimiter =  element.all(by.model('vm.form.delimiter')).filter(function (input) {
        return input.isSelected();
      });
      var latitudeColumn =  element(by.model('vm.form.latitudeColumn'));
      var longitudeColumn =  element(by.model('vm.form.longitudeColumn'));

      expect(raw.getAttribute('value')).not.toBe('');
      expect(delimiter.getAttribute('value')).toEqual([';']);
      expect(latitudeColumn.getAttribute('value')).toBe('number:9');
      expect(longitudeColumn.getAttribute('value')).toBe('number:10');
    });
  });
});
