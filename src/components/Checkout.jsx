import { createPortal } from "react-dom";

import Modal from "./common/Modal.jsx";
import Input from "./common/Input.jsx";
import { useState } from "react";

export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function isEmail(value) {
  return value.includes("@");
}

export default function Checkout({
  modalRef,
  closeModal,
  handleOutsideClick,
  total,
}) {
  const [dataForm, setaDataForm] = useState({
    fullname: "",
    email: "",
    street: "",
    code: "",
    city: "",
  });
  // const [didEdit, setDidEdit] = useState({
  //   fullname: false,
  //   email: false,
  //   street: false,
  //   code: false,
  //   city: false,
  // });

  function handleForm(name, value) {
    setaDataForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function submitOrder() {
    if (
      isNotEmpty(dataForm.fullname) &&
      isNotEmpty(dataForm.email) &&
      isEmail(dataForm.email) &&
      isNotEmpty(dataForm.street) &&
      isNotEmpty(dataForm.code) &&
      isNotEmpty(dataForm.city)
    ) {
      console.log("submit order");
    }
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
          id="fullname"
          name="fullname"
          type="text"
          label="Full Name"
          value={dataForm.fullname}
          onChange={(e) => handleForm("fullname", e.target.value)}
          error={!isNotEmpty(dataForm.fullname) && "Please enter a full name."}
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="E-Mail Address"
          value={dataForm.email}
          onChange={(e) => handleForm("email", e.target.value)}
          error={
            !isNotEmpty(dataForm.email) &&
            !isEmail(dataForm.email) &&
            "Please enter a valid email address."
          }
        />
        <Input
          id="street"
          name="street"
          type="text"
          label="Street"
          value={dataForm.street}
          onChange={(e) => handleForm("street", e.target.value)}
          error={!isNotEmpty(dataForm.street) && "Please enter a street."}
        />
        <div className="control-row">
          <Input
            id="code"
            name="code"
            type="number"
            label="Postal Code"
            value={dataForm.code}
            onChange={(e) => handleForm("code", e.target.value)}
            error={!isNotEmpty(dataForm.code) && "Please enter a code."}
          />
          <Input
            id="city"
            name="city"
            type="text"
            label="City"
            value={dataForm.city}
            onChange={(e) => handleForm("city", e.target.value)}
            error={!isNotEmpty(dataForm.city) && "Please enter a city."}
          />
        </div>
      </form>
    </Modal>,
    document.getElementById("modal")
  );
}
