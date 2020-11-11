import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/layout/Login';
import SignUp from './components/layout/SignUp';
import Nav from './components/nav/Navigation';
import ForgetPassword from './components/layout/ForgetPassword'
import AdminDashboard from './components/dashboard/AdminDashboard';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Nav /> */}
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path="/logIn" component={Login} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/adminDashboard" component={AdminDashboard} />
          <Route exact path="/forgetPassword" component={ForgetPassword} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
