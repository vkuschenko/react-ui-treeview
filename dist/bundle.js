(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var React = require("react");
var Group = require("./group");
var Node = require("./node");

"use strict";

var Content = React.createClass({
  displayName: "Content",


  render: function () {
    return React.createElement(
      "div",
      { className: this.props.styles.content },
      React.createElement(
        Group,
        { styles: this.props.styles, collapsed: false, root: true },
        this.props.nodes.map(function (node) {
          return React.createElement(Node, { key: node.id, styles: this.props.styles, node: node });
        }, this)
      )
    );
  }

});

module.exports = Content;

},{"./group":3,"./node":4,"react":"react"}],2:[function(require,module,exports){
var React = require("react");

"use strict";

/**
 * Props:
 *  styles      - styles
 *  id          - node id
 *  collapsed   - is node collapsed
 *  onClick     - `onClick` callback (optional)
 */
var Expander = React.createClass({
  displayName: "Expander",


  render: function () {
    var expanderStyles = this.props.styles.expander;
    var styles = [expanderStyles.expander];
    styles.push(this.props.collapsed ? expanderStyles.collapsed : expanderStyles.opened);

    return React.createElement("div", { className: styles.join(" "), onClick: this.onClick });
  },

  onClick: function () {
    if (this.context.handlerExpanderClick) {
      this.context.handlerExpanderClick(this.props.id);
    }
  }

});

Expander.contextTypes = {
  handlerExpanderClick: React.PropTypes.func
};

module.exports = Expander;

},{"react":"react"}],3:[function(require,module,exports){
var React = require("react");

"use strict";

/**
 * Props:
 *  styles      - styles
 *  root        - is root node
 *  collapsed   - is node collapsed
 */
var Group = React.createClass({
  displayName: "Group",


  render: function () {
    var groupStyles = this.props.styles.group;
    var styles = [groupStyles.group];
    this.props.root && styles.push(groupStyles.root);
    this.props.collapsed && styles.push(groupStyles.collapsed);

    return React.createElement(
      "ul",
      { className: styles.join(" ") },
      this.props.children
    );
  }

});

module.exports = Group;

},{"react":"react"}],4:[function(require,module,exports){
var React = require("react");
var Group = require("./group");
var Expander = require("./expander");

"use strict";

/**
 * Props:
 *  nodes     -
 *  styles    -
 *  node      -
 *    node.nodes
 *    node.type
 *    node.id
 *    node.collapsed
 *    node.selected
 *    node.name
 */
var Node = React.createClass({
  displayName: "Node",


  render: function () {
    var expandable = this.props.node.nodes && this.props.node.nodes.length > 0;
    var nodeStyles = this.props.styles.node;

    return React.createElement(
      "li",
      { "data-type": this.props.node.type, className: nodeStyles.node },
      expandable && React.createElement(Expander, { styles: this.props.styles,
        id: this.props.node.id,
        collapsed: this.props.node.collapsed }),
      React.createElement(
        "div",
        { className: nodeStyles.label },
        React.createElement(
          "span",
          { onClick: this.onNodeClick, className: this.props.node.selected ? nodeStyles.selected : "" },
          this.props.node.name
        )
      ),
      expandable && this.renderGroup()
    );
  },

  renderGroup: function () {
    return React.createElement(
      Group,
      { styles: this.props.styles, collapsed: this.props.node.collapsed, nodes: this.props.node.nodes },
      this.props.node.nodes.map(function (node) {
        return React.createElement(Node, { key: node.id, styles: this.props.styles, node: node });
      }, this)
    );
  },

  onNodeClick: function () {
    this.context.handlerNodeClick(this.props.id, this.props.node.clickHandler.bind(this));
  }

});

Node.contextTypes = {
  handlerNodeClick: React.PropTypes.func
};

module.exports = Node;

},{"./expander":2,"./group":3,"react":"react"}],5:[function(require,module,exports){
"use strict";

module.exports = {
  treeview: "treeview",
  content: {
    content: "content",
    group: {
      group: "group",
      root: "group-root",
      collapsed: "group-collapsed"
    },
    node: {
      node: "node",
      label: "label",
      icon: "icon",
      selected: "node-selected"
    },
    expander: {
      expander: "expander",
      collapsed: "collapsed",
      opened: "opened"
    }
  },
  toolbar: {
    toolbar: "toolbar",
    button: "button"
  }
};

},{}],6:[function(require,module,exports){
"use strict";

module.exports = {

  findNodeById: function (nodes, id) {
    var node = null;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        node = nodes[i];
        break;
      } else if (nodes[i].nodes && nodes[i].nodes.length > 0) {
        node = this.findNodeById(nodes[i].nodes, id);
        if (node) {
          break;
        }
      }
    }

    return node;
  },

  setToAll: function (nodes, property, val) {
    for (var i = 0; i < nodes.length; i++) {
      nodes[i][property] = val;
      if (nodes[i].nodes && nodes[i].nodes.length > 0) {
        this.setToAll(nodes[i].nodes, property, val);
      }
    }
  }

};

},{}],7:[function(require,module,exports){
"use strict";

module.exports = {

  verify: function (nodes) {
    var self = this;
    return nodes.map(function (node) {
      if (node.nodes && node.nodes.length > 0) {
        node.nodes = self.verify(node.nodes);
      }

      node = self.setCollapsed(node);
      node = self.setGuid(node);
      return node;
    });
  },

  setCollapsed: function (node) {
    if (!("collapsed" in node)) {
      node.collapsed = false;
    }
    return node;
  },

  setGuid: function (node) {
    if (!node.id) {
      node.id = (this.guidSection() + this.guidSection() + "-" + this.guidSection() + "-4" + this.guidSection().substr(0, 3) + "-" + this.guidSection() + "-" + this.guidSection() + this.guidSection() + this.guidSection()).toLowerCase();
    }
    return node;
  },

  guidSection: function () {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }
};

},{}],8:[function(require,module,exports){
var TreeView = require('./treeview');

module.exports = TreeView;

},{"./treeview":11}],9:[function(require,module,exports){
var React = require("react");

"use strict";

var Button = React.createClass({
  displayName: "Button",


  render: function () {
    return React.createElement(
      "button",
      { onClick: this.onClick, className: this.props.styles.button },
      this.props.value
    );
  },

  onClick: function () {
    this.props.clickHandler.call(this);
  }

});

module.exports = Button;

},{"react":"react"}],10:[function(require,module,exports){
var React = require("react");
var Button = require("./button");

"use strict";

var Toolbar = React.createClass({
  displayName: "Toolbar",


  render: function () {
    var buttons = this.props.useDefaultButtons ? this.getDefaultButtons() : [];

    if (this.props.customButtons) {
      buttons = buttons.concat(this.props.customButtons);
    }

    return React.createElement(
      "div",
      { className: this.props.styles.toolbar },
      buttons.map(function (button, i) {
        return React.createElement(Button, {
          key: i,
          value: button.value,
          styles: this.props.styles,
          clickHandler: button.clickHandler });
      }, this)
    );
  },

  getDefaultButtons: function () {
    return [{ value: "Collapse all", styles: this.props.styles, clickHandler: this.onCollapseAll }, { value: "Expand all", styles: this.props.styles, clickHandler: this.onExpandAll }];
  },

  onExpandAll: function () {
    this.context.handlerExpandAll();
  },

  onCollapseAll: function () {
    this.context.handlerCollapseAll();
  }

});

Toolbar.contextTypes = {
  handlerExpandAll: React.PropTypes.func,
  handlerCollapseAll: React.PropTypes.func
};

module.exports = Toolbar;

},{"./button":9,"react":"react"}],11:[function(require,module,exports){
var React = require("react");
var Toolbar = require("./toolbar/toolbar");
var Content = require("./content/content");
var inputPreprocessor = require("./helpers/input-preprocessor");
var helper = require("./helper");
var defaultStyles = require("./default-styles");

"use strict";

var Treeview = React.createClass({
  displayName: "Treeview",


  getDefaultProps: function () {
    return {
      styles: defaultStyles,
      useDefaultButtons: true
    };
  },

  getInitialState: function () {
    return { nodes: [] };
  },

  componentWillMount: function () {
    this.setState({
      nodes: inputPreprocessor.verify(this.props.nodes)
    });
  },

  render: function () {
    return React.createElement(
      "div",
      { className: this.props.styles.treeview },
      React.createElement(Toolbar, { styles: this.props.styles.toolbar,
        useDefaultButtons: this.props.useDefaultButtons,
        customButtons: this.props.buttons }),
      React.createElement(Content, { styles: this.props.styles.content, nodes: this.state.nodes })
    );
  },

  // FUNCTIONALITY

  handlerExpanderClick: function (id) {
    var node = helper.findNodeById(this.state.nodes, id);
    if (node) {
      node.collapsed = !node.collapsed;
      this.setState({ nodes: this.state.nodes });
    }
  },

  handlerNodeClick: function (id, customHandler) {
    helper.setToAll(this.state.nodes, "selected", false);
    var node = helper.findNodeById(this.state.nodes, id);
    if (node) {
      node.selected = true;
      if (customHandler && customHandler instanceof Function) {
        customHandler();
      }
    }
  },

  handlerExpandAll: function () {
    var nodes = this.state.nodes;
    helper.setToAll(nodes, "collapsed", false);
    this.setState(nodes);
  },

  handlerCollapseAll: function () {
    var nodes = this.state.nodes;
    helper.setToAll(nodes, "collapsed", true);
    this.setState(nodes);
  },

  // Context dependent functionality

  getChildContext: function () {
    return {
      handlerExpanderClick: this.handlerExpanderClick,
      handlerNodeClick: this.handlerNodeClick,
      handlerExpandAll: this.handlerExpandAll,
      handlerCollapseAll: this.handlerCollapseAll
    };
  }

});

Treeview.childContextTypes = {
  handlerExpanderClick: React.PropTypes.func,
  handlerNodeClick: React.PropTypes.func,
  handlerExpandAll: React.PropTypes.func,
  handlerCollapseAll: React.PropTypes.func
};

module.exports = Treeview;

},{"./content/content":1,"./default-styles":5,"./helper":6,"./helpers/input-preprocessor":7,"./toolbar/toolbar":10,"react":"react"}]},{},[8]);
