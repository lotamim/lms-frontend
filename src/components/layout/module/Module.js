import React, { Component } from 'react'

 class Module extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loding: true,
            showList: true,
            showCreate: false,
            id: "",
            name: "",
            remarks: "",
            roleList: []
        }
    }

    componentDidMount = () => {
        // this.roleList();
    }

    componentDidUpdate = (prevProps, prevState, sS) => {
        if (this.state.loading !== prevState.loading) {
            this.roleList();
            this.setState({
                loading: false,
            });
        }
    }

    addNew = () => {
        this.setState({
            showCreate: true,
            showList: false,
            id: "",
            name: "",
            remarks: "",
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

    onSubmitHandler = () =>{

    }


    render() {
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
                                                Module List
                                             </h2>
                                            <ul className="header-dropdown m-r--5">
                                                <button type="button" className="btn bg-teal waves-effect" onClick={this.addNew.bind(this)}>
                                                    +
                                            </button>
                                            </ul>
                                        </div>
                                        <div className="body table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>SL NO.</th>
                                                        <th>Role Type</th>
                                                        <th>Remarks</th>
                                                        <th colSpan="2" style={{ textAlign: "center" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* {data} */}
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
                                                    Create Module
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
                                                    <input type="hidden" id="id" name="id" className="form-control" value={this.state.id} />

                                                    <label>Name</label>
                                                    <div className="form-group">
                                                        <div className="form-line">
                                                            <input type="text" id="name" name="name" className="form-control" value={this.state.name}
                                                                placeholder="Enter your module" onChange={this.onChangeHandler.bind(this)} />
                                                        </div>
                                                    </div>
                                                    <label>Remarks</label>
                                                    <div className="form-group">
                                                        <div className="form-line">
                                                            <input type="text" id="remarks" name="remarks" className="form-control" value={this.state.remarks}
                                                                placeholder="Enter your remarks" onChange={this.onChangeHandler.bind(this)} />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    {this.state.id == "" ?
                                                        (<button type="submit" className="btn bg-pink waves-effect">Save</button>)
                                                        :
                                                        (<button type="submit" className="btn bg-pink waves-effect">Update</button>)
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
export default Module ;