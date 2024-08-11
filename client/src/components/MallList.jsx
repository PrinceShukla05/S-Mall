import React, { useEffect, useContext } from "react";
import MallFinder from "../apis/MallFinder";
import { MallsContext } from "../context/MallsContext";
import {useHistory} from "react-router-dom";
import StarRating from "./StarRating";

const MallList = (props) => {
   const {malls,setMalls} = useContext(MallsContext);
   let history = useHistory();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await MallFinder.get("/");
            console.log(response.data.data);
            setMalls(response.data.data.malls);
           
          } catch (err) {}
        };
    
        fetchData();
      }, []);

      const handleDelete = async (e,id) => {
        e.stopPropagation();
        try {
          const response = await MallFinder.delete(`/${id}`);
          setMalls(
            malls.filter((mall) => {
              return mall.id !== id;
            })
          );
        } catch (err) {
          console.log(err);
        }
      };

      
  const handleUpdate = ( e,id) => {
    e.stopPropagation();
    history.push(`/malls/${id}/update`);
  };
  const handleMallSelect = (id) => {
    history.push(`/malls/${id}`);
  };
  const renderRating = (mall) => {
    if (!mall.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={mall.id} />
        <span className="text-warning ml-1">({mall.count})</span>
      </>
    );
  };
  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Mall</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        
        <tbody>
          {malls &&
            malls.map((mall)  => {
              return (
                <tr
                  onClick={() => handleMallSelect(mall.id)}
                  key={mall.id}
                >
                  <td>{mall.name}</td>
                  <td>{mall.location}</td>
                  <td>{"$".repeat(mall.price_range)}</td>
                  <td>{renderRating(mall)}</td>
                  <td>
                    <button onClick={(e)=>handleUpdate(e,mall.id)}
                      
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button onClick={(e)=>handleDelete(e,mall.id)}
                     
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })} 
        {}
        
        
      
        </tbody>
        </table>
        </div>
  );
};

export default MallList;