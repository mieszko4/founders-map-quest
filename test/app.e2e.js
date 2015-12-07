'use strict';
var path = require('path');

//Note: google map does not create markers in DOM, this function checks if markers are availabe in google.maps API
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

describe('foundersMapQuestApp navigation', function () {
  var lis;

  beforeAll(function () {
    lis = element.all(by.css('.navbar-nav li'));
  });

  it('should automatically redirect to /dasboard when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
  });

  describe('should show navigation', function () {
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
    it('should go to Dashboard', function () {
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
      browser.get('index.html#/non-existing');
      browser.get('index.html#/dashboard/show-image');
      expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });

    it('should not go to map directly', function () {
      browser.get('index.html#/non-existing');
      browser.get('index.html#/dashboard/map');
      expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });
  });
});

describe('foundersMapQuestApp typical usage', function () {
  var dashboardMapSelector = '.fmq-dashboard-page .map-container';

  function getDashboardPage() {
    return element(by.className('fmq-dashboard-page'));
  }

  function getLoadDataModal() {
    return element(by.className('fmq-load-data-page'));
  }

  function getShowImageModal() {
    return element(by.className('fmq-show-image-page'));
  }

  function checkLoadDataFormExpectations(expectedRaw, expectedDelimiter, expectedLatitudeColumn, expectedLongitudeColumn) {
    var modal = getLoadDataModal();

    var raw = modal.element(by.model('vm.form.raw'));
    var delimiter = modal.all(by.model('vm.form.delimiter')).filter(function (input) {
      return input.isSelected();
    }).first();
    var latitudeColumn = modal.element(by.model('vm.form.latitudeColumn'));
    var longitudeColumn = modal.element(by.model('vm.form.longitudeColumn'));

    if (expectedRaw !== null) {
      expect(raw.getAttribute('value')).toBe(expectedRaw);
    } else {
      expect(raw.getAttribute('value')).not.toBe('');
    }

    expect(delimiter.getAttribute('value')).toBe(expectedDelimiter);
    expect(latitudeColumn.getAttribute('value')).toBe(expectedLatitudeColumn);
    expect(longitudeColumn.getAttribute('value')).toBe(expectedLongitudeColumn);
  }

  describe('dashboard without loaded data', function () {
    var loadButton;

    beforeAll(function () {
      browser.get('index.html#/dashboard');
      loadButton = getDashboardPage().element(by.partialButtonText('Load data'));
    });

    it('should have load button showing that data is not loaded yet', function () {
      expect(loadButton.isPresent()).toBe(true);
      loadButton.getText().then(function (text) {
        expect(text.toLowerCase()).not.toMatch('again');
      });
      expect(getDashboardPage().element(by.className('data-loaded')).isPresent()).toBe(false);
    });

    it('should not have table visible', function () {
      expect(getDashboardPage().element(by.className('table-container')).isDisplayed()).toBe(false);
    });

    it('should not have map visible', function () {
      expect(getDashboardPage().element(by.className('map-container')).isPresent()).toBe(false);
    });
  });

  describe('load data modal with empty data', function () {
    var loadButton;

    beforeAll(function () {
      browser.get('index.html#/dashboard');
      loadButton = getDashboardPage().element(by.partialButtonText('Load data'));
    });

    it('should open load data modal', function () {
      loadButton.click();
      expect(browser.getLocationAbsUrl()).toMatch('/load-data');
      expect(getLoadDataModal().isDisplayed()).toBe(true);
    });

    it('should have empty form', function () {
      checkLoadDataFormExpectations('', ',', '', '');
    });
  });

  describe('load data modal using file', function () {
    var chooseFile,
      modalFooter;

    beforeAll(function () {
      browser.get('index.html#/non-existing');
      browser.get('index.html#/dashboard/load-data');
      expect(browser.getLocationAbsUrl()).toMatch('/load-data');

      chooseFile = getLoadDataModal().element(by.buttonText('Choose File'));
      modalFooter = getLoadDataModal().element(by.className('modal-footer'));
    });

    it('should have choose file button', function () {
      expect(chooseFile.isPresent()).toBe(true);
    });

    it('should parse data taken from file', function () {
      var fileToUpload = 'fixtures/sample.colon.csv',
      absolutePath = path.resolve(__dirname, fileToUpload);

      chooseFile.element(by.tagName('input')).sendKeys(absolutePath);

      checkLoadDataFormExpectations(null, ';', 'number:9', 'number:10');
    });

    it('should submit loaded data', function () {
      var loadButton = modalFooter.element(by.buttonText('Load'));
      expect(loadButton.isDisplayed()).toBe(true);
      expect(loadButton.isEnabled()).toBe(true);
      loadButton.click();
      expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });
  });

  describe('dashboard with loaded data', function () {
    var table,
      map,
      tableHelpInfo,
      resetButton,
      columnChoosers,
      columnSorters;

    function expectRowsAndMarkers(expectedCount) {
      if (expectedCount === 0) {
        expect(getTableRows().count()).toBe(1);
        expect(getTableRows().first().getText()).toMatch('No items');
      } else {
        expect(getTableRows().count()).toBe(expectedCount);
        expect(getTableRows().first().getText()).not.toMatch('No items');
        expect(markersVisible(dashboardMapSelector, expectedCount)).toBe(true);
      }
    }

    function getItemViewers(index) {
      return getTableRows().get(index).all(by.className('item-viewer'));
    }

    function getTableRows() {
      return table.all(by.css('tbody tr'));
    }

    beforeAll(function () {
      table = getDashboardPage().element(by.className('table-container'));
      map = getDashboardPage().element(by.className('map-container'));

      tableHelpInfo = getDashboardPage().all(by.className('alert')).first();
      resetButton = getDashboardPage().element(by.className('filters-sorts-reset'));

      columnChoosers = table.all(by.className('marker-column-chooser')).filter(function (columnChooser) {
        return columnChooser.isDisplayed();
      });

      columnSorters = table.all(by.className('column-sorter'));
    });

    it('should have map, table and table alert present', function () {
      expect(table.isDisplayed()).toBe(true);
      expect(map.isDisplayed()).toBe(true);

      expect(tableHelpInfo.isDisplayed()).toBe(true);
      expect(resetButton.isDisplayed()).toBe(true);
    });

    it('should dismiss table alert', function () {
      tableHelpInfo.element(by.className('close')).click();
      expect(tableHelpInfo.isDisplayed()).toBe(false);
    });

    describe('item filtering', function () {
      var filters;

      beforeAll(function () {
        filters = table.all(by.model('vm.filterStates[$index]'));
      });

      it('should filter company name column', function () {
        expectRowsAndMarkers(3);

        filters.get(1).clear().sendKeys('le');
        expectRowsAndMarkers(2);

        filters.get(1).clear().sendKeys('oo');
        expectRowsAndMarkers(1);
      });

      it('should filter id column with company name column', function () {
        filters.get(0).clear().sendKeys('1');
        expectRowsAndMarkers(1);

        filters.get(0).clear().sendKeys('2');
        expectRowsAndMarkers(0);
      });

      it('should reset filters', function () {
        resetButton.click();
        expectRowsAndMarkers(3);
      });
    });

    describe('item selection', function () {
      var selectionElements;

      beforeAll(function () {
        selectionElements = table.all(by.className('item-selector'));
      });

      it('should select/deselect single items', function () {
        expectRowsAndMarkers(3);

        selectionElements.get(0).click();
        expect(markersVisible(dashboardMapSelector, 2)).toBe(true);

        selectionElements.get(0).click();
        expect(markersVisible(dashboardMapSelector, 3)).toBe(true);

        selectionElements.get(0).click();
        selectionElements.get(2).click();

        expect(markersVisible(dashboardMapSelector, 1)).toBe(true);
      });

      it('should not show marker for deselected items', function () {
        expect(getItemViewers(0).isDisplayed()).toEqual([true, true]); //latitude and longitude
        getItemViewers(0).first().click().then(function () {
          throw 'Latitude should not be clickable';
        }, function () {});
        getItemViewers(0).first().click().then(function () {
          throw 'Longitude should not be clickable';
        }, function () {});
      });

      it('should select all items', function () {
        table.element(by.className('all-items-selector')).click();
        expectRowsAndMarkers(3);
      });
    });

    describe('item coordinate links and markers', function () {
      function getMarkerWindow() {
        return map.element(by.className('gm-pro-popup'));
      }

      it('should open marker window for id column', function () {
        expect(columnChoosers.get(0).getAttribute('class')).toMatch('active');

        expect(getItemViewers(0).isDisplayed()).toEqual([true, true]); //latitude and longitude

        getItemViewers(0).first().click(); //click latitude
        expect(getMarkerWindow().isDisplayed()).toBe(true);
        expect(getMarkerWindow().getText()).toMatch('1');
      });

      it('should open marker window fo photo column', function () {
        columnChoosers.get(7).click();
        expect(columnChoosers.get(7).getAttribute('class')).toMatch('active');

        expect(getItemViewers(0).isDisplayed()).toEqual([true, true]); //latitude and longitude

        getItemViewers(0).get(1).click(); //click longitude
        expect(getMarkerWindow().isDisplayed()).toBe(true);
        expect(getMarkerWindow().element(by.tagName('img')).getAttribute('src')).toMatch('http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg');
      });
    });

    describe('item sorting', function () {
      beforeEach(function () {
        expect(markersVisible(dashboardMapSelector, 3)).toBe(true);
      });

      afterEach(function () {
        expect(markersVisible(dashboardMapSelector, 3)).toBe(true);
      });

      it('should sort by company name', function () {
        columnSorters.get(1).click();
        expect(getTableRows().get(0).getText()).toMatch('Apple');
        expect(getTableRows().get(1).getText()).toMatch('Google');
        expect(getTableRows().get(2).getText()).toMatch('Microsoft');

        columnSorters.get(1).click();
        expect(getTableRows().get(1).getText()).toMatch('Google');
        expect(getTableRows().get(0).getText()).toMatch('Microsoft');
        expect(getTableRows().get(2).getText()).toMatch('Apple');
      });

      it('should sort by id', function () {
        columnSorters.get(0).click();
        expect(getTableRows().get(0).getText()).toMatch('Google');
        expect(getTableRows().get(1).getText()).toMatch('Apple');
        expect(getTableRows().get(2).getText()).toMatch('Microsoft');

        columnSorters.get(0).click();
        expect(getTableRows().get(0).getText()).toMatch('Microsoft');
        expect(getTableRows().get(1).getText()).toMatch('Apple');
        expect(getTableRows().get(2).getText()).toMatch('Google');
      });

      it('should reset soritng', function () {
        resetButton.click();
        expect(getTableRows().get(0).getText()).toMatch('Google');
        expect(getTableRows().get(1).getText()).toMatch('Apple');
        expect(getTableRows().get(2).getText()).toMatch('Microsoft');
      });
    });

    describe('show image', function () {
      var item,
        modalFooter,
        image;

      beforeAll(function () {
        item = getTableRows().get(0);
        image = item.element(by.className('type-image'));
        modalFooter = getShowImageModal().element(by.className('modal-footer'));
      });

      it('should navigate to show image', function () {
        expect(image.isDisplayed()).toBe(true);
        image.element(by.tagName('a')).click();
        expect(browser.getLocationAbsUrl()).toMatch('/show-image');
      });

      it('should display show image modal', function () {
        expect(modalFooter.isDisplayed()).toBe(true);
      });

      it('should navigate back to dashboard when modal closes', function () {
        var close = modalFooter.element(by.buttonText('Close'));
        expect(close.isDisplayed()).toBe(true);
        close.click();
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
      });
    });
  });

  describe('load data modal when data is loaded', function () {
    var modalFooter;

    beforeAll(function () {
      browser.get('index.html#/non-existing');
      browser.get('index.html#/dashboard/load-data');
      expect(browser.getLocationAbsUrl()).toMatch('/load-data');

      modalFooter = getLoadDataModal().element(by.className('modal-footer'));
    });

    describe('load data modal accessed from url', function () {
      it('should have empty form', function () {
        checkLoadDataFormExpectations('', ',', '', '');

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

    describe('load data modal accessed from load data button', function () {
      var loadButton;

      beforeAll(function () {
        browser.get('index.html#/dashboard');
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');

        loadButton = getDashboardPage().element(by.partialButtonText('Load data'));
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
        checkLoadDataFormExpectations(null, ';', 'number:9', 'number:10');
      });
    });
  });
});
