import React, { Component } from "react";
import LeftMenu from "./components/dashboard/LeftMenu";
import Navbar from "./components/dashboard/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/layout/Login";
import SignUp from "./components/layout/SignUp";
import ForgetPassword from "./components/layout/ForgetPassword";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import UserList from "./components/user/UserList";
import RoleList from "./components/role/RoleList";
import UserRoleMap from "./components/user/UserRoleMap";
import AuthService from "./services/auth.service";
import ResetPassword from "./components/layout/ResetPassword";
import Module from "./components/layout/module/Module";
import Organization from "./components/settings/Organization";
import Department from "./components/settings/Department";
import Position from "./components/settings/Position";
import Degree from "./components/settings/Degree";
import Bank from "./components/settings/Bank";
import RoleReport from "./components/reports/RoleReport";
import Menu from "./components/dashboard/Menu";
import MenuItem from "./components/dashboard/MenuItem";
import Permission from "./components/dashboard/Permission";
import Branch from "./components/settings/Branch";
import LoanSubType from "./components/settings/LoanSubType";
import Account from './components/settings/Account';
import Charge from './components/settings/Charge';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // console.log(AuthService.getCurrentUser());
    return (
      <div className="theme-red">
        {AuthService.getCurrentUser() !== null ? (
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
              <Route exact path="/menu" component={Menu} />
              <Route exact path="/menuItem" component={MenuItem} />
              <Route exact path="/permission" component={Permission} />
              {/*  for settings  */}
              <Route exact path="/organization" component={Organization} />
              <Route exact path="/department" component={Department} />
              <Route exact path="/position" component={Position} />
              <Route exact path="/degree" component={Degree} />
              <Route exact path="/rolereport" component={RoleReport} />
              <Route exact path="/branch" component={Branch} />
              <Route exact path="/bank" component={Bank} />
              <Route exact path="/loansubtype" component={LoanSubType} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/charge" component={Charge} />
              {/* <Route component={PageNotFound} /> */}
            </Switch>
          </Router>
        ) : (
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/logIn" component={Login} />
              <Route exact path="/signUp" component={SignUp} />
              <Route component={NoMatchURL} />
            </Switch>
          </Router>
        )}
      </div>
    );
  }
}

export default App;

const NoMatchURL = () => {
  return <Redirect to="/" />;
};

{
  /* <Redirect to="/" /> */
}
{
  /* <h3>404 - Not found</h3> */
}
