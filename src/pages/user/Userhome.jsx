import React, { useContext } from 'react'
import { authContext } from '../../Auth/AuthContext'
import { useNavigate } from 'react-router-dom';

const Userhome = () => {
    const{currentUser}=useContext(authContext);
    const navigate=useNavigate();
  return (
    <div className='p-5 my-5 d-flex justify-content-center align-items-center'>
<div className='container'>
<div className='row'>
<div className='col-12'>
<h1 className='text-center' style={{color:"peru"}}>
  Welcome <strong>{currentUser?.name}</strong> in our restaurant   
</h1>

</div>
</div>
<div className='row my-5 p-5'>
<div className='col-12'>
<button className='btn btn-success w-100' onClick={()=>navigate("/user/items")} >
    Explore Items
</button>
</div>
</div>

</div>
    </div>
  )
}

export default Userhome