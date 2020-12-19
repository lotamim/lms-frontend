import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Auth from "../../services/auth.service";


class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    clickHandler = () => {
        let logout = Auth.logout();
        if (logout == undefined) {
            window.location.replace("/logIn");
        }
    }

    render() {
        return (
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a href="#" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a>
                        {/* <a href="#" className="bars">dfdfdf</a> */}
                        <a className="navbar-brand" href="index.html">Newgen Technology Ltd.</a>
                    </div>
                    <div className="navbar-header " id="">
                        <span className="navbar-brand moduleBar" href="index.html">
                           {/* <span className="moduleName"> HRM </span> */}
                           {/* <span className="moduleName"> Payroll </span> */}
                           {/* <span className="moduleName"> Inventory </span> */}
                           {/* <span className="moduleName"> Account </span> */}
                           {/* <span className="moduleName"> Asset </span> */}
                         </span>
                        
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">

                            <li className="pull-right">
                                <i className="material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">keyboard_arrow_down</i>
                                <ul className="dropdown-menu pull-right">
                                    {/* <li><a href="#"><i className="material-icons">person</i>Profile</a></li> */}
                                    {/* <li role="seperator" className="divider"></li> */}
                                    {/* <li><a href="#"><i className="material-icons">group</i>Followers</a></li> */}
                                    {/* <li><a href="#"><i className="material-icons">shopping_cart</i>Sales</a></li> */}
                                    {/* <li><a href="#"><i className="material-icons">favorite</i>Likes</a></li> */}
                                    {/* <li role="seperator" className="divider"></li> */}
                                    {/* onClick={this.clickHandler.bind(this)} */}
                                    <li onClick={this.clickHandler}><Link to="#"><i className="material-icons">input</i>Sign Out</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
export default Navbar;
