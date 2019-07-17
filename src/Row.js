import React, { Component } from "react";
import Grid from "./Grid";

class Row extends Component {
  state = {
    position: {
        x_coordinate: "",
        y_coordinate: ""
      }
  };
  handleRowGet = val => {
    this.setState({ position: val },() => {
      this.props.handleRowVal(this.state.position);
    });    
  };
  render() {
    // console.log(this.props.data.detail)
    return (
      <div className="div_tr">
        {/* <div className="div_td goDate">{this.props.data.goDate}</div> */}
        {this.props.data.detail.map((obj,i) => (
          <Grid
            key={i}
            data={obj}
            rowIdx={i}
            moveDirection={this.props.moveDirection}
            moveGrid={this.props.moveGrid}
            colIdx={this.props.colIdx}
            handleGridVal={this.handleRowGet}
            rowActive={this.props.position.y_coordinate === i}
            colActive={this.props.position.x_coordinate === this.props.colIdx} 
          />
        ))}
      </div>
    );
  }
}
export default Row;