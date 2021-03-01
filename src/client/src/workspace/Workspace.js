
import React, { Component } from "react";
import axios from "axios";
import $ from 'jquery'

import Note from './Note' 

class Workspace extends Component {
  
  constructor(id) {
    super(id);
    this.state = {
      workspace: {
        notes: []
      }
    }
    this.loadWorkspace = this.loadWorkspace.bind(this)
    this.createNote = this.createNote.bind(this)

  }
  componentDidMount(){
    
    this.loadWorkspace()
    
  }

  loadWorkspace(reload){
    axios.post('api/workspace/load/', {id: this.props.id}).then( res => {
        this.setState({workspace: {notes: []}})
        var notes = []
        res.data.forEach(note => {
        notes.push(
         <Note key={note._id} id={note._id} onDelete={this.loadWorkspace}></Note>
        )
      });
      this.setState({workspace: {notes}})
      $('.checklist-control').on("click", (e)=> {
        if($(e.currentTarget).hasClass('clicked')){   
          $(e.currentTarget).removeClass('clicked') 
          $(e.currentTarget.nextSibling).slideToggle(1000)
        } else {
          $(e.currentTarget).addClass('clicked')
          $(e.currentTarget.nextSibling).slideToggle(1000)
        }

      })
    })
  }
  toggleList(){
    
  }
  createNote(){
    axios.post('api/workspace/note/create/', {id: this.props.id}).then( res => {
      $('.Notes').addClass('rendered')
      this.loadWorkspace(true);
    })
  }
  render() {
    return (
      <div className="Workspace">
        <div className="workspace-control-container">
            
            <a a href="#" onClick={this.createNote }>+</a>
        </div>
        <div className="Notes">
          {this.state.workspace.notes}
        </div>
      </div>
    );
  }
}

export default Workspace;