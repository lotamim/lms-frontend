import React, { Component } from 'react';
import Http from '../../services/http.service';
import { Multiselect } from 'multiselect-react-dropdown';
import $ from "jquery";
import { withAlert } from 'react-alert';


class Permission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedVal: [],
            roleList: [],
            permissionList: [],
            roleId: 0,
        }
        this.singleRef = React.createRef();
    }

    componentDidMount = () => {
        this.roleList();
    }

    onClickHandler = (event) => {
        this.setState({
            checkedVal: event.target.id,
        })
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

    onSelect = (selectedList, selectedItem) => {
        const path = "userPermission/getPermissionList";
        var data = {
            roleId: selectedItem.id
        }
        this.setState({
            permissionList: [],
            roleId: selectedItem.id
        })
        Http.select(path, data).then(res => {
            this.setState({
                permissionList: res.data.permissionListForRole,
                loading: false,
            })
        })
    }

    onChangeHanlder = (event, id) => {
        // alert($('#chbox_'+id).prop('checked',false));
        // console.log()
        $("#chbox_"+id).prop("checked",false);
        // $('#chbox_'+id)
        // $('#chbox_' + id).removeAttr('checked');
        // console.log(`${$("#chbox_" + id).attr('checked', false)}`);
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const path = "userPermission/save"
        let fdata = new FormData();
        const { alert } = this.props;
        let checked = [];
        let unchecked =[];
        $('input[type="checkbox"]').each(function(){
            if($(this).prop("checked") == true){
                checked.push(this.value)
                // console.log("Checkbox is checked."+this.value);
            }
            if($(this).prop("checked") == false){
                unchecked.push(this.value)
                // console.log("Checkbox is unchecked."+this.value);
            }
        });
        // $(":checkbox:checked").each(function () {
        //     items.push(this.value);
        // });
        fdata.append('checked', checked);
        fdata.append('unchecked', unchecked)
        fdata.append('roleId', this.state.roleId)
 
        Http.save(path, fdata).then((res) => {
            if (!res.data.error) {
                alert.success(res.data.success);
            } else {
                alert.error(res.data.error);
            }
        });
    }



    render() {
        let { roleList, checkedVal, permissionList } = this.state;
        let drop = roleList.map((role) => {
            return (
                <option value={role.id}>{role.name}</option>
            );
        });

        // let permission = permissionList.map((permission, index) => {
        //     var items = permission.menu_item_name.split(",");
        //     return (
        //         <div class="row clearfix" key={index + 1}>
        //             <div class="col-sm-2">
        //                 <div class="form-group">
        //                     <button type="button" class="btn bg-grey waves-effect">{permission.menu_name}</button>
        //                 </div>
        //             </div>
        //             <div class="col-sm-10">
        //                 {items.map((item, index) => {
        //                     return (
        //                         <div class="col-sm-2" key={index + index + 1}>
        //                             <div className="form-group">
        //                                 <input type="checkbox" value={item.split("_")[1]} className="filled-in" />
        //                                 <label>{item.split("_")[0]}</label>
        //                             </div>
        //                         </div>

        //                     );
        //                 })
        //                 }
        //             </div>
        //         </div>
        //     );

        // })
        // console.log(JSON.stringify(checkedVal));
        return (
            <div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row clearfix">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="card">
                                    <div className="header">
                                        <h2>Permission</h2>
                                    </div>
                                    <div className="body">
                                        <form onSubmit={this.onSubmitHandler.bind(this)}>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <Multiselect
                                                        options={this.state.roleList}
                                                        singleSelect
                                                        ref={this.singleRef}
                                                        onSelect={this.onSelect}
                                                        displayValue="name"
                                                    />
                                                </div>
                                            </div>

                                            {permissionList.map((permission, index) => {
                                                var items = permission.menu_item_name.split(",");
                                                return (
                                                    <div className="row clearfix" key={index + 1}>
                                                        <div className="col-sm-2">
                                                            <div className="form-group">
                                                                <button type="button" className="btn bg-grey waves-effect">{permission.menu_name}</button>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-10">
                                                            {items.map((item, index) => {
                                                                var myBool = Boolean(item.split("_")[2]);
                                                                return (
                                                                    <div className="col-md-4" key={index + index + 1}>
                                                                        <div>
                                                                            {
                                                                                
                                                                                item.split("_")[2] =='true' ?
                                                                                    (<>
                                                                                        <input type="checkbox" value={item.split("_")[1]}
                                                                                            id={"chbox_" + item.split("_")[1]} name={"chbox_" + item.split("_")[1]} defaultChecked
                                                                                             />
                                                                                        <label>{item.split("_")[0]}</label>
                                                                                    </>
                                                                                    ) :
                                                                                    (
                                                                                        <>
                                                                                            <input type="checkbox" value={item.split("_")[1]}
                                                                                                id={"chbox_" + item.split("_")[1]} name={"chbox_" + item.split("_")[1]} 
                                                                                                 />
                                                                                            <label>{item.split("_")[0]}</label>
                                                                                        </>
                                                                                    )
                                                                            }
                                                                            {/* <input type="checkbox" value={item.split("_")[1]} name={item.split("_")[0]} />
                                                                            <label>{item.split("_")[0]}</label> */}
                                                                        </div>
                                                                    </div>

                                                                );
                                                            })
                                                            }
                                                        </div>
                                                    </div>
                                                );

                                            })
                                            }
                                            <br />
                                            <button type="submit" className="btn bg-pink waves-effect">Submit</button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default withAlert()(Permission);