import React, { Component } from 'react'
import { Link } from "react-router-dom";



class LeftMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <section>
                <aside id="leftsidebar" className="sidebar">

                    <div className="menu">
                        <ul className="list">
                            <li className="active">
                                <a href="index.html">
                                    <i className="material-icons">home</i>
                                    <span>Home</span>
                                </a>
                            </li>

                            <li>
                                <a href="javascript:void(0)" className="menu-toggle">
                                    <i className="material-icons">widgets</i>
                                    <span>Settings</span>
                                </a>
                                <ul className="ml-menu">
                                    <li>
                                        <a href="javascript:void(0)" className="menu-toggle">
                                            <span>Cards</span>
                                        </a>
                                        <ul className="ml-menu">
                                            <li>
                                                <Link to="#">Basic</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>


                            <li>
                                
                                <a href="#" className="menu-toggle">
                                    <i className="material-icons">widgets</i>
                                    <span>User Management</span>
                                </a>
                                <ul className="ml-menu">
                                    <li>
                                        <Link to="/userList">User</Link>
                                    </li>
                                    <li>
                                        <Link to="/roleList">Role</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Reset Password</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="legal">
                        <div className="copyright">
                            &copy; 2020 - 2021 <a href="#">Newgen Technology Ltd.</a>.
                    </div>
                    </div>
                </aside>
            </section>
        );
    }
}
export default LeftMenu;
