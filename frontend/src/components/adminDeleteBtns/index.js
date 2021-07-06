import React from 'react'
import {Link} from 'react-router-dom'

const ShowDeleteActionsBtns = () => (
    <div className="bg-light my-2">
        <div className="container">
        <div className="row pb-3">
            <div className="col-md-3 my-1">
            <Link to="/admin/manage/managenews" style={{textDecoration:"none"}}>
                <button className="btn btn-outline-info btn-block" data-toggle="modal" data-target="#DeleteNewsModel">
                    <i className="fas fa-user-edit"></i> manage News
                </button>
                </Link>
            </div>
            <div className="col-md-3 my-1">
            <Link to="/admin/manage/manageadvices" style={{textDecoration:"none"}}>
                <button className="btn btn-outline-warning btn-block" data-toggle="modal" data-target="#DeleteAdviceModel">
                    <i className="fas fa-user-edit"></i> manage advices
                </button>
                </Link>
            </div>
            <div className="col-md-3 my-1">
            <Link to="/admin/manage/manageusers" style={{textDecoration:"none"}}>
                <button className="btn btn-outline-success btn-block" data-toggle="modal" data-target="#DeleteUserModel">
                    <i className="fas fa-user-edit"></i> manage users
                </button>
                </Link>
            </div>
            <div className="col-md-3 my-1">
            <Link to="/admin/manage/manageadmins" style={{textDecoration:"none"}}>
                <button className="btn btn-outline-danger btn-block" data-toggle="modal" data-target="#DeleteAdminModel">
                    <i className="fas fa-user-edit"></i> manage admins
                </button>
                </Link>
            </div>
        </div>
        </div>
  </div>
)

export default ShowDeleteActionsBtns;