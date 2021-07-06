import React from 'react'

const ShowAddActionsBtns = () => (
    <div className="bg-light my-2">
        <div className="container">
        <div className="row pb-3">
            <div className="col-md-3 my-1">
                <button className="btn btn-outline-info btn-block" data-toggle="modal" data-target="#AddNewsModel">
                    <i className="fas fa-plus"></i> Add News
                </button>
            </div>
            <div className="col-md-3 my-1">
                <button className="btn btn-outline-warning btn-block" data-toggle="modal" data-target="#AddAdviceModel">
                    <i className="fas fa-plus"></i> Add Advice
                </button>
            </div>
            <div className="col-md-3 my-1">
                <button className="btn btn-outline-success btn-block" data-toggle="modal" data-target="#AddUserModel">
                    <i className="fas fa-plus"></i> Add User
                </button>
            </div>
            <div className="col-md-3 my-1">
                <button className="btn btn-outline-danger btn-block" data-toggle="modal" data-target="#AddAdminModel">
                    <i className="fas fa-plus"></i> Add Admin
                </button>
            </div>
        </div>
        </div>
  </div>
)

export default ShowAddActionsBtns;