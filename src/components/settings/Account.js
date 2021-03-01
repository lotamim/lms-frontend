import React, { Component } from "react";
import { withAlert } from "react-alert";
import Http from "../../services/http.service";
import $ from "jquery";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountList: [],
      id: "",
      branchList: [],
      bankList: [],
      accountTypeList: [],
      divisionList: [],
      unitList: [],
      bankId: "",
      branchId: "",
      accountTypeId: "",
      divisionId: "",
      unitId: "",
      accountNumber: "",
      accountBalance: "",
      loading: true,
      showList: true,
      showCreate: false,
      defualtvalue: "--Select--",
    };
  }

  resetFormFiled = () => {
    this.setState({
      id: "",
      bankId: "",
      branchId: "",
      accountTypeId: "",
      divisionId: "",
      unitId: "",
      accountNumber: "",
      accountBalance: "",
    });
  };

  componentDidMount = () => {
    this.getAccountList();
    this.getBranchList();
    this.getBankList();
    this.getUnitList();
    this.getDivisionList();
    this.getAccountTypeList();
  };

  componentDidUpdate = (prevProps, prevState, sS) => {
    if (this.state.loading !== prevState.loading) {
      //   this.getBranchList();
      //   this.getBankList();
      //   this.getUnitList();
      //   this.getDivisionList();
      //   this.getAccountTypeList();
      this.setState({
        loading: false,
      });
    }
  };

  addNew = () => {
    this.resetFormFiled();
    this.setState({
      showCreate: true,
      showList: false,
    });
  };

  backToList = () => {
    this.setState({
      showCreate: false,
      showList: true,
    });
    this.resetFormFiled();
  };

  getAccountList = () => {
    const path = "account/list";
    Http.get(path).then((res) => {
      this.setState({
        accountList: res.data.accountList,
        loading: false,
      });
    });
  };

  getBranchList = () => {
    const path = "branch/list";
    Http.get(path).then((res) => {
      this.setState({
        branchList: res.data.branchList,
        loading: false,
      });
    });
  };

  getBankList = () => {
    const path = "bank/list";
    Http.get(path).then((res) => {
      this.setState({
        bankList: res.data.bankList,
        loading: false,
      });
    });
  };

  getAccountTypeList = () => {
    const path = "accountType/list";
    Http.get(path).then((res) => {
      this.setState({
        accountTypeList: res.data.accountTypeList,
        loading: false,
      });
    });
  };

  getDivisionList = () => {
    const path = "division/list";
    Http.get(path).then((res) => {
      this.setState({
        divisionList: res.data.divisionList,
        loading: false,
      });
    });
  };

  getUnitList = () => {
    const path = "unit/list";
    Http.get(path).then((res) => {
      this.setState({
        unitList: res.data.unitList,
        loading: false,
      });
    });
  };

  // submit data for save and update
  onSubmitHandler = (event) => {
    event.preventDefault();
    const path = "account/saveOrUpdate";
    const { alert } = this.props;

    const data = {
      id: $("#id").val(),
      bankId: $("#bankId").val(),
      branchId: $("#branchId").val(),
      accountTypeId: $("#accountTypeId").val(),
      divisionId: $("#divisionId").val(),
      unitId: $("#unitId").val(),
      accountNumber: $("#accountNumber").val(),
      accountBalance: $("#accountBalance").val(),
    };
    Http.save(path, data).then((res) => {
      if (!res.data.error) {
        alert.success(res.data.success);
        this.backToList();
        this.setState({
          showCreate: false,
          showList: true,
          loading: true,
        });
      } else {
        alert.error(res.data.error);
      }
    });
  };

  selectHandler = (id, branch) => {
    // this.addNew();
    // this.setState({
    //   id: branch.id,
    //   branchName: branch.branch_name,
    //   phone: branch.phone,
    //   email: branch.email,
    //   contactPerson: branch.contact_person,
    //   address: branch.address,
    // });
  };
  onChangeHandler = (event) => {
    console.log(event.target.value);
    this.setState({
      defualtvalue: event.target.value,
      [event.target.name]: event.target.value,
    });
  };

  deleteHandler = (id) => {
    // let path = "branch/delete";
    // const { alert } = this.props;
    // let data = {
    //   id: id,
    // };
    // Http.delete(path, data).then((res) => {
    //   if (!res.data.error) {
    //     alert.success(res.data.success);
    //     this.setState({
    //       loading: true,
    //     });
    //   } else {
    //     alert.error(res.data.error);
    //   }
    // });
  };

  render() {
    const {
      accountList,
      branchList,
      bankList,
      accountTypeList,
      divisionList,
      unitList,
    } = this.state;

    const data = accountList.map((account, index) => {
      return (
        <tr key={index + 1}>
          <td scope="row">{index + 1}</td>
          <td>{account.bank_name}</td>
          <td>{account.branch_name}</td>
          <td>{account.account_number}</td>
          <td>{account.unit_name}</td>
          <td style={{ textAlign: "center" }}>
            <i
              className="material-icons"
              onClick={() => this.selectHandler(account.id, account)}
            >
              edit
            </i>
          </td>
          <td style={{ textAlign: "center" }}>
            <i
              className="material-icons"
              onClick={() => this.deleteHandler(account.id)}
            >
              delete
            </i>
          </td>
        </tr>
      );
    });

    const branchData = branchList.map((branch, index) => {
      return <option value={branch.id}>{branch.branch_name}</option>;
    });

    const bankData = bankList.map((bank, index) => {
      return <option value={bank.id}>{bank.bank_name}</option>;
    });
    const accountTypeData = accountTypeList.map((accountType, index) => {
      return (
        <option value={accountType.id}>{accountType.account_type_name}</option>
      );
    });
    const divisionData = divisionList.map((division, index) => {
      return <option value={division.id}>{division.division_name}</option>;
    });

    const unitData = unitList.map((unit, index) => {
      return <option value={unit.id}>{unit.unit_name}</option>;
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
                      <h2>Account List</h2>
                      <ul className="header-dropdown m-r--5">
                        <button
                          type="button"
                          class="btn bg-teal waves-effect"
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
                            <th>Bank Name</th>
                            <th>Branch Name</th>
                            <th>Account Number</th>
                            <th>Unit</th>
                            <th colSpan="2">Action</th>
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
                      <h2>Create Account</h2>
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
                      <form onSubmit={this.onSubmitHandler.bind(this)}>
                        <input
                          type="hidden"
                          value={this.state.id}
                          name="id"
                          id="id"
                        />

                        <div className="row clearfix">
                          <div className="col-sm-6">
                            <label for="name" className="required">
                              Bank Name
                            </label>
                            <div className="form-group">
                              <div className="form-line">
                                <select
                                  id="bankId"
                                  name="bankId"
                                  className="form-control"
                                  onChange={this.onChangeHandler.bind(this)}
                                  value={this.state.defualtvalue}
                                >
                                  {bankData}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <label for="name" className="required">
                              Branch Name
                            </label>
                            <div className="form-group">
                              <div className="form-line">
                                <select
                                  className="form-control"
                                  id="branchId"
                                  name="branchId"
                                >
                                  {branchData}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row clearfix">
                          <div className="col-sm-6">
                            <label for="name" className="required">
                              Account Type
                            </label>
                            <div className="form-group">
                              <div className="form-line">
                                <select
                                  className="form-control"
                                  id="accountTypeId"
                                  name="accountTypeId"
                                >
                                  {accountTypeData}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <label for="name" className="required">
                              Division Name
                            </label>
                            <div className="form-group">
                              <div className="form-line">
                                <select
                                  className="form-control"
                                  className="form-control"
                                  id="divisionId"
                                  name="divisionId"
                                >
                                  {divisionData}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row clearfix">
                          <div className="col-sm-6">
                            <label for="email" className="required">
                              Unit Name
                            </label>
                            <div className="form-group">
                              <div className="form-line">
                                <select
                                  className="form-control"
                                  id="unitId"
                                  name="unitId"
                                >
                                  {unitData}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <label for="contactPerson" className="required">
                              Account Number
                            </label>
                            <div className="form-group">
                              <div className="form-line">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="accountNumber"
                                  id="accountNumber"
                                  placeholder=""
                                  value={this.state.accountNumber}
                                  onChange={this.onChangeHandler.bind(this)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row clearfix">
                          <div className="col-sm-6">
                            <label for="contactPerson">Balance</label>
                            <div className="form-group">
                              <div className="form-line">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="accountBalance"
                                  id="accountBalance"
                                  placeholder=""
                                  value={this.state.accountBalance}
                                  onChange={this.onChangeHandler.bind(this)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <br />
                        {this.state.id == "" ? (
                          <button
                            type="submit"
                            className="btn bg-pink waves-effect"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="btn bg-pink waves-effect"
                          >
                            Update
                          </button>
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

export default withAlert()(Account);
