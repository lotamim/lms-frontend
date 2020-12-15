import React, { Component } from 'react'
import Http from '../../services/http.service';
import { API_URL } from '../constant/Constants';

class UserRoleMap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userList: [],
            loding: true,
            showList: false,
            showCreate: true,
        }
    }

    componentDidMount = () => {

        this.userList();
        // const script = document.createElement("script");
        // script.src = "assets/plugins/multi-select/js/jquery.multi-select.js";
        // script.async = true;
        // document.body.appendChild(script);
        // console.log("Loding");
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

    userList = () => {
        const path = "user/list";
        Http.get(path).then(res => {
            this.setState({
                userList: res.data.userList
            })
        });
    }

    render() {
        return (
            <div>
                <section className="content">
                    <div className="container-fluid">
                        {this.state.showList &&
                            (<div className="row clearfix">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="card">
                                        <div className="header">
                                            <h2>
                                                User Role Map
                                        </h2>
                                            <ul className="header-dropdown m-r--5">
                                                <button type="button" class="btn bg-teal waves-effect" onClick={this.addNew.bind(this)}>
                                                    +
                                            </button>
                                            </ul>
                                        </div>
                                        <div className="body table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>SL No.</th>
                                                        <th>FIRST NAME</th>
                                                        <th>User Name</th>
                                                        <th>Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td scope="row">#</td>
                                                        <td>Mark</td>
                                                        <td>@Mark</td>
                                                        <td>@Mark</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}

                        {this.state.showCreate &&
                            (
                                <div className="row clearfix">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="card">
                                            <div className="header">
                                                <h2>
                                                    Create User Role Map
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
                                                    <p>
                                                        <b>Basic</b>
                                                    </p>
                                                    <select class="form-control show-tick">
                                                        <option>Mustard</option>
                                                        <option>Ketchup</option>
                                                        <option>Relish</option>
                                                    </select>

                                                    <p>
                                                        <b>Multiple Select</b>
                                                    </p>
                                                    <select class="form-control show-tick" multiple>
                                                        <option>Mustard</option>
                                                        <option>Ketchup</option>
                                                        <option>Relish</option>
                                                    </select>
                                                    <br />
                                                    <button type="button" className="btn bg-pink waves-effect">Save</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                    </div>
                </section>
            </div>

        )
    }
}
export default UserRoleMap;