import React from "react"
import styles from "./TaskCreator.module.css"

export default class TaskCreator extends React.Component{
    state = {
        deleteTask: this.props.onDeleteClick,
        editTask: this.props.onEditClick,
        changeStatus: this.props.onStatusClick
    }

    render(){
        return(
            <div className={styles.mainBox}>
               {[...this.props.taskDetails].reverse().map(task => 
                    <div className={styles.taskBox}>
                        {task.content}
                        <div className={styles.infoBox}> 
                            <div 
                                onClick={() => this.state.deleteTask(task.id)}
                                className={styles.deleteButton}
                            >Delete</div>
                            <div 
                                onClick={() => this.state.editTask(task.id)}
                                className={
                                        task.editStatus ? styles.editButtonActive
                                                        : styles.editButtonInactive
                                    }
                            >{task.editStatus ? 'Update' : 'Edit'}</div>
                            <div 
                                onClick={() => this.state.changeStatus(task.id)}
                                className={
                                    task.status === 'New' 
                                                ? styles.completionMarkerNew  
                                                : styles.completionMarkerDone
                                }
                            >{task.status}</div>
                        </div>
                    </div>                
                )}
            </div>
        )
    }
}