import { useContext } from "react";

import { currencyFormatter } from "../util/formatting.js";
import Button from "../components/common/Button.jsx";
import CartContext from "../store/CartContext.jsx";

export default function MealItem(item) {
  const cartContext = useContext(CartContext);

  function handleAddMealToCart() {
    cartContext.addItem(item.meal);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${item.meal.image}`} alt={item.meal.name} />
        <div>
          <h3>{item.meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(item.meal.price)}
          </p>
          <p className="meal-item-description">{item.meal.description}</p>
        </div>
        <div className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </div>
      </article>
    </li>
  );
}
