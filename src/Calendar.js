import axios from "axios";
import React from "react";
import "./css/calendar.css";
import Row from "./Row";
import propTypesRange from 'prop-types-range';

class Calendar extends React.Component {
    state = {
        row:7,
        column:7,
        jsonUrl:'ticketInfo.json',
        data:[],
        moveGrid:3,
        currClass:'transform3',
    }
    componentDidMount = () => {
        if(typeof(this.props.moveGrid) != "undefined") this.setState({moveGrid:this.props.moveGrid})
        if(typeof(this.props.row) != "undefined") this.setState({row:this.props.row})
        if(typeof(this.props.column) != "undefined") this.setState({column:this.props.column}) 
        this.getJsonData()
        .then(this.filterJsonData)
        .then(res => {
            this.setState({
                data:res,               
            })            
        })      
    }
    getJsonData = () => {
        return axios.get(this.state.jsonUrl)
        .then( res => {    
            return res.data.data[0].data;
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    filterJsonData = (data) => {        
       const x = this.props.row;
       const y = this.props.column;
       data.map((obj,i) => obj.detail.splice(y))
       return data.filter((obj,i) => i < x)
    }
    renderLeftBlock = () => {
        const leftArr = this.state.data.map((item, i) => {
            return item.goDate          
        })
        leftArr.unshift({goText:"去程",backText:"回程"})
        return leftArr.map((text, i) => {
            if(i === 0){
                return (
                <div key={i} className="div_tr">
                    <div className="div_td backDate first_td">
                    <div className="fristText">{text.backText}</div>
                    <div className="fristText">{text.goText}</div></div>
                </div>)
            }else{
                return (
                    <div key={i} className="div_tr">
                        <div className="div_td goDate">{text}</div>
                    </div>)
            }            
        })
    }
    renderRightHrader = () => {
        if(this.state.data.length !== 0)
            return this.state.data[0].detail.map(obj => obj.backDate).map((text,i)=>
                <div key={i} className="div_td goDate">{text}</div>);
    }
    handleCalendarGet = val => {
        this.setState({ position: val });
    };
    onPrevClick = () => {
        const { moveGrid, currClass} = this.state;
        const nextTransform = parseInt(currClass.split('transform')[1],10) - moveGrid;
        (nextTransform >= 3) ? this.setState({ currClass : 'transform' + nextTransform}) :
            this.setState({ currClass : 'transform3'});
      };
    onNextClick = () => {
        const { moveGrid, currClass} = this.state;
        const nextTransform = parseInt(currClass.split('transform')[1],10) + moveGrid;
        (nextTransform <= this.props.column) ? this.setState({ currClass : 'transform' + nextTransform}) :
            this.setState({ currClass : 'transform' + this.props.column});
    };
    render() {
        return (
            <div className="main_container">
                <div className="left_block">
                    <div className="div_table">
                        {this.renderLeftBlock()}
                    </div>
                </div>
                <div className={"right_block"}>
                <div className={"div_table " + this.state.currClass}>
                    <div className="div_tr">
                        {this.renderRightHrader()}
                    </div>
                    {this.state.data.map((obj, i) => <Row 
                        key={i}
                        data={obj} 
                        colIdx={i}
                        movedirection={this.state.moveDirection}
                        moveGrid={this.state.moveGrid}
                        position={this.state.position ? this.state.position : ""}
                        handleRowVal={this.handleCalendarGet}
                    />)}
                </div> 
                </div>
                <div className="btn_container">
                     <div className="btn left" onClick={this.onPrevClick}>{'<'}</div>
                     <div className="btn right"onClick={this.onNextClick} >{'>'}</div>
                </div>
            </div>
        )
    }
}

export default Calendar;

Calendar.propTypes = {
    row : propTypesRange(1,7),
    column : propTypesRange(3,7),
    moveGrid : propTypesRange(1,7),
}