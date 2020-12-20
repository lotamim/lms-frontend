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
                                <Link to="/adminDashboard">
                                    <i className="material-icons">home</i>
                                    <span>Home</span>
                                </Link>
                            </li>

                            <li>
                                <a href="javascript:void(0)" className="menu-toggle">
                                    <i className="material-icons">settings</i>
                                    <span>Settings</span>
                                </a>
                                <ul className="ml-menu">
                                    <li>
                                        <Link to="/organization">Organization</Link>
                                    </li>
                                    <li>
                                        <Link to="/department">Department</Link>
                                    </li>
                                    <li>
                                        <Link to="/position">Position</Link>
                                    </li>
                                    <li>
                                        <Link to="/degree">Degree</Link>
                                    </li>
                                    <li>
                                        <Link to="/leaveType">Leave Type</Link>
                                    </li>
                                    <li>
                                        <Link to="/holiday">Holiday setup</Link>
                                    </li>
                                </ul>
                            </li>


                            <li>
                                <a href="javascript:void(0)" className="menu-toggle">
                                    <i className="material-icons">weekend</i>
                                    <span>Time and Attendance</span>
                                </a>
                                <ul className="ml-menu">
                                    <li>
                                        <Link to="#">Clock In/Out</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Time Reporting</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Overtime Tracking</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Absence Management</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Holidays Calendar</Link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <a href="javascript:void(0)" className="menu-toggle">
                                    <i className="material-icons">verified_user</i>
                                    <span>Recruitment and Hiring</span>
                                </a>
                                <ul className="ml-menu">
                                    <li>
                                        <Link to="#">Job Requisitions</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Job Descriptions</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Job Board Posting</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Applicant Evaluation</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Applicant Tracking System</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Candidate Pre-Screening</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Job Offer Extension</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Background Check</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Onboarding</Link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <a href="javascript:void(0)" className="menu-toggle">
                                    <i className="material-icons">verified_user</i>
                                    <span>Benefits Management</span>
                                </a>
                                <ul className="ml-menu">
                                    <li>
                                        <Link to="#">Health Insurance</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Life Insurance</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Retirement Plans</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Travel Compensation</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Paid Time Off (PTO)</Link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <a href="javascript:void(0)" className="menu-toggle">
                                    <i className="material-icons">verified_user</i>
                                    <span>Employee Information</span>
                                </a>
                                <ul className="ml-menu">
                                    <li>
                                        <Link to="#">Job History</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Salary History</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Disciplinary History</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Insurance Plans</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Banking and Tax Details</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Time Off Used and Accrued</Link>
                                    </li>
                                </ul>
                            </li>

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
                                    {/* <li>
                                        <Link to="/module">Module</Link>
                                    </li> */}
                                    {/* <li>
                                        <Link to="#">Menu</Link>
                                    </li> */}
                                    {/* <li>
                                        <Link to="#">Menu Item</Link>
                                    </li> */}
                                    <li>
                                        <Link to="/resetPassword">Reset Password</Link>
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
