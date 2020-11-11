import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {API_URL} from "../constant/Constants"

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            email: "",
            password: ""
        }
    }

    changeHander = (event) =>{
        this.setState({
          [event.target.name] : event.target.value
        })
    }

    submitHandler = (event) =>{
        event.preventDefault();
        let data = {
            username : this.state.username,
            email : this.state.email ,
            password : this.state.password,
        }
        axios.post(API_URL + "signUp",data).then((response)=>{
           var res = response.data;
           console.log(res);
        })
    }


    render() {
        return (
            
            <div className="signup-form">
                <form className="form" onSubmit={this.submitHandler.bind(this)}>
                    <h2>Sign Up</h2>
                    <p>Please fill in this form to create an account!</p>
                    <hr />
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <span className="fa fa-user"></span>
                                </span>
                            </div>
                            <input type="text" className="form-control" name="username" placeholder="Username" required="required" onChange={this.changeHander.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-paper-plane"></i>
                                </span>
                            </div>
                            <input type="email" className="form-control" name="email" placeholder="Email Address" required="required" onChange={this.changeHander.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" name="password" placeholder="Password" required="required" onChange={this.changeHander.bind(this)} />
                        </div>
                    </div>
                    {/* <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-lock"></i>
                                    <i class="fa fa-check"></i>
                                </span>
                            </div>
                            <input type="text" class="form-control" name="confirm_password" placeholder="Confirm Password" required="required" />
                        </div>
                    </div> */}
                    {/* <div class="form-group">
                        <label class="form-check-label"><input type="checkbox" required="required" /> I accept the
                        <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
                    </div> */}
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                    </div>
                </form>
                <div className="text-center">Already have an account? <Link to={"logIn"} > Login here </Link>
                </div>
            </div>
        );
    }
}
export default SignUp;