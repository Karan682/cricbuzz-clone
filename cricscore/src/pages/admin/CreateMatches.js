import React,{useState,useEffect} from "react";
import Layout from "../../components/Layouts/layout";
import AdminMenu from "./../../components/Layouts/AdminMenu";
import { toast } from 'react-toastify';
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateMatch = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [toss_winner, setToss_winner] = useState("");
  const [category, setCategory] = useState("");
  const [team_1, setTeam_1] = useState("");
  const [team_2, setTeam_2] = useState("");
  const [venue, setVenue] = useState("");
  const [team_1r, setTeam_1r] = useState("");
  const [team_2r, setTeam_2r] = useState("");
  const [winner, setWinner] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
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
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const matchData = new FormData();
      matchData.append("name", name);
      matchData.append("description", description);
      matchData.append("toss_winner", toss_winner);
      matchData.append("team_1", team_1);
      matchData.append("team_2", team_2);
      matchData.append("venue", venue);
      matchData.append("team_1r", team_1r);
      matchData.append("team_2r", team_2r);
      matchData.append("winner", winner);
      matchData.append("photo", photo);
      matchData.append("category", category);

      const { data } = axios.post(
        "/api/v1/match/create-match",
        matchData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/match");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
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
            <h1>Create Match</h1>
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
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
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
                <input
                  type="text"
                  value={toss_winner}
                  placeholder="write a Toss_winner"
                  className="form-control"
                  onChange={(e) => setToss_winner(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={team_1}
                  placeholder="write a team_1 name"
                  className="form-control"
                  onChange={(e) => setTeam_1(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={team_2}
                  placeholder="write a team_2 name"
                  className="form-control"
                  onChange={(e) => setTeam_2(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={venue}
                  placeholder="write a venue name"
                  className="form-control"
                  onChange={(e) => setVenue(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={team_1r}
                  placeholder="write a team_1 runs"
                  className="form-control"
                  onChange={(e) => setTeam_1r(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={team_2r}
                  placeholder="write a team_2 runs "
                  className="form-control"
                  onChange={(e) => setTeam_2r(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={winner}
                  placeholder="write a winner of the match"
                  className="form-control"
                  onChange={(e) => setWinner(e.target.value)}
                />
              </div>
              
              <div className="mb-3">
                <button className="btn btn-success" onClick={handleCreate}>
                  CREATE MATCH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateMatch;