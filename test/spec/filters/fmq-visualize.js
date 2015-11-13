'use strict';

describe('Filter: fmqVisualize', function () {

  // load the filter's module
  beforeEach(module('foundersMapQuestApp'));

  // initialize a new instance of the filter before each test
  var fmqVisualize;
  var sce;
  beforeEach(inject(function ($filter, $sce) {
    fmqVisualize = $filter('fmqVisualize');
    sce = $sce;
  }));

  it('should pass through name', function () {
    var input = 'Miłosz';

    expect(sce.getTrustedHtml(fmqVisualize(input))).toEqual(input);
  });

  it('should visualize link', function () {
    var input = 'http://milosz.ch/';
    var output = '<a target="_blank" href="' + input + '">' + input + '</a>';

    expect(sce.getTrustedHtml(fmqVisualize(input))).toEqual(output);
  });

  it('should visualize image', function () {
    var input = 'https://milosz.ch/ja-dran.s.jpg';
    var output = '<a class="show-image" href="' + input + '"><img src="' + input + '" alt=""/></a>';

    expect(sce.getTrustedHtml(fmqVisualize(input))).toEqual(output);
  });

});
