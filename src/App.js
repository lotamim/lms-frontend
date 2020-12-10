import React, { Component } from 'react'
import LeftMenu from './components/dashboard/LeftMenu';
import Navbar from './components/dashboard/Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/layout/Login';
import SignUp from './components/layout/SignUp';
// import Authentication from '../src/components/layout/Authentication';
// import Nav from './components/nav/Navigation';
import ForgetPassword from './components/layout/ForgetPassword'
import AdminDashboard from './components/dashboard/AdminDashboard';
import UserList from './components/user/UserList';
import RoleList from './components/role/RoleList';
import AuthService from './services/auth.service';


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

        {AuthService.getCurrentUser() !== null &&
          (
            <Router>
              <Navbar />
              <LeftMenu />
              <Switch>
                {/* <Route exact path="/" component={Login} /> */}
                {/* <Route exact path="/logIn" component={Login} /> */}
                {/* <Route exact path="/signUp" component={SignUp} /> */}
                <Route exact path="/adminDashboard" component={AdminDashboard} />
                <Route exact path="/forgetPassword" component={ForgetPassword} />
                <Route exact path="/userList" component={UserList} />
                <Route exact path="/roleList" component={RoleList} />
              </Switch>
            </Router>
          )
        }
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/logIn" component={Login} />
                <Route exact path="/signUp" component={SignUp} />
              </Switch>
            </Router>
          
        


      </div>
    );
  }
}

export default App;
