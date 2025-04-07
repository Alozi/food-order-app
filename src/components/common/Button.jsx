export default function Button({ textOnly, children, className, ...props }) {
  let cssClasses = textOnly ? "text-button" : "button";
  if (className) {
    cssClasses += " " + className;
  }
  return (
    <button {...props} className={cssClasses}>
      {children}
    </button>
  );
}
