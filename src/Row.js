import React, { Component } from "react";
import Grid from "./Grid";

class Row extends Component {
  state = {
    position: {
        x_coordinate: "",
        y_coordinate: ""
      }
  };
  handleGet = val => {
    console.log(val)
    this.setState({ position: val });
  };
  render() {
    return (
      <div className="div_tr">
        <div className="div_td goDate">{this.props.data.goDate}</div>
        {this.props.data.detail.map((obj,i) => (
          <Grid
            data={obj}
            rowIdx={i}
            colIdx={this.props.colIdx}
            handleValue={this.handleGet}
            colActive={this.state.position.x_coordinate === this.props.colIdx ? true : false}
            rowActive={this.state.position.y_coordinate === this.props.rowIdx ? true : false}
          />
        ))}
      </div>
    );
  }
}
export default Row;