import { useState, useRef, useMemo } from "react";

import Header from "./components/Header";
import Container from "./components/Container";
import Cart from "./components/Cart";

function App() {
  const [cartData, setCartData] = useState([]);
  const modalRef = useRef(null);

  const totalPrice = useMemo(
    () =>
      cartData
        .reduce((sum, item) => sum + item.quantity * parseFloat(item.price), 0)
        .toFixed(2),
    [cartData]
  );

  console.log(cartData);

  function handleMealButton(id, title, price) {
    const existingItemIndex = cartData.findIndex((item) => item.id === id);

    if (existingItemIndex == -1) {
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
    } else {
      setCartData((prevState) => {
        return prevState.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      });
    }
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
        total={totalPrice}
      />
    </>
  );
}

export default App;
