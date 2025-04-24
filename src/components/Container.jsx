import { useEffect, useLayoutEffect, useContext } from "react";

import MealItem from "./MealItem.jsx";
import Error from "./Error.jsx";
import useHttp from "../hooks/useHttp.js";
import CartContext from "../store/CartContext.jsx";

const requestMeals = { method: "GET" };

export default function Container() {
  const { data, isLoading, error } = useHttp(
    "http://localhost:3000/meals",
    requestMeals,
    []
  );

  const cartContext = useContext(CartContext);

  useLayoutEffect(() => {
    let storedUserData = localStorage.getItem("cart");
    storedUserData = JSON.parse(storedUserData);

    if (storedUserData.length > 0) {
      cartContext.addInitialCart(storedUserData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartContext.items));
  }, [cartContext]);

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
