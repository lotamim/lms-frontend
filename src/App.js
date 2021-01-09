import React, { Component } from 'react'
import LeftMenu from './components/dashboard/LeftMenu';
import Navbar from './components/dashboard/Navbar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/layout/Login';
import SignUp from './components/layout/SignUp';
import ForgetPassword from './components/layout/ForgetPassword'
import AdminDashboard from './components/dashboard/AdminDashboard';
import UserList from './components/user/UserList';
import RoleList from './components/role/RoleList';
import UserRoleMap from './components/user/UserRoleMap';
import AuthService from './services/auth.service';
import ResetPassword from './components/layout/ResetPassword';
import Module from './components/layout/module/Module';
import Organization from './components/settings/Organization';
import Department from './components/settings/Department';
import Position from './components/settings/Position';
import Degree from './components/settings/Degree';
import RoleReport from './components/reports/RoleReport'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }
  

  render() {
    // console.log(AuthService.getCurrentUser());
    return (
      <div className="theme-red">

        {AuthService.getCurrentUser() !== null ?
          (
            <Router>
              <Navbar />
              <LeftMenu />
              <Switch>
                <Route exact path="/adminDashboard" component={AdminDashboard} />
                <Route exact path="/forgetPassword" component={ForgetPassword} />
                <Route exact path="/userList" component={UserList} />
                <Route exact path="/roleList" component={RoleList} />
                <Route exact path="/userRoleMap" component={UserRoleMap} />
                <Route exact path="/resetPassword" component={ResetPassword} />
                {/* <Route exact path="/module" component={Module}/> */}
                {/*  for settings  */}
                <Route exact path="/organization" component={Organization} />
                <Route exact path="/department" component={Department} />
                <Route exact path="/position" component={Position} />
                <Route exact path="/degree" component={Degree} />
                <Route exact path="/roleReport" component={RoleReport} />
              </Switch>
            </Router>
            ) 
          : (
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/logIn" component={Login} />
                <Route exact path="/signUp" component={SignUp} />
              </Switch>
            </Router>
          )
        }
      </div>
    );
  }
}

export default App;
