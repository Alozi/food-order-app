import { useState, useRef } from "react";

import Header from "./components/Header";
import Container from "./components/Container";
import Cart from "./components/Cart";

function App() {
  const [cartData, setCartData] = useState([]);
  const modalRef = useRef(null);

  function handleMealButton(id, title, price) {
    setCartData((prevState) => {
      return [
        ...prevState,
        {
          quantity: 1,
          id: id,
          title: title,
          price: price,
        },
      ];
    });
  }

  function openModal() {
    modalRef.current.showModal();
  }

  function closeModal() {
    modalRef.current.close();
  }

  function handleOutsideClick(e) {
    if (e.target === modalRef.current) {
      closeModal();
    }
  }

  return (
    <>
      <Header cartLength={cartData.length} openCartModal={openModal} />
      <Container onMealButtonClick={handleMealButton} />
      <Cart
        data={cartData}
        modalRef={modalRef}
        closeCartModal={closeModal}
        handleOutsideClick={handleOutsideClick}
      />
    </>
  );
}

export default App;
