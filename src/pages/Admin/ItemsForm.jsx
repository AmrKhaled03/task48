import React, { useContext } from "react";
import "./admin.css";
import Form from "react-bootstrap/Form";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { itemsContext } from "../../components/Mycontext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddItemForm = () => {
  const { title, setTitle, price, setPrice, addItem } = useContext(itemsContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem();
      toast.success("Added Successfully!");
      setPrice("");
      setTitle("");
      navigate("/admin");
    } catch (error) {
      toast.error("Failed to add item.");
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
                Add
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
            Add
          </button>
        </Form>
      </div>
    </div>
  );
};

export default AddItemForm;
