import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const itemsContext = createContext();

const MyContext = ({ children }) => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
const[cart,setCart]=useState([]);
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:3030/products");
      setItems(response.data);
    } catch (e) {
      console.error("Fetch error:", e.response ? e.response.data : e.message);
    }
  };
  useEffect(() => {
    // Fetch cart data from the server when the component mounts
    const fetchCartData = async () => {
      try {
        const response = await axios.get("http://localhost:3030/cart");
        setCart(response.data); // Update state with fetched data
      } catch (e) {
        console.error("Error fetching cart data:", e.response ? e.response.data : e.message);
      }
    };

    fetchCartData();
  }, []);
  useEffect(() => {
    fetchItems();
  }, []);

  const handleUpdate = async (id) => {
    const updatedItem = { title, price };
    try {
      const response = await axios.put(`http://localhost:3030/products/${id}`, updatedItem);
      if (response.status === 200) {
        setItems(items.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)));
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/products/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete item.');
    }
  };

  const addItem = async () => {
    const newItem = { title, price,inCart:false };
    try {
      const response = await axios.post("http://localhost:3030/products", newItem);
      setItems([...items, response.data]);

    } catch (e) {
      console.error("Add item error:", e.response ? e.response.data : e.message);
    }
  };
  const addToCart = async (id) => {
    if (cart.some((element) => element.id === id)) {
      alert("Item is already in the cart");
    } else {
      const item = items.find((item) => item.id === id);
      if (item) {
        try {
          // Update the item's inCart property
          const updatedItem = { ...item, inCart: true };
          
          // Add the item to the cart on the server
          await axios.post("http://localhost:3030/cart", updatedItem);
  
          // Update item in the items state
          setItems(items.map((i) => (i.id === id ? updatedItem : i)));
          
          // Update the cart state
          setCart([...cart, updatedItem]);
        } catch (e) {
          console.error("Error adding to cart:", e.response ? e.response.data : e.message);
        }
      }
    }
  };
  
const deleteCart = async (id) => {
  try {
    // Remove the item from the cart on the server
    await axios.delete(`http://localhost:3030/cart/${id}`);
    
    // Update the cart state
    setCart(cart.filter((item) => item.id !== id));
    
    // Update the items state
    setItems(items.map((item) => (item.id === id ? { ...item, inCart: false } : item)));
  } catch (e) {
    console.error("Error deleting from cart:", e.response ? e.response.data : e.message);
  }
};

  
  const contextValues = {
    items,
    title,
    setTitle,
    price,
    setPrice,
    addItem,
    handleDelete,
    handleUpdate,
    fetchItems,
    addToCart,
    cart,
    deleteCart
  };

  return (
    <itemsContext.Provider value={contextValues}>
      {children}
    </itemsContext.Provider>
  );
};

export default MyContext;
