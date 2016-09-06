var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var TreeviewElement = require("../src/content/treeview-node");
var testData = require("./../__tests-data__/treeview-element-data");

describe('<TreeviewElement>', function() {
  
  it('Cannot be expandable if no child nodes.', function() {
    var treeviewElement = TestUtils.renderIntoDocument(
      <TreeviewElement node={testData.singleNode} styles={testData.styles} />
    );

    expect(treeviewElement.state.canExpand).toBe(false);
  });

  it('Is not collapsed by default.', function() {
    var treeviewElement = TestUtils.renderIntoDocument(
      <TreeviewElement node={testData.singleNode} styles={testData.styles} />
    );
    
    expect(treeviewElement.state.collapsed).toBe(false);
  });

  it('Can be expandable if children exist.', function() {
    var treeviewElement = TestUtils.renderIntoDocument(
      <TreeviewElement node={testData.nodeWithChildren} styles={testData.styles} />
    );

    expect(treeviewElement.state.canExpand).toBe(true);
  });

  it('Can be expandable if children exist.', function() {
    var treeviewElement = TestUtils.renderIntoDocument(
      <TreeviewElement node={testData.nodeWithChildren} styles={testData.styles} />
    );
    var treeviewElementNode = ReactDOM.findDOMNode(treeviewElement);
    TestUtils.Simulate.click(treeviewElementNode.firstChild);

    expect(treeviewElement.state.collapsed).toBe(true);
  });

});