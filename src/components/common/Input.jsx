import { useState } from "react";

export default function Input({ id, label, error, ...props }) {
  const [data, setData] = useState("");
  const [edit, setEdit] = useState(false);

  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <p>{error && <span>{error}</span>}</p>
    </div>
  );
}
