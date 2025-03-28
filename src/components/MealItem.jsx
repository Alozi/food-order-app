export default function MealItem({ id, img, title, price, description, onButtonClick }) {

  return (
    <div className="meal-item" id={id}>
      <article>
        <img src={img} alt={title} />
        <h3>{title}</h3>
        <div>
          <span className="meal-item-price">${price}</span>
        </div>
        <p className="meal-item-description">{description}</p>
        <div className="meal-item-actions">
          <button className="button" onClick={() => onButtonClick(id, title, price)}>Add to Cart</button>
        </div>
      </article>
    </div>
  );
}
