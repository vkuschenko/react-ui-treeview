var React = require("react");

"use strict";

/**
 * Props:
 *  styles      - styles
 *  id          - node id
 *  collapsed   - is node collapsed
 */
var Expander = React.createClass({

  render: function () {
    var expanderStyles = this.props.styles.expander;
    var styles = [expanderStyles.expander];
    styles.push(this.props.collapsed ? expanderStyles.collapsed : expanderStyles.opened);

    return <div className={styles.join(" ")} onClick={this.onClick}></div>;
  },

  onClick: function () {
    this.context.handlerExpanderClick(this.props.id)
  }

});

Expander.contextTypes = {
  handlerExpanderClick: React.PropTypes.func
};

module.exports = Expander;