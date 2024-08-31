import React, { useContext } from 'react'
import {  itemsContext } from '../../components/Mycontext'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Cart = () => {
  const {cart,deleteCart}=useContext(itemsContext);
  const deleteItem=async(id)=>{
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteCart(id);
        toast.success("Deleted Successfully!");
      } catch (error) {
        toast.error("Failed to delete item.");
      }
    }
  }
  return (
    <div className='p-5 my-5'>
<div className='container'> 
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
            {cart.length === 0 ? (
              <tr>
                <td colSpan={4} className='text-center'>No Data Found</td>
              </tr>
            ) : (
              cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <button className='btn btn-danger' onClick={()=>deleteItem(item.id)}>
                      Delete
                    </button>
                  
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
</div>

    </div>
  )
}

export default Cart