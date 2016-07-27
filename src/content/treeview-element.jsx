var React = require("react");

"use strict";

var TreeviewElement = React.createClass({

  getInitialState: function () {
    return {
      collapsed: false
    };
  },

  componentWillMount: function () {
    this.setState({
      canExpand: this.props.node.nodes && this.props.node.nodes.length > 0
    });

    this.context.registerNode(this);
  },

  render: function () {
    return (
      <li data-type={this.props.node.type} className={this.props.styles.element}>
        {this.drawExpander()}
        <div className={this.props.styles.elementLabel}>{this.props.node.name}</div>
        {this.drawGroup()}
      </li>
    );
  },

  drawGroup: function () {
    if (this.state.canExpand) {
      var className = this.props.styles.group;
      if (this.state.collapsed) {
        className += " " + this.props.styles.collapsedGroup;
      }

      return (
        <ul className={className}>
          {this.props.node.nodes.map(function (node, i) {
            return <TreeviewElement key={i} node={node} styles={this.props.styles} />;
          }, this)}
        </ul>
      );
    }
  },

  drawExpander: function () {
    if (this.state.canExpand) {
      var expanderClass = this.props.styles.expander + " ";
      expanderClass += this.state.collapsed ? this.props.styles.expanderCollapsed : this.props.styles.expanderOpened;
      return <div className={expanderClass} onClick={this.handlerExpanderClick}></div>;
    }
  },

  handlerExpanderClick: function () {
    this.setState({collapsed: !this.state.collapsed});
  }

});

TreeviewElement.contextTypes = {
  registerNode: React.PropTypes.func
};

module.exports = TreeviewElement;