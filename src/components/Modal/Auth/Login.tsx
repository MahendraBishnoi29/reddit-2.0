import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = () => {};
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={() => {
          onChange;
        }}
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        onChange={() => {
          onChange;
        }}
      />
      <Button type="submit" width="100%" height="36px" mt={2} mb={2}>
        Log In
      </Button>
    </form>
  );
};

export default Login;
