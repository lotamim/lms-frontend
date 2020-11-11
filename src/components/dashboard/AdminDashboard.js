import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Auth from "../../services/auth.service";
import  { Redirect } from 'react-router-dom'

class AdminDashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    clickHandler = () =>{
        if(Auth.logout() == "undefined"){
            return <Redirect to='/logIn'  />
        }
    }
    
    render() {
        return (
            <div>
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">Active</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Longer nav link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a href="/logIn" class="nav-link" onClick={this.clickHandler.bind(this)}> Logout</a>
                    </li>
                </ul>
            </div>
        )
    }
}
export default AdminDashboard;
