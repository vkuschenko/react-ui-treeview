var React = require("react");

var TreeviewElement = require("./treeview-element.jsx");

"use strict";

var TreeviewContent = React.createClass({

  render: function () {
    return (
      <div className={this.props.styles.treeviewContent}>
        <ul className={this.props.styles.group + " " + this.props.styles.rootGroup}>
          {this.props.nodes.map(function (node, i) {
            return <TreeviewElement key={i} node={node} styles={this.props.styles} />;
          }, this)}
        </ul>
      </div>
    );
  }

});

module.exports = TreeviewContent;