var React = require("react");

"use strict";

var Button = React.createClass({
  
  render: function () {
    return (
      <button onClick={this.onClick} className={this.props.styles.button}>
        {this.props.value}
      </button>
    );
  },

  onClick: function () {
    this.props.clickHandler.call(this);
  }

});

module.exports = Button;