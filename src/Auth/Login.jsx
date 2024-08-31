import React, { useContext, useEffect, useState } from 'react';
import { authContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, rule, setLoginEmail, setLoginPass } = useContext(authContext);
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    if (loginSuccess) {
      if (rule === "user") {
        navigate("/user");
      } else if (rule === "admin") {
        navigate("/admin");
      } else {
        toast.error("Role not found");
      }
    }
  }, [loginSuccess, rule, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    await handleLogin();  // Perform login logic
    setLoginSuccess(true); // Trigger the navigation check
  };

  return (
    <div className='p-5 my-5'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setLoginPass(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
        <button type="button" className="btn btn-warning w-100  text-white" onClick={()=>navigate("/register")}>Register</button>
      </form>
    </div>
  );
};

export default Login;
