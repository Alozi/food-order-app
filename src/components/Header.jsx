import Image from "../assets/logo.jpg";

export default function Header({ cartLength, openCartModal }) {
  return (
    <header id="main-header">
      <div id="title">
        <img src={Image} alt="Food order logo" />
        <h1>Food Order App 💪</h1>
      </div>
      <nav>
        <button className="button" onClick={openCartModal}>
          Cart {cartLength > 0 && `(${cartLength})`}
        </button>
      </nav>
    </header>
  );
}
