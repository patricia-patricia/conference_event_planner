import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";

const AddOnsSelection = ({ totalCost }) => {
  const avItems = useSelector((state) => state.av);
  const dispatch = useDispatch();

  const handleIncrementAvQuantity = (index) => {
    dispatch(incrementAvQuantity(index));
  };

  const handleDecrementAvQuantity = (index) => {
    dispatch(decrementAvQuantity(index));
  };

  return (
    <div id="addons" className="venue_container container_main">
      <div className="text">
        <h1>Add-ons Selection</h1>
      </div>
      <div className="addons_selection">
        {avItems.map((item, index) => (
          <div className="av_data venue_main" key={index}>
            <div className="img">
              <img src={item.img} alt={item.name} />
            </div>
            <div className="text"> {item.name} </div>
            <div> ${item.cost} </div>
            <div className="addons_btn">
              <button className="btn-warning" onClick={() => handleDecrementAvQuantity(index)}> &ndash; </button>
              <span className="quantity-value">{item.quantity}</span>
              <button className=" btn-success" onClick={() => handleIncrementAvQuantity(index)}> &#43; </button>
            </div>
          </div>
        ))}
      </div>
      <div className="total_cost">Total Cost: ${totalCost}</div>
    </div>
  );
};

export default AddOnsSelection;