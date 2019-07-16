import React, { Component } from "react";
import { thisExpression } from "@babel/types";

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
    console.log('moveDirection = ' + this.props.moveDirection)
    console.log('moveGrid = ' + this.props.moveGrid)
  };

  addClassName = () => {
      let name = this.props.colActive || this.props.rowActive ? " div_td active " : "div_td "
      if(this.props.rowIdx < 3){
        name = name + ' now';
      }
      if(this.props.rowIdx >= 3){
        name = name + ' next';
      }
      // console.log(this.props.rowIdx)
      return name
  } 

  //pre first grid(i) - this.props.moveGrid
  //now first grid(default 3) 
  //next first grid(i) + this.props.moveGrid
  
  render() {
    return (
      <div
        className={this.addClassName()}
        // className={
        //   this.props.colActive || this.props.rowActive ? " div_td active " : "div_td "
        // }
        // className = {`div_td ${this.props.colActive || this.props.rowActive ? 'active' : ''}${this.props.rowIdx >= 3 ? 'mobile' : ''}`}
        // className = {`div_td ${this.props.colActive || this.props.rowActive ? 'active' : ''}
        // ${this.props.Movedirection === 'undefined' ? '' : this.props.Movedirection}`}
        data-coordinate={this.props.colIdx + "_" + this.props.rowIdx}
        onClick={this.clickGrid}
      >
        {this.props.data.price}
      </div>
    );
  }
}

export default Grid;