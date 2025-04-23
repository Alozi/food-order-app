import MealItem from "./MealItem.jsx";
import Error from "./Error.jsx";
import useHttp from "../hooks/useHttp.js";

const requestMeals = { method: "GET" };

export default function Container() {
  const { data, isLoading, error } = useHttp(
    "http://localhost:3000/meals",
    requestMeals,
    []
  );

  if (isLoading) {
    return <p className="center">Fething meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  // if(!data) {
  //   return <p>No meals found.</p>
  // }

  return (
    <ul id="meals">
      {data.map((item) => {
        return <MealItem key={item.id} meal={item} />;
      })}
    </ul>
  );
}
