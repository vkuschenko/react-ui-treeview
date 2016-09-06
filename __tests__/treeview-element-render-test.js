var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var TreeviewElement = require("../src/content/treeview-node");
var testData = require("./../__tests-data__/treeview-element-data");

describe('<TreeviewElement>', function() {

  it("Root element is 'li'.", function() {
    var treeviewElement = TestUtils.renderIntoDocument(
      <TreeviewElement node={testData.singleNode} styles={testData.styles} />
    );
    var treeviewElementNode = ReactDOM.findDOMNode(treeviewElement);
    
    expect(treeviewElementNode.tagName).toBe("LI");
  });

  it('Do not draw expander if no children.', function() {
    var treeviewElement = TestUtils.renderIntoDocument(
      <TreeviewElement node={testData.singleNode} styles={testData.styles} />
    );
    var treeviewElementNode = ReactDOM.findDOMNode(treeviewElement);
    
    expect(treeviewElementNode.firstChild.getAttribute("class")).toBe(testData.styles.elementLabel);
  });

  it('Do not draw group if no children.', function() {
    var treeviewElement = TestUtils.renderIntoDocument(
      <TreeviewElement node={testData.singleNode} styles={testData.styles} />
    );
    var treeviewElementNode = ReactDOM.findDOMNode(treeviewElement);
    
    expect(treeviewElementNode.lastChild.getAttribute("class")).not.toContain(testData.styles.group);
  });

  it('Draw only node label element if no children.', function() {
    var treeviewElement = TestUtils.renderIntoDocument(
      <TreeviewElement node={testData.singleNode} styles={testData.styles} />
    );
    var treeviewElementNode = ReactDOM.findDOMNode(treeviewElement);
    
    expect(treeviewElementNode.childNodes.length).toBe(1);
    expect((treeviewElementNode.childNodes[0]).getAttribute("class")).toBe(testData.styles.elementLabel);
  });
  
});