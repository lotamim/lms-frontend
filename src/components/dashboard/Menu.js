import React, { Component } from 'react';
import Http from '../../services/http.service';
import { withAlert } from 'react-alert';



class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            loading: true,
            showList: true,
            showCreate: false,
            id: "",
            menuName: "",
            remarks: "",
        }
    }

    componentDidMount = () => {
        this.menuList();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.loading !== prevState.loading) {
            this.menuList();
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
        })
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    menuList = () => {
        const path = "menu/list";
        Http.get(path).then(res => {
            this.setState({
                menuList: res.data.menuList,
                loading: false,
            })
        });
    }

    /*Save and Update here */
    onSubmitHandler = (event) => {
        event.preventDefault();
        var path = "menu/save";
        const { alert } = this.props;
        // if (this.state.id !== "") {
        //     path = "menu/update";
        // }
        let data = {
            id: this.state.id,
            name: this.state.menuName,
            remarks: this.state.remarks,
        }
        Http.save(path, data).then(res => {
            if (!res.data.error) {
                alert.success(res.data.success)
                this.setState({
                    showList: true,
                    showCreate: false,
                    loading: true,
                });
            } else {
                alert.error(res.data.error)
            }
        });
    }

    selectHandler = (id, data) => {
        let menu = JSON.stringify(data)
        console.log(menu)
        this.setState({
            id: data.id,
            menuName: data.menuName,
            remarks: data.remarks,
            showCreate: true,
            showList: false
        })
    }


    render() {
        const { menuList } = this.state;
        const data = menuList.map((menu, index) => {
            return (
                <tr key={index + 1}>
                    <td scope="row">{index + 1}</td>
                    <td>{menu.menuName}</td>
                    <td>{menu.remarks}</td>
                    <td style={{ textAlign: "center" }}>
                        <i className="material-icons" onClick={() => this.selectHandler(menu.id, menu)}>edit</i>
                    </td>
                    <td style={{ textAlign: "center" }}>
                        <i className="material-icons" onClick={() => this.deleteHandler(menu.id)}>delete</i>
                    </td>
                </tr>
            )
        })

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
                                                Menu List
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
                                                        <th>Remarks</th>
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
                                                    Create Menu
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
                                                    <input type="hidden" id="id" name="id" value={this.state.id} className="form-control" />

                                                    <label for="email_address">Menu Name</label>
                                                    <div className="form-group">
                                                        <div className="form-line">
                                                            <input type="text" id="menuName" name="menuName" className="form-control" value={this.state.menuName}
                                                                placeholder="Enter your menu name" onChange={this.onChangeHandler.bind(this)} />
                                                        </div>
                                                    </div>
                                                    <label for="remarks">Remarks</label>
                                                    <div className="form-group">
                                                        <div className="form-line">
                                                            <input type="text" id="remarks" name="remarks" className="form-control" value={this.state.remarks}
                                                                placeholder="Enter your remarks" onChange={this.onChangeHandler.bind(this)} />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    {this.state.id == "" ?
                                                        (<button type="button" className="btn bg-pink waves-effect" onClick={this.onSubmitHandler.bind(this)}>Save</button>)
                                                        :
                                                        (<button type="button" className="btn bg-pink waves-effect" onClick={this.onSubmitHandler.bind(this)}>Update</button>)
                                                    }
                                                    {/* <button type="button" className="btn bg-pink waves-effect"
                                                        onClick={this.onSubmitHandler.bind(this)} >Save</button> */}
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

export default withAlert()(Menu);