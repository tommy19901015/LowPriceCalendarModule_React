import axios from "axios";
import React from "react";
import "./css/calendar.css";
import Row from "./Row";

class Calendar extends React.Component {
    state = {
        // active: null,
        // row:7,
        // column:7,
        // moveColumn:3,
        jsonUrl:'ticketInfo.json',
        data:[]
    }
    componentDidMount = () => {
        this.getJsonData()
        .then(res => {
            this.setState({
                data:res
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
    renderHeader = () => {
        const headerArr = this.state.data.map((item, i) => {
              return item.detail[i].backDate          
        })
        headerArr.unshift({goText:"去程",backText:"回程"})
        return headerArr.map((text, i) => {
            if(i === 0){
                return (<div key={i} className="div_td backDate first_td">
                <div className="fristText">{text.backText}</div>
                <div className="fristText">{text.goText}</div></div>)
            }else{
                return (<div key={i} className="div_td backDate">{text}</div>)
            }            
        })
    }
    handleCalendarGet = val => {
        this.setState({ position: val });
    };
    clickMoveBtn = (e) => {
        const direction = e.currentTarget.className.split("btn ")[1];
        console.log(direction)
    }
    render() {
        return (
            <div className="div_table">
                <div className="div_tr">{this.renderHeader()}</div>           
                {this.state.data.map((obj, i) => <Row 
                    key={i}
                    data={obj} 
                    colIdx={i}
                    position={this.state.position ? this.state.position : ""}
                    handleRowVal={this.handleCalendarGet}
                />)}
                <div className="btn_container">
                    <div className="btn left" onClick={this.clickMoveBtn}>{'<'}</div>
                    <div className="btn right"onClick={this.clickMoveBtn} >{'>'}</div>
                </div>
            </div>
        )
    }
}

export default Calendar;