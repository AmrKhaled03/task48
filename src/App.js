import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import ItemsForm from "./pages/Admin/ItemsForm";
import Editform from "./pages/Admin/Editform";
import Items from "./pages/user/Items";
import Cart from "./pages/user/Cart";
import NavBar from "./components/NavBar";

import { ToastContainer } from "react-toastify";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Welcome from "./Welcome";
import Userhome from "./pages/user/Userhome";

function App() {

  return (
    <div className="App">

      <NavBar />
      <Routes>
      <Route path="/" element={<Welcome/>}/>
      <Route   path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/form/new" element={<ItemsForm />} />
        <Route path="/admin/form/edit/:id" element={<Editform />} />
<Route path="/user" element={<Userhome/>}/>
        <Route path="/user/items" element={<Items />} />
        <Route path="/user/cart" element={<Cart />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
