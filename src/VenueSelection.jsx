import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";

const VenueSelection = ({ totalCost }) => {
  const venueItems = useSelector((state) => state.venue);
  const dispatch = useDispatch();
  const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity;

  const handleAddToCart = (index) => {
    if (venueItems[index].name === "Auditorium Hall (Capacity:200)" && venueItems[index].quantity >= 3) {
      return; 
    }
    dispatch(incrementQuantity(index));
  };

  const handleRemoveFromCart = (index) => {
    if (venueItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };

  return (
    <div id="venue" className="venue_container container_main">
      <div className="text">
        <h1>Venue Room Selection</h1>
      </div>
      <div className="venue_selection">
        {venueItems.map((item, index) => (
          <div className="venue_main" key={index}>
            <div className="img">
              <img src={item.img} alt={item.name} />
            </div>
            <div className="text">{item.name}</div>
            <div>${item.cost}</div>
            <div className="button_container">
              {venueItems[index].name === "Auditorium Hall (Capacity:200)" ? (
                <>
                  <button
                    className={venueItems[index].quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    &#8211;
                  </button>
                  <span className="selected_count">
                    {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
                  </span>
                  <button
                    className={remainingAuditoriumQuantity === 0? "btn-success btn-disabled" : "btn-success btn-plus"}
                    onClick={() => handleAddToCart(index)}
                  >
                    &#43;
                  </button>
                </>
              ) : (
                <div className="button_container">
                  <button
                      className={venueItems[index].quantity ===0 ? " btn-warning btn-disabled" : "btn-warning btn-plus"}
                      onClick={() => handleRemoveFromCart(index)}
                    >
                      &#8211;
                    </button>
                    <span className="selected_count">
                      {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
                    </span>
                    <button
                      className={venueItems[index].quantity === 10 ? " btn-success btn-disabled" : "btn-success btn-plus"}
                      onClick={() => handleAddToCart(index)}
                    >
                    &#43;
                    </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="total_cost">Total Cost: ${totalCost}</div>
    </div>
  );
};

export default VenueSelection;