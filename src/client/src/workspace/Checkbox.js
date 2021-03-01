import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'


class Checkbox extends React.Component {
    initialised = false;

    constructor(data) {
        super(data);
        var dataIn = this.props.data
        this.state = {
            id: dataIn.id,
            index: dataIn.index,
            body: dataIn.task,
            isChecked: dataIn.isChecked
        }

        this.updateCheck = this.updateCheck.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.deleteCheck = this.deleteCheck.bind(this)
    }
    updateCheck(update){
    
        
    }
    deleteCheck(){
        axios.post('api/workspace/note/check/delete', {
            noteID: this.state.id,
            index: this.state.index,
        }).then( res => {
            this.props.onDelete();
        }) 
    }

    handleCheck(){
        axios.post('api/workspace/note/check/update', {
            noteID: this.state.id,
            index: this.state.index,
            task: this.state.body,
            isChecked: !this.state.isChecked,
        }).then( res => {
            console.log(res)
        }) 
    }
    handleChange(e){
        axios.post('api/workspace/note/check/update', {
            noteID: this.state.id,
            index: this.state.index,
            task: e.target.value,
            isChecked: this.state.isChecked,
        }).then( res => {
            console.log(res)
        }) 
    }
    render(){
        return(
            <div className="checkbox fade-in"  >
                <input type="checkbox" defaultChecked={this.state.isChecked} onChange={this.handleCheck}></input>
                <input type="text" defaultValue={this.state.body} onChange={this.handleChange}></input>
                <a href="#" onClick={this.deleteCheck}><FontAwesomeIcon icon={faTrashAlt} /></a>
            </div>
        )
    }
}

export default Checkbox;