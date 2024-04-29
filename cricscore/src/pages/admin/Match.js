import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layouts/AdminMenu";
import Layout from "./../../components/Layouts/layout";
import axios from "axios";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
const Match = () => {
  const [matchs, setMatchs] = useState([]);

  //getall matchs
  const getAllMatchs = async () => {
    try {
      const { data } = await axios.get("/api/v1/match/get-match");
      setMatchs(data.matchs);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllMatchs();
  }, []);
  return (
    <Layout>
      <div className="container-fluid">
      <div className="row m-3 p-3">
        <div className="col-md-3 ">
        <AdminMenu /> 
        </div>
      
        <div className="col-md-9 ">
          <h1 className="text-center">All Matches List</h1>
          <div className="d-flex flex-wrap">
            {matchs?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/match/${p.slug}`}
                className="match-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/match/match-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Match;