import Image from "../assets/logo.jpg";

export default function Header() {
  return (
    <header id="main-header">
      <h1 id="title">
        Food Order App 💪 <img src={Image} />
      </h1>
      <button>Hello</button>
    </header>
  );
}
