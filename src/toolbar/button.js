import React from "react";

class Button extends React.Component {
  
  render () {
    return (
      <button onClick={this.onClick.bind(this)} className={this.props.styles.button}>
        {this.props.value}
      </button>
    );
  }

  onClick () {
    this.props.clickHandler.call(this);
  }

}

export default Button;