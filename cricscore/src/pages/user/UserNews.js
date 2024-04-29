import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/layout";
import axios from "axios";
import { Checkbox } from "antd";
import { useNavigate } from "react-router-dom";

const ViewAnimals = () => {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

  //get all category
  const getAllNewsCategory = async () => {
    try {
      const { data } = await axios.get(
        '/api/v1/newscategory/getnews-category'
      );
      if (data?.success) {
        setCategories(data?.newscategory);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllNewsCategory();
  }, []);

  //get matches
  const getAllAnimals = async () => {
    try {
      const { data } = await axios.get(
        '/api/v1/news/get-news'
      );
      setAnimals(data.news);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length) getAllAnimals();
  }, [checked.length]);

  useEffect(() => {
    if (checked.length) filterAnimal();
    //eslint-disable-next-line
  }, [checked]);

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get filter animals
  const filterAnimal = async () => {
    try {
      const { data } = await axios.post('/api/v1/news/news-filters',{checked});
      setAnimals(data?.news);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 mt-3">
            <h5>Filters by Category</h5>
            <div className="d-flex flex-column ms-5 mt-2">
              {categories && categories?.map((c) => (
                <div key={c._id}>
                
                  <Checkbox
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-10">
            <h1 className="text-center mt-3">All Matches</h1>
            <div className="d-flex flex-wrap">
              {animals && animals?.map((a) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={a._id}
                >
                  
                 
                  <div className="card-body">
                  <img
                  src={`/api/v1/news/news-photo/${a._id}`}
                  className="card-img-top"
                  alt={a.name}
                />
                    <h5 className="card-title">{a.name}</h5>
                    <p className="card-text">{a.newscategory?.name}</p>
                    <p className="card-text">
                    {a.description.substring(0, 30)}...
                  </p>
                    </div>
                    <div >
                    <button className="btn btn-success ms-1" onClick={()=> navigate(`/news/${a.slug}`)} >
  
                      More Details
                    </button>
                
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewAnimals;
