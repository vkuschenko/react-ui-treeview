var React = require("react");
var Button = require("./button");

"use strict";

var Toolbar = React.createClass({

  render: function () {
    var buttons = this.props.useDefaultButtons ? this.getDefaultButtons() : [];

    if (this.props.customButtons) {
      buttons = buttons.concat(this.props.customButtons);
    }

    return (
      <div className={this.props.styles.toolbar}>
        {buttons.map(function (button, i) {
          return <Button
            key={i}
            value={button.value}
            styles={this.props.styles}
            clickHandler={button.clickHandler}/>
        }, this)}
      </div>
    );
  },

  getDefaultButtons: function () {
    return [
      {value: "Collapse all", styles: this.props.styles, clickHandler: this.onCollapseAll},
      {value: "Expand all", styles: this.props.styles, clickHandler: this.onExpandAll}
    ];
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