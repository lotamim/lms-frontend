import React, { Component } from 'react'
import { withAlert } from 'react-alert';
import Http from '../../services/http.service';
import $ from "jquery";

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            branchList: [],
            loading: true,
            showList: true,
            showCreate: false,
        }

    }

    resetFormFiled = () => {
        this.setState({
            id: "",
            branchName: "",
            phone: "",
            email: "",
            contactPerson: "",
            address: "",
        })
    }

    componentDidMount = () => {
        this.getBranchList();
    }

    componentDidUpdate = (prevProps, prevState, sS) => {
        if (this.state.loading !== prevState.loading) {
            this.getBranchList();
            this.setState({
                loading: false
            })
        }
    }

    addNew = () => {
        this.resetFormFiled();
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
        this.resetFormFiled();
    }

    getBranchList = () => {
        const path = "branch/list";
        Http.get(path).then(res => {
            this.setState({
                branchList: res.data.branchList,
                loading: false
            })
        });
    }

    // submit data for save and update 
    onSubmitHandler = (event) => {
        event.preventDefault();
        const path = 'branch/save';
        const { alert } = this.props;
        const data = {
            id: $("#id").val(),
            branchName: $("#branchName").val(),
            phone: $("#phone").val(),
            email: $("#email").val(),
            contactPerson: $("#contactPerson").val(),
            address: $("#address").val()
        }
        Http.save(path, data).then(res => {
            if (!res.data.error) {
                alert.success(res.data.success);
                this.backToList();
                this.setState({
                    loading: true,
                });
            } else {
                alert.error(res.data.error)
            }
        })
    }

    selectHandler = (id, branch) => {
        this.addNew();
        this.setState({
            id: branch.id,
            branchName: branch.branch_name,
            phone: branch.phone,
            email: branch.email,
            contactPerson: branch.contact_person,
            address: branch.address,
        })
    }
    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    deleteHandler = (id) => {
        let path = "branch/delete";
        const { alert } = this.props;
        let data = {
            id: id,
        }
        Http.delete(path, data).then(res => {
            if (!res.data.error) {
                alert.success(res.data.success)
                this.setState({
                    loading: true,
                });
            } else {
                alert.error(res.data.error)
            }
        })
    }


    render() {
        const { branchList } = this.state
        const data = branchList.map((branch, index) => {
            return (
                <tr key={index + 1}>
                    <td scope="row">{index + 1}</td>
                    <td>{branch.branch_name}</td>
                    <td>{branch.email}</td>
                    <td>{branch.address}</td>
                    <td style={{ textAlign: "center" }}>
                        <i className="material-icons" onClick={() => this.selectHandler(branch.id, branch)}>edit</i>
                    </td>
                    <td style={{ textAlign: "center" }}>
                        <i className="material-icons" onClick={() => this.deleteHandler(branch.id)}>delete</i>
                    </td>
                </tr>
            );
        });
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
                                                Account List
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
                                                        <th>Branch Name</th>
                                                        <th>Email</th>
                                                        <th>Adress</th>
                                                        <th colSpan="2">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data}
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
                                                    Create Account
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
                                                <form onSubmit={this.onSubmitHandler.bind(this)}>
                                                    <input type="hidden" value={this.state.id} name="id" id="id" />

                                                    <div className="row clearfix">
                                                        <div className="col-sm-6">
                                                            <label for="name" className="required">Bank Name</label>
                                                            <div className="form-group">
                                                                <div className="form-line">
                                                                    <select className="form-control">
                                                                        <option value="">SELECT</option>
                                                                        <option value="">DHAKA BANK</option>
                                                                        <option value="">UTTARA BANK</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <label for="phone" className="required">Branch Name</label>
                                                            <div className="form-group">
                                                                <div className="form-line">
                                                                    <select className="form-control">
                                                                        <option value="">SELECT</option>
                                                                        <option value="">DHAKA BANK</option>
                                                                        <option value="">UTTARA BANK</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row clearfix">
                                                        <div className="col-sm-6">
                                                            <label for="email" className="required">Account Type</label>
                                                            <div className="form-group">
                                                                <div className="form-line">
                                                                    <select className="form-control">
                                                                        <option value="">SELECT</option>
                                                                        <option value="">DPS</option>
                                                                        <option value="">CURRENT</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <label for="contactPerson" className="required">Division Name</label>
                                                            <div className="form-group">
                                                                <div className="form-line">
                                                                    <select className="form-control">
                                                                        <option value="">SELECT</option>
                                                                        <option value="">DPS</option>
                                                                        <option value="">CURRENT</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row clearfix">
                                                        <div className="col-sm-6">
                                                            <label for="email" className="required">Unit Name</label>
                                                            <div className="form-group">
                                                                <div className="form-line">
                                                                    <select className="form-control">
                                                                        <option value="">SELECT</option>
                                                                        <option value="">DPS</option>
                                                                        <option value="">CURRENT</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <label for="contactPerson" className="required">Account Number</label>
                                                            <div className="form-group">
                                                                <div className="form-line">
                                                                    <input type="text" className="form-control" name="accountNumber" id="accountNumber"
                                                                        placeholder="" value={this.state.accountNumber} onChange={this.onChangeHandler.bind(this)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row clearfix">
                                                        <div className="col-sm-6">
                                                            <label for="contactPerson">Balance</label>
                                                            <div className="form-group">
                                                                <div className="form-line">
                                                                    <input type="text" className="form-control" name="accountBalance" id="accountBalance"
                                                                        placeholder="" value={this.state.accountBalance} onChange={this.onChangeHandler.bind(this)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <br />
                                                    {this.state.id == "" ?
                                                        (<button type="submit" className="btn bg-pink waves-effect">Save</button>)
                                                        :
                                                        (<button type="submit" className="btn bg-pink waves-effect">Update</button>)
                                                    }
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </section>
            </div>
        );
    }
}

export default withAlert()(Account);