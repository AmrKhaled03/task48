import React, { useContext } from 'react'
import { itemsContext } from '../../components/Mycontext'
import "../../App.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Items = () => {
  const {items,addToCart}=useContext(itemsContext);
  const addCart=async(id)=>{
    if(id){
     await addToCart(id);
toast.success("Item Is Added Successfully !"); 
    }else{
      toast.error("Can't Add This Item!"); 
    }


  }
  return (
    <div className='items p-5 my-5'>
<div className='container'>
<div className='row'>
<div className='col-12'>
<h1 className='text-center' style={{color:"peru"}}>
Our Items   
</h1>

</div>
</div>
<div className='row my-5'>
{
  items.map((item ,index)=>(
    <div className='col-lg-4 col-md-6 col-sm-12 item mb-2' key={index}>
    <div className='body'>

 <h3>
  {item.title}
</h3>
<span>
  {item.price}

</span>
<button className='btn btn-success w-100 btn-sm' onClick={()=>addCart(item.id)}>
  Add To Cart
</button>
   </div>


</div>
  ))
}

</div>
</div>
    </div>
  )
}

export default Items