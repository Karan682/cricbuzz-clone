import React,{useState,useEffect} from "react";
import Layout from "../../components/Layouts/layout";
import AdminMenu from "./../../components/Layouts/AdminMenu";
import { toast } from 'react-toastify';
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateMatch = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [id,setId] = useState("");

  const getSingleMatch = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/news/get-news/${params.slug}`
      );
      setName(data.news.name);
      setId(data.news._id);
      setDescription(data.news.description);
      setCategory(data.news.newscategory._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleMatch();
    //eslint-disable-next-line
  }, []);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/newscategory/getnews-category");
      if (data?.success) {
        setCategories(data?.newscategory);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create match function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const newsData = new FormData();
      newsData.append("name", name);
      newsData.append("description", description);
      photo && newsData.append("photo", photo);
      newsData.append("category", category);

      const { data } = axios.put(
        `/api/v1/news/update-news/${id}`,
        newsData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/news")
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete news
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this match ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/news/delete-news/${id}`
      );
      toast.success("News Deleted Succfully");
      navigate("/dashboard/admin/news");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout >
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update News</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category._id}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="match_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ):(
                    <div className="text-center">
                    <img
                      src={`/api/v1/news/news-photo/${id}`}
                      alt="match_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE NEWS
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE NEWS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateMatch;