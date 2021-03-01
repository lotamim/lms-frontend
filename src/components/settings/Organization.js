import React, { Component } from "react";
import Http from "../../services/http.service";
import { withAlert } from "react-alert";

class Organization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orgList: [],
      userList: [],
      loading: true,
      showList: true,
      showCreate: false,
      logo: "",
      name: "",
      email: "",
      extnumber: "",
      address: "",
      remarks: "",
      logoName: "",
    };
  }
  componentDidMount = () => {
    this.getOrgList();
    // this.userList();
    // console.log("Loding");
  };

  addNew = () => {
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
  };

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  fileUploadHandler = (event) => {
    this.setState({
      logo: URL.createObjectURL(event.target.files[0]),
      logoName: event.target.files[0],
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { alert } = this.props;
    const path = "organization/save";
    let fdata = new FormData();
    fdata.append("name", this.state.name);
    fdata.append("email", this.state.email);
    fdata.append("extnumber", this.state.extnumber);
    fdata.append("address", this.state.address);
    fdata.append("remarks", this.state.remarks);
    fdata.append("organizationLogo", this.state.logoName);
    Http.save(path, fdata).then((res) => {
      console.log(res);
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

  getOrgList = () => {
    const path = "organization/list";
    Http.list(path).then((res) => {
      if (!res.data.error) {
        this.setState({
          orgList: res.data.organizationList,
          loading: false,
        });
      }
    });
  };

  selectHandler = (id, data) => {
    let role = JSON.stringify(data);
    const path = "organization/select";
    var data = {
      orgId: id,
    };
    Http.select(path, data).then((res) => {
      this.setState({
        logo: res.data.organization.organizationLogo,
        address: res.data.organization.address,
        email: res.data.organization.email,
        name: res.data.organization.organizationName,
        extnumber: res.data.organization.phoneNumber,
        remarks: res.data.organization.remarks,
        showCreate: true,
        showList: false,
      });
      console.log(res.data.organization);
    });
  };

  deleteHandler = (id) => {
    let path = "role/delete";
    const { alert } = this.props;
    let data = {
      roleId: id,
    };
    Http.delete(path, data).then((res) => {
      console.log(res);
      if (!res.data.error) {
        alert.success(res.data.delete);
        this.setState({
          loading: true,
        });
      } else {
        alert.error(res.data.error);
      }
    });
  };

  render() {
    const { orgList } = this.state;
    const data = orgList.map((org, index) => {
      return (
        <tr key={index + 1}>
          <td scope="row">{index + 1}</td>
          <td>{org.organizationName}</td>
          <td>{org.email}</td>
          <td>{org.phoneNumber}</td>
          <td>{org.address}</td>
          <td style={{ textAlign: "center" }}>
            <i
              className="material-icons"
              onClick={() => this.selectHandler(org.id, org)}
            >
              edit
            </i>
          </td>
          <td style={{ textAlign: "center" }}>
            <i
              className="material-icons"
              onClick={() => this.deleteHandler(org.id)}
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
                      <h2>Organization List</h2>
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>Address</th>
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
                      <h2>Create Organization</h2>
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
                        <div class="row clearfix">
                          <div class="col-sm-6">
                            <label for="name">Name</label>
                            <div class="form-group">
                              <div class="form-line">
                                <input
                                  type="text"
                                  class="form-control"
                                  name="name"
                                  id="name"
                                  onChange={this.onChangeHandler.bind(this)}
                                  value={this.state.name}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <label for="email">Email</label>
                            <div class="form-group">
                              <div class="form-line">
                                <input
                                  type="text"
                                  class="form-control"
                                  onChange={this.onChangeHandler.bind(this)}
                                  name="email"
                                  id="email"
                                  value={this.state.email}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row clearfix">
                          <div class="col-sm-6">
                            <label for="ex-number">Ex-Number</label>
                            <div class="form-group">
                              <div class="form-line">
                                <input
                                  type="text"
                                  class="form-control"
                                  onChange={this.onChangeHandler.bind(this)}
                                  name="extnumber"
                                  id="extnumber"
                                  value={this.state.extnumber}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <label for="address">Address</label>
                            <div class="form-group">
                              <div class="form-line">
                                <input
                                  type="text"
                                  class="form-control"
                                  value={this.state.address}
                                  name="address"
                                  id="address"
                                  onChange={this.onChangeHandler.bind(this)}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row clearfix">
                          <div class="col-sm-12">
                            <label for="address">Remarks</label>
                            <div class="form-group">
                              <div class="form-line">
                                <textarea
                                  rows="4"
                                  name="remarks"
                                  id="remarks"
                                  onChange={this.onChangeHandler.bind(this)}
                                  value={this.state.remarks}
                                  class="form-control no-resize"
                                  placeholder="Please type what you want..."
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row clearfix">
                          <div class="col-sm-6">
                            <img
                              src={this.state.logo}
                              height="100px"
                              width="100px"
                            />
                            <div class="form-group">
                              <input
                                type="file"
                                class="com-logo form-control"
                                name="logo"
                                id="logo"
                                onChange={this.fileUploadHandler.bind(this)}
                              />
                            </div>
                          </div>
                        </div>

                        <br />
                        <button
                          type="submit"
                          className="btn bg-pink waves-effect"
                        >
                          Save
                        </button>
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
export default withAlert()(Organization);
