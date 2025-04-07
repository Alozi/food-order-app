import Image from "../assets/logo.jpg";
import Button from "../components/common/Button.jsx";

export default function Header({ cartLength, openCartModal }) {
  return (
    <header id="main-header">
      <div id="title">
        <img src={Image} alt="Food order logo" />
        <h1>Food Order App 💪</h1>
      </div>
      <nav>
        <Button onClick={openCartModal}>
          Cart {cartLength > 0 && `(${cartLength})`}
        </Button>
      </nav>
    </header>
  );
}
