import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faPlusSquare, faWindowMinimize } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery'

import Checkbox from './Checkbox'

class Note extends React.Component {

    constructor(id) {
        super(id);
        var dataIn = this.props.data
        this.state = {
            id: this.props.id,
            body: "loading body",
            checklist: [],
        }
        this.createCheck = this.createCheck.bind(this)
        this.updateNote = this.updateNote.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.refreshNote = this.refreshNote.bind(this)
        this.deleteNote = this.deleteNote.bind(this)
        this.render = this.render.bind(this)

    }
    componentDidMount(){
        this.refreshNote()
        
    }
    refreshNote(){
        axios.post('api/workspace/note/load/', {id: this.props.id}).then( res => {
            var data = res.data
            var checklistElements = []
            this.setState({
                checklist: []
            })
            data.checklist.forEach((check, index) => {
                checklistElements.push(
                    <Checkbox key={index} onDelete={this.refreshNote} data={{ id: this.props.id, index: index, ...check }}></Checkbox>
                )
            })
            var newState = { checklist: checklistElements}  // explicitly resetting the checklist state is required to render the elements correctly. 
            if(!this.initialised){
                
                newState.body = data.body
                this.initialised = true;
            } 
            
            this.setState(newState)
        })
    }
    updateNote(change){
        axios.post('api/workspace/note/update/', {
            id: this.state.id,
            body: change
        })
    }
    createCheck(){
        this.updateNote(this.state.body)
        axios.post('api/workspace/note/check/create', {
            id: this.state.id
        }).then( res => {
            $('.checklist').addClass('rendered')
            this.refreshNote()
        })
    }
    deleteNote(){
        axios.post('api/workspace/note/delete/', {
            noteID: this.state.id
        }).then( res => {
            this.props.onDelete();
        }) 
    }
    handleChange(e){
        this.setState({body: e.target.value});
        this.updateNote(e.target.value)
    }

    render(){
        return(
            <div noteid={this.state.id} className="note fade-in">
                <div className="delete-note">
                    <a onClick={this.deleteNote} href="#"><FontAwesomeIcon icon={faWindowMinimize} /></a>
                </div>
                <textarea value={this.state.body} onChange={this.handleChange}></textarea>
                <div className="checklist-container">
                    <div className="checklist-control">
                        <a href="#"><FontAwesomeIcon icon={faChevronDown} /></a>
                    </div>
                    <div className="checklist">
                        {this.state.checklist}
                        <div className="add-checkbox">
                            <a onClick={this.createCheck} href="#"><FontAwesomeIcon icon={faPlusSquare} /></a>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Note;