'use strict';

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
    var loadButton;
    beforeAll(function () {
      browser.get('index.html#/dashboard');
      loadButton = element(by.css('.fmq-dashboard-page .btn-load-data'));
    });

    it('should open load data dialog', function () {
      loadButton.click();
      expect(browser.getLocationAbsUrl()).toMatch('/load-data');
    });
  });
});
