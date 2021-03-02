import React, { Component } from "react";
import Http from "../../services/http.service";
import { withAlert } from "react-alert";
import $ from "jquery";

class Division extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      divisionList: [],
      loading: true,
      showList: true,
      showCreate: false,
      divisionName: "",
      contactPerson: "",
      email: "",
      phoneNumber: "",
      description: "",
    };
  }

  componentDidMount = () => {
    this.getDivisionList();
  };

  componentDidUpdate = (prevProps, prevState, sS) => {
    if (this.state.loading !== prevState.loading) {
      this.getDivisionList();
      //   console.log(this.state.loading + "" + prevState.loading);
      this.setState({
        loading: false,
      });
    }
  };

  resetFormFiled = () => {
    this.setState({
      id: "",
      divisionName: "",
      contactPerson: "",
      email: "",
      phoneNumber: "",
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

  getDivisionList = () => {
    const path = "division/list";
    Http.list(path).then((res) => {
      if (!res.data.error) {
        this.setState({
          divisionList: res.data.divisionList,
          loading: false,
        });
      }
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { alert } = this.props;
    const path = "division/saveOrUpdate";
    const data = {
      id: $("#id").val(),
      divisionName: $("#divisionName").val(),
      contactPerson: $("#contactPerson").val(),
      email: $("#email").val(),
      phoneNumber: $("#phoneNumber").val(),
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
      divisionName: data.division_name,
      contactPerson: data.contact_person,
      email: data.email,
      phoneNumber: data.phone_number,
      description: data.description,
      showCreate: true,
      showList: false,
    });
  };

  deleteHandler = (id) => {
    let path = "division/delete";
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
    const { divisionList } = this.state;
    const data = divisionList.map((division, index) => {
      return (
        <tr key={index + 1}>
          <td scope="row">{index + 1}</td>
          <td>{division.division_name}</td>
          <td>{division.contact_person}</td>
          <td>{division.email}</td>
          <td>{division.phone_number}</td>
          <td>{division.description}</td>
          <td style={{ textAlign: "center" }}>
            <i
              className="material-icons"
              onClick={() => this.selectHandler(division.id, division)}
            >
              edit
            </i>
          </td>
          <td style={{ textAlign: "center" }}>
            <i
              className="material-icons"
              onClick={() => this.deleteHandler(division.id)}
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
                      <h2>Division List</h2>
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
                            <th>Contact Person</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Description</th>
                            <th></th>
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
                      <h2>Division Setup</h2>
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
                            <label className="required" for="divisionName">
                              Name
                            </label>
                            <div className="form-group">
                              <div className="form-line">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="divisionName"
                                  id="divisionName"
                                  required
                                  onChange={this.onChangeHandler.bind(this)}
                                  value={this.state.divisionName}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <label for="contactPerson">Contact Person</label>
                            <div className="form-group">
                              <div className="form-line">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="contactPerson"
                                  id="contactPerson"
                                  onChange={this.onChangeHandler.bind(this)}
                                  value={this.state.contactPerson}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row clearfix">
                          <div className="col-sm-6">
                            <label className="required" for="email">
                              Email
                            </label>
                            <div className="form-group">
                              <div className="form-line">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="email"
                                  id="email"
                                  required
                                  onChange={this.onChangeHandler.bind(this)}
                                  value={this.state.email}
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

export default withAlert()(Division);
