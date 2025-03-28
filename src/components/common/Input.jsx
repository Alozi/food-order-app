export default function Input({ id, label, error, ...props }) {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
}
