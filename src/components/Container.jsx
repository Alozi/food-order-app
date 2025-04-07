import { useEffect, useState } from "react";

import MealItem from "./MealItem.jsx";

import { fetchMeals } from "../http.js";

export default function Container({ onMealButtonClick }) {
  const [mealsItemsData, setMealsItemsData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchMeals();
      if (data) setMealsItemsData(data);
    }

    loadData();
  }, []);

  return (
    <ul id="meals">
      {mealsItemsData.map((item) => {
        return (
          <MealItem
            key={item.id}
            id={item.id}
            img={`http://localhost:3000/${item.image}`}
            title={item.name}
            price={item.price}
            description={item.description}
            onButtonClick={onMealButtonClick}
          />
        );
      })}
    </ul>
  );
}
