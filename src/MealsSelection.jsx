import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMealSelection } from "./mealsSlice";

const MealsSelection = ({ numberOfPeople, setNumberOfPeople, totalCost }) => {
  const mealsItems = useSelector((state) => state.meals);
  const dispatch = useDispatch();

  const handleMealSelection = (index) => {
    const item = mealsItems[index];
    if (item.selected && item.type === "mealForPeople") {
      const newNumberOfPeople = item.selected ? numberOfPeople : 0;
      dispatch(toggleMealSelection(index, newNumberOfPeople));
    }
    else {
      dispatch(toggleMealSelection(index));
    }
  };

  return (
    <div id="meals" className="venue_container container_main">
      <div className="text">
        <h1>Meals Selection</h1>
      </div>
      <div className="input-container venue_selection">
        <label htmlFor="numberOfPeople"><h3>Number of People:</h3></label>
        <input 
          type="number" 
          className="input_box5" 
          id="numberOfPeople" 
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
          min="1"
        />
      </div>
      <div className="meal_selection">
        {mealsItems.map((item, index) => (
          <div className="meal_item" key={index} style={{ padding: 15 }}>
            <div className="inner">
              <input 
                type="checkbox" 
                id={`meal_${index}`}
                checked={item.selected}
                onChange={() => handleMealSelection(index)}
              />
              <label htmlFor={`meal_${index}`}> {item.name} </label>
            </div>
            <div className="meal_cost">${item.cost}</div>
          </div>
        ))}
      </div>
      <div className="total_cost">Total Cost: ${totalCost}</div>
    </div>
  );
};

export default MealsSelection;