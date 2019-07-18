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
        moveGrid:3,
        currClass:'transform3',
    }
    componentDidMount = () => {
        this.getJsonData()
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
    renderLeftBlock = () => {
        const leftArr = this.state.data.map((item, i) => {
            return item.goDate          
        })
        leftArr.unshift({goText:"去程",backText:"回程"})
        return leftArr.map((text, i) => {
            if(i === 0){
                return (
                <div className="div_tr">
                    <div key={i} className="div_td backDate first_td">
                    <div className="fristText">{text.backText}</div>
                    <div className="fristText">{text.goText}</div></div>
                </div>)
            }else{
                return (
                    <div className="div_tr">
                        <div key={i} className="div_td goDate">{text}</div>
                    </div>)
            }            
        })
    }
    renderRightHrader = () => {
        const headerArr = this.state.data.map(obj => obj.detail).map((obj,i) => obj[i].backDate)
        return headerArr.map((text, i) => {
            return (
                <div key={i} className="div_td goDate">{text}</div>
            )            
        })
    }
    handleCalendarGet = val => {
        this.setState({ position: val });
    };
    onPrevClick = () => {
        const { moveGrid, currClass} = this.state;
        const nextTransform = parseInt(currClass.split('transform')[1],10) - moveGrid;
        
        if(nextTransform >= 3){
            this.setState({ currClass : 'transform' + nextTransform});
        }else{
            this.setState({ currClass : 'transform3'});
        }
      };
    onNextClick = () => {
        const { moveGrid, currClass} = this.state;
        const nextTransform = parseInt(currClass.split('transform')[1],10) + moveGrid;
        
        if(nextTransform <= 7){
            this.setState({ currClass : 'transform' + nextTransform});
        }else{
            this.setState({ currClass : 'transform7'});
        }
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