import React, { Component } from "react";
import { withAlert } from "react-alert";
import Http from "../../services/http.service";
import $ from "jquery";

class LevelOfAuthority extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            bankList: [],
            userList: [],
            loading: true,
            showList: true,
            showCreate: false,
            bankName: "",
            bankShortName: "",
            description: "",
        };
    }

    componentDidMount = () => {
        this.getBankList();
        this.userList();
    };

    componentDidUpdate = (prevProps, prevState, sS) => {
        if (this.state.loading !== prevState.loading) {
            this.getBankList();
            this.setState({
                loading: false,
            });
        }
    };

    resetFormFiled = () => {
        this.setState({
            id: "",
            bankName: "",
            bankShortName: "",
            description: "",
        });
    };

    addNew = () => {
        this.resetFormFiled();
        this.setState({
            showCreate: true,
            showList: false,
        });
    };

    backToList = () => {
        this.resetFormFiled();
        this.setState({
            showCreate: false,
            showList: true,
        });
    };

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    getBankList = () => {
        const path = "bank/list";
        Http.list(path).then((res) => {
            if (!res.data.error) {
                this.setState({
                    bankList: res.data.bankList,
                    loading: false,
                });
            }
        });
    };

    userList = () => {
        const path = "user/list";
        Http.get(path).then(res => {
            this.setState({
                userList: res.data.userList,
                loading: false,
            })
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { alert } = this.props;
        const path = "levelOfAuthority/save";
        const data = {
            id: $("#id").val(),
            sanctionId: $("#sanctionId").val(),
            employeeId: $("#employeeId").val(),
            unitId: $("#unitId").val(),
            approverTypeId: $("#approverTypeId").val(),
            isActive: $("#isActive").val()
        };
        Http.save(path, data).then((res) => {
            if (!res.data.error) {
                this.setState({
                    showCreate: false,
                    showList: true,
                    loading: true,
                });
                alert.success(res.data.success);
            } else {
                alert.error(res.data.error);
            }
        });
    };

    selectHandler = (id, data) => {
        this.setState({
            id: data.id,
            bankName: data.bank_name,
            bankShortName: data.bank_short_name,
            description: data.description,
            showCreate: true,
            showList: false,
        });
    };

    deleteHandler = (id) => {
        let path = "bank/delete";
        const { alert } = this.props;
        let data = {
            id: id,
        };
        Http.delete(path, data).then((res) => {
            if (!res.data.error) {
                alert.success(res.data.success);
                this.setState({
                    loading: true,
                });
            } else {
                alert.error(res.data.error);
            }
        });
    };

    render() {
        const { bankList, userList } = this.state;
        const data = bankList.map((bank, index) => {
            return (
                <tr key={index + 1}>
                    <td scope="row">{index + 1}</td>
                    <td>{bank.bank_name}</td>
                    <td>{bank.bank_short_name}</td>
                    <td>{bank.description}</td>
                    <td style={{ textAlign: "center" }}>
                        <i
                            className="material-icons"
                            onClick={() => this.selectHandler(bank.id, bank)}
                        >
                            edit
                </i>
                    </td>
                    <td style={{ textAlign: "center" }}>
                        <i
                            className="material-icons"
                            onClick={() => this.deleteHandler(bank.id)}
                        >
                            delete
                        </i>
                    </td>
                </tr>
            );
        });

        const user = userList.map((user, index) => {
            return (
                <option value={user.id}>{user.username}</option>
            )
        });

        return (
            <div>
                <section className="content">
                    <div className="container-fluid">
                        {this.state.showList && (
                            <div className="row clearfix">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="card">
                                        <div className="header">
                                            <h2>Level Of Authority List</h2>
                                            <ul className="header-dropdown m-r--5">
                                                <button
                                                    type="button"
                                                    className="btn bg-teal waves-effect"
                                                    onClick={this.addNew.bind(this)}
                                                >
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
                                                        <th>Short Name</th>
                                                        <th>Description</th>
                                                        <th colSpan="2" style={{ textAlign: "center" }}>
                                                            Action
                                                         </th>
                                                    </tr>
                                                </thead>
                                                <tbody>{data}</tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {this.state.showCreate && (
                            <div className="row clearfix">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="card">
                                        <div className="header">
                                            <h2>Level Of Authority</h2>
                                            <ul className="header-dropdown m-r--5">
                                                <li className="dropdown">
                                                    <a
                                                        href="javascript:void(0);"
                                                        onClick={this.backToList.bind(this)}
                                                        role="button"
                                                    >
                                                        <i className="material-icons">keyboard_backspace</i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="body">
                                            <form onSubmit={this.onSubmit.bind(this)}>
                                                <input
                                                    type="hidden"
                                                    name="id"
                                                    id="id"
                                                    value={this.state.id}
                                                />
                                                <div className="row clearfix">

                                                    <div className="col-sm-4">
                                                        <label className="required" for="sanction">
                                                            Sanction
                                                        </label>
                                                        <div className="form-group">
                                                            <div className="form-line">
                                                                <select name="sanctionId" id="sanctionId" className="form-control">
                                                                    <option value="select">--Select Sanction--</option>
                                                                    <option value="1">Snc-000001</option>
                                                                    <option value="2">Snc-000002</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-4">
                                                        <label for="employeeId">Employee Name</label>
                                                        <div className="form-group">
                                                            <div className="form-line">
                                                                <select name="employeeId" id="employeeId" className="form-control">
                                                                    <option value="select">--Select Sanction--</option>
                                                                    {user}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-4">
                                                        <label for="bankShortName">Unit/Department</label>
                                                        <div className="form-group">
                                                            <div className="form-line">
                                                                <select name="unitId" id="unitId" className="form-control">
                                                                    <option value="select">--Select Sanction--</option>
                                                                    <option value="NTL">NTL</option>
                                                                    <option value="BRL">BRL</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="row clearfix">

                                                    <div className="col-sm-4">
                                                        <label for="description">Approver Type</label>
                                                        <div className="form-group">
                                                            <div className="form-line">
                                                                <select name="approverTypeId" id="approverTypeId" className="form-control">
                                                                    <option value="select">--Select Sanction--</option>
                                                                    <option value="INITIATER">INITIATER</option>
                                                                    <option value="RECOMMENDER">RECOMMENDER</option>
                                                                    <option value="APPROVER">APPROVER</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-4">
                                                        <label for="description">Is Active?</label>
                                                        <div className="form-group">
                                                            <div className="form-line">
                                                                <select name="isActive" id="isActive" className="form-control">
                                                                    <option value="select">--Select Sanction--</option>
                                                                    <option value="Active">Active</option>
                                                                    <option value="InActive">In Active</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>

                                                <br />
                                                {this.state.id == "" ? (
                                                    <button
                                                        type="submit"
                                                        class="btn btn-success waves-effect"
                                                    >
                                                        Save
                                                    </button>
                                                ) : (
                                                        <div
                                                            className="row clearfix0"
                                                            style={{ margin: "10px" }}
                                                        >
                                                            <button
                                                                type="submit"
                                                                class="btn btn-success waves-effect"
                                                                style={{ marginRight: "10px" }}
                                                            >
                                                                Update
                                                            </button>
                                                            <button
                                                                onClick={this.resetFormFiled.bind(this)}
                                                                className="btn bg-pink waves-effect"
                                                            >
                                                                Cancel
                                                             </button>
                                                        </div>
                                                    )}
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

export default withAlert()(LevelOfAuthority);