import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const authContext = createContext();

const AuthContext = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    return savedLoginStatus ? JSON.parse(savedLoginStatus) : false;
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [users, setUsers] = useState([]);
  const [inputReg, setInputReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passReg, setPassReg] = useState("");
  const [rule, setRule] = useState(() => {
    const savedRule = localStorage.getItem("userRule");
    return savedRule || "";
  });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("userRule", rule);
  }, [isLoggedIn, currentUser, rule]);

  const handleRegister = async () => {
    const newRegistered = {
      name: inputReg,
      email: emailReg,
      password: passReg,
      rule: rule,
      isRegistered: true,
      isLoggedIn: false,
    };
    try {
      const response = await axios.post("http://localhost:3030/users", newRegistered);
      setUsers([...users, response.data]);
      setIsRegistered(true);
    } catch (e) {
      console.error("Register error:", e.response ? e.response.data : e.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:3030/users");
      const user = response.data.find(
        (u) => u.email === loginEmail && u.password === loginPass
      );
  
      if (user) {
        await axios.put(`http://localhost:3030/users/${user.id}`, {
          ...user,
          isLoggedIn: true,
        });
  
        setIsLoggedIn(true);
        setRule(user.rule);
        setCurrentUser(user); 
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        setIsLoggedIn(false);
        setRule("");
        setCurrentUser(null);
        console.error("Invalid credentials");
      }
    } catch (e) {
      console.error("Login error:", e.response ? e.response.data : e.message);
    }
  };

  const handleLogout = async () => {
    try {
      if (currentUser) {
        await axios.put(`http://localhost:3030/users/${currentUser.id}`, {
          ...currentUser,
          isLoggedIn: false,
        });
      }

      setIsLoggedIn(false);
      setRule("");
      setCurrentUser(null);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userRule");
    } catch (e) {
      console.error("Logout error:", e.response ? e.response.data : e.message);
    }
  };

  const values = {
    isRegistered,
    isLoggedIn,
    setIsLoggedIn,
    setIsRegistered,
    users,
    setUsers,
    inputReg,
    setInputReg,
    emailReg,
    setEmailReg,
    passReg,
    setPassReg,
    loginEmail,
    setLoginEmail,
    loginPass,
    setLoginPass,
    handleRegister,
    setRule,
    rule,
    handleLogin,
    handleLogout,
    currentUser,
  };

  return (
    <authContext.Provider value={values}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
