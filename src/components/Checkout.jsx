import { createPortal } from "react-dom";
import { useContext, useState } from "react";

import Modal from "./common/Modal.jsx";
import Input from "./common/Input.jsx";
import Button from "./common/Button.jsx";
import Error from "./Error.jsx";

import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

import { isNotEmpty, isEmail } from "../util/validation.js";
import { currencyFormatter } from "../util/formatting.js";
import useHttp from "../hooks/useHttp.js";

const requestMeals = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const cartTotal = cartContext.items.reduce(
    (totalPrice, item) => (totalPrice += item.quantity * item.price),
    0
  );

  const { data, isLoading, error, sendRequest } = useHttp(
    "http://localhost:3000/orders",
    requestMeals,
    []
  );

  function handleCloseCheckout() {
    userProgressContext.hideCheckout();
  }

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    street: "",
    ["postal-code"]: "",
    city: "",
  });

  const [didEdit, setDidEdit] = useState({
    name: false,
    email: false,
    street: false,
    ["postal-code"]: false,
    city: false,
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    street: false,
    ["postal-code"]: false,
    city: false,
  });

  function handleForm(name, value) {
    setCustomer((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    return;
  }

  function handleInputBlur(name) {
    setDidEdit((prevState) => {
      return {
        ...prevState,
        [name]: true,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isNotEmpty(customer.name)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          name: true,
        };
      });
    }

    if (!isEmail(customer.email)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          email: true,
        };
      });
    }

    if (!isNotEmpty(customer.street)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          street: true,
        };
      });
    }

    if (!isNotEmpty(customer["postal-code"])) {
      setErrors((prevState) => {
        return {
          ...prevState,
          ["postal-code"]: true,
        };
      });
    }

    if (!isNotEmpty(customer.city)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          city: true,
        };
      });
    }

    if (
      isNotEmpty(customer.name) &&
      isEmail(customer.email) &&
      isNotEmpty(customer.street) &&
      isNotEmpty(customer["postal-code"]) &&
      isNotEmpty(customer.city)
    ) {
      sendRequest(
        JSON.stringify({
          order: {
            items: cartContext.items,
            customer: customer,
          },
        })
      );
    }
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isLoading) {
    actions = <span>Sending order data...</span>;
  }

  console.log('data');
  console.log(data);
  console.log(data.message);

  if (data.message && !error) {
    return (
      <Modal
        open={userProgressContext.progress === "checkout"}
        onClose={handleCloseCheckout}
      >
        <h2>Success!</h2>
        <p>You order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleCloseCheckout}>
            Okay
          </Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressContext.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input
          id="name"
          name="name"
          type="text"
          label="Full Name"
          value={customer.name}
          onChange={(e) => handleForm("name", e.target.value)}
          onBlur={() => handleInputBlur("name")}
          error={
            (errors.name || didEdit.name) &&
            !isNotEmpty(customer.name) &&
            "Please enter a full name."
          }
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="E-Mail Address"
          value={customer.email}
          onBlur={() => handleInputBlur("email")}
          onChange={(e) => handleForm("email", e.target.value)}
          error={
            (errors.email || didEdit.email) &&
            !isEmail(customer.email) &&
            "Please enter a valid email address."
          }
        />
        <Input
          id="street"
          name="street"
          type="text"
          label="Street"
          value={customer.street}
          onBlur={() => handleInputBlur("street")}
          onChange={(e) => handleForm("street", e.target.value)}
          error={
            (errors.street || didEdit.street) &&
            !isNotEmpty(customer.street) &&
            "Please enter a street."
          }
        />
        <div className="control-row">
          <Input
            id="code"
            name="code"
            type="number"
            label="Postal Code"
            value={customer["postal-code"]}
            onBlur={() => handleInputBlur("postal-code")}
            onChange={(e) => handleForm("postal-code", e.target.value)}
            error={
              (errors["postal-code"] || didEdit["postal-code"]) &&
              !isNotEmpty(customer["postal-code"]) &&
              "Please enter a code."
            }
          />
          <Input
            id="city"
            name="city"
            type="text"
            label="City"
            value={customer.city}
            onBlur={() => handleInputBlur("city")}
            onChange={(e) => handleForm("city", e.target.value)}
            error={
              (errors.city || didEdit.city) &&
              !isNotEmpty(customer.city) &&
              "Please enter a city."
            }
          />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
