import React, { useContext } from 'react';
import "../../App.css";
import "./admin.css";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import { itemsContext } from '../../components/Mycontext';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = () => {
  const { items, handleDelete } = useContext(itemsContext);

  const deleteItem = async(id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await handleDelete(id);
        toast.success("Deleted Successfully!");
      } catch (error) {
        toast.error("Failed to delete item.");
      }
    }
  };

  return (
    <div className='dashboard my-5 p-5'>

      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <Breadcrumb>
              <Breadcrumb.Item href="/admin" active>Admin</Breadcrumb.Item>
              <Breadcrumb.Item href="/admin" active>
                Dashboard
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        <Link className='btn btn-primary text-light' to="/admin/form/new">
          Add Item
        </Link>

        <table className="table my-5 py-5 w-100">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className='text-center'>No Data Found</td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <button className='btn btn-danger' onClick={() => deleteItem(item.id)}>
                      Delete
                    </button>
                    <Link className='btn btn-warning ms-2' to={`/admin/form/edit/${item.id}`}>
                      Update
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default Dashboard;
