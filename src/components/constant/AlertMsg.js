import React, { Component } from 'react'

class AlertMsg extends Component {
    render() {
        return (
            <div className="alert alert-success alert-dismissible " role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                </button>
                Date Save Successfully !
            </div>
        );
    }
}
export default AlertMsg;

