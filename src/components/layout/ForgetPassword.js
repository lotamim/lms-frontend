import React, { Component } from 'react'

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="top-content">
                <div className="inner-bg">
                    <div className="container">

                        {/* <div class="row"> */}
                        {/* <div class="col-sm-8 col-sm-offset-2 text">
                                <h1><strong>Bootstrap</strong> Forgot Password Forms</h1>
                            </div> */}
                        {/* </div> */}
                        {/* <div class="col-sm-6 col-sm-offset-3 text"> */}
                        <div className="form-box">
                            <div className="form-top">
                                <div className="form-top-left">
                                    <h3>Forgot Password</h3>
                                    <p>Enter username or email address to get password:</p>
                                </div>
                                <div className="form-top-right">
                                    <i className="fa fa-lock"></i>
                                </div>
                            </div>
                            <div className="form-bottom">
                                <form role="form" action="" method="post" className="login-form">
                                    <div className="form-group">
                                        <label className="sr-only" for="form-username">Username</label>
                                        <input type="text" name="form-username" placeholder="Username or email" class="form-username form-control" id="form-username" />
                                    </div>
                                    <button type="submit" className="btn col-sm-5">Submit</button>
                                    <br /><br />
                                    {/* <a class="btn btn-primary" href="index.html">Sign In</a> */}
                                    {/* <a class="btn btn-primary" href="register.html" style={{ float: "right" }}>Sign Up</a> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
