
import React, { useState, useContext } from "react";
import MallFinder from "../apis/MallFinder";
import { MallsContext } from "../context/MallsContext";

const AddMall=()=> {
  const { addMalls } = useContext(MallsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await MallFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
     
      console.log(response.data.data);
      addMalls(response.data.data.mall);
    } catch (err) {
      console.log(err);
    }
  };
  return (
  <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input  value={name}
              onChange={(e) => setName(e.target.value)}
              
              
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
             value={location}
             onChange={(e) => setLocation(e.target.value)}
             
            
              
              className="form-control"
              type="text"
              placeholder="location"
            />
          </div>
          <div className="col">
            <select
             value={priceRange}
             onChange={(e) => setPriceRange(e.target.value)}
             
              className="custom-select my-1 mr-sm-2"
            >
              <option disabled>Price Range</option>
              <option value="1">₹1000</option>
              <option value="2">₹2000</option>
              <option value="3">₹3000</option>
              <option value="4">₹4000</option>
              <option value="5">₹5000</option>
            </select>
          </div>
          <button
            
            onClick={handleSubmit} type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
    
  


export default AddMall;