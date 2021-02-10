import React, { Component } from 'react';
import Http from '../../services/http.service';
import { withAlert } from 'react-alert';

class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            menuItemList: [],
            loading: true,
            showList: true,
            showCreate: false,
            id: "",
            menuId: "",
            menuItemName: "",
            menuItemRemarks: "",
            path : ""
        }
    }

    componentDidMount = () => {
        this.menuList();
        this.menuItemList();
    }

    // componentDidUpdate = (prevProps, prevState) => {
    //     if (this.state.loading !== prevState.loading) {
    //         this.menuList();
    //         this.setState({
    //             loading: false,
    //         })
    //     }
    // }


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
            // console.log(res.data.menuList);
            this.setState({
                menuList: res.data.menuList,
                loading: false,
            })
        });
    }

    handleDropdownChange = (event) => {
        this.setState({
            menuId: event.target.value
        });
    }

    /*Save and Update here */
    onSubmitHandler = (event) => {
        event.preventDefault();
        var path = "menuItem/save";
        const { alert } = this.props;
        let data = {
            id: this.state.id,
            menuId: this.state.menuId,
            menuItemName: this.state.menuItemName,
            menuItemRemarks: this.state.menuItemRemarks,
            path: this.state.path,
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
        // alert(JSON.stringify(data))
        // let menu = JSON.stringify(data)
        // this.setState({
        //     id: data.id,
        //     menuName: data.menuName,
        //     remarks: data.remarks,
        //     showCreate: true,
        //     showList: false
        // })
    }

    menuItemList = () => {
        var path = "menuItem/list";
        Http.get(path).then((res) => {
            this.setState({
                menuItemList: res.data.list
            })
        });
    }

    render() {
        const { menuList,menuItemList } = this.state;
        let dropDown = menuList.map((menu, index) => {
            return (
                <option value={menu.id}>{menu.menuName}</option>
            )
        })

      let list = menuItemList.map((menuItem,index)=>{
          return (
            <tr key={index + 1}>
            <td scope="row">{index + 1}</td>
            <td>{menuItem.menu_name}</td>
            <td>{menuItem.menu_item_name}</td>
            <td style={{ textAlign: "center" }}>
                <i className="material-icons" onClick={() => this.selectHandler(menuItem.menu_item_id,menuItem)}>edit</i>
            </td>
            <td style={{ textAlign: "center" }}>
                <i className="material-icons" onClick={() => this.deleteHandler(menuItem.menu_item_id)}>delete</i>
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
                                                Menu Item List
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
                                                        <th>Menu Name</th>
                                                        <th>Menu Item Name</th>
                                                        <th colSpan="2" style={{ textAlign: "center" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list}
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
                                                    Menu Item
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

                                                    <div class="col-sm-6">
                                                        <label for="email_address">Menu Name</label>
                                                        <div className="form-group">
                                                            <div className="form-line">
                                                                <select class="form-control select2" style={{ width: "100%" }} onChange={this.handleDropdownChange.bind(this)}>
                                                                    {dropDown}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-6">
                                                        <label for="remarks">Menu Item Name</label>
                                                        <div className="form-group">
                                                            <div className="form-line">
                                                                <input type="text" id="menuItemName" name="menuItemName" className="form-control" value={this.state.remarks}
                                                                    placeholder="Enter your Menu item name" onChange={this.onChangeHandler.bind(this)} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-6">
                                                        <label for="remarks">Path</label>
                                                        <div className="form-group">
                                                            <div className="form-line">
                                                                <input type="text" id="path" name="path" className="form-control" value={this.state.remarks}
                                                                    placeholder="Enter your Menu item name" onChange={this.onChangeHandler.bind(this)} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row clearfix">
                                                        <div class="col-sm-12">
                                                            <label for="address">Remarks</label>
                                                            <div class="form-group">
                                                                <div class="form-line">
                                                                    <textarea rows="4" name="menuItemRemarks" id="menuItemRemarks" onChange={this.onChangeHandler.bind(this)}
                                                                        value={this.state.remarks}
                                                                        class="form-control no-resize" placeholder="Please type what you want..."></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <br />
                                                    <button type="button" className="btn bg-pink waves-effect"
                                                        onClick={this.onSubmitHandler.bind(this)} >Submit</button>
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

export default withAlert()(MenuItem);