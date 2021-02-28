import React, { Component } from "react";
import Http from "../../services/http.service";
import { withAlert } from "react-alert";
import $ from "jquery";

class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      bankList: [],
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
  };

  componentDidUpdate = (prevProps, prevState, sS) => {
    if (this.state.loading !== prevState.loading) {
      this.getBankList();
      //   console.log(this.state.loading + "" + prevState.loading);
      this.setState({
        loading: false,
      });
    }
  };

  clearField = () => {
    this.setState({
      id: "",
      bankName: "",
      bankShortName: "",
      description: "",
    });
  };

  addNew = () => {
    this.clearField();
    this.setState({
      showCreate: true,
      showList: false,
    });
  };

  backToList = () => {
    this.clearField();
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

  onSubmit = (event) => {
    event.preventDefault();
    const { alert } = this.props;
    const path = "bank/saveOrUpdate";
    const data = {
      id: $("#id").val(),
      bankName: $("#bankName").val(),
      bankShortName: $("#bankShortName").val(),
      description: $("#description").val(),
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

  render() {
    const { bankList } = this.state;
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

    return (
      <div>
        <section className="content">
          <div className="container-fluid">
            {this.state.showList && (
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="card">
                    <div className="header">
                      <h2>Bank List</h2>
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
                      <h2>Bank Setup</h2>
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
                          <div className="col-sm-6">
                            <label className="required" for="bankName">
                              Name
                            </label>
                            <div className="form-group">
                              <div className="form-line">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="bankName"
                                  id="bankName"
                                  required
                                  onChange={this.onChangeHandler.bind(this)}
                                  value={this.state.bankName}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <label for="bankShortName">Short Name</label>
                            <div className="form-group">
                              <div className="form-line">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="bankShortName"
                                  id="bankShortName"
                                  onChange={this.onChangeHandler.bind(this)}
                                  value={this.state.bankShortName}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row clearfix">
                          <div className="col-sm-12">
                            <label for="description">Description</label>
                            <div className="form-group">
                              <div className="form-line">
                                <textarea
                                  rows="4"
                                  className="form-control no-resize"
                                  placeholder="Details about the bank..."
                                  onChange={this.onChangeHandler.bind(this)}
                                  name="description"
                                  id="description"
                                  value={this.state.description}
                                  placeholder=""
                                ></textarea>
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
                          <div
                            className="row clearfix0"
                            style={{ margin: "10px" }}
                          >
                            <button
                              type="submit"
                              className="btn bg-pink waves-effect"
                              style={{ marginRight: "10px" }}
                            >
                              Update
                            </button>
                            <button
                              onClick={this.backToList.bind(this)}
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

export default withAlert()(Bank);
