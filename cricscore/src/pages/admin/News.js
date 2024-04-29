import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layouts/AdminMenu";
import Layout from "./../../components/Layouts/layout";
import axios from "axios";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
const News = () => {
  const [news, setNewss] = useState([]);

  //getall news
  const getAllNewss = async () => {
    try {
      const { data } = await axios.get("/api/v1/news/get-news");
      setNewss(data.news);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllNewss();
  }, []);
  return (
    <Layout>
      <div className="row m-3 p-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All News List</h1>
          <div className="d-flex d-wrap">
            {news?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/news/${p.slug}`}
                className="news-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/news/news-photo/${p._id}`}
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
    </Layout>
  );
};

export default News;