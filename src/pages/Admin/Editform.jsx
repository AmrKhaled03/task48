import React, { useContext, useEffect } from "react";
import "./admin.css";
import Form from "react-bootstrap/Form";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { itemsContext } from "../../components/Mycontext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UpdateItemForm = () => {
  const { id } = useParams();
  const { title, setTitle, price, setPrice, handleUpdate,fetchItems } = useContext(itemsContext);
  const navigate = useNavigate();

  const fetchItem = async () => {
    try {
      const response = await axios.get(`http://localhost:3030/products/${id}`);
      if (response.status === 200) {
        setTitle(response.data.title);
        setPrice(response.data.price);
      } else {
        console.error("Item not found");
      }
    } catch (e) {
      console.error(`Fetch item error: ${e.message}`);
    }
  };

  useEffect(() => {
    if (id) {
      fetchItem();
    

    } else {
      setTitle("");
      setPrice("");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleUpdate(id);
      toast.success("Item updated successfully!");
      fetchItems();  // Fetch items to update the list in Dashboard
      navigate("/admin");
    } catch (error) {
      toast.error("Failed to update item.");
    }
  };

  return (
    <div className="form p-5 my-5">

      <div className="container">
        <div className="row">
          <div className="col-12">
            <Breadcrumb>
              <Breadcrumb.Item href="/admin" active>
                Admin
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/admin/form" active>
                Update
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <button type="submit" className="btn btn-success w-100">
            Update
          </button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateItemForm;
