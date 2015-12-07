'use strict';
var path = require('path');

function markersVisible (mapSelector, expectedCount) {
  return browser.executeScript(function (mapSelector, expectedCount) {
    /* globals angular, google */
    var models = angular.element(mapSelector).find('ui-gmap-google-map .angular-google-map-markers').data('$uiGmapMarkersController').getScope().models;

    //check count
    if (models.length !== expectedCount) {
      return false;
    }

    //check if on map
    var points = models.map(function (model) {
      return new google.maps.LatLng(model.coords.latitude, model.coords.longitude);
    });
    var map = angular.element(mapSelector).find('ui-gmap-google-map').data('$uiGmapGoogleMapController').getMap();
    var bounds = map.getBounds();
    return points.every(function (point) {
      return bounds.contains(point);
    });
  }, mapSelector, expectedCount);
}

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

  describe('should display map and table', function () {
    var table,
      mapSelector = '.fmq-dashboard-page .map-container',
      map,
      tableHelpInfo,
      resetButton,
      columnChoosers,
      columnSorters;

    function expectRowsAndMarkers(expectedCount) {
      if (expectedCount === 0) {
        expect(table.all(by.css('tbody tr')).count()).toBe(1);
        expect(table.all(by.css('tbody tr')).first().getText()).toMatch('No items');
      } else {
        expect(table.all(by.css('tbody tr')).count()).toBe(expectedCount);
        expect(table.all(by.css('tbody tr')).first().getText()).not.toMatch('No items');
        expect(markersVisible(mapSelector, expectedCount)).toBe(true);
      }
    }

    beforeAll(function () {
      table = element(by.css('.fmq-dashboard-page .table-container'));
      map = element(by.css(mapSelector));

      tableHelpInfo = element.all(by.className('alert')).first();
      resetButton = element(by.className('filters-sorts-reset'));

      columnChoosers = table.all(by.className('marker-column-chooser')).filter(function (columnChooser) {
        return columnChooser.isDisplayed();
      });

      columnSorters = table.all(by.className('column-sorter'));
    });

    it('should have map and table present', function () {
      expect(table.isDisplayed()).toBe(true);
      expect(map.isDisplayed()).toBe(true);

      expect(tableHelpInfo.isDisplayed()).toBe(true);
      expect(resetButton.isDisplayed()).toBe(true);
    });

    it('should dismiss tableHelpInfo', function () {
      tableHelpInfo.element(by.className('close')).click();
      expect(tableHelpInfo.isDisplayed()).toBe(false);
    });

    it('should filter by input', function () {
      var filters = table.all(by.model('vm.filterStates[$index]'));

      expectRowsAndMarkers(3);

      filters.get(1).clear().sendKeys('le');
      expectRowsAndMarkers(2);

      filters.get(1).clear().sendKeys('oo');
      expectRowsAndMarkers(1);

      filters.get(0).clear().sendKeys('1');
      expectRowsAndMarkers(1);

      filters.get(0).clear().sendKeys('2');
      expectRowsAndMarkers(0);

      resetButton.click();
      expectRowsAndMarkers(3);
    });

    it('should filter by selection and view-item not be clickable for unselected items', function () {
      var selectionElements = table.all(by.className('item-selector'));

      expectRowsAndMarkers(3);

      selectionElements.get(0).click();
      expect(markersVisible(mapSelector, 2)).toBe(true);

      selectionElements.get(0).click();
      expect(markersVisible(mapSelector, 3)).toBe(true);

      selectionElements.get(0).click();
      selectionElements.get(2).click();
      expect(markersVisible(mapSelector, 1)).toBe(true);

      //check it is not clickable
      var itemViewers = table.all(by.css('tbody tr')).get(0).all(by.className('item-viewer'));
      expect(itemViewers.isDisplayed()).toEqual([true, true]); //latitude and longitude
      itemViewers.first().click().then(function () {
        throw 'Latitude should not be clickable';
      }, function () {});
      itemViewers.first().click().then(function () {
        throw 'Longitude should not be clickable';
      }, function () {});

      table.element(by.className('all-items-selector')).click();
      expectRowsAndMarkers(3);
    });

    it('should open marker by clicking on item viewer links', function () {
      var itemViewers,
        markerWindow;

      //check first column (id)
      expect(columnChoosers.get(0).getAttribute('class')).toMatch('active');

      itemViewers = table.all(by.css('tbody tr')).get(0).all(by.className('item-viewer')); //first item
      expect(itemViewers.isDisplayed()).toEqual([true, true]); //latitude and longitude

      itemViewers.first().click(); //click latitude
      markerWindow = map.element(by.className('gm-pro-popup'));
      expect(markerWindow.isDisplayed()).toBe(true);
      expect(markerWindow.getText()).toMatch('1');

      //change columnMarker to photo
      columnChoosers.get(7).click();
      expect(columnChoosers.get(7).getAttribute('class')).toMatch('active');

      itemViewers = table.all(by.css('tbody tr')).get(0).all(by.className('item-viewer')); //first item
      expect(itemViewers.isDisplayed()).toEqual([true, true]); //latitude and longitude

      itemViewers.get(1).click(); //click longitude
      markerWindow = map.element(by.className('gm-pro-popup'));
      expect(markerWindow.isDisplayed()).toBe(true);
      expect(markerWindow.element(by.tagName('img')).getAttribute('src')).toMatch('http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg');
    });

    it('should sort', function () {
      expect(markersVisible(mapSelector, 3)).toBe(true);

      columnSorters.get(1).click();
      expect(table.all(by.css('tbody tr')).get(0).getText()).toMatch('Apple');
      expect(table.all(by.css('tbody tr')).get(1).getText()).toMatch('Google');
      expect(table.all(by.css('tbody tr')).get(2).getText()).toMatch('Microsoft');

      columnSorters.get(1).click();
      expect(table.all(by.css('tbody tr')).get(1).getText()).toMatch('Google');
      expect(table.all(by.css('tbody tr')).get(0).getText()).toMatch('Microsoft');
      expect(table.all(by.css('tbody tr')).get(2).getText()).toMatch('Apple');

      columnSorters.get(0).click();
      expect(table.all(by.css('tbody tr')).get(0).getText()).toMatch('Google');
      expect(table.all(by.css('tbody tr')).get(1).getText()).toMatch('Apple');
      expect(table.all(by.css('tbody tr')).get(2).getText()).toMatch('Microsoft');

      columnSorters.get(0).click();
      expect(table.all(by.css('tbody tr')).get(0).getText()).toMatch('Microsoft');
      expect(table.all(by.css('tbody tr')).get(1).getText()).toMatch('Apple');
      expect(table.all(by.css('tbody tr')).get(2).getText()).toMatch('Google');

      expect(markersVisible(mapSelector, 3)).toBe(true);

      resetButton.click();
      expect(table.all(by.css('tbody tr')).get(0).getText()).toMatch('Google');
      expect(table.all(by.css('tbody tr')).get(1).getText()).toMatch('Apple');
      expect(table.all(by.css('tbody tr')).get(2).getText()).toMatch('Microsoft');

      expect(markersVisible(mapSelector, 3)).toBe(true);
    });

    it('should show image', function () {
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
