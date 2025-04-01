import { useState, useRef, useMemo } from "react";

import Header from "./components/Header";
import Container from "./components/Container";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Success from "./components/Success";

function App() {
  const [cartData, setCartData] = useState([]);
  const modalCartRef = useRef(null);
  const modalCheckoutRef = useRef(null);
  const modalSuccessRef = useRef();

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

  function openModalCart() {
    modalCartRef.current.showModal();
  }

  function closeModalCart() {
    modalCartRef.current.close();
  }

  function handleOutsideClickCart(e) {
    if (e.target === modalCartRef.current) {
      closeModalCart();
    }
  }

  function openModalCheckout() {
    closeModalCart();
    modalCheckoutRef.current.showModal();
  }

  function closeModalCheckout() {
    modalCheckoutRef.current.close();
  }

  function handleOutsideClickCheckout(e) {
    if (e.target === modalCheckoutRef.current) {
      closeModalCheckout();
    }
  }

  function openModalSuccess() {
    closeModalCheckout();
    modalSuccessRef.current.showModal();
    setCartData([]);
  }

  function closeModalSuccess() {
    modalSuccessRef.current.close();
  }

  function handleOutsideClickSuccess(e) {
    if (e.target === modalSuccessRef.current) {
      closeModalSuccess();
    }
  }

  function increaseQuantity(title) {
    setCartData((prevState) => {
      return prevState.map((item) =>
        item.title === title ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  }

  function decreaseQuantity(title) {
    setCartData((prevState) => {
      return prevState
        .map((item) => {
          if (item.title === title) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return null;
            }
          } else {
            return item;
          }
        })
        .filter((item) => item !== null);
    });
  }

  return (
    <>
      <Header cartLength={cartData.length} openCartModal={openModalCart} />
      <Container onMealButtonClick={handleMealButton} />
      <Cart
        data={cartData}
        modalRef={modalCartRef}
        closeModal={closeModalCart}
        handleOutsideClick={handleOutsideClickCart}
        total={totalPrice}
        onIncreaseQuantity={increaseQuantity}
        onDecreaseQuantity={decreaseQuantity}
        openCheckoutModal={openModalCheckout}
      />
      <Checkout
        items={cartData}
        total={totalPrice}
        modalRef={modalCheckoutRef}
        closeModal={closeModalCheckout}
        handleOutsideClick={handleOutsideClickCheckout}
        openSuccessModal={openModalSuccess}
      />
      <Success
        modalRef={modalSuccessRef}
        closeModal={closeModalSuccess}
        handleOutsideClick={handleOutsideClickSuccess}
      />
    </>
  );
}

export default App;
