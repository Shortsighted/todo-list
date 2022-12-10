import React from 'react'
import './App.css'
import Header from './Header.js'
import TaskCreator from './TaskCreator.js'


class App extends React.Component {
  state = {
    taskDetails: [],
    taskCount: 0
  }

  async fetchTasks(){
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await response.json()

    const formattedData = data.map(task => {
      return {
        id: this.state.taskCount + task.id,
        textContent: task.title,
        content: <p>{task.title}</p>,
        taskId: task.id,
        status: task.completed ? 'Done': 'New',
        editStatus: false
      }
    })

    return formattedData
  }

  handleFetchClick = () => {
    this.fetchTasks()
    .then(data => {
      console.log(data)
        this.setState({
            taskDetails: [...this.state.taskDetails,
                          ...data],
            taskCount: this.state.taskCount + data.length
    })})
        console.log(this.state)
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
    this.setState({
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
    })
  }
  
  handleTaskEdit = (taskId) => {
    this.setState({
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
    })
  }

  handleTaskDelete = (taskId) => {
    this.setState({
              ...this.state,
              taskDetails: this.state.taskDetails.filter(task => task.id !== taskId),
              taskCount: this.state.taskCount - 1
    })
  }

  handleDeleteAllClick = () => {
    this.setState({
      ...this.state,
      taskDetails: [],
      taskCount: 0
    })
  }

  render(){
    return (
      <>
        <Header onSubmit={this.handleSubmit} 
                taskCount={this.state.taskCount}
                deployTasks={this.handleFetchClick}
                deleteAllTasks={this.handleDeleteAllClick}/>
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