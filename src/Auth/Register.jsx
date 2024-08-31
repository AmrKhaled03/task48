import React, { useContext } from 'react';
import { authContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const {
    inputReg,
    setInputReg,
    emailReg,
    setEmailReg,
    passReg,
    setPassReg,
    rule,
    setRule,
    handleRegister
  } = useContext(authContext);

  const register = async () => {
    if (!inputReg || !emailReg || !passReg || !rule) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await handleRegister();
      toast.success("Registered Successfully!");
      navigate("/login");
    } catch (e) {
      toast.error("Registration Failed!");
      console.error("Registration error:", e.message);
    }
  };

  return (
    <div className='my-5 p-5'>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={inputReg}
            onChange={(e) => setInputReg(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={emailReg}
            onChange={(e) => setEmailReg(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={passReg}
            onChange={(e) => setPassReg(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rule" className="form-label">Rule</label>
          <select
            id="rule"
            className="form-select"
            value={rule}
            onChange={(e) => setRule(e.target.value)}
          >
            <option>Select rule</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="button" className="btn btn-primary mb-2 w-100" onClick={register}>Register</button>
        <button type="button" className="btn btn-warning  text-white w-100" onClick={()=>navigate("/login")}>Login</button>

      </form>
    </div>
  );
};

export default Register;
