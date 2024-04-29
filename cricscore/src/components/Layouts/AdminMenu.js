import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center" >
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action list-group-item-success"
          >
           Create Category 
          </NavLink>
          <NavLink
            to="/dashboard/admin/createnews-category"
            className="list-group-item list-group-item-action list-group-item-success"
          >
            News Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-match"
            className="list-group-item list-group-item-action list-group-item-success"
          >
            Create Match
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-news"
            className="list-group-item list-group-item-action list-group-item-success"
          >
            Create News
          </NavLink>
          <NavLink
            to="/dashboard/admin/match"
            className="list-group-item list-group-item-action list-group-item-success"
          >
            Matches
          </NavLink>
          <NavLink
            to="/dashboard/admin/news"
            className="list-group-item list-group-item-action list-group-item-success"
          >
            News
          </NavLink>
           
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action list-group-item-success"
          >
            Users
          </NavLink>

        </div>
      </div>
    </>
  );
};

export default AdminMenu;