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
    <main id="meals">
      {mealsItemsData.map((item) => {
        const imgSrc = `http://localhost:3000/${item.image}`;
        return (
          <MealItem
            key={item.id}
            id={item.id}
            img={imgSrc}
            title={item.name}
            price={item.price}
            description={item.description}
            onButtonClick={onMealButtonClick}
          />
        );
      })}
    </main>
  );
}
