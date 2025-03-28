import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Container({ onMealButtonClick }) {
  const [mealsItemsData, setMealsItemsData] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await fetch("http://localhost:3000/meals");
        const resData = await response.json();
        setMealsItemsData(resData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPlaces();
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
