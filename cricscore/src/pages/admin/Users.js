import React from "react";
import { useState, useEffect } from "react";
import Layout from "./../../components/Layouts/layout";
import AdminMenu from "./../../components/Layouts/AdminMenu";
import { toast } from 'react-toastify';
import axios from "axios";
import { Modal } from "antd"

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  
  const [visible, setVisible] = useState(false);
  
  
  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/get-users");
      if (data.success) {
        setCategories(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting users");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  
  return (
    <Layout >
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            <div className="p-3 w-50">
              
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>{c.email}</td>
                      </tr>
                      
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;