'use client'

import { useState } from "react";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

  return (
    <div>
      <input placeholder="Email"></input>
    </div>
  )
}

export default Login;
