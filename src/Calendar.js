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
        data:[],
        moveDirection:'right',
        moveGrid:3
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
    // renderHeader = () => {
    //     const headerArr = this.state.data.map((item, i) => {
    //         console.log(item)  
    //         return item.detail[i].backDate          
    //     })
    //     headerArr.unshift({goText:"去程",backText:"回程"})
    //     console.log(headerArr)
    //     return headerArr.map((text, i) => {
    //         if(i === 0){
    //             return (
    //             <div className="div_tr">
    //                 <div key={i} className="div_td backDate first_td">
    //                 <div className="fristText">{text.backText}</div>
    //                 <div className="fristText">{text.goText}</div></div>
    //             </div>)
    //         }else{
    //             return (
    //                 <div className="div_tr">
    //                     <div key={i} className="div_td backDate">{text}</div>
    //                 </div>)
    //         }            
    //     })
    // }
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
    clickMoveBtn = (e) => {
        const direction = e.currentTarget.className.split("btn ")[1];
        this.setState({ moveDirection: direction });
        console.log(direction)
    }
    render() {
        return (
            <div className="main_container">
                <div className="left_block">
                    <div className="div_table">
                        {this.renderLeftBlock()}
                    </div>
                </div>
                <div className="right_block">
                <div className="div_table">
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
            </div>
            // <div className="div_table">
            //     <div className="div_tr">{this.renderHeader()}</div>           
            //     {this.state.data.map((obj, i) => <Row 
            //         key={i}
            //         data={obj} 
            //         colIdx={i}
            //         movedirection={this.state.moveDirection}
            //         moveGrid={this.state.moveGrid}
            //         position={this.state.position ? this.state.position : ""}
            //         handleRowVal={this.handleCalendarGet}
            //     />)}
            //     <div className="btn_container">
            //         <div className="btn left" onClick={this.clickMoveBtn}>{'<'}</div>
            //         <div className="btn right"onClick={this.clickMoveBtn} >{'>'}</div>
            //     </div>
            // </div>
        )
    }
}

export default Calendar;