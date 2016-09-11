var React = require("react");
var Group = require("./group");
var Node = require("./node");

"use strict";

var Content = React.createClass({

  render: function () {
    return (
      <div className={this.props.styles.content}>
        <Group styles={this.props.styles} collapsed={false} root={true}>
          {this.props.nodes.map(function (node) {
            return <Node key={node.id} styles={this.props.styles} node={node}/>
          }, this)}
        </Group>
      </div>
    );
  }

});

module.exports = Content;
