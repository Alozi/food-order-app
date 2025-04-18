import { useEffect, useState } from "react";

import MealItem from "./MealItem.jsx";

import { fetchMeals } from "../http.js";

export default function Container() {
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
            meal={item}
          />
        );
      })}
    </ul>
  );
}
