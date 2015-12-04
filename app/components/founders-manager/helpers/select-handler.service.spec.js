'use strict';

describe('Service: SelectHandler', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var SelectHandler;
  beforeEach(inject(function (_SelectHandler_) {
    SelectHandler = _SelectHandler_;
  }));

  it('should do something', function () {
    expect(!!SelectHandler).toBe(true);
  });

});

describe('Service: SelectHandler', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var SelectHandler;
  beforeEach(inject(function (_SelectHandler_) {
    SelectHandler = _SelectHandler_;
  }));

  it('should exist', function () {
    expect(!!SelectHandler).toBe(true);
  });

  it('should select and deselect all', function () {
    var items = [1, 2, 3, 4];
    var selectedItems = {0: true, 1: true};

    expect(SelectHandler.allSelected(items, selectedItems)).toBe(false);

    selectedItems = SelectHandler.selectAll(items);
    expect(SelectHandler.allSelected(items, selectedItems)).toBe(true);

    selectedItems = SelectHandler.unselectAll();
    expect(SelectHandler.allSelected(items, selectedItems)).toBe(false);
  });

  it('should toggle selection', function () {
    var items = [1, 2, 3, 4];
    var selectedItems = {0: true, 1: true};

    expect(SelectHandler.allSelected(items, selectedItems)).toBe(false);

    selectedItems = SelectHandler.toggleAllSelection(items, selectedItems);
    expect(SelectHandler.allSelected(items, selectedItems)).toBe(true);

    selectedItems = SelectHandler.toggleAllSelection(items, selectedItems);
    expect(SelectHandler.allSelected(items, selectedItems)).toBe(false);
  });

  it('should check and toggle single', function () {
    var selectedItems = {0: true, 1: true};

    expect(SelectHandler.isSelected(selectedItems, 0)).toBe(true);
    expect(SelectHandler.isSelected(selectedItems, 1)).toBe(true);
    expect(SelectHandler.isSelected(selectedItems, 2)).toBe(false);
    expect(SelectHandler.isSelected(selectedItems, 3)).toBe(false);

    //toggle single existing
    SelectHandler.toggleSelection(selectedItems, 0);
    expect(SelectHandler.isSelected(selectedItems, 0)).toBe(false);
    expect(SelectHandler.isSelected(selectedItems, 1)).toBe(true);
    expect(SelectHandler.isSelected(selectedItems, 2)).toBe(false);
    expect(SelectHandler.isSelected(selectedItems, 3)).toBe(false);

    //toggle single non-existing
    SelectHandler.toggleSelection(selectedItems, 2);
    expect(SelectHandler.isSelected(selectedItems, 0)).toBe(false);
    expect(SelectHandler.isSelected(selectedItems, 1)).toBe(true);
    expect(SelectHandler.isSelected(selectedItems, 2)).toBe(true);
    expect(SelectHandler.isSelected(selectedItems, 3)).toBe(false);
  });

});
