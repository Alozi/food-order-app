import Image from "../assets/logo.jpg";

export default function Header({ cartLength, openCartModal }) {
  return (
    <header id="main-header">
      <h1 id="title">
        Food Order App 💪 <img src={Image} alt="Food order logo" />
      </h1>
      <button className="button" onClick={openCartModal}>
        Cart {cartLength > 0 && `(${cartLength})`}
      </button>
    </header>
  );
}
