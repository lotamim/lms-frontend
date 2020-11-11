import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from '../../services/auth.service'


class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username : "",
            password : "",
        }
    }
    changeHandler = (event) =>{
      this.setState({
          [event.target.name] : event.target.value
      })
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const userInfo = {
            username :this.state.username,
            password :this.state.password,
        }
        Auth.login(userInfo).then((response)=>{
            // if (data.role.includes("ROLE_ADMIN"))
            if(response.token){
                this.props.history.push("/adminDashboard")
            }
            console.log("HI"+ response.token)        
         })
    }

    render() {
        return (
            <div>
                <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
                    <div className="container">
                        <div className="card login-card">
                            <div className="row no-gutters">
                                <div className="col-md-5">
                                    <img src="assets/img/login.jpg" alt="login" className="login-card-img" />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        {/* <div class="brand-wrapper">
                                            <img src="assets/img/logo.svg" alt="logo" class="logo" />
                                        </div> */}
                                        <p className="login-card-description">Log In</p>
                                        <form onSubmit={this.onSubmitHandler.bind(this)}>
                                            <div className="form-group">
                                                {/* <label for="email" class="sr-only">Email</label> */}
                                                <input type="text" name="username" id="username" className="form-control" 
                                                placeholder="username" onChange={this.changeHandler.bind(this)}/>
                                            </div>
                                            <div className="form-group mb-4">
                                                {/* <label for="password" class="sr-only">Password</label> */}
                                                <input type="password" name="password" id="password" className="form-control" 
                                                placeholder="***********" onChange={this.changeHandler.bind(this)} />
                                            </div>
                                            <input name="login" id="login" className="btn btn-block login-btn mb-4" type="submit" value="Login" />
                                        </form>
                                        <Link to={"forgetPassword"} className="forgot-password-link">Forgot password? </Link>
                                        <p className="login-card-footer-text">Don't have an account?
                                          <Link to={"signUp"} class="text-reset"> registration </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
export default Login