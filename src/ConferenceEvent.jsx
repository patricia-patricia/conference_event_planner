import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import VenueSelection from "./VenueSelection";
import AddOnsSelection from "./AddOnsSelection";
import MealsSelection from "./MealsSelection";
import { useSelector } from "react-redux";

const ConferenceEvent = () => {
  const [showItems, setShowItems] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const mealsItems = useSelector((state) => state.meals);
  
  const getItemsFromTotalCost = () => {
    const items = [];
    venueItems.forEach((item) => {
      if (item.quantity > 0) {
        items.push({ ...item, type: "venue" });
      }
    });
    avItems.forEach((item) => {
      if (
        item.quantity > 0 &&
        !items.some((i) => i.name === item.name && i.type === "av")
      ) {
        items.push({ ...item, type: "av" });
      }
    });
    mealsItems.forEach((item) => {
      if (item.selected) {
        const itemForDisplay = { ...item, type: "meals" };
        if (item.numberOfPeople) {
          itemForDisplay.numberOfPeople = numberOfPeople;
        }
        items.push(itemForDisplay);
      }
    });
    return items;
  };

  const items = getItemsFromTotalCost();

  const ItemsDisplay = ({ items }) => {
    return (
      <div className="display_box1">
        {items.length === 0 && <p>No items selected</p>}
        <table className="table_item_data">
          <thead>
            <tr>
              <th>Name</th>
              <th>Unit Cost</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>${item.cost}</td>
                <td>
                  {item.type === "meals" || item.numberOfPeople
                    ? ` For ${numberOfPeople} people`
                    : item.quantity}
                </td>
                <td>
                  {item.type === "meals" || item.numberOfPeople
                    ? `${item.cost * numberOfPeople}`
                    : `${item.cost * item.quantity}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // First define the calculateTotalCost function
const calculateTotalCost = (items, isMeal = false) => {
  return items.reduce((total, item) => {
    if (isMeal) {
      return total + (item.selected ? item.cost * numberOfPeople : 0);
    }
    return total + (item.cost * (item.quantity || 0));
  }, 0);
};

// Then calculate the totals
const venueTotal = calculateTotalCost(venueItems);
const addOnsTotal = calculateTotalCost(avItems);
const mealsTotal = calculateTotalCost(mealsItems, true);

// Then create the totalCosts object using the correct variables
const totalCosts = {
  venue: venueTotal,    // Changed from venueTotalCost
  av: addOnsTotal,     // Changed from avTotalCost
  meals: mealsTotal     // Changed from mealsTotalCost
};

  const navigateToProducts = (idType) => {
    if (idType === '#venue' || idType === '#addons' || idType === '#meals') {
      if (showItems) {
        setShowItems(!showItems);
      }
    }
  };

  return (
    <>
      <navbar className="navbar_event_conference">
        <div className="company_logo">Conference Expense Planner</div>
        <div className="left_navbar">
          <div className="nav_links">
            <a href="#venue" onClick={() => navigateToProducts("#venue")}>Venue</a>
            <a href="#addons" onClick={() => navigateToProducts('#addons')}>Add-ons</a>
            <a href="#meals" onClick={() => navigateToProducts('#meals')}>Meals</a>
          </div>
          <button className="details_button" onClick={() => setShowItems(!showItems)}>
            Show Details
          </button>
        </div>
      </navbar>
      <div className="main_container">
        {!showItems ? (
          <div className="items-information">
            <VenueSelection 
              totalCost={venueTotal} 
            />
            <AddOnsSelection 
              totalCost={addOnsTotal} 
            />
            <MealsSelection 
              numberOfPeople={numberOfPeople} 
              setNumberOfPeople={setNumberOfPeople}
              totalCost={mealsTotal}
            />
          </div>
        ) : (
          <div className="total_amount_detail">
            <TotalCost 
              totalCosts={totalCosts} 
              ItemsDisplay={() => <ItemsDisplay items={items} />} 
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ConferenceEvent;