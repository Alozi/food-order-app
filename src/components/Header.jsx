import Image from "../assets/logo.jpg";

export default function Header() {
  return (
    <header id="main-header">
      <h1 id="title">
        Food Order App 💪 <img src={Image} alt="Food order logo" />
      </h1>
      <button className="button">Cart</button>
    </header>
  );
}
