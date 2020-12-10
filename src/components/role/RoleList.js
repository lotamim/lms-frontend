import React, { Component } from 'react'
// import LeftMenu from '../dashboard/LeftMenu';
// import Navbar from '../dashboard/Navbar';

class RoleList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loding: true,
            showList: true,
            showCreate: false,
        }
    }
    componentDidMount = () => {
        console.log("Loding");
    }

    addNew = () => {
        this.setState({
            showCreate : true,
            showList : false,
        })
    }


    render() {
        return (
            <div>
                {/* <Navbar />
                <LeftMenu /> */}

                <section className="content">
                    <div className="container-fluid">
                        {this.state.showList &&
                            (<div className="row clearfix">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="card">
                                        <div className="header">
                                            <h2>
                                               Role List
                                             </h2>
                                            <ul className="header-dropdown m-r--5">
                                                <button type="button" className="btn btn-primary" onClick={this.addNew.bind(this)}>
                                                    +
                                            </button>
                                            </ul>
                                        </div>
                                        <div className="body table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>FIRST NAME</th>
                                                        <th>LAST NAME</th>
                                                        <th>USERNAME</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Jacob</td>
                                                        <td>Thornton</td>
                                                        <td>@fat</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Larry</td>
                                                        <td>the Bird</td>
                                                        <td>@twitter</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">4</th>
                                                        <td>Larry</td>
                                                        <td>Jellybean</td>
                                                        <td>@lajelly</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">5</th>
                                                        <td>Larry</td>
                                                        <td>Kikat</td>
                                                        <td>@lakitkat</td>
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
                                                    VERTICAL LAYOUT
                                                </h2>
                                                <ul className="header-dropdown m-r--5">
                                                    <li className="dropdown">
                                                        <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                            <i className="material-icons">more_vert</i>
                                                        </a>
                                                        <ul className="dropdown-menu pull-right">
                                                            <li><a href="javascript:void(0);">Action</a></li>
                                                            <li><a href="javascript:void(0);">Another action</a></li>
                                                            <li><a href="javascript:void(0);">Something else here</a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="body">
                                                <form>
                                                    <label for="email_address">Email Address</label>
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
                                                    </div>

                                                    <input type="checkbox" id="remember_me" className="filled-in" />
                                                    <label for="remember_me">Remember Me</label>
                                                    <br />
                                                    <button type="button" className="btn btn-primary m-t-15 waves-effect">LOGIN</button>
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
export default RoleList;


