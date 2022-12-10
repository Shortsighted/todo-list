import React, {Component} from "react";
import styles from "./Header.module.css"

export default class Header extends Component {    
    render(){
        return(
            <header className={styles.mainBox} onSubmit={this.props.onSubmit}>
                <h2>To Do List</h2>
                <p>Total of {this.props.taskCount} tasks</p>
                <div className={styles.taskCreationContainer}>
                    <form className={styles.taskCreationBox}>
                        <input type='text' name='taskContent' required='required' />
                        <button>Create</button>
                    </form >
                    <div className={styles.functionsBox}>
                        <div className={styles.deployTasks}
                            onClick={this.props.deployTasks}
                        >↓ Deploy tasks from api ↓</div>
                        <div className={styles.deleteAllTasks}
                             onClick={this.props.deleteAllTasks}
                        >↓ Delete all tasks ↓</div>
                    </div>
                </div>
            </header>
        )
    }
}