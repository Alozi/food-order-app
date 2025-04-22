import { useState, useRef, useMemo, useEffect } from "react";

import Header from "./components/Header";
import Container from "./components/Container";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Success from "./components/Success";

import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";

function App() {
  const [cartData, setCartData] = useState([]);
  const modalCartRef = useRef(null);
  const modalCheckoutRef = useRef(null);
  const modalSuccessRef = useRef();

  useEffect(() => {
    const storedUserData = localStorage.getItem("cart");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setCartData(userData);
    } else {
      console.log("User data not found in local storage");
    }
  }, []);

  useEffect(() => {
    if (cartData.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  }, [cartData]);

  const totalPrice = useMemo(
    () =>
      cartData
        .reduce((sum, item) => sum + item.quantity * parseFloat(item.price), 0)
        .toFixed(2),
    [cartData]
  );

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
    localStorage.clear();
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
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Container />
        <Cart
          onIncreaseQuantity={increaseQuantity}
          onDecreaseQuantity={decreaseQuantity}
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
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
