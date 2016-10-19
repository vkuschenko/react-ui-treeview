import React from "react";
import Button from "./button";

class Toolbar extends React.Component {

  render () {
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
  }

  getDefaultButtons () {
    return [
      {value: "Collapse all", styles: this.props.styles, clickHandler: this.onCollapseAll.bind(this)},
      {value: "Expand all", styles: this.props.styles, clickHandler: this.onExpandAll.bind(this)}
    ];
  }

  onExpandAll () {
    this.context.handlerExpandAll();
  }

  onCollapseAll () {
    this.context.handlerCollapseAll();
  }

}

Toolbar.contextTypes = {
  handlerExpandAll: React.PropTypes.func,
  handlerCollapseAll: React.PropTypes.func
};

export default Toolbar;