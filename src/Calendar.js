import axios from "axios";
import React from "react";
import "./css/calendar.css";
import Row from "./Row";

class Calendar extends React.Component {
    state = {
        active: null,
        row:7,
        column:7,
        moveColumn:3,
        jsonUrl:'ticketInfo.json',
        data:[],
        grid:"",
        selectedRow:null,
        test:[1,2,3,4,5]
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
    test = () => {
        console.log(123)
    }
    render() {
        return (
            <div className="div_table">
                <div className="div_tr">{this.renderHeader()}</div>           
                {this.state.data.map((obj, i) => <Row data={obj} colIdx={i}
                    test={this.test}
                />)}
            </div>
        )
    }
}

export default Calendar;