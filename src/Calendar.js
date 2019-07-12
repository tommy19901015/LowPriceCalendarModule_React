import axios from "axios";
import React from "react";
import "./css/calendar.css";

class Calendar extends React.Component {
    state = {
        test:"test",
        active:false,
        row:7,
        column:7,
        moveColumn:3,
        jsonUrl:'ticketInfo.json',
        data:[],
        grid:""
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
                return (<div className="div_td backDate first_td">
                <div className="fristText">{text.backText}</div>
                <div className="fristText">{text.goText}</div></div>)
            }else{
                return (<div className="div_td backDate">{text}</div>)
            }            
        })
    }
    renderRow = () => {
        return this.state.data.map((item, i) => {
            const { goDate, detail } = item;
            return (
                <div className="div_tr">
                    <div className="div_td goDate">{goDate}</div>
                    {this.renderGrid(detail)}
                </div>
            )
         })
    }
    renderGrid = (detail) => {
        return detail.map((item, i) => {
            return (
                <div key={i} className={ this.state.active ? "div_td active" : "div_td" } onClick={this.clickGrid.bind(this, i)}>{item.price}</div>
            )
         })
    }
    clickGrid = (e,i) => {
        console.log(e)
        console.log(i)
        // this.setState({
        //     active: !this.state.active
        //   });
    }
    render() {
        return (
            <div className="div_table">
                <div className="div_tr">{this.renderHeader()}</div>
                {this.renderRow()}              
            </div>
        )
    }
}

export default Calendar;