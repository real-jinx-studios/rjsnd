import React, { useState } from "react";

import { useRouter } from "next/router";
import CustomInput from "./customInput";

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
}

export default function SimpleModal(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const modalStyle = getModalStyle();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClose = () => {
    props.show(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(
      "/api/get-user?email=" +
        e.target[0].value +
        "password=" +
        e.target[1].value
    )
      .then((response) => response.json())
      .then((data) => {
        //will break if data[0] is not obj needed
        //fix it one day plis
        if (data.length > 0) {
          router.push("/buy/checkout");
        }
      });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form onSubmit={handleLogin}>
        <CustomInput
          label="Email"
          type="text"
          variant="outlined"
          id="custom-css-outlined-input"
          defaultValue={props.email}
          placeholder="Email"
          handleChange={handleEmail}
          value={email}
        />
        <CustomInput
          label="Password"
          type="password"
          variant="outlined"
          id="custom-css-outlined-input"
          placeholder="Password"
          value={password}
          handleChange={handlePassword}
        />
        <button type="submit">log in</button>
      </form>
      <button type="button" onClick={handleClose}>
        cancel
      </button>
    </div>
  );

  return (
    <div>

        {body}

    </div>
  );
}
