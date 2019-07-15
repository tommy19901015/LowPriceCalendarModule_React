import React, { Component } from 'react';
import { thisExpression } from '@babel/types';

class Grid extends Component {
    state = {
        x_coordinate:null,
        y_coordinate:null,
    }

    clickGrid = (e) => {
        const coordinate = e.currentTarget.dataset.coordinate;
        this.setState({
            x_coordinate:parseInt(coordinate.split("_")[0], 10),
            y_coordinate:parseInt(coordinate.split("_")[1], 10),
        })
    }
    
    render() {
        console.log(this.state)
        return (
            <div className={ this.state.x_coordinate === this.props.colIdx ? " div_td active" : 'div_td' } 
            data-coordinate={this.props.colIdx + "_" + this.props.rowIdx} 
            onClick={ (e) => this.clickGrid(e)}>{this.props.data.price}</div>
        );
    }
}

export default Grid;