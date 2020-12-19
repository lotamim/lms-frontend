import React, { Component } from 'react'

class Degree extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userList: [],
            loading: true,
            showList: true,
            showCreate: false,
        }
    }

    componentDidMount = () => {
        // this.userList();
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
                                                Degree List
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
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Remarks</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* {data} */}
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
                                                    Create Degree
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
                                                    <div class="row clearfix">
                                                        <div class="col-sm-6">
                                                            <label for="name">Name</label>
                                                            <div class="form-group">
                                                                <div class="form-line">
                                                                    <input type="text" class="form-control" name="name" id="name"
                                                                        placeholder="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <label for="email">Email</label>
                                                            <div class="form-group">
                                                                <div class="form-line">
                                                                    <input type="text" class="form-control" name="email" id="email"
                                                                        placeholder="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row clearfix">
                                                        <div class="col-sm-6">
                                                            <label for="ex-number">Ex-Number</label>
                                                            <div class="form-group">
                                                                <div class="form-line">
                                                                    <input type="text" class="form-control" name="ex-number" id="ex-number"
                                                                        placeholder="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <label for="address">Address</label>
                                                            <div class="form-group">
                                                                <div class="form-line">
                                                                    <input type="text" class="form-control" name="address" id="address"
                                                                        placeholder="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row clearfix">
                                                        <div class="col-sm-12">
                                                            <label for="address">Remarks</label>
                                                            <div class="form-group">
                                                                <div class="form-line">
                                                                    <textarea rows="4" class="form-control no-resize" placeholder="Please type what you want..."></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

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
export default Degree;
