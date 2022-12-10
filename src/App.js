import React from 'react'
import './App.css'
import Header from './Header.js'
import TaskCreator from './TaskCreator.js'


class App extends React.Component {
  state = {
    taskDetails: [],
    taskCount: 0
  }

  returnEditFunctions = (event) => {
    return [this.handleStatusChange, this.handleTaskEdit, event]
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({taskDetails: [...this.state.taskDetails, 
                                {id: this.state.taskCount,
                                  textContent: event.target.taskContent.value,
                                  content: <p>{event.target.taskContent.value}</p>,
                                  status: 'New',
                                  editStatus: false}],
                    taskCount: this.state.taskCount + 1}
    )
    event.target.taskContent.value = ''
  }

  handleStatusChange = (taskId) => {
    this.setState(() => {
      return {
              ...this.state,
              taskDetails: this.state.taskDetails.map(task => {
                              if(task.id === taskId){
                                if(task.status === 'New'){
                                  return {...task, status: 'Done'}
                                }else{
                                  return {...task, status: 'New'}
                                }
                              }else{
                                return task
                              }
                            })
      }
    })
  }
  
  handleTaskEdit = (taskId) => {
    this.setState(() => {
      return {
              ...this.state,
              taskDetails: this.state.taskDetails.map(task => {
                            if(task.id === taskId){
                              if(!task.editStatus){
                                return {
                                  ...task,
                                  content: <input type='text'
                                                  name='editTaskText'
                                                  placeholder='Input the task...'
                                                  required />,
                                  editStatus: !task.editStatus
                                }
                              }else{
                                return {
                                  ...task,
                                  content: <p>
                                      {document.getElementsByName('editTaskText')[0].value}
                                    </p>,
                                  editStatus: !task.editStatus
                                }
                              }
                            }else{
                              return task
                            }
                          })
      }
    })
  }

  handleTaskDelete = (taskId) => {
    this.setState(() => {
      return {
              ...this.state,
              taskDetails: this.state.taskDetails.filter(task => task.id !== taskId),
              taskCount: this.state.taskCount - 1
      }
    })
  }

  render(){
    return (
      <>
        <Header onSubmit={this.handleSubmit} 
                taskCount={this.state.taskCount} />
        <TaskCreator taskDetails={this.state.taskDetails}
                     onStatusClick={this.handleStatusChange}
                     onEditClick={this.handleTaskEdit}
                     onDeleteClick={this.handleTaskDelete}
        />
      </>
    )
  }
  
}

export default App;