import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/layout";
import axios from "axios";
import { Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";


const ViewAnimals = () => {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [auth,Setauth] = useAuth();

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        '/api/v1/category/get-category'
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //get matches
  const getAllAnimals = async () => {
    try {
      const { data } = await axios.get(
        '/api/v1/match/get-match'
      );
      setAnimals(data.matchs);
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
      const { data } = await axios.post('/api/v1/match/match-filters',{checked});
      setAnimals(data?.matchs);
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
              {categories?.map((c) => (
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
              {animals?.map((a) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={a._id}
                >
                  
                 
                  <div className="card-body">
                  <img
                  src={`/api/v1/match/match-photo/${a._id}`}
                  className="card-img-top"
                  alt={a.name}
                />
                    <h5 className="card-title">{a.name}</h5>
                    <p className="card-text">{a.category.name}</p>
                    <p className="card-text">
                    {a.description.substring(0, 30)}...
                  </p>
                    </div>
                    <div >
                      
                    <button className="btn btn-success ms-1" 
                    onClick={()=> navigate(`/match/${a.slug}`)} 
                    disabled={ !auth?.user?.email }
                    > 
  
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
