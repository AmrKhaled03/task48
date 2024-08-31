import React, { useContext } from 'react';
import { itemsContext } from './components/Mycontext';
import "./App.css";
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const { items } = useContext(itemsContext);
const navigate= useNavigate();
  return (
    <div className='p-5 my-5 items'>
      <div className='container'>
        <h1 className='text-center' style={{ color: "peru"}}>
          Welcome In Our Restaurant!
        </h1>
        <div className='row my-5 p-5'>
        <h1 className='text-center my-5' style={{ color: "peru",fontStyle:"italic" }}>
          Our Products 
        </h1>
          {items.length === 0 ? (
            <h1>No data found</h1>
          ) : (
            items.map((item) => (
              <div className='col-lg-3 col-md-6 col-sm-12 item mb-2' key={item.id}>
                <div className='body'>
                  <h1>{item.title}</h1>
                  <h3>{item.price}</h3>
                </div>
              </div>
            ))
          )}
        </div>
        <button className='btn btn-success' onClick={()=>navigate("/register")}>Visit Website</button>
      </div>
    </div>
  );
};

export default Welcome;
