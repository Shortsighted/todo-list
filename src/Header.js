import React, {Component} from "react";
import styles from "./Header.module.css"

export default class Header extends Component {    
    render(){
        return(
            <header className={styles.mainBox} onSubmit={this.props.onSubmit}>
                <h2>To Do List</h2>
                <p>Total of {this.props.taskCount} tasks</p>
                <form className={styles.taskCreationBox}>
                    <input type='text' name='taskContent' required='required' />
                    <button>Create</button>
                </form >
            </header>
        )
    }
}