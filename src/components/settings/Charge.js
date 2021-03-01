import React, { Component } from "react";
import Http from "../../services/http.service";
import { withAlert } from "react-alert";
import $ from "jquery";

class Charge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      chargeList: [],
      loading: true,
      showList: true,
      showCreate: false,
      chargeName: "",
      chargeRate: "",
      remarks: "",
    };
  }

  componentDidMount = () => {
    this.getChargeList();
  };

  componentDidUpdate = (prevProps, prevState, sS) => {
    if (this.state.loading !== prevState.loading) {
      this.getChargeList();
      //   console.log(this.state.loading + "" + prevState.loading);
      this.setState({
        loading: false,
      });
    }
  };

  resetFormFiled = () => {
    this.setState({
      id: "",
      chargeName: "",
      chargeRate: "",
      remarks: "",
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

  getChargeList = () => {
    const path = "charge/list";
    Http.list(path).then((res) => {
      if (!res.data.error) {
        this.setState({
          chargeList: res.data.chargeList,
          loading: false,
        });
      }
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { alert } = this.props;
    const path = "charge/saveOrUpdate";
    const data = {
      id: $("#id").val(),
      chargeName: $("#chargeName").val(),
      chargeRate: $("#chargeRate").val(),
      remarks: $("#remarks").val(),
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
      chargeName: data.charge_name,
      chargeRate: data.charge_rate,
      remarks: data.remarks,
      showCreate: true,
      showList: false,
    });
  };

  deleteHandler = (id) => {
    let path = "charge/delete";
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
    const { chargeList } = this.state;
    const data = chargeList.map((charge, index) => {
      return (
        <tr key={index + 1}>
          <td scope="row">{index + 1}</td>
          <td>{charge.charge_name}</td>
          <td>{charge.charge_rate}</td>
          <td>{charge.remarks}</td>
          <td style={{ textAlign: "center" }}>
            <i
              className="material-icons"
              onClick={() => this.selectHandler(charge.id, charge)}
            >
              edit
            </i>
          </td>
          <td style={{ textAlign: "center" }}>
            <i
              className="material-icons"
              onClick={() => this.deleteHandler(charge.id)}
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
                      <h2>Charge List</h2>
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
                            <th>Charge Name</th>
                            <th>Charge Rate</th>
                            <th>Remarks</th>
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
                      <h2>Charge Setup</h2>
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
                            <label className="required" for="chargeName">
                            Charge Name
                            </label>
                            <div className="form-group">
                              <div className="form-line">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="chargeName"
                                  id="chargeName"
                                  onChange={this.onChangeHandler.bind(this)}
                                  value={this.state.chargeName}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <label for="chargeRate" className="required">Charge Rate</label>
                            <div className="form-group">
                              <div className="form-line">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="chargeRate"
                                  id="chargeRate"
                                  onChange={this.onChangeHandler.bind(this)}
                                  value={this.state.chargeRate}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row clearfix">
                          <div className="col-sm-12">
                            <label for="description">Remarks</label>
                            <div className="form-group">
                              <div className="form-line">
                                <textarea
                                  rows="4"
                                  className="form-control no-resize"
                                  placeholder="Details about the charge..."
                                  onChange={this.onChangeHandler.bind(this)}
                                  name="remarks"
                                  id="remarks"
                                  value={this.state.remarks}
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

export default withAlert()(Charge);
