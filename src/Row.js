import React, { Component } from 'react';
import Grid from "./Grid";

class Row extends Component {
    render() {
        return (
            <div className="div_tr">
                <div className="div_td goDate">{this.props.data.goDate}</div>
                {this.props.data.detail.map((obj,i) => <Grid data={obj} colIdx={i} rowIdx={this.props.rowIdx}></Grid>)}
            </div>
        )
    }
}

export default Row;