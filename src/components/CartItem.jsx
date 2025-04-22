import { currencyFormatter } from "../util/formatting";

export default function CartItem({ name, quantity, price, onDecrease, onIncrease }) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <div className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        {quantity}
        <button onClick={onIncrease}>+</button>
      </div>
    </li>
  );
}
