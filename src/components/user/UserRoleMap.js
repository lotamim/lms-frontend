/*
  Note : This dropdown list using for system ::
  https://www.npmjs.com/package/multiselect-react-dropdown
*/
import React, { Component } from 'react'
import Http from '../../services/http.service';
import { API_URL } from '../constant/Constants';
import { Multiselect } from 'multiselect-react-dropdown';
import { withAlert } from 'react-alert';
import $ from 'jquery';

class UserRoleMap extends Component {

    constructor(props) {
        super(props)

        this.state = {
            roleList: [],
            userList: [],
            roleMappingList: [],
            loading: true,
            showList: true,
            showCreate: false,
            selectedRoleValues: [],
            selectedUserValues: [],
            id : "",
        }
        this.singleRef = React.createRef();
        this.multiRef = React.createRef();
    }

    componentDidMount = () => {
        this.userList();
        this.roleList();
        this.mappingList();
    }

    componentDidUpdate = (pP, pS, sS) => {
        if (this.state.loading !== pS.loading) {
            this.mappingList();
            this.setState({
                loading: false,
            })
        }
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
            id: "",
            selectedRoleValues :[], 
            selectedUserValues : []
        })
    }

    userList = () => {
        const path = "user/list";
        Http.get(path).then(res => {
            this.setState({
                userList: res.data.userList,
                loading: false,
            })
        });
    }

    roleList = () => {
        const path = "role/list";
        Http.list(path).then(res => {
            this.setState({
                roleList: res.data.roleList,
                loading: false,
            })
        })
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const { alert } = this.props;
        var data = new FormData();
        var path = "userRoleMapping/save";
        if(this.state.id !== ""){
            path = "userRoleMapping/update";
            data.append("id",this.state.id)
        }
        this.singleRef.current.getSelectedItems().map((user) => {
            data.append("username", user.username);
        });
        this.multiRef.current.getSelectedItems().map((role) => {
            data.append("name", role.name);
        });
        Http.save(path, data).then((res) => {
            if (!res.data.error) {
                this.setState({
                    loading: true,
                    showCreate: false,
                    showList: true,
                });
                alert.success(res.data.success);
            } else {
                alert.error(res.data.error);
            }
        });
    }

    mappingList = () => {
        let path = "userRoleMapping/list";
        Http.get(path).then((res) => {
            this.setState({
                roleMappingList: res.data,
                loading: false
            })
        });
    }

    selectHandler = (roleMappingId, roleMapping) => {
        this.addNew();
        this.setState({
            selectedRoleValues: [...this.state.selectedRoleValues, { 'name': roleMapping.name }],
            selectedUserValues :[...this.state.selectedUserValues, { 'username': roleMapping.username }],
            id : roleMappingId
        });
    }

    resetValues = () => {
        this.singleRef.current.resetSelectedValues();
        this.multiRef.current.resetSelectedValues();
    }

    render() {
        const { roleMappingList } = this.state;
        const data = roleMappingList.map((roleMapping, index) => {
            return (
                <tr key={index + 1}>
                    <td scope="row">{index + 1}</td>
                    <td>{roleMapping.username}</td>
                    <td>{roleMapping.name}</td>
                    <td style={{ textAlign: "center" }}>
                        <i className="material-icons" onClick={() => this.selectHandler(roleMapping.id, roleMapping)}>edit</i>
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
                                                User Role Map
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
                                                        <th>User Name</th>
                                                        <th>Role Name</th>
                                                        <th colSpan="2" style={{ textAlign: "center" }}>Action</th>
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
                                                    Create User Role Map
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
                                                    <input type="hidden" value={this.state.id} className="id" id="id"/>
                                                    <label>User Name</label>
                                                    <div className="form-group">
                                                        <Multiselect
                                                            options={this.state.userList}
                                                            singleSelect
                                                            ref={this.singleRef}
                                                            selectedValues={this.state.selectedUserValues}
                                                            displayValue="username"
                                                        />
                                                    </div>

                                                    <label>Role</label>
                                                    <div className="form-group">
                                                        <Multiselect
                                                            selectedValues={this.state.selectedRoleValues}
                                                            singleSelect
                                                            options={this.state.roleList}
                                                            ref={this.multiRef}
                                                            displayValue="name"
                                                        />
                                                    </div>

                                                    <br />
                                                     {this.state.id ==""?
                                                      (<button type="submit" className="btn bg-pink waves-effect">Save</button>)
                                                      :
                                                       (<button type="submit" className="btn bg-pink waves-effect">update</button>)
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

        )
    }
}
export default withAlert()(UserRoleMap);