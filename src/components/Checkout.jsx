import { createPortal } from "react-dom";
import { useState } from "react";

import Modal from "./common/Modal.jsx";
import Input from "./common/Input.jsx";

import { isNotEmpty, isEmail } from "../util/validation.js";
import { postOrders } from "../http.js";

export default function Checkout({
  items,
  modalRef,
  closeModal,
  handleOutsideClick,
  total,
  openSuccessModal
}) {
  const [dataForm, setaDataForm] = useState({
    items: { ...items },
    customer: {
      name: "",
      email: "",
      street: "",
      ["postal-code"]: "",
      city: "",
    },
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
    setaDataForm((prevState) => {
      return {
        ...prevState,
        customer: {
          ...prevState.customer,
          [name]: value,
        },
      };
    });

    return;
  }

  function submitOrder() {
    if (!isNotEmpty(dataForm.customer.name)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          name: true,
        };
      });
    }

    if (!isEmail(dataForm.customer.email)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          email: true,
        };
      });
    }

    if (!isNotEmpty(dataForm.customer.street)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          street: true,
        };
      });
    }

    if (!isNotEmpty(dataForm.customer["postal-code"])) {
      setErrors((prevState) => {
        return {
          ...prevState,
          ["postal-code"]: true,
        };
      });
    }

    if (!isNotEmpty(dataForm.customer.city)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          city: true,
        };
      });
    }

    if (
      isNotEmpty(dataForm.customer.name) &&
      isEmail(dataForm.customer.email) &&
      isNotEmpty(dataForm.customer.street) &&
      isNotEmpty(dataForm.customer["postal-code"]) &&
      isNotEmpty(dataForm.customer.city)
    ) {
      postOrders(dataForm);
      openSuccessModal();
    }
  }

  function handleInputBlur(name) {
    setDidEdit((prevState) => {
      return {
        ...prevState,
        [name]: true,
      };
    });
  }

  return createPortal(
    <Modal
      title="Checkout"
      buttonLabel="Submit Order"
      modalRef={modalRef}
      closeModal={closeModal}
      handleOutsideClick={handleOutsideClick}
      nextStepButton={submitOrder}
    >
      <form>
        <div>Total Amount: ${total}</div>
        <Input
          id="name"
          name="name"
          type="text"
          label="Full Name"
          value={dataForm.customer.name}
          onChange={(e) => handleForm("name", e.target.value)}
          onBlur={() => handleInputBlur("name")}
          error={
            (errors.name || didEdit.name) &&
            !isNotEmpty(dataForm.customer.name) &&
            "Please enter a full name."
          }
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="E-Mail Address"
          value={dataForm.customer.email}
          onBlur={() => handleInputBlur("email")}
          onChange={(e) => handleForm("email", e.target.value)}
          error={
            // !isNotEmpty(dataForm.email) &&
            (errors.email || didEdit.email) &&
            !isEmail(dataForm.customer.email) &&
            "Please enter a valid email address."
          }
        />
        <Input
          id="street"
          name="street"
          type="text"
          label="Street"
          value={dataForm.customer.street}
          onBlur={() => handleInputBlur("street")}
          onChange={(e) => handleForm("street", e.target.value)}
          error={
            (errors.street || didEdit.street) &&
            !isNotEmpty(dataForm.customer.street) &&
            "Please enter a street."
          }
        />
        <div className="control-row">
          <Input
            id="code"
            name="code"
            type="number"
            label="Postal Code"
            value={dataForm.customer["postal-code"]}
            onBlur={() => handleInputBlur("postal-code")}
            onChange={(e) => handleForm("postal-code", e.target.value)}
            error={
              (errors["postal-code"] || didEdit["postal-code"]) &&
              !isNotEmpty(dataForm.customer["postal-code"]) &&
              "Please enter a code."
            }
          />
          <Input
            id="city"
            name="city"
            type="text"
            label="City"
            value={dataForm.customer.city}
            onBlur={() => handleInputBlur("city")}
            onChange={(e) => handleForm("city", e.target.value)}
            error={
              (errors.city || didEdit.city) &&
              !isNotEmpty(dataForm.customer.city) &&
              "Please enter a city."
            }
          />
        </div>
      </form>
    </Modal>,
    document.getElementById("modal")
  );
}
