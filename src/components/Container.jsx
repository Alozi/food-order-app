import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";

const requestMeals = { method: "GET" };

export default function Container() {
  const { data, isLoading, error } = useHttp(
    "http://localhost:3000/meals",
    requestMeals,
    []
  );

  console.log("isLoading");
  console.log(isLoading);

  if (isLoading) {
    return <p>Fething meals...</p>;
  }

  return (
    <ul id="meals">
      {data.map((item) => {
        return <MealItem key={item.id} meal={item} />;
      })}
    </ul>
  );
}
