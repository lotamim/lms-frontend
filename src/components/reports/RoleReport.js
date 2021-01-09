import React, { Component } from 'react'
import { API_URL } from '../constant/Constants';
import Http from '../../services/http.service';



class RoleReport extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    addNew = () => {
        this.setState({
            showCreate: true,
            showList: false,
        })
    }

    backToList = () => {
        this.setState({
            showCreate: false,
            showList: true,
        })
    }

    reportHandleer = (evnt) => {
        const path = "report/pdf";
        window.open(API_URL+path)
        // alert("::::");
    }

    // userList = () => {
    //     const path = "user/list";
    //     Http.get(path).then(res => {
    //         this.setState({
    //             userList : res.data.userList
    //         })
    //     });
    // }

    render() {
        return (
            <div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row clearfix">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="card">
                                    <div className="header">
                                        <h2>
                                            Role Report
                                            </h2>
                                        <ul className="header-dropdown m-r--5">
                                            <li className="dropdown">
                                                <a href="javascript:void(0);" onClick={this.backToList.bind(this)} role="button" >
                                                    <i className="material-icons">keyboard_backspace</i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="body">
                                        <form>
                                            {/* <label for="email_address">Email Address</label>
                                            <div className="form-group">
                                                <div className="form-line">
                                                    <input type="text" id="email_address" className="form-control" placeholder="Enter your email address" />
                                                </div>
                                            </div>
                                            <label for="password">Password</label>
                                            <div className="form-group">
                                                <div className="form-line">
                                                    <input type="password" id="password" className="form-control" placeholder="Enter your password" />
                                                </div>
                                            </div> */}
                                            <br />
                                            <button type="button" onClick={this.reportHandleer.bind(this)} className="btn bg-pink waves-effect">Report</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default RoleReport;
