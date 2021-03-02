import React, { Component } from "react";
import Http from "../../services/http.service";
import { withAlert } from "react-alert";
import $ from "jquery";

class Unit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      unitList: [],
      loading: true,
      showList: true,
      showCreate: false,
      unitName: "",
      unitShortName: "",
      address: "",
      phoneNumber: "",
      contactPerson: "",
      description: "",
    };
  }

  componentDidMount = () => {
    this.getUnitList();
  };

  componentDidUpdate = (prevProps, prevState, sS) => {
    if (this.state.loading !== prevState.loading) {
      this.getUnitList();
      //   console.log(this.state.loading + "" + prevState.loading);
      this.setState({
        loading: false,
      });
    }
  };

  resetFormFiled = () => {
    this.setState({
      id: "",
      unitName: "",
      unitShortName: "",
      address: "",
      phoneNumber: "",
      contactPerson: "",
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

  getUnitList = () => {
    const path = "unit/list";
    Http.list(path).then((res) => {
      if (!res.data.error) {
        this.setState({
          unitList: res.data.unitList,
          loading: false,
        });
      }
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { alert } = this.props;
    const path = "unit/saveOrUpdate";
    const data = {
      id: $("#id").val(),
      unitName: $("#unitName").val(),
      unitShortName: $("#unitShortName").val(),
      address: $("#address").val(),
      phoneNumber: $("#phoneNumber").val(),
      contactPerson: $("#contactPerson").val(),
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
      unitName: data.unit_name,
      unitShortName: data.unit_short_name,
      address: data.address,
      phoneNumber: data.phone_number,
      contactPerson: data.contact_person,
      showCreate: true,
      showList: false,
    });
  };

  deleteHandler = (id) => {
    let path = "unit/delete";
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
    const { unitList } = this.state;
    const data = unitList.map((unit, index) => {
      return (
        <tr key={index + 1}>
          <td scope="row">{index + 1}</td>
          <td>{unit.unit_name}</td>
          <td>{unit.unit_short_name}</td>
          <td>{unit.address}</td>
          <td>{unit.contact_person}</td>
          <td>{unit.phone_number}</td>
          <td style={{ textAlign: "center" }}>
            <i
              className="material-icons"
              onClick={() => this.selectHandler(unit.id, unit)}
            >
              edit
            </i>
          </td>
          <td style={{ textAlign: "center" }}>
            <i
              className="material-icons"
              onClick={() => this.deleteHandler(unit.id)}
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
                      <h2>Unit List</h2>
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
                            <th>Address</th>
                            <th>Contact Person</th>
                            <th>Phone Number</th>
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
                      <h2>Unit Setup</h2>
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
                            <label className="required" for="unitName">
                              Name
                            </label>
                            <div className="form-group">
                              <div className="form-line">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="unitName"
                                  id="unitName"
                                  required
                                  onChange={this.onChangeHandler.bind(this)}
                                  value={this.state.unitName}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <label for="unitShortName">Short Name</label>
                            <div className="form-group">
                              <div className="form-line">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="unitShortName"
                                  id="unitShortName"
                                  onChange={this.onChangeHandler.bind(this)}
                                  value={this.state.unitShortName}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row clearfix">
                          <div className="col-sm-6">
                            <label className="required" for="contactPerson">
                              Contact Person
                            </label>
                            <div className="form-group">
                              <div className="form-line">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="contactPerson"
                                  id="contactPerson"
                                  required
                                  onChange={this.onChangeHandler.bind(this)}
                                  value={this.state.contactPerson}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <label for="phoneNumber">Phone Number</label>
                            <div className="form-group">
                              <div className="form-line">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="phoneNumber"
                                  id="phoneNumber"
                                  onChange={this.onChangeHandler.bind(this)}
                                  value={this.state.phoneNumber}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row clearfix">
                          <div className="col-sm-6">
                            <label className="required" for="address">
                              Address
                            </label>
                            <div className="form-group">
                              <div className="form-line">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="address"
                                  id="address"
                                  required
                                  onChange={this.onChangeHandler.bind(this)}
                                  value={this.state.address}
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

export default withAlert()(Unit);
