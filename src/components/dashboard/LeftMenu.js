import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Http from '../../services/http.service';
import { withAlert } from 'react-alert';

class LeftMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menuList: [],
            menuItemList: [],
            loading: '',
        }
    }

    componentDidMount = () => {
        this.menuList();
        this.dynamicMenuItem();
        const script = document.createElement("script");
        script.src = "assets/js/admin.js";
        script.async = true;
        document.body.appendChild(script);
    }

    menuList = () => {
        const path = "menu/list";
        Http.get(path).then(res => {
            this.setState({
                menuList: res.data.menuList,
                loading: false,
            })
        });
    }

    dynamicMenuItem = () => {
        var path = "menuItem/dynamicMenuItem";
        Http.get(path).then((res) => {
            this.setState({
                menuItemList: res.data.list
            })
        });
    }


    render() {
        const { menuList, menuItemList } = this.state;
        const loadMenu = menuList.map((menu, index) => {
            return (
                menuItemList.map((menuItem, index) => {
                    if (menuItem.menu_name === menu.menuName) {
                        let menuItemSplit = menuItem.menu_item_name.split(",");
                        return (
                            <li key={index + 1}>
                                <a href="javascript:void(0)" className="menu-toggle">
                                    <i className="material-icons">settings</i>
                                    <span>{menu.menuName}</span>
                                </a>

                                <ul className="ml-menu" key={index + 1}>
                                    {menuItemSplit.map((val) => {
                                        return (
                                            <li>
                                                <Link to={"/" + val.toLowerCase()}>{val}</Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        )
                    }
                })
            )
        })
        return (
            <section>
                <aside id="leftsidebar" className="sidebar">

                    <div className="menu">
                        <ul className="list">
                            <li className="active">
                                <Link to="/adminDashboard">
                                    <i className="material-icons">home</i>
                                    <span>Home</span>
                                </Link>
                            </li>

                            {loadMenu}

                            {/* <li>
                                <a href="javascript:void(0)" className="menu-toggle">
                                    <i className="material-icons">settings</i>
                                    <span>Settings</span>
                                </a>
                                <ul className="ml-menu">
                                    <li>
                                        <Link to="/organization">Organization</Link>
                                    </li>
                                    <li>
                                        <Link to="/englishDepartment">Department</Link>
                                    </li>
                                </ul>
                            </li> */}


                            {/* <li>
                                <a href="javascript:void(0)" className="menu-toggle">
                                    <i className="material-icons">verified_user</i>
                                    <span>Sanction</span>
                                </a>
                                <ul className="ml-menu">
                                    <li>
                                        <Link to="#">Health Insurance</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Paid Time Off (PTO)</Link>
                                    </li>
                                </ul>
                            </li> */}


                            {/* <li>
                                <a href="javascript:void(0)" className="menu-toggle">
                                    <i className="material-icons">verified_user</i>
                                    <span>Drawdown</span>
                                </a>
                                <ul className="ml-menu">
                                    <li>
                                        <Link to="#">Job History</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Salary History</Link>
                                    </li>
                                </ul>
                            </li> */}

                            {/* <li>
                                <a href="javascript:void(0)" className="menu-toggle">
                                    <i className="material-icons">verified_user</i>
                                    <span>Re-Payment</span>
                                </a>
                                <ul className="ml-menu">
                                    <li>
                                        <Link to="#">Health Insurance</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Paid Time Off (PTO)</Link>
                                    </li>
                                </ul>
                            </li> */}



                            <li>
                                <a href="#" className="menu-toggle">
                                    <i className="material-icons">group</i>
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
                                        <Link to="/userRoleMap">User Role Mapping</Link>
                                    </li>
                                    <li>
                                        <Link to="/menu">Menu</Link>
                                    </li>
                                    <li>
                                        <Link to="/menuItem">Menu Item</Link>
                                    </li>
                                    <li>
                                        <Link to="/permission">Permission</Link>
                                    </li>
                                    <li>
                                        <Link to="/resetPassword">Reset Password</Link>
                                    </li>
                                </ul>
                            </li>

                            {/* <li>
                                <a href="#" className="menu-toggle">
                                    <i className="material-icons">group</i>
                                    <span>Report</span>
                                </a>
                                <ul className="ml-menu">
                                    <li>
                                        <Link to="/roleReport">RoleReports</Link>
                                    </li>
                                </ul>
                            </li> */}

                        </ul>
                    </div>
                    <div className="legal">
                        <div className="copyright">
                            &copy; 2020 - 2021 <a href="#">Newgen Technology Ltd.</a>.
                    </div>
                    </div>
                </aside>
            </section >
        );
    }
}
export default LeftMenu;
