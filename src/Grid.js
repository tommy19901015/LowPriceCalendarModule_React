import React, { Component } from "react";

class Grid extends Component {
  state = {
    position: {
      x_coordinate: "",
      y_coordinate: ""
    }
  };

  clickGrid = e => {  
    const coordinate = e.currentTarget.dataset.coordinate;
    let x_coordinate = parseInt(coordinate.split("_")[0], 10);
    let y_coordinate = parseInt(coordinate.split("_")[1], 10);
    this.setState({
      position: {
        x_coordinate: x_coordinate,
        y_coordinate: y_coordinate
      }
    },() => {
        this.props.handleGridVal(this.state.position);
    });
  };

  addClassName = () => {
    return this.props.colActive || this.props.rowActive ? " div_td active " : "div_td "
  } 
  
  render() {
    return (
      <div
        className={this.addClassName()}
        data-coordinate={this.props.colIdx + "_" + this.props.rowIdx}
        onClick={this.clickGrid}
      >
        {this.props.data.price}
      </div>
    );
  }
}

export default Grid;