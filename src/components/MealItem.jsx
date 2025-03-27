import Image from "../assets/logo.jpg";

export default function MealItem() {
  return (
    <div className="meal-item">
      <article>
        <img src={Image} alt="Food order logo" />
        <h3>Mac & Cheese</h3>
        <div>
          <span className="meal-item-price">$8.99</span>
        </div>
        <p className="meal-item-description">Test text...</p>
        <div className="meal-item-actions">
          <button className="button">Add to Cart</button>
        </div>
      </article>
      test
    </div>
  );
}
