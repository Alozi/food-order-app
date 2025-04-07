export default function MealItem({
  id,
  img,
  title,
  price,
  description,
  onButtonClick,
}) {
  return (
    <li className="meal-item">
      <article>
        <img src={img} alt={title} />
        <div>
          <h3>{title}</h3>
          <p className="meal-item-price">${price}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <div className="meal-item-actions">
          <button
            className="button"
            onClick={() => onButtonClick(id, title, price)}
          >
            Add to Cart
          </button>
        </div>
      </article>
    </li>
  );
}
